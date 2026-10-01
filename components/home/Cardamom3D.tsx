'use client';

import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer, OrbitControls } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { Leaf } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Deterministic pseudo-random so renders stay pure and stable        */
/* ------------------------------------------------------------------ */
function hash(n: number) {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

/* ------------------------------------------------------------------ */
/* Procedural textures (generated once on the client, no downloads)   */
/* ------------------------------------------------------------------ */

// Cardamom skin: fine longitudinal fibres for the bump map, plus an
// albedo map with soft mottling and warmer, drier ends. Lathe UVs run
// u = around, v = along the pod, so the fibres are drawn as vertical lines.
function createPodTextures() {
  const w = 1024;
  const h = 512;

  const bump = document.createElement('canvas');
  bump.width = w;
  bump.height = h;
  const b = bump.getContext('2d')!;
  const bumpData = b.createImageData(w, h);

  const albedo = document.createElement('canvas');
  albedo.width = w;
  albedo.height = h;
  const a = albedo.getContext('2d')!;
  const albedoData = a.createImageData(w, h);

  const fibres = 60;
  for (let x = 0; x < w; x++) {
    const u = x / w;
    const wobble = Math.sin(u * Math.PI * 14) * 0.4;
    const strength = 0.5 + hash(Math.floor(u * fibres)) * 0.5;
    for (let y = 0; y < h; y++) {
      const v = y / h;
      // Fibres drift slightly as they run along the pod
      const stripe = Math.sin((u + v * 0.012) * Math.PI * 2 * fibres + wobble);
      const grain = hash(x * 13.7 + y * 91.3) - 0.5;
      const wrinkle = Math.sin(v * 180 + Math.sin(u * 60) * 2) * 0.08;
      const value = 0.5 + stripe * 0.16 * strength + grain * 0.08 + wrinkle;
      const i = (y * w + x) * 4;
      const bv = Math.max(0, Math.min(255, value * 255));
      bumpData.data[i] = bumpData.data[i + 1] = bumpData.data[i + 2] = bv;
      bumpData.data[i + 3] = 255;

      // Ends dry to a warm tan; broad mottling keeps the body from looking plastic
      const end = Math.pow(Math.max(0, 1 - Math.min(v, 1 - v) / 0.16), 1.5);
      const mottle =
        Math.sin(u * Math.PI * 6 + v * 9) * 0.03 + Math.sin(u * Math.PI * 2 * 3 - v * 14) * 0.025;
      const shade = 0.94 + stripe * 0.035 * strength + grain * 0.04 + mottle;
      albedoData.data[i] = Math.min(255, (1 + end * 0.04) * shade * 255);
      albedoData.data[i + 1] = Math.min(255, (1 - end * 0.2) * shade * 255);
      albedoData.data[i + 2] = Math.min(255, (1 - end * 0.42) * shade * 255);
      albedoData.data[i + 3] = 255;
    }
  }
  b.putImageData(bumpData, 0, 0);
  a.putImageData(albedoData, 0, 0);

  const bumpMap = new THREE.CanvasTexture(bump);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.anisotropy = 8;
  const map = new THREE.CanvasTexture(albedo);
  map.wrapS = THREE.RepeatWrapping;
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 8;
  return { bumpMap, map };
}

/* ------------------------------------------------------------------ */
/* Geometry                                                           */
/* ------------------------------------------------------------------ */

// Green cardamom pod: a plump, blunt-ended oval with a rounded-triangle
// cross-section, a short stalk at the base and a small beak at the tip.
// Long axis is +Y, centred on the origin.
const POD_LENGTH = 2.2;
const POD_RADIUS = 0.68;

function createPodGeometry(seed: number) {
  const profile: THREE.Vector2[] = [];
  const half = POD_LENGTH / 2;

  // Stalk, slightly flared where it meets the pod
  profile.push(new THREE.Vector2(0.0001, -half - 0.2));
  profile.push(new THREE.Vector2(0.045, -half - 0.2));
  profile.push(new THREE.Vector2(0.05, -half - 0.12));
  profile.push(new THREE.Vector2(0.065, -half - 0.03));

  // Body: superellipse, a touch fuller towards the base
  const steps = 72;
  for (let i = 1; i < steps; i++) {
    const s = i / steps;
    const e = Math.abs(2 * s - 1);
    const r = POD_RADIUS * Math.pow(1 - Math.pow(e, 2.2), 1 / 2.2) * (1 - 0.12 * s);
    profile.push(new THREE.Vector2(Math.max(r, 0.06), (s - 0.5) * POD_LENGTH));
  }

  // Beak
  profile.push(new THREE.Vector2(0.05, half + 0.04));
  profile.push(new THREE.Vector2(0.03, half + 0.08));
  profile.push(new THREE.Vector2(0.0001, half + 0.1));

  const geom = new THREE.LatheGeometry(profile, 128);
  const pos = geom.attributes.position;
  const bend = (hash(seed) - 0.5) * 0.12;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const angle = Math.atan2(z, x);
    const along = y / half; // -1 … 1
    // Three soft carpel ridges, plus a little irregular swelling so no
    // two pods are perfect solids of revolution
    const ridge = 1 + Math.cos(angle * 3 + seed) * 0.1;
    const swell =
      1 +
      Math.sin(along * 2.6 + angle * 2 + seed) * 0.025 +
      Math.sin(along * 5.1 - angle + seed * 2) * 0.012;
    const k = ridge * swell;
    pos.setX(i, x * k + bend * (1 - along * along) * 0.6);
    pos.setZ(i, z * k);
  }
  geom.computeVertexNormals();
  return geom;
}

