import React from 'react';
import type { Metadata } from 'next';
import PageContainer from '@/components/layout/PageContainer';
import ProcessQuickView from '@/components/about/ProcessQuickView';
import ProcessTimeline from '@/components/about/ProcessTimeline';
import ManufacturingProcess from '@/components/about/ManufacturingProcess';
import Button from '@/components/ui/Button';
import ParchmentBackground from '@/components/ui/ParchmentBackground';

export const metadata: Metadata = {
  title: 'From Seed to Celebration — About Our Craft',
  description:
    'Discover how natural materials become handcrafted garlands ready for celebrations around the world. The story of cardamom cultivation, artisan knotting, and global export.',
};

export default function AboutPage() {
  return (
    <div className="relative">
      <ParchmentBackground />
      <div className="relative z-10">
        <PageContainer
          badge="Our Artisan Heritage"
          title="From Seed to Celebration"
          subtitle="Discover how natural materials become handcrafted garlands ready for celebrations around the world."
          // Clip sideways: timeline cards slide in from the side and would
          // otherwise widen the page on phones
          className="overflow-x-clip"
        >
          {/* Story Intro Block */}
          <div className="max-w-3xl mx-auto text-center mb-14 space-y-4">
            <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed">
              At <strong>J The Divine Eco Valley</strong>, our craft is founded on reverence for the earth’s natural botanicals. We bridge ancient Indian garland-knotting traditions with contemporary packaging and international distribution protocols, transforming unbroken cardamom pods and whole spices into enduring keepsakes.
            </p>
          </div>

          {/* Quick view: every stage at a glance */}
          <ProcessQuickView />

          {/* Detailed timeline */}
          <div className="mt-24 sm:mt-32 text-center max-w-2xl mx-auto">
            <span className="eyebrow text-gold-dark">The full journey</span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl text-emerald-dark tracking-[-0.02em] text-balance">
              Every stage, in detail
            </h2>
          </div>
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
    </div>
  );
}
