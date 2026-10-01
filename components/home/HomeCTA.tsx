'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function HomeCTA() {
  return (
    <section className="py-24 lg:py-32 bg-canvas/35">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] bg-white border border-line px-6 py-20 sm:px-16 lg:py-28 text-center"
        >
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[420px] rounded-full bg-gold/10 blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(19,59,45,0.07)_1px,transparent_0)] bg-size-[28px_28px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <span className="eyebrow text-gold-dark">Start your request</span>
            <h2 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-emerald-dark tracking-[-0.03em] leading-[1.05] text-balance">
              Bring nature into your next celebration
            </h2>
            <p className="mt-6 text-base sm:text-lg text-charcoal/60 leading-[1.75] text-pretty">
              Tell us about your occasion, quantity, dimensions and destination — our team will help
              you find the right natural garland.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button
                href="/quote"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />}
              >
                Request a Quote
              </Button>
              <Button href="/products" variant="secondary" size="lg">
                Explore Products
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