// Cardamom seed: small, angular, wrinkled and dark. A displaced
// icosphere squashed into an irregular wedge.
function createSeedGeometry() {
  let geom: THREE.BufferGeometry = new THREE.IcosahedronGeometry(1, 3);
  geom.deleteAttribute('normal');
  geom.deleteAttribute('uv');
  geom = mergeVertices(geom);
  const pos = geom.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const n =
      Math.sin(v.x * 3.1 + v.y * 1.7) * 0.12 +
      Math.sin(v.y * 4.3 - v.z * 2.9) * 0.1 +
      Math.sin(v.z * 7.7 + v.x * 5.3) * 0.045 +
      Math.sin(v.x * 13 + v.y * 11 - v.z * 9) * 0.02;
    v.multiplyScalar(1 + n);
    // Flatten one side so the seed reads as a wedge, not a pebble
    if (v.z < -0.25) v.z = -0.25 + (v.z + 0.25) * 0.35;
    v.multiply(new THREE.Vector3(1, 0.78, 0.62));
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geom.computeVertexNormals();
  return geom;
}

/* ------------------------------------------------------------------ */
/* Pods                                                               */
/* ------------------------------------------------------------------ */
type PodConfig = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  seed: number;
  spin: number;
  bob: number;
  tint: string;
};

const PODS: PodConfig[] = [
  { position: [-0.35, 0.25, 0.2], rotation: [0.35, 0, -0.5], scale: 1, seed: 1, spin: 0.22, bob: 0, tint: '#8FA556' },
  { position: [0.85, -0.75, -0.55], rotation: [-0.25, 0.4, 0.75], scale: 0.72, seed: 4, spin: -0.3, bob: 1.7, tint: '#86994C' },
];

