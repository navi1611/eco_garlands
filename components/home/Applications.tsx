import React from 'react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import FadeIn from '@/components/animation/FadeIn';

export interface ApplicationItem {
  title: string;
  tagline: string;
  description: string;
  icon: string;
  href: string;
}

export const APPLICATION_LIST: ApplicationItem[] = [
  {
    title: 'Weddings',
    tagline: 'Ceremonial & Matrimonial Vows',
    description:
      'Worn during the auspicious varmala exchange, creating fragrant and timeless photo memories.',
    icon: '💍',
    href: '/products?category=Weddings',
  },
  {
    title: 'Religious Ceremonies',
    tagline: 'Temple Sanctums & Rituals',
    description:
      'Custom woven for deity alankaram, homams, and sanctum installations with sacred adherence.',
    icon: '🪔',
    href: '/products?category=Religious+%26+Spiritual',
  },
  {
    title: 'Festivals',
    tagline: 'Cultural & Seasonal Joy',
    description:
      'Adorning festival stages and community celebrations during Diwali, Pongal, and festive seasons.',
    icon: '✨',
    href: '/products?category=Festivals+%26+Cultural',
  },
  {
    title: 'Home Decoration',
    tagline: 'Organic Living Spaces',
    description:
      'Entryway portals and wall hangings imparting natural botanical character and natural scent.',
    icon: '🏡',
    href: '/products?category=Home+%26+Interior',
  },
  {
    title: 'Prayer Spaces',
    tagline: 'Serene Pooja Altars',
    description:
      'Framing meditation niches and home pooja mandirs with serene, enduring spice weaves.',
    icon: '🌸',
    href: '/products?category=Home+%26+Interior',
  },
  {
    title: 'Events & Conclaves',
    tagline: 'Cultural Summits & Celebrations',
    description:
      'Elevating inaugural ceremonies, auspicious lamp-lighting events, and traditional stage decor.',
    icon: '🏛️',
    href: '/products?category=Hospitality',
  },
  {
    title: 'Hospitality',
    tagline: 'Resorts & VIP Receptions',
    description:
      'Welcoming guests and dignitaries with authentic Indian graciousness and botanical splendor.',
    icon: '🌿',
    href: '/products?category=Hospitality',
  },
  {
    title: 'Gifting',
    tagline: 'Heirloom Tokens & Keepsakes',
    description:
      'Presented in bespoke export-ready presentation boxes for celebratory personal or corporate tokens.',
    icon: '🎁',
    href: '/products?category=Gifting',
  },
  {
    title: 'Cultural Celebrations',
    tagline: 'Global Diaspora Traditions',
    description:
      'Bringing authentic regional craftsmanship to diaspora communities and heritage festivals worldwide.',
    icon: '🌏',
    href: '/products',
  },
];

export default function Applications() {
  return (
    <section className="py-20 lg:py-28 bg-cream border-b border-gold/15">
      <Container>
        <SectionHeading
          badge="Enduring Traditions"
          title="Designed to Be Part of Meaningful Moments"
          subtitle="Explore the multifaceted contexts where our natural cardamom and spice garlands bring elegance, dignity, and sensory presence."
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {APPLICATION_LIST.map((app, idx) => (
            <FadeIn key={app.title} direction="up" delay={0.08 * idx}>
              <Link
                href={app.href}
                className="group block p-6 bg-cream-soft rounded-sm border border-gold/20 hover:border-gold/60 transition-all duration-300 shadow-xs hover:shadow-md h-full"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl p-2.5 rounded-sm bg-cream border border-gold/20 group-hover:scale-110 transition-transform">
                    {app.icon}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-medium text-emerald-dark group-hover:text-emerald transition-colors">
                      {app.title}
                    </h3>
                    <span className="text-xs uppercase tracking-wider text-gold-dark font-medium block mt-0.5">
                      {app.tagline}
                    </span>
                    <p className="mt-2 text-sm text-charcoal/75 leading-relaxed">
                      {app.description}
                    </p>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
