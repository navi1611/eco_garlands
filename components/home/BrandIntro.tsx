import React from 'react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import FadeIn from '@/components/animation/FadeIn';

export default function BrandIntro() {
  const pillars = [
    {
      title: 'Natural Materials',
      desc: 'Selected cardamom pods, whole aromatic spices, nuts, and sustainable botanical cords harvested with care.',
      icon: '🌿',
    },
    {
      title: 'Handcrafted',
      desc: 'Formed by skilled artisans preserving generational Indian knotting, weaving, and ceremonial garland techniques.',
      icon: '✨',
    },
    {
      title: 'Export Ready',
      desc: 'Engineered for international transit integrity, uniform presentation, and international phytosanitary compliance.',
      icon: '🌐',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-cream-soft border-b border-gold/15">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Philosophy */}
          <div className="lg:col-span-6 space-y-6">
            <FadeIn direction="right">
              <SectionHeading
                align="left"
                badge="The Philosophy"
                title="Where Nature Becomes a Celebration"
                subtitle="J The Divine Eco Valley transforms naturally sourced ingredients such as cardamom, nuts and spices into distinctive handcrafted garlands designed for ceremonies, weddings, homes, cultural events, celebrations and gifting."
              />
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <div className="p-6 bg-cream rounded-sm border border-gold/20 shadow-xs">
                <blockquote className="font-serif italic text-lg text-emerald-dark leading-relaxed">
                  “Every seed, pod, and spice bead carries an organic rhythm. Our purpose is to elevate these gifts of the earth into sacred, celebratory keepsakes that travel gracefully across borders.”
                </blockquote>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Three Brand Pillars */}
          <div className="lg:col-span-6 space-y-6">
            {pillars.map((pillar, idx) => (
              <FadeIn key={pillar.title} direction="left" delay={0.15 * idx}>
                <div className="flex items-start gap-5 p-6 bg-cream rounded-sm border border-gold/20 hover:border-gold/50 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-emerald/10 text-emerald flex items-center justify-center text-xl shrink-0 border border-emerald/20">
                    {pillar.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-medium text-emerald-dark">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm text-charcoal/80 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
