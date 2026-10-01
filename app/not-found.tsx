import React from 'react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="py-24 sm:py-32 bg-cream text-center">
      <Container size="narrow">
        <div className="space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-gold-dark font-semibold px-3 py-1 rounded-full border border-line bg-gold/10 inline-block">
            404 — Specimen Not Found
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-emerald-dark font-normal">
            Page Not Found
          </h1>

          <p className="text-base text-charcoal/70 max-w-md mx-auto leading-relaxed">
            The page or garland specimen you were seeking does not exist or has been relocated within our archives.
          </p>

          <div className="pt-4 flex flex-wrap gap-4 justify-center">
            <Button href="/" variant="primary" size="md">
              Return to Homepage
            </Button>
            <Button href="/products" variant="outline" size="md">
              Explore Our Garlands
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
