'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';

interface NavLink {
  label: string;
  href: string;
}

interface MobileMenuProps {
  links: NavLink[];
}

export default function MobileMenu({ links }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      {/* Hamburger toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        className="relative z-50 p-2 text-emerald focus:outline-none focus:ring-2 focus:ring-gold rounded-sm cursor-pointer"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span
            className={`block h-0.5 w-6 bg-emerald transition-all duration-300 origin-center ${
              isOpen ? 'rotate-45 translate-y-2 bg-emerald-dark' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-emerald transition-opacity duration-200 ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-emerald transition-all duration-300 origin-center ${
              isOpen ? '-rotate-45 -translate-y-2 bg-emerald-dark' : ''
            }`}
          />
        </div>
      </button>

      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-in drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-cream-soft border-l border-gold/20 shadow-2xl z-40 transform transition-transform duration-300 ease-out flex flex-col justify-between p-6 pt-24 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="space-y-6">
          <div className="border-b border-gold/20 pb-4">
            <span className="text-xs uppercase tracking-[0.2em] text-gold-dark font-medium">
              Navigation
            </span>
          </div>

          <nav className="flex flex-col space-y-4">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-lg font-serif transition-colors py-1 ${
                    isActive
                      ? 'text-emerald-dark font-semibold border-l-2 border-gold pl-3'
                      : 'text-emerald/80 hover:text-emerald pl-1'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="space-y-4 pt-6 border-t border-gold/20">
          <Button
            href="/quote"
            variant="primary"
            size="lg"
            className="w-full text-center"
          >
            Get a Quote
          </Button>

          <p className="text-center text-xs text-charcoal/60 tracking-wider uppercase">
            Crafted in India • Exporting Worldwide
          </p>
        </div>
      </div>
    </div>
  );
}
