import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Progress } from '@/app/components/ui/progress';

const topListings = [
  {
    name: 'Nairobi Serena Hotel',
    revenue: 'KSh 2,029,500',
    bookings: 168,
    terms: 53,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100&h=100&fit=crop',
  },
  {
    name: 'Diani Beach Resort',
    revenue: 'KSh 1,636,000',
    bookings: 98,
    terms: 48,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=100&h=100&fit=crop',
  },
];

const topCustomer = {
  name: 'Jessica Wong',
  bookings: 5,
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  joinDate: '2.23-30',
};

export function CustomerInsights() {
  return (
    <div className="space-y-6">
      {/* Satisfaction Score */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Customer Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-32 h-32 mb-4">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#E5E7EB"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#0052A3"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.82)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-[#0052A3]">82%</span>
              </div>
            </div>
            <p className="text-sm text-green-600 font-medium">↑ 4.2%</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Top Listing</h4>
            {topListings.map((listing, index) => (
              <div key={index} className="flex items-center gap-3 mb-4 last:mb-0">
                <img
                  src={listing.image}
                  alt={listing.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{listing.name}</p>
                  <p className="text-xs text-gray-500">
                    {listing.bookings} Bookings • {listing.terms} Terms
                  </p>
                </div>
                <p className="text-sm font-bold text-gray-900">{listing.revenue}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Customer */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Customer Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={topCustomer.avatar} />
              <AvatarFallback>JW</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{topCustomer.name}</p>
              <p className="text-sm text-gray-500">{topCustomer.bookings} Bookings • {topCustomer.joinDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Agents */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Top Agents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
                <AvatarFallback>MJ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">Michael Johnson</p>
                <p className="text-xs text-gray-500">72 Bookings</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">Sarah Miller</p>
                <p className="text-xs text-gray-500">65 Bookings</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}