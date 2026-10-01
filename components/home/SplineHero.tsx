'use client';

import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';

export default function SplineHero({ scene }: { scene: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[580px]">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-56 h-56 rounded-full border border-line animate-pulse" />
        </div>
      )}
      <Spline
        scene={scene}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
