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
      <BrandIntro />
      <CardamomStory />
      <GarlandCategories />
      <Applications />
      <ExportSection />
      <HomeCTA />
    </>
  );
}
