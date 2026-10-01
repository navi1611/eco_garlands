import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import PageContainer from '@/components/layout/PageContainer';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/animation/FadeIn';

export const metadata: Metadata = {
  title: 'Garland Applications — Ceremonies, Weddings & Cultural Spaces',
  description:
    'Explore the dedicated cultural and ceremonial applications of natural cardamom and spice garlands across weddings, temple rituals, homes, and luxury hospitality.',
};

export default function ApplicationsPage() {
  const applicationDetails = [
    {
      title: 'Sacred Weddings & Varmala Rites',
      category: 'Weddings',
      tagline: 'Timeless Botanical Elegance for Marital Ceremonies',
      description:
        'In traditional Indian ceremonies, the garland exchange (Varmala or Jaimala) symbolizes mutual respect and spiritual unity. Handcrafted cardamom garlands provide an exquisite alternative to perishable fresh flowers — lightweight, fragrant, resistant to wilting in high heat, and serving as a cherished keepsake long after the wedding vows.',
      uses: ['Bride & Groom Varmala exchange', 'Mandap and canopy backdrops', 'Stage photography', 'Keepsake preservation in velvet cases'],
      imageUrl:
        'https://images.unsplash.com/photo-1754782915842-aa4fca6c203a?auto=format&fit=crop&w=1000&q=80',
      href: '/products?category=Weddings',
    },
    {
      title: 'Religious & Temple Sanctums',
      category: 'Religious & Spiritual',
      tagline: 'Traditional Devotional Reverence and Alankaram',
      description:
        'Conforming to time-honored devotional customs, our sanctum garlands are assembled with whole unbroken cardamom, sacred nuts, and unbleached cotton threads. Each design adheres to regional deity alankaram requirements, homam offerings, and sacred temple vigraha adorning.',
      uses: ['Temple vigraha alankaram', 'Home puja mandirs & altars', 'Griha Pravesh (Housewarming)', 'Special homams and annual festivals'],
      imageUrl:
        'https://images.unsplash.com/photo-1780318565569-b9208f729546?auto=format&fit=crop&w=1000&q=80',
      href: '/products?category=Religious+%26+Spiritual',
    },
    {
      title: 'Festivals & Cultural Gatherings',
      category: 'Festivals & Cultural',
      tagline: 'Vibrant Regional Harvest & Community Celebrations',
      description:
        'Festive milestones such as Diwali, Pongal, Sankranti, and Navratri celebrate the bounty of nature and agricultural harvest. Our multi-tiered spice garlands feature sun-cured spices, cinnamon scrolls, and golden grass weaves that accentuate traditional community stages.',
      uses: ['Harvest festival celebrations', 'Community cultural programs', 'Festive entryway arches', 'Stage felicitation ceremonies'],
      imageUrl:
        'https://images.unsplash.com/photo-1760192158969-fba5f503404f?auto=format&fit=crop&w=1000&q=80',
      href: '/products?category=Festivals+%26+Cultural',
    },
    {
      title: 'Home Portals & Interior Sanctums',
      category: 'Home & Interior',
      tagline: 'Aromatic Torans and Peaceful Domestic Accents',
      description:
        'Historically placed above main entrances to invite auspicious energy and pleasant aroma, natural spice torans add an earthy, warm organic texture to residential doorways, meditation corners, and architectural niches.',
      uses: ['Main portal entrance torans', 'Meditation and prayer rooms', 'Living room wall art installations', 'Auspicious celebratory door hangings'],
      imageUrl:
        'https://images.unsplash.com/photo-1589463349208-95817c91f971?auto=format&fit=crop&w=1000&q=80',
      href: '/products?category=Home+%26+Interior',
    },
    {
      title: 'Luxury Hospitality & Dignitary Protocol',
      category: 'Hospitality',
      tagline: 'Gracious Welcome for International Guests and VIPs',
      description:
        'Luxury resorts, heritage palace hotels, and corporate convenings honor the ancient ethos of "Atithi Devo Bhava" (The guest is divine). Our grand welcome garlands provide an unforgettable sensory greeting that international visitors cherish and take home as a preserved botanical token.',
      uses: ['Resort arrival greetings', 'Diplomatic & dignitary welcomes', 'Corporate annual general meetings', 'Conclave lamp-lighting ceremonies'],
      imageUrl:
        'https://images.unsplash.com/photo-1759177715489-74112089de1a?auto=format&fit=crop&w=1000&q=80',
      href: '/products?category=Hospitality',
    },
    {
      title: 'Bespoke Keepsake Gifting',
      category: 'Gifting',
      tagline: 'Heirloom Tokens of Indian Botanical Artistry',
      description:
        'Encased in handcrafted wooden or rigid presentation cases, our gift garlands serve as respectful, non-perishable tokens for milestones, anniversaries, and high-level corporate gifting.',
      uses: ['Corporate executive milestones', 'Wedding favor keepsakes', 'Heirloom family gifts', 'Diplomatic cultural tokens'],
      imageUrl:
        'https://images.unsplash.com/photo-1766425221306-4d44f4011d4a?auto=format&fit=crop&w=1000&q=80',
      href: '/products?category=Gifting',
    },
  ];

  return (
    <div className="bg-cream">
      <PageContainer
        badge="Cultural Context"
        title="Designed to Be Part of Meaningful Moments"
        subtitle="Discover how our natural cardamom and spice garlands enrich sacred rituals, monumental milestones, and gracious environments."
      >
        <div className="space-y-16">
          {applicationDetails.map((app, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <FadeIn key={app.title} direction="up" delay={0.1}>
                <div
                  className={`bg-cream-soft rounded-xl border border-line p-6 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center`}
                >
                  {/* Image Column */}
                  <div
                    className={`lg:col-span-5 relative h-64 sm:h-80 w-full rounded-xl overflow-hidden bg-botanical/10 border border-line ${
                      isReversed ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <Image
                      src={app.imageUrl}
                      alt={app.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[11px] uppercase tracking-[0.16em] text-emerald-dark font-medium bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-line">
                        {app.category}
                      </span>
                    </div>
                  </div>

                  {/* Text Column */}
                  <div
                    className={`lg:col-span-7 space-y-4 ${
                      isReversed ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <span className="text-xs uppercase tracking-widest text-gold-dark font-medium block">
                      {app.tagline}
                    </span>

                    <h2 className="font-serif text-2xl sm:text-3xl font-medium text-emerald-dark">
                      {app.title}
                    </h2>

                    <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed">
                      {app.description}
                    </p>

                    <div className="pt-2">
                      <span className="text-xs uppercase tracking-wider text-charcoal/60 font-medium block mb-2">
                        Common Use Cases:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {app.uses.map((use) => (
                          <span
                            key={use}
                            className="text-xs px-2.5 py-1 bg-cream rounded-lg border border-line text-charcoal"
                          >
                            {use}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex flex-wrap gap-4">
                      <Button href={app.href} variant="outline" size="sm">
                        Browse {app.category}
                      </Button>
                      <Button href="/quote" variant="primary" size="sm">
                        Request Quote for This Occasion
                      </Button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </PageContainer>
    </div>
  );
}
