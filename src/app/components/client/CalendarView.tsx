import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface Booking {
  date: number;
  guestName: string;
  room: string;
  checkIn: string;
  checkOut: string;
  price: number;
  status: 'confirmed' | 'pending' | 'checked-in';
}

const mockBookings: Booking[] = [
  { date: 7, guestName: 'Jessica Wong', room: 'Deluxe Room', checkIn: 'May 7', checkOut: 'May 10', price: 118335, status: 'confirmed' },
  { date: 14, guestName: 'David Smith', room: 'King Suite', checkIn: 'May 14', checkOut: 'May 17', price: 147225, status: 'pending' },
  { date: 21, guestName: 'Sarah R.', room: 'Standard Room', checkIn: 'May 21', checkOut: 'May 24', price: 97545, status: 'confirmed' },
  { date: 28, guestName: 'James L.', room: 'Deluxe Room', checkIn: 'May 28', checkOut: 'May 31', price: 118335, status: 'checked-in' },
];

export function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState('May 2024');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const startDay = 3; // Wednesday

  const getBookingForDate = (day: number) => {
    return mockBookings.find(b => b.date === day);
  };

  const selectedBooking = selectedDate ? getBookingForDate(selectedDate) : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Booking Calendar</h1>
        <p className="text-gray-600">Manage your bookings and availability</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="size-5" />
                Full Calendar View
              </CardTitle>
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-100 rounded">
                  <ChevronLeft className="size-5" />
                </button>
                <span className="text-lg font-semibold min-w-[120px] text-center">{currentMonth}</span>
                <button className="p-2 hover:bg-gray-100 rounded">
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Days of week */}
            <div className="grid grid-cols-7 gap-2 mb-3">
              {daysOfWeek.map((day) => (
                <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: startDay }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              
              {daysInMonth.map((day) => {
                const booking = getBookingForDate(day);
                const isSelected = selectedDate === day;
                
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(day)}
                    className={`
                      aspect-square rounded-lg text-sm font-medium transition-all p-2
                      ${isSelected ? 'ring-2 ring-[#00A8E8] ring-offset-2' : ''}
                      ${booking ? (
                        booking.status === 'confirmed' ? 'bg-[#0052A3] text-white hover:bg-[#003d7a]' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-gray-900 hover:bg-yellow-200' :
                        'bg-green-100 text-gray-900 hover:bg-green-200'
                      ) : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}
                    `}
                  >
                    <div className="text-base">{day}</div>
                    {booking && (
                      <div className="text-[10px] mt-1 truncate opacity-90">
                        {booking.guestName.split(' ')[0]}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded bg-gray-50 border" />
                <span className="text-gray-600">Available</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded bg-yellow-100" />
                <span className="text-gray-600">Pending</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded bg-[#0052A3]" />
                <span className="text-gray-600">Confirmed</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded bg-green-100" />
                <span className="text-gray-600">Checked In</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Details */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedBooking ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Guest</p>
                  <p className="font-semibold text-gray-900">{selectedBooking.guestName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Room Type</p>
                  <p className="font-semibold text-gray-900">{selectedBooking.room}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Check In – Check Out</p>
                  <p className="font-semibold text-gray-900">
                    {selectedBooking.checkIn} – {selectedBooking.checkOut}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Price</p>
                  <p className="text-xl font-bold text-gray-900">
                    KSh {selectedBooking.price.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Status</p>
                  <Badge className={
                    selectedBooking.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                    selectedBooking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }>
                    {selectedBooking.status === 'confirmed' ? 'Confirmed' :
                     selectedBooking.status === 'pending' ? 'Pending' : 'Checked In'}
                  </Badge>
                </div>
                <div className="pt-4 space-y-2">
                  <Button className="w-full bg-[#0052A3] hover:bg-[#003d7a]">
                    View Full Details
                  </Button>
                  <Button variant="outline" className="w-full">
                    Contact Guest
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <CalendarIcon className="size-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Select a date to view booking details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
