'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
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
    subtext: 'Varmala rituals · Wedding stages · Matrimonial photography',
    imageUrl:
      'https://images.unsplash.com/photo-1764286954620-28029fbae9b6?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Religious & Spiritual Ceremonies',
    categoryParam: 'Religious+%26+Spiritual',
    description:
      'Sacred garlands tailored with reverence for temple sanctums, puja rituals, deity alankaram, and homam invocations.',
    subtext: 'Temple vigraha alankaram · Puja ceremonies · Sanctum offerings',
    imageUrl:
      'https://images.unsplash.com/photo-1780318564577-fcd6a7454eeb?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Home & Interior',
    categoryParam: 'Home+%26+Interior',
    description:
      'Aromatic torans and entryway portal garlands that bring an organic botanical aesthetic and subtle spice scent to living spaces.',
    subtext: 'Entrance doorways · Altar backdrops · Festive portal torans',
    imageUrl:
      'https://images.unsplash.com/photo-1589463349208-95817c91f971?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Festivals & Cultural Events',
    categoryParam: 'Festivals+%26+Cultural',
    description:
      'Celebratory multi-tiered garlands crafted to enhance traditional harvest festivals, regional festivities, and community celebrations.',
    subtext: 'Diwali · Pongal / Sankranti · Navratri · Regional festivals',
    imageUrl:
      'https://images.unsplash.com/photo-1577083753695-e010191bacb5?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Corporate & Hospitality',
    categoryParam: 'Hospitality',
    description:
      'Imposing yet comfortable welcome garlands engineered for luxury hotels, heritage resorts, VIP dignitary arrivals, and conventions.',
    subtext: 'Resort guest welcomes · Corporate felicitations · Diplomatic honors',
    imageUrl:
      'https://images.unsplash.com/photo-1742844552193-2fd3425cd26d?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Gifting',
    categoryParam: 'Gifting',
    description:
      'Presented in handcrafted keepsake presentation cases, our export-ready gift garlands convey thoughtful cultural reverence.',
    subtext: 'Bespoke gift boxes · Milestone tokens · Heirloom keepsakes',
    imageUrl:
      'https://images.unsplash.com/photo-1764764138818-0b22ab4d4023?auto=format&fit=crop&w=800&q=80',
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function GarlandCategories() {
  const { openQuoteModal } = useModal();

  return (
    <section className="py-24 lg:py-36 bg-white border-y border-line">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <SectionHeading
            align="left"
            badge="Curated Collections"
            title="Garlands for every celebration"
          />
          <Button
            href="/products"
            variant="outline"
            size="md"
            icon={<ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />}
          >
            View all products
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
          {CATEGORY_ITEMS.map((cat, idx) => (
            <motion.article
              key={cat.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: (idx % 3) * 0.1, ease }}
              className="group flex flex-col"
            >
              <Link
                href={`/products?category=${cat.categoryParam}`}
                className="relative block aspect-4/3 w-full overflow-hidden rounded-2xl bg-cream-subtle"
              >
                <Image
                  src={cat.imageUrl}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/0 to-black/0" />
                <span className="absolute top-5 left-5 font-serif text-sm text-white/90 tabular-nums">
                  0{idx + 1}
                </span>
                <span className="absolute bottom-5 right-5 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-emerald-dark opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
                <span className="absolute bottom-5 left-5 right-20 text-[11px] uppercase tracking-[0.14em] text-white/85 leading-relaxed">
                  {cat.subtext}
                </span>
              </Link>

              <div className="pt-6 flex-1 flex flex-col">
                <h3 className="font-serif text-2xl text-emerald-dark tracking-[-0.01em]">
                  {cat.title}
                </h3>
                <p className="mt-3 text-[15px] text-charcoal/60 leading-[1.75] flex-1">
                  {cat.description}
                </p>
                <button
                  type="button"
                  onClick={() => openQuoteModal({ productName: `Collection: ${cat.title}` })}
                  className="mt-5 self-start text-sm font-medium text-emerald-dark underline decoration-line-strong underline-offset-[6px] hover:decoration-emerald-dark transition-colors cursor-pointer"
                >
                  Request a quote
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
