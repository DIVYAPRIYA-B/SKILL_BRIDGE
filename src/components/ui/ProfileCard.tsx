import type { ReactNode } from 'react';

interface ProfileCardProps {
  name: string;
  subtitle?: string;
  avatar?: string;
  children?: ReactNode;
  actions?: ReactNode;
}

export default function ProfileCard({ name, subtitle, children, actions }: ProfileCardProps) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center text-white text-xl font-bold shrink-0">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-ink-900">{name}</h3>
            {subtitle && <p className="text-sm text-ink-500">{subtitle}</p>}
          </div>
        </div>
        {actions}
      </div>
      {children && <div className="mt-4 pt-4 border-t border-ink-100">{children}</div>}
    </div>
  );
}
