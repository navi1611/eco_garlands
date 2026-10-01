'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Plane, ShieldCheck, Package } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import ExportRouteMap from '@/components/home/ExportRouteMap';

const FEATURES = [
  {
    icon: Package,
    title: 'Moisture-controlled packaging',
    desc: 'Rigid packaging shields natural pods and preserves form during long-distance transit.',
  },
  {
    icon: ShieldCheck,
    title: 'Phytosanitary focus',
    desc: 'Thoroughly cleaned, sun-cured and sorted for international border compliance.',
  },
  {
    icon: Plane,
    title: 'Customs coordination',
    desc: 'Clear documentation and air freight dispatch for event dates and retail orders.',
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function ExportSection() {
  return (
    <section className="py-24 lg:py-36 bg-white/45 border-y border-line/60">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <SectionHeading
              align="left"
              badge="International Delivery"
              title="From our craft to the world"
              subtitle="Every garland is made with an international outlook — consistency, packaging and export requirements are considered throughout the process."
            />

            <ul className="mt-12 space-y-8">
              {FEATURES.map((f) => {
                const Icon = f.icon;
                return (
                  <li key={f.title} className="flex items-start gap-5">
                    <span className="w-11 h-11 rounded-full border border-line flex items-center justify-center shrink-0 text-emerald">
                      <Icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
                    </span>
                    <div>
                      <h4 className="font-medium text-[15px] text-emerald-dark">{f.title}</h4>
                      <p className="mt-1 text-sm text-charcoal/55 leading-[1.7]">{f.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-12">
              <Button
                href="/quote"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />}
              >
                Enquire for Export
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease }}
            className="lg:col-span-7"
          >
            <div className="relative p-6 sm:p-10 rounded-3xl bg-canvas border border-line text-emerald-dark overflow-hidden shadow-[var(--shadow-lift)]">
              <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
              <div className="relative flex items-center justify-between pb-6 border-b border-line mb-6">
                <span className="text-[11px] uppercase tracking-[0.24em] text-gold-dark">
                  Origin — Coimbatore, India
                </span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-charcoal/45">
                  Global dispatch
                </span>
              </div>

              <div className="relative">
                <ExportRouteMap />
              </div>

              <div className="relative mt-6 pt-6 border-t border-line flex flex-wrap items-center justify-between gap-3 text-xs text-charcoal/55">
                <span>Standard & express air consignments</span>
                <span className="text-gold-dark">Phytosanitary export compliant</span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
