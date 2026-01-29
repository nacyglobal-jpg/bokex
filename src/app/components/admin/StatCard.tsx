import { Card, CardContent } from '@/app/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  iconColor?: string;
  children?: React.ReactNode;
}

export function StatCard({ title, value, change, icon: Icon, iconColor = 'bg-blue-100', children }: StatCardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            {children ? (
              children
            ) : (
              <p className="text-3xl font-bold text-gray-900">{value}</p>
            )}
          </div>
          <div className={`${iconColor} p-3 rounded-lg`}>
            <Icon className="size-6 text-[#0052A3]" />
          </div>
        </div>
        
        {change !== undefined && (
          <div className="flex items-center gap-1 text-sm">
            {isPositive && (
              <>
                <ArrowUp className="size-4 text-green-600" />
                <span className="text-green-600 font-medium">{change}%</span>
              </>
            )}
            {isNegative && (
              <>
                <ArrowDown className="size-4 text-red-600" />
                <span className="text-red-600 font-medium">{Math.abs(change)}%</span>
              </>
            )}
            <span className="text-gray-500 ml-1">Last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
