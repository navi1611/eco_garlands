import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/supabase/types';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-cream-soft rounded-sm border border-gold/20 hover:border-gold/60 transition-all duration-300 overflow-hidden flex flex-col h-full shadow-xs hover:shadow-md">
      {/* Product Image */}
      <Link
        href={`/products/${product.slug}`}
        className="relative h-64 sm:h-72 w-full overflow-hidden bg-botanical/10 block"
      >
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <Badge variant="gold" size="sm">
            {product.category}
          </Badge>
          {product.featured && (
            <Badge variant="emerald" size="sm">
              Featured
            </Badge>
          )}
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Base Material highlight */}
          <span className="text-[11px] uppercase tracking-wider text-gold-dark font-medium block">
            Base: {product.base_material}
          </span>

          <Link href={`/products/${product.slug}`}>
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-emerald-dark group-hover:text-emerald transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-sm text-charcoal/75 line-clamp-2 leading-relaxed">
            {product.short_description}
          </p>

          {/* Intended occasion / application */}
          {product.occasion && (
            <div className="pt-2 border-t border-gold/15">
              <span className="text-xs text-charcoal/60 block truncate">
                <strong className="text-charcoal font-medium">Use:</strong>{' '}
                {product.occasion}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          <Button
            href={`/products/${product.slug}`}
            variant="outline"
            size="sm"
            className="w-full text-center"
          >
            View Details
          </Button>
          <Button
            href={`/quote?product=${encodeURIComponent(product.name)}&productId=${product.id}`}
            variant="primary"
            size="sm"
            className="w-full text-center"
          >
            Get a Quote
          </Button>
        </div>
      </div>
    </div>
  );
}
