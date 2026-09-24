import React from 'react';
import type { Metadata } from 'next';
import PageContainer from '@/components/layout/PageContainer';
import QuoteForm from '@/components/quote/QuoteForm';
import { getProducts } from '@/lib/products/queries';

export const metadata: Metadata = {
  title: 'Request a Quote — J The Divine Eco Valley',
  description:
    'Submit your inquiry for handcrafted cardamom and spice garlands. We support weddings, spiritual institutions, luxury hospitality, and global export consignments.',
};

interface QuotePageProps {
  searchParams: Promise<{
    product?: string;
    productId?: string;
  }>;
}

export default async function QuotePage({ searchParams }: QuotePageProps) {
  const params = await searchParams;
  const initialProduct = params.product || '';
  const initialProductId = params.productId || '';

  // Fetch active products server-side to feed into the product selection list
  const products = await getProducts();

  return (
    <div className="bg-cream">
      <PageContainer
        badge="Direct Commercial Inquiries"
        title="Request a Commercial or Custom Quote"
        subtitle="Whether you require a ceremonial bridal varmala pair, sanctum alankaram garlands, or an international export batch, our team will review your requirements and respond promptly."
        size="narrow"
      >
        <QuoteForm
          products={products}
          initialProduct={initialProduct}
          initialProductId={initialProductId}
        />
      </PageContainer>
    </div>
  );
}
