import React from 'react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import FadeIn from '@/components/animation/FadeIn';

export default function CardamomStory() {
  const transformationSteps = [
    {
      step: '01',
      title: 'CARDAMOM',
      subtitle: 'The Noble Botanical',
      desc: 'Known as the queen of spices, true green cardamom pods possess an iconic tri-lobed ribbed pod, a natural olive hue, and an alluring aromatic presence.',
      accent: 'Raw botanical perfection',
    },
    {
      step: '02',
      title: 'CRAFTSMANSHIP',
      subtitle: 'Artisan Precision',
      desc: 'Each pod is hand-graded for size, firmness, and color consistency before being painstakingly threaded onto organic fibers alongside natural nuts and whole spices.',
      accent: 'Generational Indian knotting',
    },
    {
      step: '03',
      title: 'GARLAND',
      subtitle: 'Harmonious Form',
      desc: 'The completed garland balances symmetry, tactile weight, and natural structural flexibility, radiating timeless visual poise and a subtle botanical aroma.',
      accent: 'Mastery in structure & balance',
    },
    {
      step: '04',
      title: 'CELEBRATION',
      subtitle: 'Sacred & Festive Meaning',
      desc: 'From sacred temple sanctums and royal wedding stages to welcoming international dignitaries, the garland becomes an indelible symbol of joy and reverence.',
      accent: 'Meaningful global moments',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-cream border-b border-gold/15 overflow-hidden">
      <Container>
        <SectionHeading
          badge="Botanical Essence"
          title="The Soul of Our Garland"
          subtitle="Discover why green cardamom is the heart of our craft — revered for its distinctive form, ribbed texture, delicate aroma, and noble role in ceremonial traditions."
        />

        {/* Visual Transformation Flow: CARDAMOM → CRAFTSMANSHIP → GARLAND → CELEBRATION */}
        <div className="mt-16 lg:mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting ornamental horizontal line on desktop */}
            <div className="hidden lg:block absolute top-12 left-12 right-12 h-px bg-linear-to-r from-gold/20 via-gold/60 to-gold/20 z-0" />

            {transformationSteps.map((step, idx) => (
              <FadeIn
                key={step.step}
                direction="up"
                delay={0.15 * idx}
                className="relative z-10 flex flex-col h-full"
              >
                <div className="bg-cream-soft p-6 sm:p-8 rounded-sm border border-gold/20 hover:border-gold/60 transition-all duration-300 flex-1 flex flex-col justify-between shadow-xs">
                  <div>
                    {/* Step indicator */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-10 h-10 rounded-full bg-emerald text-cream font-serif text-sm font-semibold flex items-center justify-center border border-gold/40">
                        {step.step}
                      </span>
                      <span className="text-[11px] uppercase tracking-widest text-gold-dark font-medium">
                        {step.accent}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-medium tracking-wide text-emerald-dark mt-2">
                      {step.title}
                    </h3>
                    <h4 className="text-xs uppercase tracking-wider text-charcoal/60 mt-1 font-medium">
                      {step.subtitle}
                    </h4>

                    <p className="mt-4 text-sm text-charcoal/80 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {idx < transformationSteps.length - 1 && (
                    <div className="lg:hidden mt-6 flex justify-center text-gold">
                      ↓
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Botanical Quality Attributes */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-gold/20">
          <div className="text-center sm:text-left">
            <h4 className="font-serif text-lg text-emerald-dark">Natural Appearance</h4>
            <p className="text-xs text-charcoal/70 mt-1 leading-relaxed">
              Unblemished pods with natural olive and sage variations that reflect pure organic origin.
            </p>
          </div>
          <div className="text-center sm:text-left">
            <h4 className="font-serif text-lg text-emerald-dark">Distinctive Form</h4>
            <p className="text-xs text-charcoal/70 mt-1 leading-relaxed">
              Tri-lobed geometry provides ideal structural interlocking for flexible garland curvature.
            </p>
          </div>
          <div className="text-center sm:text-left">
            <h4 className="font-serif text-lg text-emerald-dark">Aromatic Character</h4>
            <p className="text-xs text-charcoal/70 mt-1 leading-relaxed">
              Emits a gentle, natural warm spice scent that stays pleasant without synthetic fragrances.
            </p>
          </div>
          <div className="text-center sm:text-left">
            <h4 className="font-serif text-lg text-emerald-dark">Premium Identity</h4>
            <p className="text-xs text-charcoal/70 mt-1 leading-relaxed">
              Long celebrated as an auspicious ingredient in sacred ceremonies and regal celebrations.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
