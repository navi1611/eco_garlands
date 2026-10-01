'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function HomeCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const glowScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.3]);
  const contentY = useTransform(scrollYProgress, [0, 1], [30, -20]);

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-emerald-dark text-cream relative overflow-hidden border-t border-gold/30"
    >
      {/* Decorative ambient backdrop with parallax expansion */}
      <motion.div
        style={{ scale: glowScale }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gold/10 blur-3xl pointer-events-none"
      />

      <Container size="narrow">
        <motion.div style={{ y: contentY }} className="text-center space-y-8 relative z-10">
          <div>
            <span className="inline-block text-xs uppercase tracking-[0.25em] font-semibold text-gold mb-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10">
              Start Your Request
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-cream tracking-tight leading-[1.2]">
            Bring Nature Into Your Next Celebration
          </h2>

          <p className="text-base sm:text-lg text-cream/80 max-w-xl mx-auto leading-relaxed font-normal">
            Tell us what you are looking for and our team will help you find the
            right natural garland for your occasion, quantity, custom dimensions, and destination.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button href="/quote" variant="primary" size="lg">
              Request a Quote
            </Button>
            <Button href="/products" variant="gold-outline" size="lg">
              Explore Products
            </Button>
          </div>

          <p className="text-xs uppercase tracking-widest text-gold-light/70 font-medium">
            Handcrafted with devotion • Global dispatch coordination
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
