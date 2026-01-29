import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data6M = [
  { month: 'Oct', bookings: 145, revenue: 180 },
  { month: 'Nov', bookings: 152, revenue: 165 },
  { month: 'Dec', bookings: 168, revenue: 145 },
  { month: 'Jan', bookings: 185, revenue: 195 },
  { month: 'Feb', bookings: 198, revenue: 220 },
  { month: 'Mar', bookings: 215, revenue: 285 },
  { month: 'Apr', bookings: 205, revenue: 310 },
  { month: 'May', bookings: 228, revenue: 340 },
  { month: 'Jun', bookings: 242, revenue: 380 },
];

type TimeRange = '6M' | '12M' | 'All';

export function BookingsChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>('12M');

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Bookings Overview</CardTitle>
          <div className="flex gap-2">
            {(['6M', '12M', 'All'] as TimeRange[]).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeRange(range)}
                className={timeRange === range ? 'bg-[#0052A3] hover:bg-[#003D7A]' : ''}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data6M}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Bar dataKey="revenue" fill="#93C5FD" radius={[4, 4, 0, 0]} />
              <Line 
                type="monotone" 
                dataKey="bookings" 
                stroke="#0052A3" 
                strokeWidth={3}
                dot={{ fill: '#0052A3', r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-2xl font-bold text-gray-900">235</p>
            <p className="text-sm text-gray-500">Bookings Total</p>
            <p className="text-xs text-gray-400">Last 30 days</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">KSh 1,214,000</p>
            <p className="text-sm text-gray-500">Earnings</p>
            <p className="text-xs text-gray-400">Total</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">KSh 25,850</p>
            <p className="text-sm text-gray-500">Avg. per Booking</p>
            <p className="text-xs text-gray-400">&nbsp;</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
