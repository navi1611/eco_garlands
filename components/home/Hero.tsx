'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Garland3DWrapper from '@/components/home/Garland3DWrapper';
import { ArrowRight, ArrowDown } from 'lucide-react';

const STATS = [
  { value: 'Natural', label: 'Cardamom, nuts & spices' },
  { value: 'Handmade', label: 'Knotted by artisans' },
  { value: 'Global', label: 'Export-ready packaging' },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const modelY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-canvas -mt-20 pt-32 pb-16 lg:pb-24 min-h-[92vh] flex flex-col justify-center"
    >
      {/* Split background: the right half is white, the left stays off-white */}
      <div className="hidden lg:block absolute inset-y-0 right-0 w-[46%] bg-white border-l border-line" />
      <div className="absolute inset-0 bg-grid mask-[radial-gradient(ellipse_at_30%_40%,black_20%,transparent_70%)] pointer-events-none" />

      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Copy */}
          <motion.div style={{ y: textY }} className="lg:col-span-6 lg:pr-8">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="eyebrow text-gold-dark"
            >
              Handcrafted in India
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.08, ease }}
              className="mt-7 font-serif text-[2.75rem] sm:text-6xl xl:text-[5.25rem] font-normal text-emerald-dark tracking-[-0.035em] leading-[1.02] text-balance"
            >
              Nature crafted.{' '}
              <span className="italic text-gold-dark">Tradition</span> inspired.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.18, ease }}
              className="mt-8 text-base sm:text-lg text-charcoal/65 leading-[1.75] max-w-lg text-pretty"
            >
              Natural garlands made from select green cardamom, nuts, aromatic spices and botanical
              materials — generational Indian craftsmanship for celebrations around the world.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.28, ease }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Button
                href="/products"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />}
              >
                Explore the Collection
              </Button>
              <Button href="/quote" variant="secondary" size="lg">
                Request a Quote
              </Button>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.45 }}
              className="mt-14 pt-8 border-t border-line grid grid-cols-3 gap-6 max-w-lg"
            >
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-serif text-xl sm:text-3xl text-emerald-dark tracking-[-0.02em]">
                    {stat.value}
                  </dd>
                  <dd className="mt-1.5 text-xs text-charcoal/50 leading-snug">{stat.label}</dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          {/* 3D garland */}
          <motion.div
            style={{ y: modelY }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease }}
            className="lg:col-span-6 relative"
          >
            <Garland3DWrapper />
          </motion.div>
        </div>

        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="hidden lg:flex mt-6 items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-charcoal/45 hover:text-emerald-dark transition-colors cursor-pointer"
          onClick={() => {
            window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' });
          }}
        >
          <span className="w-9 h-9 rounded-full border border-line-strong flex items-center justify-center">
            <ArrowDown className="w-3.5 h-3.5" />
          </span>
          Scroll
        </motion.button>
      </Container>
    </section>
  );
}
