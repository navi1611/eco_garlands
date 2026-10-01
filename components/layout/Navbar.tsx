'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import MobileMenu from './MobileMenu';
import { ArrowUpRight } from 'lucide-react';
import LogoMark from '@/components/ui/Logo';

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
      className={`sticky top-0 z-40 w-full transition-all duration-500 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl backdrop-saturate-150 border-b border-line/80 py-3'
          : 'bg-canvas/0 border-b border-transparent py-5'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between gap-6">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald/30 rounded-md"
          >
            <LogoMark
              title=""
              className="w-10 h-10 shrink-0 drop-shadow-[0_2px_6px_rgba(11,34,25,0.18)] transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3"
            />
            <div className="flex flex-col">
              <span className="font-serif text-[17px] sm:text-lg tracking-[-0.01em] text-emerald-dark leading-tight">
                J The Divine Eco Valley
              </span>
              <span className="text-[9.5px] tracking-[0.28em] uppercase text-charcoal/50 font-medium mt-0.5">
                Botanical Garlands
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-1 rounded-full p-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-[13.5px] rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald/30 ${
                    isActive
                      ? 'text-emerald-dark font-medium'
                      : 'text-charcoal/60 hover:text-emerald-dark'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-0.5 w-1 h-1 rounded-full bg-gold" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center">
            <Button
              href="/quote"
              variant="primary"
              size="sm"
              icon={<ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />}
            >
              Get a Quote
            </Button>
          </div>

          <MobileMenu links={NAV_LINKS} />
        </div>
      </Container>
    </header>
  );
}
