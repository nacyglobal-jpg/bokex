import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Check, X, Clock, Search, Filter, Download, Plus } from 'lucide-react';
import { ManualBookingModal, ManualBookingData } from '@/app/components/client/ManualBookingModal';
import { BookingDetailsModal } from '@/app/components/client/BookingDetailsModal';
import { toast } from 'sonner';

// Generate unique booking ID in format BKX-XXXXXX
const generateBookingId = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `BKX-${timestamp}${random}`;
};

const initialBookings = [
  {
    id: 1,
    bookingId: 'BKX-001234567',
    guest: 'Jessica Wong',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    checkIn: 'May 25',
    checkOut: 'May 28',
    room: 'Deluxe Room',
    price: 118335,
    status: 'confirmed' as const,
    bookingDate: 'May 18, 2024',
    nights: 3,
    guests: 2,
  },
  {
    id: 2,
    bookingId: 'BKX-001234892',
    guest: 'David Smith',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    checkIn: 'May 24',
    checkOut: 'May 27',
    room: 'Deluxe Room',
    price: 97545,
    status: 'confirmed' as const,
    bookingDate: 'May 15, 2024',
    nights: 3,
    guests: 1,
  },
  {
    id: 3,
    bookingId: 'BKX-001235123',
    guest: 'Sarah R.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    checkIn: 'May 23',
    checkOut: 'May 26',
    room: 'King Suite',
    price: 147225,
    status: 'checked-in' as const,
    bookingDate: 'May 10, 2024',
    nights: 3,
    guests: 4,
  },
  {
    id: 4,
    bookingId: 'BKX-001235456',
    guest: 'James L.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    checkIn: 'May 22',
    checkOut: 'May 24',
    room: 'Standard Room',
    price: 65730,
    status: 'canceled' as const,
    bookingDate: 'May 8, 2024',
    nights: 2,
    guests: 2,
  },
  {
    id: 5,
    bookingId: 'BKX-001235789',
    guest: 'Emily Chen',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    checkIn: 'May 21',
    checkOut: 'May 23',
    room: 'Deluxe Room',
    price: 78890,
    status: 'pending' as const,
    bookingDate: 'May 19, 2024',
    nights: 2,
    guests: 3,
  },
  {
    id: 6,
    bookingId: 'BKX-001236012',
    guest: 'Michael Brown',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    checkIn: 'May 20',
    checkOut: 'May 22',
    room: 'King Suite',
    price: 98150,
    status: 'completed' as const,
    bookingDate: 'May 5, 2024',
    nights: 2,
    guests: 2,
  },
];

type FilterStatus = 'all' | 'confirmed' | 'pending' | 'checked-in' | 'completed' | 'canceled';

