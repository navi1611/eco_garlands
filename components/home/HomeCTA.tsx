import React from 'react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/animation/FadeIn';

export default function HomeCTA() {
  return (
    <section className="py-20 lg:py-28 bg-emerald-dark text-cream relative overflow-hidden border-t border-gold/30">
      {/* Decorative ambient backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <Container size="narrow">
        <div className="text-center space-y-8 relative z-10">
          <FadeIn direction="up">
            <span className="inline-block text-xs uppercase tracking-[0.25em] font-semibold text-gold mb-2 px-3.5 py-1 rounded-full border border-gold/30 bg-gold/10">
              Start Your Request
            </span>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-cream tracking-tight leading-[1.2]">
              Bring Nature Into Your Next Celebration
            </h2>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="text-base sm:text-lg text-cream/80 max-w-xl mx-auto leading-relaxed">
              Tell us what you are looking for and our team will help you find the
              right natural garland for your occasion, quantity and market.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button href="/quote" variant="primary" size="lg">
                Request a Quote
              </Button>
              <Button href="/products" variant="gold-outline" size="lg">
                Explore Products
              </Button>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
