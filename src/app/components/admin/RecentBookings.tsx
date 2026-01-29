import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Badge } from '@/app/components/ui/badge';

const bookings = [
  {
    id: 1,
    guest: 'Jessica Wong',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    checkIn: 'May 25',
    checkOut: '28',
    listing: 'Nairobi Serena Hotel',
    price: 98595,
    status: null,
  },
  {
    id: 2,
    guest: 'David Smith',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    checkIn: 'May 24',
    checkOut: '27',
    listing: 'Karen Family BnB',
    price: 79065,
    status: null,
  },
  {
    id: 3,
    guest: 'Sarah R.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    checkIn: 'May 23',
    checkOut: '26',
    listing: 'Diani Beach Resort',
    price: 108240,
    status: null,
  },
  {
    id: 4,
    guest: 'Michael T.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    checkIn: 'May 21',
    checkOut: '25',
    listing: 'Nyali Luxury BnB',
    price: null,
    status: 'checked-in',
  },
  {
    id: 5,
    guest: 'Emily S.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    checkIn: 'May 20',
    checkOut: '22',
    listing: 'Kilimani Budget Inn',
    price: 65730,
    status: null,
  },
];

export function RecentBookings() {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Recent Bookings</CardTitle>
          <button className="text-sm text-[#0052A3] hover:underline">
            View All Bookings →
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-3 text-sm font-semibold text-gray-600">Guest</th>
                <th className="pb-3 text-sm font-semibold text-gray-600">Check In - Out</th>
                <th className="pb-3 text-sm font-semibold text-gray-600">Listing</th>
                <th className="pb-3 text-sm font-semibold text-gray-600 text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b last:border-0">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={booking.avatar} />
                        <AvatarFallback>{booking.guest.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-gray-900">{booking.guest}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="text-sm text-gray-600">
                      {booking.checkIn} – {booking.checkOut}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className="text-sm text-gray-900">{booking.listing}</span>
                  </td>
                  <td className="py-4 text-right">
                    {booking.status === 'checked-in' ? (
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                        ✓ Checked in
                      </Badge>
                    ) : (
                      <span className="text-sm font-semibold text-gray-900">
                        KSh {booking.price?.toLocaleString()}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
