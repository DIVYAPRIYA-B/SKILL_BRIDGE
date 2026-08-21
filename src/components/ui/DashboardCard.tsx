import type { ReactNode } from 'react';

interface DashboardCardProps {
  label: string;
  value: ReactNode;
  icon: ReactNode;
  trend?: string;
  color?: 'brand' | 'teal' | 'amber' | 'rose' | 'emerald';
}

const colorMap = {
  brand: 'bg-brand-50 text-brand-600',
  teal: 'bg-teal-50 text-teal-600',
  amber: 'bg-amber-50 text-amber-600',
  rose: 'bg-rose-50 text-rose-600',
  emerald: 'bg-emerald-50 text-emerald-600',
};

export default function DashboardCard({ label, value, icon, trend, color = 'brand' }: DashboardCardProps) {
  return (
    <div className="card p-4 sm:p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-ink-500 uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-bold text-ink-900 mt-1 font-display">{value}</p>
          {trend && <p className="text-xs text-ink-400 mt-1">{trend}</p>}
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
