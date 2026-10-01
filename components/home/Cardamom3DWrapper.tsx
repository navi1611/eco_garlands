'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const Placeholder = () => (
  <div className="w-full h-[380px] sm:h-[480px] lg:h-[580px] flex items-center justify-center">
    <div className="w-56 h-56 rounded-full border border-line animate-pulse" />
  </div>
);

// Set NEXT_PUBLIC_SPLINE_HERO_SCENE to a Spline export URL
// (https://prod.spline.design/…/scene.splinecode) to show a Spline scene
// instead of the built-in three.js cardamom scene.
const SPLINE_SCENE = process.env.NEXT_PUBLIC_SPLINE_HERO_SCENE;

const Cardamom3D = dynamic(() => import('@/components/home/Cardamom3D'), {
  ssr: false,
  loading: Placeholder,
});

const SplineHero = dynamic(() => import('@/components/home/SplineHero'), {
  ssr: false,
  loading: Placeholder,
});

export default function Cardamom3DWrapper() {
  return SPLINE_SCENE ? <SplineHero scene={SPLINE_SCENE} /> : <Cardamom3D />;
}
