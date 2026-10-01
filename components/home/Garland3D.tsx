'use client';

import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Float, Lightformer, OrbitControls } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';
import { Leaf } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Deterministic pseudo-random so renders stay pure and stable        */
/* ------------------------------------------------------------------ */
function hash(n: number) {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

/* ------------------------------------------------------------------ */
/* Geometry                                                           */
/* ------------------------------------------------------------------ */

// Green cardamom pod: a plump spindle with three soft longitudinal ridges
// and a tiny stem nub. Long axis is +Y.
function createPodGeometry() {
  const length = 0.24;
  const radius = 0.062;
  const profile: THREE.Vector2[] = [];
  const steps = 18;
  for (let i = 0; i <= steps; i++) {
    const s = i / steps;
    // Slightly asymmetric: fuller towards the base, finer at the tip
    const r = radius * Math.pow(Math.sin(Math.PI * s), 0.8) * (1 - 0.18 * s);
    profile.push(new THREE.Vector2(Math.max(r, 0.0005), (s - 0.5) * length));
  }
  const geom = new THREE.LatheGeometry(profile, 24);
  const pos = geom.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const angle = Math.atan2(z, x);
    const ridge = 1 + Math.cos(angle * 3) * 0.1;
    pos.setX(i, x * ridge);
    pos.setZ(i, z * ridge);
  }
  geom.computeVertexNormals();
  return geom;
}

// Garland path: a hanging loop, wider at the top (where it would rest on
// the shoulders) and drawn into a soft point at the bottom. The top runs
// behind, the bottom comes forward, so it reads as worn rather than flat.
function createGarlandCurve() {
  const pts: THREE.Vector3[] = [];
  const n = 96;
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2;
    const drop = (1 - Math.cos(t)) / 2; // 0 at top, 1 at bottom
    const x = Math.sin(t) * 1.55 * (1 - 0.22 * drop * drop);
    const y = Math.cos(t) * 1.45 - 0.4 * drop * drop;
    const z = -Math.cos(t) * 0.55;
    pts.push(new THREE.Vector3(x, y, z));
  }
  return new THREE.CatmullRomCurve3(pts, true, 'centripetal');
}

const PODS_PER_RING = 7;
const RING_SPACING = 0.072;
const SPACER_EVERY = 16; // rings between nut/gold spacer clusters
const SPACER_SLOTS = 5; // empty · gold · nut · gold · empty
const POD_TILT = 1.18; // radians away from the rope tangent

const POD_GREENS = ['#5F7A3A', '#6B8543', '#56703A', '#7A9150', '#647F3F', '#86995A'];

type Placement = { matrix: THREE.Matrix4; color?: THREE.Color };

function buildGarland() {
  const curve = createGarlandCurve();
  const length = curve.getLength();
  const rings = Math.floor(length / RING_SPACING);
  const frames = curve.computeFrenetFrames(rings, true);

  const pods: Placement[] = [];
  const nuts: Placement[] = [];
  const gold: Placement[] = [];

  const up = new THREE.Vector3(0, 1, 0);
  const q = new THREE.Quaternion();
  const scale = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const radial = new THREE.Vector3();
  const point = new THREE.Vector3();

  for (let i = 0; i < rings; i++) {
    const u = i / rings;
    curve.getPointAt(u, point);
    const T = frames.tangents[i];
    const N = frames.normals[i];
    const B = frames.binormals[i];

    // Spacer cluster: gold cap · nut · gold cap
    const slot = i % SPACER_EVERY;
    if (slot < SPACER_SLOTS) {
      q.setFromUnitVectors(up, T);
      if (slot === 2) {
        scale.set(1, 0.9, 1);
        nuts.push({ matrix: new THREE.Matrix4().compose(point.clone(), q.clone(), scale.clone()) });
      } else if (slot === 1 || slot === 3) {
        scale.set(1, 1, 1);
        // Pull the caps in against the nut so they read as one bead
        const pos = point.clone().addScaledVector(T, slot === 1 ? 0.035 : -0.035);
        gold.push({ matrix: new THREE.Matrix4().compose(pos, q.clone(), scale.clone()) });
      }
      continue;
    }

    // A ring of pods angled outward and along the rope, rotated per ring
    // so the strand reads as a tight spiral braid.
    const twist = i * 0.55;
    for (let k = 0; k < PODS_PER_RING; k++) {
      const phi = twist + (k / PODS_PER_RING) * Math.PI * 2;
      radial
        .copy(N)
        .multiplyScalar(Math.cos(phi))
        .addScaledVector(B, Math.sin(phi))
        .normalize();
      dir
        .copy(radial)
        .multiplyScalar(Math.sin(POD_TILT))
        .addScaledVector(T, Math.cos(POD_TILT))
        .normalize();

      const seed = i * PODS_PER_RING + k;
      const jitter = 0.9 + hash(seed) * 0.22;
      const pos = point.clone().addScaledVector(radial, 0.1);
      q.setFromUnitVectors(up, dir);
      scale.set(jitter, jitter * (0.95 + hash(seed + 7) * 0.12), jitter);

      const base = new THREE.Color(POD_GREENS[Math.floor(hash(seed + 3) * POD_GREENS.length)]);
      base.offsetHSL(0, 0, (hash(seed + 11) - 0.5) * 0.05);
      pods.push({ matrix: new THREE.Matrix4().compose(pos, q.clone(), scale.clone()), color: base });
    }
  }

  // Lowest point of the loop, used to hang the pendant
  let bottom = new THREE.Vector3(0, Infinity, 0);
  for (let i = 0; i <= 200; i++) {
    const p = curve.getPointAt(i / 200);
    if (p.y < bottom.y) bottom = p;
  }

  return { curve, pods, nuts, gold, bottom };
}

