'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import MobileMenu from './MobileMenu';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Applications', href: '/applications' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 w-full ${
        isScrolled
          ? 'bg-cream-soft/95 backdrop-blur-md shadow-xs border-b border-gold/20 py-3'
          : 'bg-cream/90 backdrop-blur-xs py-5'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Brand Logo / Monogram */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-gold rounded-xs"
          >
            <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center bg-cream-soft group-hover:border-gold transition-colors">
              <span className="font-serif text-lg text-gold font-bold tracking-wider">
                J
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-semibold tracking-wide text-emerald-dark leading-tight group-hover:text-emerald transition-colors">
                J The Divine Eco Valley
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-gold font-medium">
                Natural Botanical Garlands
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm tracking-wide font-medium transition-all duration-200 relative py-1 focus:outline-none focus:ring-1 focus:ring-gold rounded-xs ${
                    isActive
                      ? 'text-emerald-dark font-semibold'
                      : 'text-emerald/80 hover:text-emerald'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action / Quote Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button href="/quote" variant="primary" size="md">
              Get a Quote
            </Button>
          </div>

          {/* Mobile Menu trigger */}
          <MobileMenu links={NAV_LINKS} />
        </div>
      </Container>
    </header>
  );
}
