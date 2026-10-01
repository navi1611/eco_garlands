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
      {/* The rest of the page rises over the pinned hero like a curtain */}
      <div className="relative z-10 -mt-[100svh] motion-reduce:mt-0 rounded-t-[2rem] overflow-clip bg-white shadow-[0_-30px_60px_-30px_rgba(11,34,25,0.28)]">
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
