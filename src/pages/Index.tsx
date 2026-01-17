import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/products/ProductCard';
import { mockProducts } from '@/services/mockData';

const Index = () => {
  const featuredProducts = mockProducts.slice(0, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary via-background to-secondary/50 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <span className="text-accent font-medium uppercase tracking-wider text-sm">
              Handcrafted with Love
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mt-4 leading-tight">
              Discover Authentic
              <span className="text-primary block">Indian Handicrafts</span>
            </h1>
            <p className="text-lg text-muted-foreground mt-6 max-w-lg">
              Each piece tells a story of tradition, skill, and the artisan's passion. 
              Bring home art that celebrates heritage.
            </p>
            <div className="flex gap-4 mt-8">
              <Link to="/products">
                <Button size="lg" className="btn-hero">
                  Shop Collection
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-accent font-medium uppercase tracking-wider text-sm">
                Curated Selection
              </span>
              <h2 className="section-heading mt-2">Featured Crafts</h2>
            </div>
            <Link to="/products" className="text-primary font-medium hover:underline hidden md:block">
              View All Products →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="section-heading text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Pottery', 'Textiles', 'Woodwork', 'Jewelry'].map((cat) => (
              <Link
                key={cat}
                to={`/products?category=${cat.toLowerCase()}`}
                className="bg-card p-8 rounded-xl text-center hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-serif text-xl font-semibold">{cat}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
