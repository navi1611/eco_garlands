import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

const NAVIGATION = [
  { label: 'Home', href: '/' },
  { label: 'About Our Craft', href: '/about' },
  { label: 'Product Catalog', href: '/products' },
  { label: 'Applications', href: '/applications' },
  { label: 'Contact', href: '/contact' },
];

const COLLECTIONS = [
  { label: 'Wedding Garlands', href: '/products?category=Weddings' },
  { label: 'Religious & Spiritual', href: '/products?category=Religious+%26+Spiritual' },
  { label: 'Home & Interior', href: '/products?category=Home+%26+Interior' },
  { label: 'Festivals & Cultural', href: '/products?category=Festivals+%26+Cultural' },
  { label: 'Hospitality & Corporate', href: '/products?category=Hospitality' },
  { label: 'Bespoke Gifting', href: '/products?category=Gifting' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-emerald-dark border-t border-line mt-auto">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pt-20 pb-16 border-b border-line">
          {/* Brand */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sage border border-sage-line flex items-center justify-center">
                <span className="font-serif text-lg text-emerald-dark leading-none">J</span>
              </div>
              <span className="font-serif text-2xl tracking-[-0.01em]">J The Divine Eco Valley</span>
            </div>
            <p className="text-sm leading-[1.8] text-charcoal/60 max-w-sm">
              Handcrafted natural garlands made from cardamom, nuts, spices and botanical materials —
              bringing together craftsmanship, cultural heritage and natural aesthetics for
              celebrations across the world.
            </p>
            <p className="text-[11px] uppercase tracking-[0.24em] text-gold-dark">
              Crafted in India &nbsp;/&nbsp; Exporting Worldwide
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 space-y-5">
            <h3 className="text-[11px] uppercase tracking-[0.24em] text-charcoal/40 font-medium">
              Navigation
            </h3>
            <ul className="space-y-3 text-sm">
              {NAVIGATION.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-charcoal/70 hover:text-emerald-dark transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div className="lg:col-span-2 space-y-5">
            <h3 className="text-[11px] uppercase tracking-[0.24em] text-charcoal/40 font-medium">
              Collections
            </h3>
            <ul className="space-y-3 text-sm">
              {COLLECTIONS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-charcoal/70 hover:text-emerald-dark transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Export enquiries */}
          <div className="lg:col-span-3 space-y-5">
            <h3 className="text-[11px] uppercase tracking-[0.24em] text-charcoal/40 font-medium">
              Export Enquiries
            </h3>
            <p className="text-sm text-charcoal/60 leading-[1.8]">
              Consignments packaged and prepared for cultural events, weddings and international
              distribution.
            </p>
            <Button
              href="/quote"
              variant="outline"
              size="sm"
              icon={<ArrowUpRight className="w-3.5 h-3.5" />}
            >
              Request a Commercial Quote
            </Button>
          </div>
        </div>

        <div className="py-8 flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal/45 gap-4">
          <p>© {currentYear} J The Divine Eco Valley. All rights reserved.</p>
          <p className="tracking-wide">Natural materials · Indian craftsmanship · Worldwide delivery</p>
        </div>
      </Container>
    </footer>
  );
}
