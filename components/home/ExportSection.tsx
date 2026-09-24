import React from 'react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/animation/FadeIn';

export default function ExportSection() {
  return (
    <section className="py-20 lg:py-28 bg-cream-soft border-b border-gold/15 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Content */}
          <div className="lg:col-span-5 space-y-6">
            <FadeIn direction="right">
              <SectionHeading
                align="left"
                badge="International Delivery"
                title="From Our Craft to the World"
                subtitle="Our handcrafted natural garlands are created with an international outlook, with product consistency, packaging and export requirements considered throughout the process."
              />
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald/10 text-emerald flex items-center justify-center text-sm border border-emerald/20 font-serif">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-serif text-base text-emerald-dark font-medium">
                      Rigid Moisture-Controlled Packaging
                    </h4>
                    <p className="text-xs text-charcoal/70">
                      Shields natural pods and preserves structural form during long-distance transit.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald/10 text-emerald flex items-center justify-center text-sm border border-emerald/20 font-serif">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-serif text-base text-emerald-dark font-medium">
                      Phytosanitary & Cleanliness Focus
                    </h4>
                    <p className="text-xs text-charcoal/70">
                      Thoroughly cleaned, sun-cured, and sorted for international border compliance.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald/10 text-emerald flex items-center justify-center text-sm border border-emerald/20 font-serif">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-serif text-base text-emerald-dark font-medium">
                      Customs & Commercial Coordination
                    </h4>
                    <p className="text-xs text-charcoal/70">
                      Clear documentation and air freight dispatch for event dates and retail orders.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Button href="/quote" variant="primary" size="md">
                  Inquire for Export
                </Button>
                <div className="text-xs uppercase tracking-[0.2em] text-gold-dark font-medium px-3 py-1.5 rounded-full border border-gold/40 bg-gold/10">
                  Made in India • Global Reach
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Animated World Map with Export Routes */}
          <div className="lg:col-span-7">
            <FadeIn direction="left" delay={0.2}>
              <div className="relative p-6 sm:p-8 rounded-sm bg-emerald-dark text-cream border border-gold/30 shadow-xl overflow-hidden">
                {/* Subtle map header */}
                <div className="flex items-center justify-between pb-4 border-b border-gold/20 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-gold animate-ping" />
                    <span className="text-xs uppercase tracking-widest text-gold font-medium">
                      Origin: India
                    </span>
                  </div>
                  <span className="text-[11px] uppercase tracking-wider text-cream/60">
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

                    {/* India Hub Coordinates (~540, 210) */}
                    {/* Export Arc 1: India to Europe/UK */}
                    <path
                      d="M540 210 Q460 120 400 110"
                      stroke="#C9A227"
                      strokeWidth="1.8"
                      strokeDasharray="4 4"
                      className="animate-pulse"
                    />
                    {/* Export Arc 2: India to North America */}
                    <path
                      d="M540 210 Q320 80 180 150"
                      stroke="#C9A227"
                      strokeWidth="1.8"
                      strokeDasharray="4 4"
                    />
                    {/* Export Arc 3: India to Middle East */}
                    <path
                      d="M540 210 Q490 200 460 190"
                      stroke="#6F8F72"
                      strokeWidth="2"
                    />
                    {/* Export Arc 4: India to Southeast Asia */}
                    <path
                      d="M540 210 Q610 240 660 260"
                      stroke="#C9A227"
                      strokeWidth="1.8"
                      strokeDasharray="4 4"
                    />
                    {/* Export Arc 5: India to Oceania / Australia */}
                    <path
                      d="M540 210 Q610 280 660 350"
                      stroke="#6F8F72"
                      strokeWidth="1.8"
                      strokeDasharray="4 4"
                    />

                    {/* Nodes */}
                    {/* Origin Hub: India */}
                    <circle cx="540" cy="210" r="7" fill="#C9A227" />
                    <circle cx="540" cy="210" r="14" stroke="#C9A227" strokeWidth="1.2" opacity="0.6" className="animate-ping origin-center" />

                    {/* Destination Nodes */}
                    <circle cx="400" cy="110" r="4.5" fill="#FFFDF5" />
                    <circle cx="180" cy="150" r="4.5" fill="#FFFDF5" />
                    <circle cx="460" cy="190" r="4" fill="#FFFDF5" />
                    <circle cx="660" cy="260" r="4" fill="#FFFDF5" />
                    <circle cx="660" cy="350" r="4.5" fill="#FFFDF5" />

                    {/* Hub label */}
                    <text x="548" y="215" fill="#C9A227" fontSize="11" fontFamily="serif" fontWeight="bold">
                      INDIA (Origin)
                    </text>
                  </svg>
                </div>

                <div className="mt-4 pt-4 border-t border-gold/20 flex flex-wrap items-center justify-between text-xs text-cream/70">
                  <span>Standard & Express Air Consignments</span>
                  <span className="text-gold">International Specification Compliant</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}
