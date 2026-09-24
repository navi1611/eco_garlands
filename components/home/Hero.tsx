import React from 'react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/animation/FadeIn';
import Garland3DWrapper from '@/components/home/Garland3DWrapper';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream pt-8 pb-16 lg:py-20 border-b border-gold/15">
      {/* Subtle organic background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-botanical/10 blur-3xl pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <FadeIn direction="up" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/40 bg-gold/10 text-gold-dark">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
                <span className="text-xs font-semibold tracking-[0.2em] uppercase">
                  J The Divine Eco Valley
                </span>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-emerald-dark tracking-tight leading-[1.12]">
                Nature Crafted.{' '}
                <span className="italic font-light text-gold-dark">
                  Tradition Inspired.
                </span>{' '}
                Globally Delivered.
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed max-w-xl">
                Handcrafted natural garlands created from cardamom, nuts, spices
                and carefully selected botanical materials — bringing together
                craftsmanship, culture and nature for celebrations across the
                world.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.4}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button href="/products" variant="secondary" size="lg">
                  Explore Our Garlands
                </Button>
                <Button href="/quote" variant="primary" size="lg">
                  Get a Quote
                </Button>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.5}>
              <div className="pt-6 border-t border-gold/20 flex items-center gap-3">
                <span className="text-xs tracking-[0.2em] uppercase text-charcoal/60 font-medium">
                  Crafted in India • Exporting Worldwide
                </span>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: 3D Animated Cardamom Garland (Client Component) */}
          <div className="lg:col-span-6 relative">
            <Garland3DWrapper />
          </div>
        </div>
      </Container>
    </section>
  );
}
