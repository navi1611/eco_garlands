'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Hand, Globe2 } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';

const PILLARS = [
  {
    title: 'Natural Materials',
    desc: 'Selected cardamom pods, whole aromatic spices, nuts and sustainable botanical cords harvested with care.',
    icon: Leaf,
  },
  {
    title: 'Handcrafted',
    desc: 'Formed by skilled artisans preserving generational Indian knotting, weaving and ceremonial garland techniques.',
    icon: Hand,
  },
  {
    title: 'Export Ready',
    desc: 'Engineered for transit integrity, uniform presentation and international phytosanitary compliance.',
    icon: Globe2,
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function BrandIntro() {
  return (
    <section className="py-24 lg:py-36 bg-white border-y border-line">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
            <SectionHeading
              align="left"
              badge="The Philosophy"
              title="Where nature becomes a celebration"
              subtitle="We transform naturally sourced cardamom, nuts and spices into distinctive handcrafted garlands for ceremonies, weddings, homes, cultural events and gifting."
            />

            <figure className="mt-12 pl-6 border-l border-gold/60">
              <blockquote className="font-serif italic text-xl text-emerald-dark leading-[1.6]">
                “Every seed, pod and spice bead carries an organic rhythm. Our purpose is to elevate
                these gifts of the earth into keepsakes that travel gracefully across borders.”
              </blockquote>
              <figcaption className="mt-5 text-xs uppercase tracking-[0.2em] text-charcoal/45">
                Master Artisan Guild
              </figcaption>
            </figure>
          </div>

          <div className="lg:col-span-7 divide-y divide-line border-y border-line">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.8, delay: idx * 0.08, ease }}
                  className="group grid grid-cols-[auto_1fr] sm:grid-cols-[4rem_auto_1fr] gap-6 sm:gap-8 py-10 items-start"
                >
                  <span className="hidden sm:block font-serif text-sm text-charcoal/35 pt-2 tabular-nums">
                    0{idx + 1}
                  </span>
                  <span className="w-12 h-12 rounded-full border border-line flex items-center justify-center text-emerald transition-colors duration-300 group-hover:bg-sage group-hover:border-sage-line">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </span>
                  <div className="col-span-2 sm:col-span-1">
                    <h3 className="font-serif text-2xl sm:text-[1.75rem] text-emerald-dark tracking-[-0.01em]">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-[15px] text-charcoal/60 leading-[1.75] max-w-md">
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
