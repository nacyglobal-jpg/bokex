import { LucideIcon } from 'lucide-react';

interface ClientStatCardProps {
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  title: string;
  value: string | number;
  change?: string;
  changeLabel?: string;
  children?: React.ReactNode;
}

export function ClientStatCard({
  icon: Icon,
  iconBgColor,
  iconColor,
  title,
  value,
  change,
  changeLabel,
  children,
}: ClientStatCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-3">
        <div className={`${iconBgColor} p-2 rounded-lg`}>
          <Icon className={`size-5 ${iconColor}`} />
        </div>
      </div>
      <h3 className="text-sm text-gray-600 mb-1">{title}</h3>
      {children || (
        <>
          <div className="flex items-baseline gap-2 mb-1">
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {change && (
              <span className={`text-xs font-medium ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {change}
              </span>
            )}
          </div>
          {changeLabel && <p className="text-xs text-gray-500">{changeLabel}</p>}
        </>
      )}
    </div>
  );
}
