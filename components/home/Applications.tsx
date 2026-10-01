'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { APPLICATION_LIST } from './ApplicationsData';

export default function Applications() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const yOffset = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-[#FFFEFA] border-b border-gold/15 overflow-hidden relative"
    >
      <Container>
        <SectionHeading
          badge="Enduring Traditions"
          title="Designed to Be Part of Meaningful Moments"
          subtitle="Explore the multifaceted contexts where our natural cardamom and spice garlands bring elegance, dignity, and sensory presence."
        />

        <motion.div
          style={{ y: yOffset }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {APPLICATION_LIST.map((app) => (
            <motion.div
              key={app.title}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.25 }}
            >
              <Link
                href={app.href}
                className="group block p-6 sm:p-7 bg-[#F9F7EE] rounded-xl border border-gold/25 hover:border-gold/60 transition-all shadow-xs hover:shadow-lg h-full relative overflow-hidden"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl p-3 rounded-lg bg-[#FFFEFA] border border-gold/25 shadow-2xs group-hover:scale-110 group-hover:border-gold/60 transition-all">
                    {app.icon}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-medium text-emerald-dark group-hover:text-emerald transition-colors">
                      {app.title}
                    </h3>
                    <span className="text-xs uppercase tracking-wider text-gold-dark font-semibold block mt-1">
                      {app.tagline}
                    </span>
                    <p className="mt-2.5 text-sm text-charcoal/75 leading-relaxed font-normal">
                      {app.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
