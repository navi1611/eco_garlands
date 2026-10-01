'use client';

import React, { useEffect, useState } from 'react';
import Dialog from '@/components/ui/Dialog';
import { useModal } from './ModalContext';
import QuoteForm from '@/components/quote/QuoteForm';
import { SAMPLE_PRODUCTS } from '@/lib/products/data';

export default function QuoteDialog() {
  const { isQuoteOpen, closeQuoteModal, quoteData } = useModal();
  const [key, setKey] = useState(0);

  // Remount form when target product changes or modal re-opens
  useEffect(() => {
    if (isQuoteOpen) {
      setKey((prev) => prev + 1);
    }
  }, [isQuoteOpen, quoteData.productName, quoteData.productId]);

  return (
    <Dialog
      isOpen={isQuoteOpen}
      onClose={closeQuoteModal}
      badge="Direct Commercial Inquiries"
      title="Request a Custom Quote"
      subtitle="Complete your specifications below. Our artisans and export coordinators will review your requirements and respond promptly."
      maxWidth="3xl"
    >
      <div className="pt-2">
        <QuoteForm
          key={key}
          products={SAMPLE_PRODUCTS}
          initialProduct={quoteData.productName || ''}
          initialProductId={quoteData.productId || ''}
        />
      </div>
    </Dialog>
  );
}
