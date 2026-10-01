'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Leaf, Shapes, Wind, Crown } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';

const STEPS = [
  {
    step: '01',
    title: 'Cardamom',
    subtitle: 'The noble botanical',
    desc: 'Known as the queen of spices, true green cardamom has an iconic ribbed pod, a natural olive hue and an alluring aromatic presence.',
  },
  {
    step: '02',
    title: 'Craftsmanship',
    subtitle: 'Artisan precision',
    desc: 'Each pod is hand-graded for size, firmness and colour before being threaded onto natural fibres alongside nuts and whole spices.',
  },
  {
    step: '03',
    title: 'Garland',
    subtitle: 'Harmonious form',
    desc: 'The finished garland balances symmetry, tactile weight and natural flexibility, with a subtle botanical aroma.',
  },
  {
    step: '04',
    title: 'Celebration',
    subtitle: 'Sacred & festive meaning',
    desc: 'From temple sanctums and wedding stages to welcoming dignitaries, the garland becomes a symbol of joy and reverence.',
  },
];

const ATTRIBUTES = [
  {
    icon: Leaf,
    title: 'Natural Appearance',
    desc: 'Unblemished pods with natural olive and sage variations that reflect their organic origin.',
  },
  {
    icon: Shapes,
    title: 'Distinctive Form',
    desc: 'Tri-lobed geometry interlocks naturally for flexible, even garland curvature.',
  },
  {
    icon: Wind,
    title: 'Aromatic Character',
    desc: 'A gentle, warm spice scent that stays pleasant without synthetic fragrances.',
  },
  {
    icon: Crown,
    title: 'Premium Identity',
    desc: 'Long celebrated as an auspicious ingredient in sacred ceremonies and regal celebrations.',
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function CardamomStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 60%'],
  });
  const progress = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 80,
    damping: 20,
  });

  return (
    <section className="py-24 lg:py-36 bg-canvas/35">
      <Container>
        <SectionHeading
          badge="Botanical Essence"
          title="The soul of our garland"
          subtitle="Green cardamom is the heart of our craft — revered for its distinctive form, ribbed texture, delicate aroma and noble role in ceremonial traditions."
        />

        <div ref={sectionRef} className="mt-20 lg:mt-24 relative">
          {/* Progress rail */}
          <div className="hidden lg:block absolute top-0 left-0 right-0 h-px bg-line">
            <motion.div
              style={{ scaleX: progress }}
              className="h-full w-full bg-gold origin-left"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-line lg:bg-transparent border border-line lg:border-0 rounded-2xl lg:rounded-none overflow-hidden">
            {STEPS.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease }}
                className="bg-canvas p-8 lg:pt-12 lg:px-8 lg:pb-0"
              >
                <span className="font-serif text-sm text-gold-dark tabular-nums">{step.step}</span>
                <h3 className="mt-6 font-serif text-[1.75rem] text-emerald-dark tracking-[-0.01em]">
                  {step.title}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-charcoal/45">
                  {step.subtitle}
                </p>
                <p className="mt-5 text-[15px] text-charcoal/60 leading-[1.75]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quality attributes */}
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ATTRIBUTES.map((attr, idx) => {
            const Icon = attr.icon;
            return (
              <motion.div
                key={attr.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.06, ease }}
                className="group p-7 rounded-2xl bg-white border border-line transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
              >
                <Icon className="w-5 h-5 text-gold-dark" strokeWidth={1.5} />
                <h4 className="mt-6 font-serif text-xl text-emerald-dark">{attr.title}</h4>
                <p className="mt-2.5 text-sm text-charcoal/55 leading-[1.7]">{attr.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
