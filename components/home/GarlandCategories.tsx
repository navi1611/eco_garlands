'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { useModal } from '@/components/modal/ModalContext';

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
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const { openQuoteModal } = useModal();

  // Create staggered parallax transforms for cards
  const yCol1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yCol2 = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const yCol3 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const getYOffset = (idx: number) => {
    const col = idx % 3;
    if (col === 0) return yCol1;
    if (col === 1) return yCol2;
    return yCol3;
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-[#F9F7EE] border-b border-gold/15 overflow-hidden"
    >
      <Container>
        <SectionHeading
          badge="Curated Collections"
          title="Garlands for Every Celebration"
          subtitle="Explore distinct collections tailored with specific cultural, religious, architectural, and celebratory considerations."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {CATEGORY_ITEMS.map((cat, idx) => (
            <motion.div
              key={cat.title}
              style={{ y: getYOffset(idx) }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="group bg-[#FFFEFA] rounded-xl border border-gold/25 hover:border-gold/60 transition-all overflow-hidden flex flex-col h-full shadow-xs hover:shadow-xl"
            >
              {/* Visual Image container */}
              <div className="relative h-64 w-full overflow-hidden bg-botanical/10">
                <Image
                  src={cat.imageUrl}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-linear-to-t from-emerald-dark/80 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[11px] uppercase tracking-wider text-cream/95 font-medium drop-shadow-xs">
                    {cat.subtext}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-2xl font-medium text-emerald-dark group-hover:text-emerald transition-colors">
                    {cat.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-charcoal/80 leading-relaxed font-normal">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-3 grid grid-cols-2 gap-2 border-t border-gold/15">
                  <Button
                    href={`/products?category=${cat.categoryParam}`}
                    variant="outline"
                    size="sm"
                    className="w-full text-center"
                  >
                    View Range
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    className="w-full text-center"
                    onClick={() =>
                      openQuoteModal({
                        productName: `Collection: ${cat.title}`,
                      })
                    }
                  >
                    Quick Quote
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
