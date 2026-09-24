import React from 'react';
import { Product } from '@/lib/supabase/types';
import Badge from '@/components/ui/Badge';
import ProductQuoteButton from './ProductQuoteButton';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="space-y-8">
      {/* Category & Attributes */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="gold" size="md">
            {product.category}
          </Badge>
          <span className="text-xs uppercase tracking-widest text-charcoal/60 font-medium">
            Natural Botanical Series
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-emerald-dark tracking-tight leading-tight">
          {product.name}
        </h1>

        <p className="mt-4 text-base sm:text-lg text-charcoal/85 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Primary Quote CTA Button */}
      <div className="pt-2">
        <ProductQuoteButton
          productName={product.name}
          productId={product.id}
          size="lg"
        />
        <p className="text-xs text-center text-charcoal/60 mt-2">
          Prepared to custom batch orders • Dispatched worldwide from India
        </p>
      </div>

      {/* Specifications Grid */}
      <div className="border-t border-b border-gold/20 py-6 space-y-4">
        {/* Base Material */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <span className="text-xs uppercase tracking-wider text-charcoal/60 font-medium">
            Primary Botanical Material
          </span>
          <span className="sm:col-span-2 text-sm text-emerald-dark font-medium">
            {product.base_material}
          </span>
        </div>

        {/* Full Materials */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <span className="text-xs uppercase tracking-wider text-charcoal/60 font-medium">
            Composite Ingredients
          </span>
          <div className="sm:col-span-2 flex flex-wrap gap-1.5">
            {product.materials.map((mat) => (
              <span
                key={mat}
                className="text-xs px-2.5 py-1 bg-cream rounded-xs border border-gold/20 text-charcoal"
              >
                {mat}
              </span>
            ))}
          </div>
        </div>

        {/* Intended Occasion */}
        {product.occasion && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <span className="text-xs uppercase tracking-wider text-charcoal/60 font-medium">
              Intended Occasion
            </span>
            <span className="sm:col-span-2 text-sm text-charcoal/80">
              {product.occasion}
            </span>
          </div>
        )}

        {/* Cultural / Religious Context */}
        {product.religion_or_cultural_use && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <span className="text-xs uppercase tracking-wider text-charcoal/60 font-medium">
              Cultural & Ceremonial Use
            </span>
            <span className="sm:col-span-2 text-sm text-charcoal/80 italic">
              {product.religion_or_cultural_use}
            </span>
          </div>
        )}
      </div>

      {/* Customization & Export Accordion / Informational Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-cream-soft rounded-sm border border-gold/20">
          <h4 className="font-serif text-base text-emerald-dark font-medium">
            Customization Capabilities
          </h4>
          <p className="mt-1 text-xs text-charcoal/70 leading-relaxed">
            Garland lengths, pod density, accent spacing, and custom silk/thread cord colors can be adapted based on wedding ceremony protocols or stage dimensions.
          </p>
        </div>

        <div className="p-4 bg-cream-soft rounded-sm border border-gold/20">
          <h4 className="font-serif text-base text-emerald-dark font-medium">
            Export Packaging & Dispatch
          </h4>
          <p className="mt-1 text-xs text-charcoal/70 leading-relaxed">
            Shipped in rigid impact-cushioned cartons with moisture guards. Air freight dispatch coordinated to ensure timely delivery for scheduled celebrations.
          </p>
        </div>
      </div>
    </div>
  );
}
