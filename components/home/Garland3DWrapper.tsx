'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const Garland3D = dynamic(() => import('@/components/home/Garland3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[380px] sm:h-[480px] lg:h-[580px] flex items-center justify-center">
      <div className="w-56 h-56 rounded-full border border-line animate-pulse" />
    </div>
  ),
});

export default function Garland3DWrapper() {
  return <Garland3D />;
}
