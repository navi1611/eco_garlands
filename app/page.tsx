import React from 'react';
import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import BrandIntro from '@/components/home/BrandIntro';
import CardamomStory from '@/components/home/CardamomStory';
import GarlandCategories from '@/components/home/GarlandCategories';
import Applications from '@/components/home/Applications';
import ExportSection from '@/components/home/ExportSection';
import HomeCTA from '@/components/home/HomeCTA';

export const metadata: Metadata = {
  title: 'J The Divine Eco Valley | Natural Cardamom & Spice Garlands',
  description:
    'J The Divine Eco Valley creates handcrafted natural garlands made from cardamom, nuts, spices and botanical materials for weddings, ceremonies, homes, celebrations and global markets.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* The rest of the page scrolls over the garland, which stays fixed
          behind it; sections use translucent backgrounds so it shows through */}
      <div className="relative z-10 -mt-[100svh] motion-reduce:mt-0">
        {/* Feathered lead-in so the content melts in instead of starting at a hard edge */}
        <div aria-hidden className="h-40 bg-linear-to-b from-transparent to-white/45 pointer-events-none" />
        <BrandIntro />
        <CardamomStory />
        <GarlandCategories />
        <Applications />
        <ExportSection />
        <HomeCTA />
      </div>
    </>
  );
}
