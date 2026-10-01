'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { APPLICATION_LIST } from './ApplicationsData';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Applications() {
  return (
    <section className="py-24 lg:py-36 bg-canvas/35">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <SectionHeading
            align="left"
            badge="Enduring Traditions"
            title="Designed for meaningful moments"
          />
          <p className="text-[15px] text-charcoal/60 leading-[1.75] max-w-sm">
            The many occasions where our natural cardamom and spice garlands bring elegance,
            dignity and sensory presence.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-line">
          {APPLICATION_LIST.map((app, idx) => {
            const Icon = app.icon;
            return (
              <motion.div
                key={app.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, delay: (idx % 3) * 0.08, ease }}
                className="border-r border-b border-line"
              >
                <Link
                  href={app.href}
                  className="group relative flex flex-col h-full p-8 sm:p-10 bg-canvas hover:bg-white transition-colors duration-500"
                >
                  <div className="flex items-center justify-between">
                    <Icon
                      className="w-6 h-6 text-emerald transition-colors duration-300 group-hover:text-gold-dark"
                      strokeWidth={1.4}
                    />
                    <ArrowUpRight className="w-4 h-4 text-charcoal/25 transition-all duration-300 group-hover:text-emerald-dark group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <h3 className="mt-12 font-serif text-2xl text-emerald-dark tracking-[-0.01em]">
                    {app.title}
                  </h3>
                  <span className="mt-1.5 text-[11px] uppercase tracking-[0.18em] text-gold-dark">
                    {app.tagline}
                  </span>
                  <p className="mt-4 text-sm text-charcoal/55 leading-[1.75]">{app.description}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
