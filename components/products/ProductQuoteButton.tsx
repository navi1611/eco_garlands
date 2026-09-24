import React from 'react';
import Button from '@/components/ui/Button';

interface ProductQuoteButtonProps {
  productName: string;
  productId: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function ProductQuoteButton({
  productName,
  productId,
  size = 'lg',
  className = '',
}: ProductQuoteButtonProps) {
  const quoteUrl = `/quote?product=${encodeURIComponent(
    productName
  )}&productId=${encodeURIComponent(productId)}`;

  return (
    <Button
      href={quoteUrl}
      variant="primary"
      size={size}
      className={`w-full text-center ${className}`}
    >
      Get a Quote for This Product
    </Button>
  );
}
