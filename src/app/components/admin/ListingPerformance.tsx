import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Progress } from '@/app/components/ui/progress';

const listings = [
  {
    name: 'Nairobi Serena Hotel',
    bookings: 546,
    revenue: 72450,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop',
    performance: 85,
  },
  {
    name: 'Karen Family BnB',
    bookings: 218,
    revenue: 79065,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
    performance: 78,
  },
  {
    name: 'Diani Beach Resort',
    bookings: 381,
    revenue: 108240,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop',
    performance: 92,
  },
  {
    name: 'Kisumu Lakeside BnB',
    bookings: 403,
    revenue: 98160,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop',
    performance: 88,
  },
];

export function ListingPerformance() {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Listing Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {listings.map((listing, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative h-32 rounded-lg overflow-hidden mb-3">
                <img
                  src={listing.image}
                  alt={listing.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1">{listing.name}</h4>
              <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                <span>{listing.bookings} Bookings</span>
                <span className="font-semibold text-gray-900">KSh {listing.revenue.toLocaleString()}</span>
              </div>
              <Progress value={listing.performance} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
