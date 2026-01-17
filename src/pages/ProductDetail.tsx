import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { productsApi } from '@/services/api';
import { useCart } from '@/contexts/CartContext';
import type { Product } from '@/types';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      productsApi.getById(Number(id)).then(setProduct);
    }
  }, [id]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  if (!product) return <Layout><div className="container py-20 text-center">Loading...</div></Layout>;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <Link to="/products" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          <img src={product.imageUrls[0]} alt={product.name} className="w-full rounded-2xl aspect-square object-cover" />

          <div>
            <span className="text-accent font-medium uppercase tracking-wider text-sm">{product.category.name}</span>
            <h1 className="text-4xl font-serif font-bold mt-2">{product.name}</h1>
            <p className="text-3xl font-semibold text-primary mt-4">{formatPrice(product.price)}</p>
            <p className="text-muted-foreground mt-6 leading-relaxed">{product.description}</p>

            <div className="flex items-center gap-4 mt-8">
              <div className="flex items-center border rounded-lg">
                <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus className="w-4 h-4" /></Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)} disabled={quantity >= product.stockQuantity}><Plus className="w-4 h-4" /></Button>
              </div>
              <Button size="lg" onClick={() => addToCart(product, quantity)} disabled={product.stockQuantity === 0} className="flex-1 gap-2">
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of stock'}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
