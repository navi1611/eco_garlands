'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { Check, Plane, Globe2, ShieldCheck, Box } from 'lucide-react';

export default function ExportSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const mapY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-[#F9F7EE] border-b border-gold/15 overflow-hidden relative"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Content with Parallax */}
          <motion.div style={{ y: textY }} className="lg:col-span-5 space-y-6">
            <SectionHeading
              align="left"
              badge="International Delivery"
              title="From Our Craft to the World"
              subtitle="Our handcrafted natural garlands are created with an international outlook, with product consistency, packaging and export requirements considered throughout the process."
            />

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-3.5 rounded-lg bg-[#FFFEFA] border border-gold/20 shadow-2xs">
                <div className="w-9 h-9 rounded-full bg-emerald/10 text-emerald flex items-center justify-center shrink-0 border border-emerald/20">
                  <Box className="w-4 h-4 text-emerald" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-emerald-dark font-medium">
                    Rigid Moisture-Controlled Packaging
                  </h4>
                  <p className="text-xs text-charcoal/70 mt-0.5 leading-relaxed">
                    Shields natural pods and preserves structural form during long-distance transit.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-lg bg-[#FFFEFA] border border-gold/20 shadow-2xs">
                <div className="w-9 h-9 rounded-full bg-emerald/10 text-emerald flex items-center justify-center shrink-0 border border-emerald/20">
                  <ShieldCheck className="w-4 h-4 text-emerald" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-emerald-dark font-medium">
                    Phytosanitary & Cleanliness Focus
                  </h4>
                  <p className="text-xs text-charcoal/70 mt-0.5 leading-relaxed">
                    Thoroughly cleaned, sun-cured, and sorted for international border compliance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-lg bg-[#FFFEFA] border border-gold/20 shadow-2xs">
                <div className="w-9 h-9 rounded-full bg-emerald/10 text-emerald flex items-center justify-center shrink-0 border border-emerald/20">
                  <Plane className="w-4 h-4 text-emerald" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-emerald-dark font-medium">
                    Customs & Commercial Coordination
                  </h4>
                  <p className="text-xs text-charcoal/70 mt-0.5 leading-relaxed">
                    Clear documentation and air freight dispatch for event dates and retail orders.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <Button href="/quote" variant="primary" size="md">
                Inquire for Export
              </Button>
              <div className="text-xs uppercase tracking-[0.2em] text-gold-dark font-semibold px-3.5 py-2 rounded-full border border-gold/40 bg-gold/10 flex items-center gap-2">
                <Globe2 className="w-3.5 h-3.5" />
                <span>Made in India • Global Reach</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Animated World Map with Parallax */}
          <motion.div style={{ y: mapY }} className="lg:col-span-7">
            <div className="relative p-6 sm:p-8 rounded-2xl bg-linear-to-b from-emerald-dark via-[#0d3326] to-emerald-dark text-cream border border-gold/30 shadow-2xl overflow-hidden">
              {/* Subtle map header */}
              <div className="flex items-center justify-between pb-4 border-b border-gold/20 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-gold animate-ping" />
                  <span className="text-xs uppercase tracking-widest text-gold font-semibold">
                    Origin: India
                  </span>
                </div>
                <span className="text-[11px] uppercase tracking-wider text-cream/70 font-medium">
                  Trans-Continental Botanical Transit
                </span>
              </div>

              {/* Animated SVG Graphic with Curving Emerald & Gold Flight Paths */}
              <div className="relative w-full aspect-16/10">
                <svg
                  viewBox="0 0 800 480"
                  className="w-full h-full text-botanical/30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Simplified continent outlines */}
                  <g fill="#164A36" stroke="#235F47" strokeWidth="0.8">
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
                    stroke="#C9A227"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    className="animate-pulse"
                  />
                  <path
                    d="M540 210 Q320 80 180 150"
                    stroke="#C9A227"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  <path
                    d="M540 210 Q490 200 460 190"
                    stroke="#6F8F72"
                    strokeWidth="2.2"
                  />
                  <path
                    d="M540 210 Q610 240 660 260"
                    stroke="#C9A227"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  <path
                    d="M540 210 Q610 280 660 350"
                    stroke="#6F8F72"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />

                  {/* Origin Hub: India */}
                  <circle cx="540" cy="210" r="8" fill="#C9A227" />
                  <circle cx="540" cy="210" r="16" stroke="#C9A227" strokeWidth="1.5" opacity="0.6" className="animate-ping origin-center" />

                  {/* Destination Nodes */}
                  <circle cx="400" cy="110" r="5" fill="#FFFDF5" />
                  <circle cx="180" cy="150" r="5" fill="#FFFDF5" />
                  <circle cx="460" cy="190" r="4.5" fill="#FFFDF5" />
                  <circle cx="660" cy="260" r="4.5" fill="#FFFDF5" />
                  <circle cx="660" cy="350" r="5" fill="#FFFDF5" />

                  {/* Hub label */}
                  <text x="552" y="215" fill="#C9A227" fontSize="12" fontFamily="serif" fontWeight="bold">
                    INDIA (Workshop & Export Desk)
                  </text>
                  <text x="186" y="145" fill="#FFFDF5" fontSize="10" fontFamily="sans-serif">
                    USA / Canada
                  </text>
                  <text x="406" y="105" fill="#FFFDF5" fontSize="10" fontFamily="sans-serif">
                    UK / Europe
                  </text>
                  <text x="466" y="185" fill="#FFFDF5" fontSize="10" fontFamily="sans-serif">
                    UAE / GCC
                  </text>
                  <text x="666" y="255" fill="#FFFDF5" fontSize="10" fontFamily="sans-serif">
                    Singapore / SE Asia
                  </text>
                  <text x="666" y="345" fill="#FFFDF5" fontSize="10" fontFamily="sans-serif">
                    Australia
                  </text>
                </svg>
              </div>

              <div className="mt-4 pt-4 border-t border-gold/20 flex flex-wrap items-center justify-between text-xs text-cream/80">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-gold" /> Standard & Express Air Consignments
                </span>
                <span className="text-gold font-medium">
                  Phytosanitary Export Compliant
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
