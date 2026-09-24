import React from 'react';
import { Product } from '@/lib/supabase/types';
import ProductCard from './ProductCard';
import SectionHeading from '@/components/ui/SectionHeading';

interface RelatedProductsProps {
  products: Product[];
  category: string;
}

export default function RelatedProducts({ products, category }: RelatedProductsProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 border-t border-gold/20 mt-16">
      <div className="mb-10">
        <SectionHeading
          badge="More from Collection"
          title={`Related in ${category}`}
          subtitle="Explore other natural garlands crafted for similar cultural celebrations and spaces."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
