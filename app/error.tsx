'use client';

import React, { useEffect } from 'react';
import Container from '@/components/ui/Container';
import ErrorState from '@/components/ui/ErrorState';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application Error caught by error boundary:', error);
  }, [error]);

  return (
    <div className="py-20 bg-cream">
      <Container size="narrow">
        <ErrorState
          title="An Unexpected Disruption Occurred"
          message="We were unable to load this section of the catalog. Our system has logged the details."
          retry={() => reset()}
          resetHref="/products"
        />
      </Container>
    </div>
  );
}