export function BookingsView() {
  const [allBookings, setAllBookings] = useState(initialBookings);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [isManualBookingOpen, setIsManualBookingOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<typeof initialBookings[0] | null>(null);

  const filteredBookings = allBookings.filter(booking => {
    const matchesSearch = booking.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.room.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: allBookings.length,
    confirmed: allBookings.filter(b => b.status === 'confirmed').length,
    pending: allBookings.filter(b => b.status === 'pending').length,
    checkedIn: allBookings.filter(b => b.status === 'checked-in').length,
  };

  const handleManualBookingSubmit = (bookingData: ManualBookingData) => {
    // Format dates for display
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    // Generate avatar based on name initials
    const initials = bookingData.guest.split(' ').map(n => n[0]).join('').toUpperCase();
    const avatarColors = [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    ];
    const randomAvatar = avatarColors[Math.floor(Math.random() * avatarColors.length)];

    const newBooking = {
      id: Math.max(...allBookings.map(b => b.id)) + 1,
      bookingId: generateBookingId(),
      guest: bookingData.guest,
      avatar: randomAvatar,
      checkIn: formatDate(bookingData.checkIn),
      checkOut: formatDate(bookingData.checkOut),
      room: bookingData.room,
      price: bookingData.price,
      status: bookingData.status,
      bookingDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      nights: bookingData.nights,
      guests: bookingData.guests,
    };

    // Add to the beginning of the bookings array (most recent first)
    setAllBookings([newBooking, ...allBookings]);

    // Show success toast
    toast.success('Booking Created Successfully!', {
      description: `${bookingData.guest}'s booking for ${bookingData.nights} night${bookingData.nights !== 1 ? 's' : ''} has been added.`,
    });
  };

  const handleStatusChange = (bookingId: number, newStatus: typeof initialBookings[0]['status']) => {
    setAllBookings(allBookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
  };

  const handleDeleteBooking = (bookingId: number) => {
    setAllBookings(allBookings.filter(booking => booking.id !== bookingId));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">All Bookings</h1>
          <p className="text-gray-600">Manage and track all your property bookings</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsManualBookingOpen(true)}
            className="bg-[#00A8E8] hover:bg-[#0086ba]"
          >
            <Plus className="size-4 mr-2" />
            New Booking
          </Button>
          <Button variant="outline">
            <Download className="size-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-1">Confirmed</p>
            <p className="text-2xl font-bold text-blue-600">{stats.confirmed}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-1">Checked In</p>
            <p className="text-2xl font-bold text-green-600">{stats.checkedIn}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <CardTitle>Booking List</CardTitle>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <Filter className="size-4 text-gray-600" />
            {(['all', 'confirmed', 'pending', 'checked-in', 'completed', 'canceled'] as FilterStatus[]).map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className={statusFilter === status ? 'bg-[#0052A3] hover:bg-[#003d7a]' : ''}
              >
                {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
              </Button>
            ))}
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
                  <th className="pb-3 text-xs font-semibold text-gray-600">Guests</th>
                  <th className="pb-3 text-xs font-semibold text-gray-600">Nights</th>
                  <th className="pb-3 text-xs font-semibold text-gray-600 text-right">Price</th>
                  <th className="pb-3 text-xs font-semibold text-gray-600 text-right">Status</th>
                  <th className="pb-3 text-xs font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-9 h-9">
                          <AvatarImage src={booking.avatar} />
                          <AvatarFallback>{booking.guest.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{booking.guest}</p>
                          <p className="text-xs text-gray-500">{booking.bookingDate}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-sm text-gray-600">
                        {booking.checkIn} – {booking.checkOut}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="text-sm text-gray-900">{booking.room}</span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-gray-900">{booking.guests}</span>
                        <span className="text-xs text-gray-500">{booking.guests === 1 ? 'guest' : 'guests'}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-sm text-gray-600">{booking.nights}</span>
                    </td>
                    <td className="py-4 text-right">
                      <span className="text-sm font-semibold text-gray-900">
                        KSh {booking.price.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <Badge className={
                        booking.status === 'confirmed' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100' :
                        booking.status === 'checked-in' ? 'bg-green-100 text-green-700 hover:bg-green-100' :
                        booking.status === 'completed' ? 'bg-purple-100 text-purple-700 hover:bg-purple-100' :
                        'bg-red-100 text-red-700 hover:bg-red-100'
                      }>
                        {booking.status === 'confirmed' && <Check className="size-3 mr-1" />}
                        {booking.status === 'pending' && <Clock className="size-3 mr-1" />}
                        {booking.status === 'canceled' && <X className="size-3 mr-1" />}
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1).replace('-', ' ')}
                      </Badge>
                    </td>
                    <td className="py-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedBooking(booking)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No bookings found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Manual Booking Modal */}
      <ManualBookingModal
        isOpen={isManualBookingOpen}
        onClose={() => setIsManualBookingOpen(false)}
        onSubmit={handleManualBookingSubmit}
      />

      {/* Booking Details Modal */}
      <BookingDetailsModal
        isOpen={selectedBooking !== null}
        onClose={() => setSelectedBooking(null)}
        bookingData={selectedBooking}
        onStatusChange={handleStatusChange}
        onDelete={handleDeleteBooking}
      />
    </div>
  );
}