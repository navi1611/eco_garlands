'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Garland3DWrapper from '@/components/home/Garland3DWrapper';
import { ArrowDown, Sparkles } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax layers
  const bgOrb1Y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const bgOrb2Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const modelY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const particle1Y = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const particle2Y = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const particle3Y = useTransform(scrollYProgress, [0, 1], [0, -220]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-[#FFFEFA] pt-8 pb-16 lg:py-24 border-b border-gold/15 min-h-[90vh] flex flex-col justify-center"
    >
      {/* Parallax Background Glowing Orbs */}
      <motion.div
        style={{ y: bgOrb1Y }}
        className="absolute top-0 right-0 -mr-28 -mt-28 w-[500px] h-[500px] rounded-full bg-linear-to-br from-gold/15 via-gold/5 to-transparent blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: bgOrb2Y }}
        className="absolute bottom-0 left-0 -ml-28 -mb-28 w-[500px] h-[500px] rounded-full bg-linear-to-tr from-botanical/15 via-emerald/5 to-transparent blur-3xl pointer-events-none"
      />

      {/* Parallax Floating Spice & Botanical Badges */}
      <motion.div
        style={{ y: particle1Y }}
        className="hidden md:flex absolute top-24 left-[12%] z-10 items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFEFA]/90 backdrop-blur-md border border-gold/30 shadow-md text-xs text-emerald-dark"
      >
        <span className="text-base">🌿</span>
        <span className="font-serif font-medium">Whole Cardamom</span>
      </motion.div>

      <motion.div
        style={{ y: particle2Y }}
        className="hidden md:flex absolute bottom-28 left-[45%] z-10 items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFEFA]/90 backdrop-blur-md border border-gold/30 shadow-md text-xs text-emerald-dark"
      >
        <span className="text-base">✨</span>
        <span className="font-serif font-medium">Sacred Indian Craft</span>
      </motion.div>

      <motion.div
        style={{ y: particle3Y }}
        className="hidden lg:flex absolute top-36 right-[8%] z-10 items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFEFA]/90 backdrop-blur-md border border-gold/30 shadow-md text-xs text-emerald-dark"
      >
        <Sparkles className="w-3.5 h-3.5 text-gold" />
        <span className="font-serif font-medium">Worldwide Air Export</span>
      </motion.div>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Headline & Copy with Parallax */}
          <motion.div style={{ y: textY }} className="lg:col-span-6 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold-dark shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
              <span className="text-[11px] font-semibold tracking-[0.22em] uppercase">
                J The Divine Eco Valley
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-emerald-dark tracking-tight leading-[1.12]"
            >
              Nature Crafted.{' '}
              <span className="italic font-light text-gold-dark relative">
                Tradition Inspired.
                <span className="absolute left-0 bottom-1 w-full h-[2px] bg-linear-to-r from-gold/0 via-gold/60 to-gold/0" />
              </span>{' '}
              Globally Delivered.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-charcoal/80 leading-relaxed max-w-xl font-normal"
            >
              Handcrafted natural garlands created from select green cardamom, nuts, aromatic spices
              and carefully chosen botanical materials — uniting generational Indian craftsmanship
              and revered rituals for celebrations across the world.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Button href="/products" variant="secondary" size="lg">
                Explore Our Garlands
              </Button>
              <Button href="/quote" variant="primary" size="lg">
                Get a Quote
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-6 border-t border-gold/20 flex flex-wrap items-center gap-6 text-xs tracking-wider uppercase text-charcoal/65 font-medium"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
                Crafted in India
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                Custom Dimensions
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
                Worldwide Transit
              </span>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Interactive Cardamom Garland with Parallax Float */}
          <motion.div style={{ y: modelY }} className="lg:col-span-6 relative">
            <div className="relative rounded-2xl p-2 bg-linear-to-b from-gold/15 via-[#FFFEFA]/50 to-gold/5 border border-gold/25 shadow-xl backdrop-blur-xs">
              <Garland3DWrapper />
            </div>
          </motion.div>
        </div>

        {/* Scroll To Explore Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 flex flex-col items-center justify-center gap-2 text-charcoal/50 hover:text-emerald cursor-pointer transition-colors"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight * 0.85,
              behavior: 'smooth',
            });
          }}
        >
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-gold-dark">
            Scroll to Explore Parallax Journey
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4 text-gold" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
