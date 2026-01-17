import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  trendUp?: boolean;
}

export function StatCard({ title, value, icon, trend, trendUp }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-serif font-bold mt-2">{value}</p>
          {trend && (
            <p className={`text-sm mt-1 ${trendUp ? 'text-accent' : 'text-destructive'}`}>
              {trend}
            </p>
          )}
        </div>
        <div className="p-3 bg-primary/10 rounded-xl text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
}
