'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';

export default function BrandIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const quoteY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const pillar0Y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const pillar1Y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const pillar2Y = useTransform(scrollYProgress, [0, 1], [70, -70]);

  const pillars = [
    {
      title: 'Natural Materials',
      desc: 'Selected cardamom pods, whole aromatic spices, nuts, and sustainable botanical cords harvested with care.',
      icon: '🌿',
      y: pillar0Y,
    },
    {
      title: 'Handcrafted',
      desc: 'Formed by skilled artisans preserving generational Indian knotting, weaving, and ceremonial garland techniques.',
      icon: '✨',
      y: pillar1Y,
    },
    {
      title: 'Export Ready',
      desc: 'Engineered for international transit integrity, uniform presentation, and international phytosanitary compliance.',
      icon: '🌐',
      y: pillar2Y,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-[#F9F7EE] border-b border-gold/15 relative overflow-hidden"
    >
      {/* Parallax background watermark */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        className="absolute -right-20 top-1/4 text-[220px] font-serif text-gold/5 select-none pointer-events-none leading-none font-bold"
      >
        DIVINE
      </motion.div>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Philosophy */}
          <motion.div style={{ y: quoteY }} className="lg:col-span-6 space-y-6">
            <SectionHeading
              align="left"
              badge="The Philosophy"
              title="Where Nature Becomes a Celebration"
              subtitle="J The Divine Eco Valley transforms naturally sourced ingredients such as cardamom, nuts and spices into distinctive handcrafted garlands designed for ceremonies, weddings, homes, cultural events, celebrations and gifting."
            />

            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="p-8 bg-[#FFFEFA] rounded-xl border border-gold/30 shadow-md relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-bl from-gold/15 to-transparent rounded-bl-full pointer-events-none" />
              <div className="text-3xl text-gold/60 mb-2 font-serif select-none">“</div>
              <blockquote className="font-serif italic text-lg sm:text-xl text-emerald-dark leading-relaxed">
                Every seed, pod, and spice bead carries an organic rhythm. Our purpose is to elevate
                these gifts of the earth into sacred, celebratory keepsakes that travel gracefully
                across borders.
              </blockquote>
              <div className="mt-4 pt-4 border-t border-gold/15 flex items-center justify-between text-xs text-charcoal/60">
                <span className="font-serif font-medium text-emerald-dark">Master Artisan Guild</span>
                <span className="text-gold-dark font-medium tracking-wider uppercase">J The Divine Eco Valley</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Three Brand Pillars with Parallax Stagger */}
          <div className="lg:col-span-6 space-y-6">
            {pillars.map((pillar) => (
              <motion.div
                key={pillar.title}
                style={{ y: pillar.y }}
                whileHover={{ scale: 1.02, x: 4 }}
                transition={{ duration: 0.25 }}
                className="flex items-start gap-5 p-6 sm:p-7 bg-[#FFFEFA] rounded-xl border border-gold/25 hover:border-gold/60 transition-all shadow-xs hover:shadow-lg group cursor-default"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald/10 text-emerald flex items-center justify-center text-2xl shrink-0 border border-emerald/20 group-hover:bg-gold/15 group-hover:border-gold/40 transition-colors">
                  {pillar.icon}
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-emerald-dark group-hover:text-emerald transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm text-charcoal/80 leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
