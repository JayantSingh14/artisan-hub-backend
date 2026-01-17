import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="card-product group">
      {/* Image */}
      <Link to={`/products/${product.id}`} className="block aspect-square overflow-hidden">
        <img
          src={product.imageUrls[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <span className="text-xs font-medium text-accent uppercase tracking-wider">
          {product.category.name}
        </span>

        {/* Name */}
        <Link to={`/products/${product.id}`}>
          <h3 className="font-serif text-lg font-semibold mt-1 hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
          {product.description}
        </p>

        {/* Price & Action */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-semibold text-foreground">
            {formatPrice(product.price)}
          </span>
          <Button
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            disabled={product.stockQuantity === 0}
            className="gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </Button>
        </div>

        {/* Stock Status */}
        {product.stockQuantity <= 5 && product.stockQuantity > 0 && (
          <p className="text-xs text-warning mt-2">Only {product.stockQuantity} left!</p>
        )}
        {product.stockQuantity === 0 && (
          <p className="text-xs text-destructive mt-2">Out of stock</p>
        )}
      </div>
    </div>
  );
}
