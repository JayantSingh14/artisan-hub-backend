import { useEffect, useState } from 'react';
import { Package, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { StatCard } from '@/components/admin/StatCard';
import { OrderStatusBadge } from '@/components/admin/OrderStatusBadge';
import { dashboardApi, ordersApi } from '@/services/api';
import type { DashboardStats, Order } from '@/types';

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    dashboardApi.getStats().then(setStats);
    ordersApi.getAll().then(setOrders);
  }, []);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="section-heading mb-8">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard title="Total Sales" value={stats ? formatPrice(stats.totalSales) : '—'} icon={<DollarSign className="w-6 h-6" />} />
          <StatCard title="Total Orders" value={stats?.totalOrders ?? '—'} icon={<ShoppingCart className="w-6 h-6" />} />
          <StatCard title="Pending Orders" value={stats?.pendingOrders ?? '—'} icon={<TrendingUp className="w-6 h-6" />} />
          <StatCard title="Products" value={stats?.totalProducts ?? '—'} icon={<Package className="w-6 h-6" />} />
        </div>

        {/* Recent Orders */}
        <h2 className="text-2xl font-serif font-bold mb-6">Recent Orders</h2>
        <div className="bg-card rounded-xl border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium">Order ID</th>
                <th className="text-left p-4 font-medium">Customer</th>
                <th className="text-left p-4 font-medium">Amount</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="p-4 font-mono text-sm">#{order.id}</td>
                  <td className="p-4">{order.user.firstName} {order.user.lastName}</td>
                  <td className="p-4 font-medium">{formatPrice(order.totalAmount)}</td>
                  <td className="p-4"><OrderStatusBadge status={order.status} /></td>
                  <td className="p-4 text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
