import React from 'react';
import { Product } from '@/lib/supabase/types';
import ProductCard from './ProductCard';
import EmptyState from '@/components/ui/EmptyState';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <EmptyState
        title="No garlands matched your search"
        description="Try adjusting or clearing your filters to explore our full natural garland collection."
        actionText="View All Garlands"
        actionHref="/products"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
