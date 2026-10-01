import React from 'react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import FadeIn from '@/components/animation/FadeIn';

export default function ManufacturingProcess() {
  const commitments = [
    {
      title: 'Botanical Purity',
      description:
        'We work strictly with whole, naturally dried spices and sustainable botanical cords, avoiding synthetic glues or artificial plastic coatings.',
    },
    {
      title: 'Artisan Lineage',
      description:
        'Our garland weavers utilize techniques cultivated through South Indian temple and wedding traditions, honoring the tactile heritage of spice artistry.',
    },
    {
      title: 'Export Grade Consistency',
      description:
        'Every garland batch conforms to established dimension guidelines, weight targets, and protective packaging requirements for international clients.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white/45 border-t border-line/60">
      <Container>
        <SectionHeading
          badge="Our Principles"
          title="Crafted with Respect for Nature and Tradition"
          subtitle="How our workshop balances traditional hand knotting with rigorous international export standards."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {commitments.map((item, idx) => (
            <FadeIn key={item.title} direction="up" delay={0.15 * idx}>
              <div className="p-8 bg-cream-soft rounded-xl border border-line h-full flex flex-col justify-between shadow-xs">
                <div>
                  <span className="font-serif text-2xl text-gold font-bold">
                    0{idx + 1}
                  </span>
                  <h3 className="font-serif text-xl font-medium text-emerald-dark mt-3">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-charcoal/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-line">
                  <span className="text-xs uppercase tracking-wider text-gold-dark font-medium">
                    J The Divine Eco Valley Standard
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
