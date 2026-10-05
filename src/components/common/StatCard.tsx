import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: LucideIcon;
  variant?: 'blue' | 'amber' | 'emerald' | 'rose' | 'slate' | 'indigo';
  onClick?: () => void;
  active?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'slate',
  onClick,
  active = false
}) => {
  const variantStyles = {
    blue: {
      bg: 'bg-white',
      border: active ? 'border-[#0f2e59] ring-2 ring-[#0f2e59]/20' : 'border-slate-200/80 hover:border-[#0f2e59]/50',
      iconBg: 'bg-blue-50 text-[#0f2e59]',
      valueColor: 'text-[#0f2e59]'
    },
    amber: {
      bg: 'bg-white',
      border: active ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-slate-200/80 hover:border-amber-400',
      iconBg: 'bg-amber-50 text-amber-700',
      valueColor: 'text-amber-800'
    },
    emerald: {
      bg: 'bg-white',
      border: active ? 'border-emerald-600 ring-2 ring-emerald-600/20' : 'border-slate-200/80 hover:border-emerald-400',
      iconBg: 'bg-emerald-50 text-emerald-700',
      valueColor: 'text-emerald-800'
    },
    rose: {
      bg: 'bg-white',
      border: active ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-slate-200/80 hover:border-rose-400',
      iconBg: 'bg-rose-50 text-rose-700',
      valueColor: 'text-rose-800'
    },
    indigo: {
      bg: 'bg-white',
      border: active ? 'border-indigo-600 ring-2 ring-indigo-600/20' : 'border-slate-200/80 hover:border-indigo-400',
      iconBg: 'bg-indigo-50 text-indigo-700',
      valueColor: 'text-indigo-900'
    },
    slate: {
      bg: 'bg-white',
      border: active ? 'border-slate-700 ring-2 ring-slate-700/20' : 'border-slate-200/80 hover:border-slate-400',
      iconBg: 'bg-slate-100 text-slate-700',
      valueColor: 'text-slate-900'
    }
  };

  const style = variantStyles[variant];

  return (
    <div
      onClick={onClick}
      className={`rounded-xl p-5 border transition-all duration-150 ${style.bg} ${style.border} ${
        onClick ? 'cursor-pointer hover:shadow-sm' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-slate-500 tracking-normal truncate mb-1.5">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl lg:text-3xl font-bold tracking-tight tabular-nums ${style.valueColor}`}>
              {typeof value === 'number' ? value.toLocaleString('id-ID') : value}
            </span>
          </div>
          {subtitle && (
            <p className="text-[11px] text-slate-400 mt-1.5 truncate">
              {subtitle}
            </p>
          )}
        </div>
        <div className={`p-2.5 rounded-lg shrink-0 ${style.iconBg}`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
};
