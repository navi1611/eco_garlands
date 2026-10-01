'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const displayImages = images && images.length > 0 ? images : ['/images/placeholder.jpg'];
  const activeImage = displayImages[selectedIndex] || displayImages[0];

  return (
    <div className="space-y-4">
      {/* Main Large Display Image */}
      <div className="relative aspect-4/5 w-full rounded-xl overflow-hidden bg-botanical/10 border border-line shadow-sm">
        <Image
          src={activeImage}
          alt={`${productName} - View ${selectedIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-opacity duration-300"
        />
        <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-cream-soft/85 backdrop-blur-xs rounded-lg text-[10px] uppercase tracking-wider text-charcoal/80 border border-line">
          Handcrafted Natural Specimen
        </div>
      </div>

      {/* Thumbnails row */}
      {displayImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                selectedIndex === idx
                  ? 'border-gold shadow-xs scale-95'
                  : 'border-line opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
