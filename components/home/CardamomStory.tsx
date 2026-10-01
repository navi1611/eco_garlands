'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { Sparkles } from 'lucide-react';

export default function CardamomStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const pathProgress = useSpring(useTransform(scrollYProgress, [0.2, 0.75], [0, 1]), {
    stiffness: 80,
    damping: 20,
  });

  const card0Y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const card1Y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const card2Y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const card3Y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const transformationSteps = [
    {
      step: '01',
      title: 'CARDAMOM',
      subtitle: 'The Noble Botanical',
      desc: 'Known as the queen of spices, true green cardamom pods possess an iconic tri-lobed ribbed pod, a natural olive hue, and an alluring aromatic presence.',
      accent: 'Raw botanical perfection',
      y: card0Y,
    },
    {
      step: '02',
      title: 'CRAFTSMANSHIP',
      subtitle: 'Artisan Precision',
      desc: 'Each pod is hand-graded for size, firmness, and color consistency before being painstakingly threaded onto organic fibers alongside natural nuts and whole spices.',
      accent: 'Generational Indian knotting',
      y: card1Y,
    },
    {
      step: '03',
      title: 'GARLAND',
      subtitle: 'Harmonious Form',
      desc: 'The completed garland balances symmetry, tactile weight, and natural structural flexibility, radiating timeless visual poise and a subtle botanical aroma.',
      accent: 'Mastery in structure & balance',
      y: card2Y,
    },
    {
      step: '04',
      title: 'CELEBRATION',
      subtitle: 'Sacred & Festive Meaning',
      desc: 'From sacred temple sanctums and royal wedding stages to welcoming international dignitaries, the garland becomes an indelible symbol of joy and reverence.',
      accent: 'Meaningful global moments',
      y: card3Y,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-[#FFFEFA] border-b border-gold/15 overflow-hidden relative"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-linear-to-r from-gold/5 via-botanical/5 to-gold/5 blur-3xl pointer-events-none" />

      <Container>
        <SectionHeading
          badge="Botanical Essence"
          title="The Soul of Our Garland"
          subtitle="Discover why green cardamom is the heart of our craft — revered for its distinctive form, ribbed texture, delicate aroma, and noble role in ceremonial traditions."
        />

        {/* Visual Transformation Flow with Parallax */}
        <div className="mt-16 lg:mt-24 relative">
          {/* Scroll-animated connecting line on desktop */}
          <div className="hidden lg:block absolute top-14 left-16 right-16 h-1 bg-gold/20 rounded-full z-0 overflow-hidden">
            <motion.div
              style={{ scaleX: pathProgress }}
              className="h-full w-full bg-linear-to-r from-gold-light via-gold to-emerald origin-left"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {transformationSteps.map((step) => (
              <motion.div
                key={step.step}
                style={{ y: step.y }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="bg-[#F9F7EE] p-7 sm:p-8 rounded-xl border border-gold/30 hover:border-gold/70 transition-all flex flex-col justify-between shadow-xs hover:shadow-xl group"
              >
                <div>
                  {/* Step indicator */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-12 h-12 rounded-full bg-linear-to-br from-emerald to-emerald-dark text-[#FFFEFA] font-serif text-base font-semibold flex items-center justify-center border-2 border-gold/40 shadow-sm group-hover:scale-110 transition-transform">
                      {step.step}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-gold-dark font-semibold px-2 py-0.5 rounded-full bg-gold/10 border border-gold/30">
                      {step.accent}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-medium tracking-wide text-emerald-dark mt-2 group-hover:text-emerald transition-colors">
                    {step.title}
                  </h3>
                  <h4 className="text-xs uppercase tracking-wider text-charcoal/60 mt-1 font-semibold">
                    {step.subtitle}
                  </h4>

                  <p className="mt-4 text-sm text-charcoal/80 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-gold/15 flex items-center gap-1.5 text-xs text-gold-dark font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Artisan Certified</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Botanical Quality Attributes */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-gold/20">
          <motion.div
            whileHover={{ y: -3 }}
            className="p-5 rounded-lg bg-[#F9F7EE]/60 border border-gold/20 hover:border-gold/50 transition-all text-center sm:text-left"
          >
            <span className="text-2xl mb-2 block">🌿</span>
            <h4 className="font-serif text-lg text-emerald-dark font-medium">Natural Appearance</h4>
            <p className="text-xs text-charcoal/70 mt-1.5 leading-relaxed">
              Unblemished pods with natural olive and sage variations that reflect pure organic origin.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            className="p-5 rounded-lg bg-[#F9F7EE]/60 border border-gold/20 hover:border-gold/50 transition-all text-center sm:text-left"
          >
            <span className="text-2xl mb-2 block">📐</span>
            <h4 className="font-serif text-lg text-emerald-dark font-medium">Distinctive Form</h4>
            <p className="text-xs text-charcoal/70 mt-1.5 leading-relaxed">
              Tri-lobed geometry provides ideal structural interlocking for flexible garland curvature.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            className="p-5 rounded-lg bg-[#F9F7EE]/60 border border-gold/20 hover:border-gold/50 transition-all text-center sm:text-left"
          >
            <span className="text-2xl mb-2 block">✨</span>
            <h4 className="font-serif text-lg text-emerald-dark font-medium">Aromatic Character</h4>
            <p className="text-xs text-charcoal/70 mt-1.5 leading-relaxed">
              Emits a gentle, natural warm spice scent that stays pleasant without synthetic fragrances.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            className="p-5 rounded-lg bg-[#F9F7EE]/60 border border-gold/20 hover:border-gold/50 transition-all text-center sm:text-left"
          >
            <span className="text-2xl mb-2 block">👑</span>
            <h4 className="font-serif text-lg text-emerald-dark font-medium">Premium Identity</h4>
            <p className="text-xs text-charcoal/70 mt-1.5 leading-relaxed">
              Long celebrated as an auspicious ingredient in sacred ceremonies and regal celebrations.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
