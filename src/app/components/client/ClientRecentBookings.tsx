import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Badge } from '@/app/components/ui/badge';
import { Check, X } from 'lucide-react';

const bookings = [
  {
    id: 1,
    guest: 'Jessica Wong',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    checkIn: 'May 25',
    checkOut: '28',
    room: 'Deluxe Room',
    price: 118335,
    status: 'confirmed',
  },
  {
    id: 2,
    guest: 'David Smith',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    checkIn: 'May 24',
    checkOut: '27',
    room: 'Deluxe Room',
    price: 97545,
    status: 'confirmed',
  },
  {
    id: 3,
    guest: 'Sarah R.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    checkIn: 'May 23',
    checkOut: '26',
    room: 'King Suite',
    price: 147225,
    status: 'confirmed',
  },
  {
    id: 4,
    guest: 'James L.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    checkIn: 'May 22',
    checkOut: '24',
    room: 'Standard Room',
    price: 65730,
    status: 'canceled',
  },
];

export function ClientRecentBookings() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">Recent Bookings</CardTitle>
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
                <th className="pb-3 text-xs font-semibold text-gray-600">Guest</th>
                <th className="pb-3 text-xs font-semibold text-gray-600">Check In – Out</th>
                <th className="pb-3 text-xs font-semibold text-gray-600">Room</th>
                <th className="pb-3 text-xs font-semibold text-gray-600 text-right">Price</th>
                <th className="pb-3 text-xs font-semibold text-gray-600 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b last:border-0">
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={booking.avatar} />
                        <AvatarFallback>{booking.guest.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-gray-900">{booking.guest}</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="text-sm text-gray-600">
                      {booking.checkIn} – {booking.checkOut}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="text-sm text-gray-900">{booking.room}</span>
                  </td>
                  <td className="py-3 text-right">
                    <span className="text-sm font-semibold text-gray-900">
                      KSh {booking.price.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    {booking.status === 'confirmed' ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        <Check className="size-3 mr-1" />
                        Confirmed
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                        <X className="size-3 mr-1" />
                        Canceled
                      </Badge>
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
