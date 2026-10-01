'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Plane, ShieldCheck, Package } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';

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
    <section className="py-24 lg:py-36 bg-white border-y border-line">
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
                  Origin — India
                </span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-charcoal/45">
                  Global dispatch
                </span>
              </div>

              <div className="relative w-full aspect-16/10">
                <svg
                  viewBox="0 0 800 480"
                  className="w-full h-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Simplified continent outlines */}
                  <g fill="#E4E8DF" stroke="#CDD5C7" strokeWidth="0.8">
                    {/* North America */}
                    <path d="M120 100 Q180 80 220 120 Q240 180 200 240 Q160 220 130 180 Z" opacity="0.6" />
                    {/* South America */}
                    <path d="M220 270 Q260 290 250 380 Q210 400 200 320 Z" opacity="0.6" />
                    {/* Europe */}
                    <path d="M380 90 Q440 80 460 130 Q420 160 380 140 Z" opacity="0.6" />
                    {/* Africa */}
                    <path d="M390 180 Q460 180 470 290 Q430 360 390 280 Z" opacity="0.6" />
                    {/* Asia / India (prominent) */}
                    <path d="M500 110 Q620 90 680 180 Q620 280 540 240 Q500 210 480 150 Z" opacity="0.7" />
                    {/* Australia */}
                    <path d="M640 310 Q710 320 700 390 Q630 400 620 340 Z" opacity="0.6" />
                  </g>

                  {/* Flight paths */}
                  <path
                    d="M540 210 Q460 120 400 110"
                    stroke="#A9884F"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                   
                  />
                  <path
                    d="M540 210 Q320 80 180 150"
                    stroke="#A9884F"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  <path
                    d="M540 210 Q490 200 460 190"
                    stroke="#5B7765"
                    strokeWidth="2.2"
                  />
                  <path
                    d="M540 210 Q610 240 660 260"
                    stroke="#A9884F"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  <path
                    d="M540 210 Q610 280 660 350"
                    stroke="#5B7765"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />

                  {/* Origin Hub: India */}
                  <circle cx="540" cy="210" r="8" fill="#A9884F" />
                  <circle cx="540" cy="210" r="16" stroke="#A9884F" strokeWidth="1.5" opacity="0.5" />

                  {/* Destination Nodes */}
                  <circle cx="400" cy="110" r="5" fill="#133B2D" />
                  <circle cx="180" cy="150" r="5" fill="#133B2D" />
                  <circle cx="460" cy="190" r="4.5" fill="#133B2D" />
                  <circle cx="660" cy="260" r="4.5" fill="#133B2D" />
                  <circle cx="660" cy="350" r="5" fill="#133B2D" />

                  {/* Hub label */}
                  <text x="552" y="215" fill="#A9884F" fontSize="12" fontFamily="serif" letterSpacing="2">
                    INDIA
                  </text>
                  <text x="186" y="145" fill="#133B2D" fontSize="10" fontFamily="sans-serif">
                    USA / Canada
                  </text>
                  <text x="406" y="105" fill="#133B2D" fontSize="10" fontFamily="sans-serif">
                    UK / Europe
                  </text>
                  <text x="466" y="185" fill="#133B2D" fontSize="10" fontFamily="sans-serif">
                    UAE / GCC
                  </text>
                  <text x="666" y="255" fill="#133B2D" fontSize="10" fontFamily="sans-serif">
                    Singapore / SE Asia
                  </text>
                  <text x="666" y="345" fill="#133B2D" fontSize="10" fontFamily="sans-serif">
                    Australia
                  </text>
                </svg>
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