/* ------------------------------------------------------------------ */
/* Instanced helper                                                   */
/* ------------------------------------------------------------------ */
function Instances({
  geometry,
  material,
  items,
}: {
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  items: Placement[];
}) {
  const ref = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    items.forEach((item, i) => {
      mesh.setMatrixAt(i, item.matrix);
      if (item.color) mesh.setColorAt(i, item.color);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [items]);

  return <instancedMesh ref={ref} args={[geometry, material, items.length]} />;
}

/* ------------------------------------------------------------------ */
/* Pendant: radial rosette of pods around a gold-capped nut, with     */
/* three short tassel strands                                         */
/* ------------------------------------------------------------------ */
function Pendant({
  position,
  podGeom,
  podMat,
  nutMat,
  goldMat,
}: {
  position: THREE.Vector3;
  podGeom: THREE.BufferGeometry;
  podMat: THREE.Material;
  nutMat: THREE.Material;
  goldMat: THREE.Material;
}) {
  const rosette = useMemo(() => {
    const items: Placement[] = [];
    const up = new THREE.Vector3(0, 1, 0);
    const layers = [
      { count: 14, r: 0.25, scale: 1.15, z: 0 },
      { count: 10, r: 0.16, scale: 0.9, z: 0.05 },
    ];
    layers.forEach((layer, li) => {
      for (let i = 0; i < layer.count; i++) {
        const a = (i / layer.count) * Math.PI * 2 + li * 0.3;
        const d = new THREE.Vector3(Math.cos(a), Math.sin(a), 0.18).normalize();
        const q = new THREE.Quaternion().setFromUnitVectors(up, d);
        const p = new THREE.Vector3(Math.cos(a) * layer.r, Math.sin(a) * layer.r, layer.z);
        const s = layer.scale;
        const c = new THREE.Color(POD_GREENS[(i + li * 2) % POD_GREENS.length]);
        items.push({ matrix: new THREE.Matrix4().compose(p, q, new THREE.Vector3(s, s, s)), color: c });
      }
    });

    // Tassels
    const strands = [-0.14, 0, 0.14];
    strands.forEach((sx, si) => {
      const len = si === 1 ? 6 : 5;
      for (let j = 0; j < len; j++) {
        const p = new THREE.Vector3(sx * (1 + j * 0.08), -0.42 - j * 0.15, 0.02);
        const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), j * 1.3);
        const c = new THREE.Color(POD_GREENS[(j + si) % POD_GREENS.length]);
        items.push({ matrix: new THREE.Matrix4().compose(p, q, new THREE.Vector3(0.85, 0.85, 0.85)), color: c });
      }
    });
    return items;
  }, []);

  return (
    <group position={[position.x, position.y - 0.32, position.z + 0.04]}>
      <Instances geometry={podGeom} material={podMat} items={rosette} />
      {/* Central nut with gold cap */}
      <mesh material={nutMat} position={[0, 0, 0.07]}>
        <sphereGeometry args={[0.11, 32, 32]} />
      </mesh>
      <mesh material={goldMat} position={[0, 0, 0.16]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.075, 0.03, 32]} />
      </mesh>
      {/* Link to the garland */}
      <mesh material={goldMat} position={[0, 0.3, 0]}>
        <torusGeometry args={[0.045, 0.012, 12, 32]} />
      </mesh>
      {/* Tassel end beads */}
      {[-0.14, 0, 0.14].map((sx, si) => {
        const len = si === 1 ? 6 : 5;
        return (
          <mesh
            key={sx}
            material={goldMat}
            position={[sx * (1 + len * 0.08), -0.42 - len * 0.15 + 0.03, 0.02]}
          >
            <sphereGeometry args={[0.035, 20, 20]} />
          </mesh>
        );
      })}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Garland                                                            */
