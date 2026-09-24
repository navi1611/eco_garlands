'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

interface QuoteSuccessProps {
  referenceId?: string;
  onReset: () => void;
}

export default function QuoteSuccess({ referenceId, onReset }: QuoteSuccessProps) {
  return (
    <div className="bg-cream-soft border border-gold/40 rounded-sm p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-md space-y-6">
      <div className="w-16 h-16 rounded-full bg-emerald/10 border border-gold/40 text-emerald flex items-center justify-center mx-auto text-2xl">
        ✓
      </div>

      <div className="space-y-2">
        <span className="text-xs uppercase tracking-[0.25em] text-gold-dark font-semibold">
          Submission Successful
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-emerald-dark font-medium">
          Thank You
        </h2>
      </div>

      <p className="text-base text-charcoal/80 leading-relaxed max-w-lg mx-auto">
        Your quote request has been received. Our team will review your
        requirements and contact you shortly.
      </p>

      {referenceId && (
        <div className="p-4 bg-cream rounded-xs border border-gold/25 inline-block text-left">
          <span className="text-xs uppercase tracking-wider text-charcoal/60 block">
            Reference Tracking ID
          </span>
          <span className="font-mono text-base font-semibold text-emerald-dark tracking-wider">
            {referenceId}
          </span>
        </div>
      )}

      <div className="pt-4 flex flex-wrap gap-4 justify-center">
        <Button variant="primary" onClick={onReset}>
          Submit Another Request
        </Button>
        <Button variant="outline" href="/products">
          Browse More Garlands
        </Button>
      </div>
    </div>
  );
}
