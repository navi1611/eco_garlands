import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/animation/FadeIn';

export interface CategoryInfo {
  title: string;
  categoryParam: string;
  description: string;
  subtext: string;
  imageUrl: string;
}

export const CATEGORY_ITEMS: CategoryInfo[] = [
  {
    title: 'Weddings',
    categoryParam: 'Weddings',
    description:
      'Harmonious cardamom and spiced varmalas designed for bride and groom exchanges, ceremonial wedding stages, and matrimonial keepsakes.',
    subtext: 'Varmala rituals • Wedding stages • Matrimonial photography',
    imageUrl:
      'https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Religious & Spiritual Ceremonies',
    categoryParam: 'Religious+%26+Spiritual',
    description:
      'Sacred garlands tailored with reverence for temple sanctums, puja rituals, deity alankaram, and homam invocations.',
    subtext: 'Temple vigraha alankaram • Puja ceremonies • Sanctum offerings',
    imageUrl:
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Home & Interior',
    categoryParam: 'Home+%26+Interior',
    description:
      'Aromatic torans and entryway portal garlands that bring an organic botanical aesthetic and subtle spice scent to living spaces.',
    subtext: 'Entrance doorways • Altar backdrops • Festive portal torans',
    imageUrl:
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Festivals & Cultural Events',
    categoryParam: 'Festivals+%26+Cultural',
    description:
      'Celebratory multi-tiered garlands crafted to enhance traditional harvest festivals, regional festivities, and community celebrations.',
    subtext: 'Diwali • Pongal / Sankranti • Navratri • Regional festivals',
    imageUrl:
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Corporate & Hospitality',
    categoryParam: 'Hospitality',
    description:
      'Imposing yet comfortable welcome garlands engineered for luxury hotels, heritage resorts, VIP dignitary arrivals, and conventions.',
    subtext: 'Resort guest welcomes • Corporate felicitations • Diplomatic honors',
    imageUrl:
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Gifting',
    categoryParam: 'Gifting',
    description:
      'Presented in handcrafted keepsake presentation cases, our export-ready gift garlands convey thoughtful cultural reverence.',
    subtext: 'Bespoke gift boxes • Milestone tokens • Heirloom keepsakes',
    imageUrl:
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
  },
];

export default function GarlandCategories() {
  return (
    <section className="py-20 lg:py-28 bg-cream-soft border-b border-gold/15">
      <Container>
        <SectionHeading
          badge="Curated Collections"
          title="Garlands for Every Celebration"
          subtitle="Explore distinct collections tailored with specific cultural, religious, architectural, and celebratory considerations."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORY_ITEMS.map((cat, idx) => (
            <FadeIn key={cat.title} direction="up" delay={0.1 * idx}>
              <div className="group bg-cream rounded-sm border border-gold/20 hover:border-gold/60 transition-all duration-300 overflow-hidden flex flex-col h-full shadow-xs hover:shadow-md">
                {/* Visual Image container */}
                <div className="relative h-60 w-full overflow-hidden bg-botanical/10">
                  <Image
                    src={cat.imageUrl}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-emerald-dark/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[11px] uppercase tracking-wider text-cream/90 font-medium">
                      {cat.subtext}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl font-medium text-emerald-dark group-hover:text-emerald transition-colors">
                      {cat.title}
                    </h3>
                    <p className="mt-2 text-sm text-charcoal/80 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Button
                      href={`/products?category=${cat.categoryParam}`}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      Explore {cat.title}
                    </Button>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
