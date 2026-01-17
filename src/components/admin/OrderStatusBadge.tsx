import type { OrderStatus } from '@/types';

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  PENDING: { label: 'Pending', className: 'bg-warning/20 text-warning' },
  CONFIRMED: { label: 'Confirmed', className: 'bg-accent/20 text-accent' },
  SHIPPED: { label: 'Shipped', className: 'bg-primary/20 text-primary' },
  DELIVERED: { label: 'Delivered', className: 'bg-success/20 text-success' },
  CANCELLED: { label: 'Cancelled', className: 'bg-destructive/20 text-destructive' },
};

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span className={`badge-status ${config.className}`}>
      {config.label}
    </span>
  );
}
