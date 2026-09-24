'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';

// Procedural Cardamom Pod Geometry
function createCardamomGeometry() {
  const geom = new THREE.CylinderGeometry(0.04, 0.03, 0.45, 12, 16);
  const pos = geom.attributes.position;
  // Morph into realistic spindle-shaped cardamom pod with longitudinal ridges
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    const radiusScale = Math.cos((y / 0.45) * Math.PI) * 1.6 + 0.3;
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const angle = Math.atan2(z, x);
    // 3 prominent natural ridges typical of Elettaria cardamomum pods
    const ridge = Math.cos(angle * 3) * 0.12 + 1;
    pos.setX(i, x * radiusScale * ridge);
    pos.setZ(i, z * radiusScale * ridge);
  }
  geom.computeVertexNormals();
  return geom;
}

// 3D Cardamom Garland Loop Component
function GarlandMesh({ isReducedMotion }: { isReducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const count = 54; // Garland units

  // Generate garland curve (graceful floral drape)
  const items = useMemo(() => {
    const cardamomGeom = createCardamomGeometry();
    const nutGeom = new THREE.SphereGeometry(0.12, 16, 16);
    const goldRingGeom = new THREE.TorusGeometry(0.09, 0.02, 12, 24);

    const cardamomMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#5E7E52'), // Natural cardamom green
      roughness: 0.65,
      metalness: 0.08,
      bumpScale: 0.05,
    });

    const nutMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#583622'), // Nutmeg / spiced nut brown
      roughness: 0.8,
      metalness: 0.1,
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D4AF37'), // Traditional temple gold accent
      roughness: 0.3,
      metalness: 0.75,
    });

    const elements = [];
    const radiusX = 2.4;
    const radiusY = 1.6;

    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      // Elegant draped ellipse curve
      const x = Math.sin(t) * radiusX;
      const y = Math.cos(t) * radiusY + Math.sin(t * 2) * 0.25;
      const z = Math.sin(t) * 0.5;

      const isNut = i % 5 === 0;
      const isGold = i % 5 === 1;

      elements.push({
        id: i,
        position: [x, y, z] as [number, number, number],
        rotation: [
          Math.sin(t) * 0.5,
          Math.cos(t) * 0.5 + t,
          Math.PI / 2 + Math.cos(t) * 0.3,
        ] as [number, number, number],
        isNut,
        isGold,
      });
    }

    return {
      elements,
      cardamomGeom,
      nutGeom,
      goldRingGeom,
      cardamomMat,
      nutMat,
      goldMat,
    };
  }, [count]);

  // Gentle breathing / floating loop
  useFrame((state, delta) => {
    if (groupRef.current && !isReducedMotion) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.06;
    }
  });

  return (
    <group ref={groupRef} scale={1.15}>
      {items.elements.map((item) => (
        <group key={item.id} position={item.position} rotation={item.rotation}>
          {item.isNut ? (
            <mesh geometry={items.nutGeom} material={items.nutMat} />
          ) : item.isGold ? (
            <mesh geometry={items.goldRingGeom} material={items.goldMat} />
          ) : (
            <mesh geometry={items.cardamomGeom} material={items.cardamomMat} />
          )}
        </group>
      ))}

      {/* Central decorative pendant / tassel knot */}
      <group position={[0, -1.8, 0]}>
        <mesh position={[0, 0, 0]} material={items.goldMat}>
          <cylinderGeometry args={[0.2, 0.28, 0.35, 16]} />
        </mesh>
        <mesh position={[0, -0.4, 0]} material={items.cardamomMat}>
          <coneGeometry args={[0.25, 0.6, 16]} />
        </mesh>
        <mesh position={[0, -0.85, 0]} material={items.goldMat}>
          <sphereGeometry args={[0.09, 16, 16]} />
        </mesh>
      </group>
    </group>
  );
}

// Floating Botanical Particles
function BotanicalParticles({ count = 35 }: { count?: number }) {
  const points = useMemo(() => {
    const pts = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pts[i * 3] = (Math.random() - 0.5) * 8;
      pts[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pts[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pts;
  }, [count]);

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(points, 3));
    return g;
  }, [points]);

  const mat = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.05,
      color: new THREE.Color('#C9A227'),
      transparent: true,
      opacity: 0.65,
    });
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.03;
      ref.current.rotation.x += delta * 0.01;
    }
  });

  return <points ref={ref} geometry={geom} material={mat} />;
}

// Fallback Visual if WebGL or low-power
function GarlandFallback() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8 bg-linear-to-b from-cream to-cream-soft rounded-2xl border border-gold/20 shadow-sm">
      <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full border-4 border-dashed border-gold/50 flex items-center justify-center bg-cream shadow-inner p-4">
        <div className="text-center space-y-2">
          <div className="text-4xl text-gold">🌿</div>
          <span className="font-serif text-lg text-emerald-dark font-medium block">
            Natural Cardamom Garland
          </span>
          <span className="text-xs uppercase tracking-widest text-gold-dark block">
            Handcrafted Heirloom
          </span>
        </div>
      </div>
      <p className="text-xs text-charcoal/60 mt-4 tracking-wider uppercase">
        J The Divine Eco Valley 3D Specimen
      </p>
    </div>
  );
}

export default function Garland3D() {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!mounted) {
    return <GarlandFallback />;
  }

  if (!hasWebGL) {
    return <GarlandFallback />;
  }

  return (
    <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[580px] flex items-center justify-center cursor-grab active:cursor-grabbing">
      {/* Soft ambient radial backdrop */}
      <div className="absolute inset-0 bg-radial from-gold/10 via-botanical/5 to-transparent rounded-full filter blur-2xl pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        {/* Soft, warm luxury lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          color="#FFFDF5"
        />
        <directionalLight
          position={[-5, -4, -3]}
          intensity={0.4}
          color="#6F8F72"
        />
        <pointLight position={[0, 0, 3]} intensity={0.6} color="#E0BA44" />

        {/* Garland */}
        <Float
          speed={reducedMotion ? 0 : 1.5}
          rotationIntensity={reducedMotion ? 0 : 0.2}
          floatIntensity={reducedMotion ? 0 : 0.3}
        >
          <GarlandMesh isReducedMotion={Boolean(reducedMotion)} />
        </Float>

        {/* Botanical floating particles */}
        {!reducedMotion && <BotanicalParticles count={40} />}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 2.4}
          rotateSpeed={0.5}
        />
      </Canvas>

      {/* Interactive cue badge */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-cream-soft/80 backdrop-blur-xs border border-gold/30 rounded-full text-[11px] text-charcoal/70 tracking-widest uppercase pointer-events-none">
        Interactive 3D Garland • Drag to Orbit
      </div>
    </div>
  );
}
