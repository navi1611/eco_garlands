import React from 'react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-emerald-dark text-cream border-t border-gold/30 pt-16 pb-12 mt-auto">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-gold/20">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-gold/50 flex items-center justify-center bg-emerald">
                <span className="font-serif text-lg text-gold font-bold">J</span>
              </div>
              <span className="font-serif text-2xl font-semibold tracking-wide text-cream">
                J The Divine Eco Valley
              </span>
            </div>
            <p className="text-sm leading-relaxed text-cream/75 max-w-sm">
              Handcrafted natural decorative garlands created primarily from cardamom, nuts, spices, and botanical materials. Bringing together craftsmanship, cultural heritage, and natural aesthetics for celebrations across the world.
            </p>
            <div className="inline-block pt-2">
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium px-3 py-1 rounded-full border border-gold/30 bg-gold/10">
                Crafted in India • Exporting Worldwide
              </span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="space-y-4">
            <h3 className="font-serif text-base tracking-wider uppercase text-gold font-medium">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-cream/80 hover:text-gold transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-cream/80 hover:text-gold transition-colors"
                >
                  About Our Craft
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-cream/80 hover:text-gold transition-colors"
                >
                  Product Catalog
                </Link>
              </li>
              <li>
                <Link
                  href="/applications"
                  className="text-cream/80 hover:text-gold transition-colors"
                >
                  Applications
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-cream/80 hover:text-gold transition-colors"
                >
                  Contact Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories Column */}
          <div className="space-y-4">
            <h3 className="font-serif text-base tracking-wider uppercase text-gold font-medium">
              Collections
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/products?category=Weddings"
                  className="text-cream/80 hover:text-gold transition-colors"
                >
                  Wedding Garlands
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Religious+%26+Spiritual"
                  className="text-cream/80 hover:text-gold transition-colors"
                >
                  Religious & Spiritual
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Home+%26+Interior"
                  className="text-cream/80 hover:text-gold transition-colors"
                >
                  Home & Interior
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Festivals+%26+Cultural"
                  className="text-cream/80 hover:text-gold transition-colors"
                >
                  Festivals & Cultural
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Hospitality"
                  className="text-cream/80 hover:text-gold transition-colors"
                >
                  Hospitality & Corporate
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Gifting"
                  className="text-cream/80 hover:text-gold transition-colors"
                >
                  Bespoke Gifting
                </Link>
              </li>
            </ul>
          </div>

          {/* Export & Enquiries Column */}
          <div className="space-y-4">
            <h3 className="font-serif text-base tracking-wider uppercase text-gold font-medium">
              Export Enquiries
            </h3>
            <p className="text-sm text-cream/75 leading-relaxed">
              Consignments packaged and prepared for cultural events, weddings, and international distribution.
            </p>
            <div className="pt-2">
              <Button
                href="/quote"
                variant="gold-outline"
                size="sm"
              >
                Request Commercial Quote →
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream/60 gap-4">
          <p>© {currentYear} J The Divine Eco Valley. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span>Natural Botanical Materials</span>
            <span>•</span>
            <span>Indian Craftsmanship</span>
            <span>•</span>
            <span>Worldwide Delivery</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
