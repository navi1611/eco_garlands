'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const Garland3D = dynamic(() => import('@/components/home/Garland3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[380px] sm:h-[480px] lg:h-[580px] flex items-center justify-center">
      <div className="w-48 h-48 rounded-full border-2 border-dashed border-gold/40 animate-pulse flex items-center justify-center">
        <span className="text-xs uppercase tracking-widest text-gold-dark font-medium">
          Loading 3D Garland...
        </span>
      </div>
    </div>
  ),
});

export default function Garland3DWrapper() {
  return <Garland3D />;
}