/* ------------------------------------------------------------------ */
function Garland({ animate }: { animate: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  const assets = useMemo(() => {
    const data = buildGarland();
    const podGeom = createPodGeometry();
    const nutGeom = new THREE.SphereGeometry(0.135, 32, 32);
    const goldGeom = new THREE.CylinderGeometry(0.15, 0.15, 0.04, 40);
    const coreGeom = new THREE.TubeGeometry(data.curve, 400, 0.07, 10, true);

    const podMat = new THREE.MeshPhysicalMaterial({
      color: '#ffffff',
      roughness: 0.58,
      metalness: 0,
      sheen: 0.35,
      sheenRoughness: 0.7,
      sheenColor: new THREE.Color('#b9c98f'),
      clearcoat: 0.2,
      clearcoatRoughness: 0.5,
    });
    const nutMat = new THREE.MeshPhysicalMaterial({
      color: '#5A3A24',
      roughness: 0.55,
      clearcoat: 0.35,
      clearcoatRoughness: 0.4,
    });
    const goldMat = new THREE.MeshStandardMaterial({
      color: '#D2AE6A',
      metalness: 1,
      roughness: 0.22,
    });
    const coreMat = new THREE.MeshStandardMaterial({ color: '#3F5530', roughness: 0.9 });

    return { ...data, podGeom, nutGeom, goldGeom, coreGeom, podMat, nutMat, goldMat, coreMat };
  }, []);

  useFrame((state) => {
    if (!groupRef.current || !animate) return;
    // Gentle sway rather than a full spin, so the garland stays front-facing
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(t * 0.35) * 0.55;
    groupRef.current.rotation.z = Math.sin(t * 0.6) * 0.025;
  });

  return (
    <group ref={groupRef} position={[0, 0.75, 0]}>
      <mesh geometry={assets.coreGeom} material={assets.coreMat} />
      <Instances geometry={assets.podGeom} material={assets.podMat} items={assets.pods} />
      <Instances geometry={assets.nutGeom} material={assets.nutMat} items={assets.nuts} />
      <Instances geometry={assets.goldGeom} material={assets.goldMat} items={assets.gold} />
      <Pendant
        position={assets.bottom}
        podGeom={assets.podGeom}
        podMat={assets.podMat}
        nutMat={assets.nutMat}
        goldMat={assets.goldMat}
      />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Fallback                                                           */
/* ------------------------------------------------------------------ */
function GarlandFallback() {
  return (
    <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[580px] flex flex-col items-center justify-center p-8">
      <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-full border border-line flex items-center justify-center">
        <div className="w-40 h-40 sm:w-52 sm:h-52 rounded-full border border-dashed border-gold/50 flex items-center justify-center">
          <div className="text-center space-y-2 px-4">
            <Leaf className="w-6 h-6 text-gold mx-auto" strokeWidth={1.5} />
            <span className="font-serif text-lg text-emerald-dark block">Cardamom Garland</span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-charcoal/50 block">
              Handcrafted
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function detectWebGL() {
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
export default function Garland3D() {
  // This module is only loaded client-side (dynamic import, ssr: false)
  const [hasWebGL] = useState(detectWebGL);
  const reducedMotion = useReducedMotion();
  const animate = !reducedMotion;

  if (!hasWebGL) {
    return <GarlandFallback />;
  }

  return (
    <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[580px] cursor-grab active:cursor-grabbing">
      <div className="absolute inset-[18%] bg-radial from-gold/20 via-botanical/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0.1, 8.2], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
        }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 6, 5]} intensity={1.6} color="#FFF6E6" />
        <directionalLight position={[-5, 2, -4]} intensity={0.5} color="#DCE8D0" />

        {/* Studio reflections for the gold and soft sheen on the pods (no network fetch) */}
        <Environment resolution={256} frames={1}>
          <Lightformer form="rect" intensity={2.2} position={[0, 4, 3]} scale={[8, 2, 1]} color="#FFF4E0" />
          <Lightformer form="rect" intensity={1.2} position={[-5, 1, 2]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} />
          <Lightformer form="rect" intensity={0.9} position={[5, 0, 1]} rotation-y={-Math.PI / 2} scale={[6, 3, 1]} color="#E8EEDC" />
          <Lightformer form="ring" intensity={1.5} position={[0, -3, 4]} scale={2} color="#F2D9A6" />
        </Environment>

        <Float
          speed={animate ? 1.2 : 0}
          rotationIntensity={animate ? 0.12 : 0}
          floatIntensity={animate ? 0.25 : 0}
        >
          <Garland animate={animate} />
        </Float>

        <ContactShadows
          position={[0, -2.85, 0]}
          opacity={0.28}
          scale={7}
          blur={2.8}
          far={4}
          color="#0B2219"
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.75}
          minPolarAngle={Math.PI / 2.6}
          rotateSpeed={0.5}
        />
      </Canvas>

      <div className="absolute top-4 right-4 px-3.5 py-1.5 bg-white/80 backdrop-blur-md border border-line rounded-full text-[10px] text-charcoal/55 tracking-[0.2em] uppercase pointer-events-none whitespace-nowrap">
        Drag to rotate
      </div>
    </div>
  );
}