function Pod({
  config,
  material,
  animate,
}: {
  config: PodConfig;
  material: THREE.Material;
  animate: boolean;
}) {
  const outer = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => createPodGeometry(config.seed), [config.seed]);
  const mat = useMemo(() => {
    const m = (material as THREE.MeshPhysicalMaterial).clone();
    m.color = new THREE.Color(config.tint);
    return m;
  }, [material, config.tint]);

  useFrame((state, delta) => {
    if (!animate || !outer.current || !inner.current) return;
    const t = state.clock.elapsedTime;
    // Turn about the long axis so the ridges catch the light
    inner.current.rotation.y += delta * config.spin;
    outer.current.position.y = config.position[1] + Math.sin(t * 0.7 + config.bob) * 0.08;
    outer.current.rotation.z = config.rotation[2] + Math.sin(t * 0.45 + config.bob) * 0.04;
  });

  return (
    <group ref={outer} position={config.position} rotation={config.rotation} scale={config.scale}>
      <mesh ref={inner} geometry={geometry} material={mat} castShadow receiveShadow />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Orbiting seeds                                                     */
/* ------------------------------------------------------------------ */

// Three tilted orbital bands, like a slow planetary system around the pods
const ORBITS = [
  { radius: 2.05, tilt: [1.2, 0, 0.35], count: 18, speed: 0.22, size: 0.12 },
  { radius: 2.45, tilt: [1.45, 0, -0.55], count: 22, speed: -0.16, size: 0.13 },
  { radius: 2.8, tilt: [1.05, 0.5, 0.1], count: 16, speed: 0.12, size: 0.11 },
] as const;

type Seed = {
  orbit: number;
  phase: number;
  radius: number;
  lift: number;
  size: number;
  spinAxis: THREE.Vector3;
  spinSpeed: number;
  color: THREE.Color;
};

const SEED_COLORS = ['#2B1A12', '#3A2216', '#22150F', '#4A2B1A', '#33201A'];

function Seeds({ material, animate }: { material: THREE.Material; animate: boolean }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => createSeedGeometry(), []);

  const { seeds, planes } = useMemo(() => {
    const planes = ORBITS.map((o) => new THREE.Quaternion().setFromEuler(new THREE.Euler(...o.tilt)));
    const seeds: Seed[] = [];
    ORBITS.forEach((o, oi) => {
      for (let i = 0; i < o.count; i++) {
        const s = oi * 100 + i;
        seeds.push({
          orbit: oi,
          phase: (i / o.count) * Math.PI * 2 + (hash(s) - 0.5) * 0.25,
          radius: o.radius + (hash(s + 1) - 0.5) * 0.28,
          lift: (hash(s + 2) - 0.5) * 0.22,
          size: o.size * (0.75 + hash(s + 3) * 0.5),
          spinAxis: new THREE.Vector3(hash(s + 4) - 0.5, hash(s + 5) - 0.5, hash(s + 6) - 0.5).normalize(),
          spinSpeed: 0.4 + hash(s + 7) * 0.9,
          color: new THREE.Color(SEED_COLORS[Math.floor(hash(s + 8) * SEED_COLORS.length)]),
        });
      }
    });
    return { seeds, planes };
  }, []);

  const scratch = useMemo(
    () => ({
      m: new THREE.Matrix4(),
      p: new THREE.Vector3(),
      q: new THREE.Quaternion(),
      s: new THREE.Vector3(),
    }),
    [],
  );

  const place = (time: number) => {
    const mesh = ref.current;
    if (!mesh) return;
    const { m, p, q, s } = scratch;
    seeds.forEach((seed, i) => {
      const o = ORBITS[seed.orbit];
      const a = seed.phase + time * o.speed;
      p.set(Math.cos(a) * seed.radius, seed.lift + Math.sin(a * 3 + seed.phase) * 0.05, Math.sin(a) * seed.radius);
      p.applyQuaternion(planes[seed.orbit]);
      q.setFromAxisAngle(seed.spinAxis, seed.phase * 3 + time * seed.spinSpeed);
      s.setScalar(seed.size);
      m.compose(p, q, s);
      mesh.setMatrixAt(i, m);
    });
    mesh.instanceMatrix.needsUpdate = true;
  };

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    seeds.forEach((seed, i) => mesh.setColorAt(i, seed.color));
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    place(0);
    mesh.computeBoundingSphere();
    // place only depends on stable memoised values
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seeds]);

  useFrame((state) => {
    if (animate) place(state.clock.elapsedTime);
  });

  return (
    <instancedMesh
      ref={ref}
      args={[geometry, material, seeds.length]}
      castShadow
      receiveShadow
      frustumCulled={false}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Composition                                                        */
/* ------------------------------------------------------------------ */
function CardamomScene({ animate }: { animate: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  const materials = useMemo(() => {
    const { bumpMap, map } = createPodTextures();
    return {
      pod: new THREE.MeshPhysicalMaterial({
        color: '#8FA556',
        map,
        bumpMap,
        bumpScale: 0.9,
        roughness: 0.68,
        metalness: 0,
        sheen: 0.7,
        sheenRoughness: 0.5,
        sheenColor: new THREE.Color('#e2ebc0'),
      }),
      seed: new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        roughness: 0.42,
        clearcoat: 0.6,
        clearcoatRoughness: 0.35,
      }),
    };
  }, []);

  useFrame((state) => {
    if (!groupRef.current || !animate) return;
    // Slow sway of the whole composition so it never sits perfectly still
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(t * 0.25) * 0.25;
  });

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      {PODS.map((pod) => (
        <Pod key={pod.seed} config={pod} material={materials.pod} animate={animate} />
      ))}
      <Seeds material={materials.seed} animate={animate} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Fallback                                                           */
/* ------------------------------------------------------------------ */
export function CardamomFallback() {
  return (
    <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[580px] flex flex-col items-center justify-center p-8">
      <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-full border border-line flex items-center justify-center">
        <div className="w-40 h-40 sm:w-52 sm:h-52 rounded-full border border-dashed border-gold/50 flex items-center justify-center">
          <div className="text-center space-y-2 px-4">
            <Leaf className="w-6 h-6 text-gold mx-auto" strokeWidth={1.5} />
            <span className="font-serif text-lg text-emerald-dark block">Green Cardamom</span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-charcoal/50 block">
              Handpicked
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function detectWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------------ */
/* Scene                                                              */
/* ------------------------------------------------------------------ */
export default function Cardamom3D() {
  // This module is only loaded client-side (dynamic import, ssr: false)
  const [hasWebGL] = useState(detectWebGL);
  const reducedMotion = useReducedMotion();
  const animate = !reducedMotion;

  if (!hasWebGL) {
    return <CardamomFallback />;
  }

  return (
    <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[580px] cursor-grab active:cursor-grabbing">
      <div className="absolute inset-[18%] bg-radial from-gold/20 via-botanical/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <Canvas
        shadows
        camera={{ position: [0, 0.3, 9.6], fov: 36 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.NeutralToneMapping,
          toneMappingExposure: 1.05,
        }}
      >
        <ambientLight intensity={0.22} />
        {/* Key light: seeds cast soft shadows across the pods as they pass */}
        <directionalLight
          position={[3.5, 6, 6]}
          intensity={2.2}
          color="#FFF4E2"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0003}
          shadow-normalBias={0.03}
          shadow-camera-left={-4}
          shadow-camera-right={4}
          shadow-camera-top={4}
          shadow-camera-bottom={-4}
          shadow-camera-near={1}
          shadow-camera-far={20}
        />
        {/* Cool rim from behind to separate the pods from the white page */}
        <directionalLight position={[-5, 2, -4]} intensity={1.1} color="#E4EED6" />
        <directionalLight position={[0, -3, 5]} intensity={0.3} color="#FFE8C4" />

        {/* Studio reflections for the sheen on the pods and seeds (no network fetch) */}
        <Environment resolution={256} frames={1}>
          <Lightformer form="rect" intensity={2.4} position={[0, 4, 3]} scale={[8, 2, 1]} color="#FFF4E0" />
          <Lightformer form="rect" intensity={1.3} position={[-5, 1, 2]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} />
          <Lightformer form="rect" intensity={1} position={[5, 0, 1]} rotation-y={-Math.PI / 2} scale={[6, 3, 1]} color="#E8EEDC" />
          <Lightformer form="ring" intensity={1.6} position={[0, -3, 4]} scale={2} color="#F2D9A6" />
        </Environment>

        <CardamomScene animate={animate} />

        <ContactShadows
          position={[0, -3.1, 0]}
          opacity={0.28}
          scale={8}
          blur={3}
          far={5}
          color="#0B2219"
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 2.8}
          rotateSpeed={0.5}
        />
      </Canvas>

      <div className="absolute top-4 right-4 px-3.5 py-1.5 bg-white/80 backdrop-blur-md border border-line rounded-full text-[10px] text-charcoal/55 tracking-[0.2em] uppercase pointer-events-none whitespace-nowrap">
        Drag to rotate
      </div>
    </div>
  );
}
