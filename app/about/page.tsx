import React from 'react';
import type { Metadata } from 'next';
import PageContainer from '@/components/layout/PageContainer';
import ProcessTimeline from '@/components/about/ProcessTimeline';
import ManufacturingProcess from '@/components/about/ManufacturingProcess';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'From Seed to Celebration — About Our Craft',
  description:
    'Discover how natural materials become handcrafted garlands ready for celebrations around the world. The story of cardamom cultivation, artisan knotting, and global export.',
};

export default function AboutPage() {
  return (
    <div className="bg-canvas">
      <PageContainer
        badge="Our Artisan Heritage"
        title="From Seed to Celebration"
        subtitle="Discover how natural materials become handcrafted garlands ready for celebrations around the world."
      >
        {/* Story Intro Block */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed">
            At <strong>J The Divine Eco Valley</strong>, our craft is founded on reverence for the earth’s natural botanicals. We bridge ancient Indian garland-knotting traditions with contemporary packaging and international distribution protocols, transforming unbroken cardamom pods and whole spices into enduring keepsakes.
          </p>
        </div>

        {/* Vertical Interactive Process Timeline 01 - 08 */}
        <ProcessTimeline />

        {/* Manufacturing Principles & Quality Standards */}
        <ManufacturingProcess />

        {/* Bottom Call to Action */}
        <div className="mt-20 text-center bg-white p-10 sm:p-14 border border-line rounded-3xl">
          <h3 className="font-serif text-2xl sm:text-3xl text-emerald-dark font-medium">
            Experience Our Handcrafted Garlands
          </h3>
          <p className="text-sm text-charcoal/70 mt-2 max-w-lg mx-auto">
            Browse our catalog or connect with our master artisans to discuss custom dimensions and occasions.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <Button href="/products" variant="secondary" size="md">
              View Product Catalog
            </Button>
            <Button href="/quote" variant="primary" size="md">
              Request a Custom Quote
            </Button>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
