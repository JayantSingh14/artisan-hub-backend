import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductFilters } from '@/components/products/ProductFilters';
import { productsApi, categoriesApi } from '@/services/api';
import type { Product, Category } from '@/types';

export default function Products() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoriesApi.getAll().then(setCategories);
  }, []);

  useEffect(() => {
    setLoading(true);
    productsApi
      .getAll({
        category: searchParams.get('category') || undefined,
        sort: searchParams.get('sort') || undefined,
      })
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [searchParams]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="section-heading mb-2">Our Collection</h1>
        <p className="text-muted-foreground mb-8">
          Explore our curated selection of handcrafted treasures
        </p>

        <ProductFilters categories={categories} />

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-muted animate-pulse rounded-xl h-80" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
