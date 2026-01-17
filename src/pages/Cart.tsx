import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { CartItemCard } from '@/components/cart/CartItemCard';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

export default function Cart() {
  const { items, totalAmount, clearCart } = useCart();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  const handleCheckout = () => {
    toast.success('Order placed successfully!');
    clearCart();
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-serif font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Looks like you haven't added anything yet.</p>
          <Link to="/products"><Button>Continue Shopping</Button></Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="section-heading mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItemCard key={item.product.id} item={item} />
            ))}
          </div>

          <div className="bg-card p-6 rounded-xl border h-fit">
            <h2 className="font-serif text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(totalAmount)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
            </div>
            <div className="border-t mt-4 pt-4 flex justify-between font-semibold text-lg">
              <span>Total</span><span>{formatPrice(totalAmount)}</span>
            </div>
            <Button className="w-full mt-6" size="lg" onClick={handleCheckout}>Place Order</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
