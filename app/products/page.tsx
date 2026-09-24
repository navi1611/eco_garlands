import React from 'react';
import type { Metadata } from 'next';
import PageContainer from '@/components/layout/PageContainer';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';
import { getProducts } from '@/lib/products/queries';

export const metadata: Metadata = {
  title: 'Natural Garland Catalog — Cardamom, Nuts & Spices',
  description:
    'Browse our handcrafted collection of natural cardamom, nut, and spice garlands for weddings, religious ceremonies, home decor, and global export.',
};

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    occasion?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // Await searchParams in Next.js 15+ / 16
  const params = await searchParams;
  const currentCategory = params.category || 'All';
  const currentSearch = params.search || '';
  const currentOccasion = params.occasion || '';

  // Server-side database query via Supabase (with automatic local fallback)
  const products = await getProducts({
    category: currentCategory,
    search: currentSearch,
    occasion: currentOccasion,
  });

  return (
    <div className="bg-cream">
      <PageContainer
        badge="Botanical Catalog"
        title="Our Handcrafted Garlands"
        subtitle="Each piece is individually assembled using premium natural cardamom pods, selected nuts, whole spices, and botanical threads."
      >
        {/* Interactive URL-driven Filters (Client Component) */}
        <ProductFilters
          currentCategory={currentCategory}
          currentSearch={currentSearch}
          currentOccasion={currentOccasion}
        />

        {/* Server-Rendered Product Grid */}
        <ProductGrid products={products} />
      </PageContainer>
    </div>
  );
}
