import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CartItem } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';

interface CartItemCardProps {
  item: CartItem;
}

export function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="flex gap-4 p-4 bg-card rounded-xl border border-border">
      {/* Image */}
      <Link to={`/products/${product.id}`} className="shrink-0">
        <img
          src={product.imageUrls[0]}
          alt={product.name}
          className="w-24 h-24 object-cover rounded-lg"
        />
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-serif font-semibold text-lg hover:text-primary transition-colors truncate">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground">{product.category.name}</p>
        <p className="font-semibold mt-1">{formatPrice(product.price)}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex flex-col items-end justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeFromCart(product.id)}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => updateQuantity(product.id, quantity - 1)}
          >
            <Minus className="w-3 h-3" />
          </Button>
          <span className="w-8 text-center font-medium">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => updateQuantity(product.id, quantity + 1)}
            disabled={quantity >= product.stockQuantity}
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
