import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import ProductGallery from '@/components/products/ProductGallery';
import ProductDetails from '@/components/products/ProductDetails';
import RelatedProducts from '@/components/products/RelatedProducts';
import { getProductBySlug, getRelatedProducts } from '@/lib/products/queries';
import ParchmentBackground from '@/components/ui/ParchmentBackground';

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Dynamic SEO Metadata from Supabase database
export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested garland could not be located in our catalog.',
    };
  }

  return {
    title: `${product.name} | Natural Spice Garland`,
    description: product.short_description,
    openGraph: {
      title: `${product.name} | J The Divine Eco Valley`,
      description: product.short_description,
      images: [
        {
          url: product.image_url,
          width: 1200,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = await getRelatedProducts(product.slug, product.category, 3);

  // Structured Data (JSON-LD) for Google Rich Snippets
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: product.image_url,
    description: product.description,
    category: product.category,
    material: product.base_material,
    brand: {
      '@type': 'Brand',
      name: 'J The Divine Eco Valley',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      price: 'Price on Application / Commercial Quote',
    },
  };

  return (
    <div className="relative">
      <ParchmentBackground />
      <div className="relative z-10 py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container>
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 text-xs uppercase tracking-wider text-charcoal/60"
        >
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-gold transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/products" className="hover:text-gold transition-colors">
                Products
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href={`/products?category=${encodeURIComponent(product.category)}`}
                className="hover:text-gold transition-colors"
              >
                {product.category}
              </Link>
            </li>
            <li>/</li>
            <li className="text-emerald-dark font-medium truncate max-w-xs">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Product Showcase: Gallery + Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Image Gallery (Client Component) */}
          <div className="lg:col-span-6">
            <ProductGallery
              images={
                product.gallery_images && product.gallery_images.length > 0
                  ? product.gallery_images
                  : [product.image_url]
              }
              productName={product.name}
            />
          </div>

          {/* Right Column: Complete Specifications & Quote Action (Server Component) */}
          <div className="lg:col-span-6">
            <ProductDetails product={product} />
          </div>
        </div>

        {/* Related Products within same category */}
        <RelatedProducts products={related} category={product.category} />
      </Container>
      </div>
    </div>
  );
}
