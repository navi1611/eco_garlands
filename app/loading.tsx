import React from 'react';
import Container from '@/components/ui/Container';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';

export default function Loading() {
  return (
    <div className="py-20 bg-cream">
      <Container>
        <div className="flex flex-col items-center justify-center space-y-4 mb-12">
          <div className="w-12 h-12 rounded-full border-2 border-gold border-t-transparent animate-spin" />
          <p className="text-xs uppercase tracking-[0.25em] text-gold-dark font-medium">
            Loading J The Divine Eco Valley...
          </p>
        </div>
        <LoadingSkeleton />
      </Container>
    </div>
  );
}
