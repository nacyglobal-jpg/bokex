import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover';
import { Calendar } from '@/app/components/ui/calendar';
import { Hotel } from '@/app/types/hotel';
import { Star, MapPin, CheckCircle2, AlertTriangle, Calendar as CalendarIcon, Users, Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface BookingModalProps {
  hotel: Hotel | null;
  isOpen: boolean;
  onClose: () => void;
  checkIn?: Date;
  checkOut?: Date;
  guests?: number;
  onConfirmBooking?: (bookingDetails: any) => void;
}

export function BookingModal({ hotel, isOpen, onClose, checkIn, checkOut, guests, onConfirmBooking }: BookingModalProps) {
  const [selectedRoom, setSelectedRoom] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Local state for dates and guests (editable in modal)
  const [localCheckIn, setLocalCheckIn] = useState<Date | undefined>(checkIn);
  const [localCheckOut, setLocalCheckOut] = useState<Date | undefined>(checkOut);
  const [localGuests, setLocalGuests] = useState(guests || 2);

  // Update local states when props change
  useEffect(() => {
    setLocalCheckIn(checkIn);
    setLocalCheckOut(checkOut);
    setLocalGuests(guests || 2);
  }, [checkIn, checkOut, guests]);

  // Auto-fill form with logged-in user's details
  useEffect(() => {
    if (isOpen) {
      const currentUserEmail = localStorage.getItem('currentUser');
      if (currentUserEmail) {
        const userData = localStorage.getItem(`user_${currentUserEmail}`);
        if (userData) {
          const user = JSON.parse(userData);
          setGuestName(user.fullName || '');
          setGuestEmail(user.email || '');
          setGuestPhone(user.phone || '');
          setIsLoggedIn(true);
        }
      } else {
        setIsLoggedIn(false);
      }
    }
  }, [isOpen]);

  if (!hotel) return null;

  const handleBooking = () => {
    if (!selectedRoom || !guestName || !guestEmail || !guestPhone) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Validate check-in and check-out dates
    if (!localCheckIn || !localCheckOut) {
      toast.error('Please select check-in and check-out dates', {
        description: 'Go back to the search bar and select your dates before booking.',
      });
      return;
    }

    const selectedRoomData = hotel.rooms.find((r) => r.id === selectedRoom);
    if (!selectedRoomData) return;

    const nights = calculateNights();
    const totalPrice = selectedRoomData.price * nights;

    // Generate unique booking ID
    const bookingId = `BKX${Date.now().toString().slice(-8)}`;

    // Create comprehensive booking details
    const bookingDetails = {
      bookingId: bookingId,
      hotelName: hotel.name,
      hotelImage: hotel.image,
      hotelLocation: hotel.location,
      hotelStars: hotel.stars,
      hotelRating: hotel.rating,
      roomType: selectedRoomData.type,
      checkIn: localCheckIn?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) || 'N/A',
      checkOut: localCheckOut?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) || 'N/A',
      checkInTime: '2:00 PM',
      checkOutTime: '11:00 AM',
      nights: nights,
      guests: localGuests,
      totalAmount: Math.round(totalPrice),
      guestName: guestName,
      guestEmail: guestEmail,
      guestPhone: guestPhone,
      // These will be revealed after payment
      hotelContactPhone: '+254 712 345 678',
      hotelContactEmail: 'contact@' + hotel.name.toLowerCase().replace(/\s+/g, '') + '.co.ke',
      hotelMapLink: 'https://maps.google.com/?q=' + encodeURIComponent(hotel.location),
      hotelAddress: hotel.location,
    };

    toast.success('Booking confirmed!', {
      description: `Your reservation at ${hotel.name} has been confirmed. Proceeding to payment...`,
    });

    // Reset form
    setSelectedRoom('');
    setGuestName('');
    setGuestEmail('');
    setGuestPhone('');
    onClose();

    // Navigate to confirmation page
    if (onConfirmBooking) {
      onConfirmBooking(bookingDetails);
    }
  };

  const calculateNights = () => {
    if (!localCheckIn || !localCheckOut) return 1;
    const diff = localCheckOut.getTime() - localCheckIn.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24)) || 1;
  };

  const nights = calculateNights();
  const selectedRoomData = hotel.rooms.find((r) => r.id === selectedRoom);
  const totalPrice = selectedRoomData ? selectedRoomData.price * nights : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">Complete Your Booking</DialogTitle>
          <DialogDescription>
            Fill in your details to confirm your reservation
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 md:space-y-6">
          {/* Date Warning Banner - Only show if still no dates */}
          {(!localCheckIn || !localCheckOut) && (
            <div className="bg-cyan-50 border-2 border-cyan-300 rounded-lg p-3 md:p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="size-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm md:text-base text-cyan-900 mb-1">
                    Select Your Dates Below
                  </p>
                  <p className="text-xs md:text-sm text-cyan-700">
                    Please choose your check-in and check-out dates to continue with your booking.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Hotel Info */}
          <div className="border rounded-lg p-3 md:p-4 bg-gray-50">
            <div className="flex gap-3 md:gap-4">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-20 h-20 md:w-24 md:h-24 object-cover rounded flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base md:text-lg truncate">{hotel.name}</h3>
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 mt-1">
                  <MapPin className="size-3 flex-shrink-0" />
                  <span className="truncate">{hotel.location}</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: hotel.stars }).map((_, i) => (
                    <Star key={i} className="size-3 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-xs md:text-sm ml-2">({hotel.rating})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Date & Guest Selection Section */}
          <div className="border rounded-lg p-4 bg-white space-y-4">
            <h4 className="font-semibold text-sm md:text-base flex items-center gap-2">
              <CalendarIcon className="size-4" />
              Choose Dates and Guests
            </h4>

            {/* Date Pickers */}
            <div className="grid md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-sm">Check-in Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 size-4" />
                      {localCheckIn ? format(localCheckIn, 'PPP') : <span className="text-gray-500">Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={localCheckIn}
                      onSelect={setLocalCheckIn}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Check-out Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 size-4" />
                      {localCheckOut ? format(localCheckOut, 'PPP') : <span className="text-gray-500">Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={localCheckOut}
                      onSelect={setLocalCheckOut}
                      disabled={(date) => date < (localCheckIn || new Date())}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Guest Counter */}
            <div className="space-y-2">
              <Label className="text-sm flex items-center gap-2">
                <Users className="size-4" />
                Number of Guests
              </Label>
              <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                <span className="text-sm font-medium">Guests</span>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="size-8"
                    onClick={() => setLocalGuests(Math.max(1, localGuests - 1))}
                  >
                    <Minus className="size-4" />
                  </Button>
                  <span className="font-semibold text-lg min-w-[2rem] text-center">{localGuests}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="size-8"
                    onClick={() => setLocalGuests(Math.min(10, localGuests + 1))}
                  >
                    <Plus className="size-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Stay Duration Summary */}
            {localCheckIn && localCheckOut && (
              <div className="flex items-center justify-between p-3 bg-cyan-50 border border-cyan-200 rounded-lg text-sm">
                <span className="text-gray-700">Stay Duration</span>
                <span className="font-semibold text-[#00A8E8]">
                  {nights} Night{nights > 1 ? 's' : ''} • {localGuests} Guest{localGuests > 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>

          {/* Room Selection */}
          <div className="space-y-2">
            <Label htmlFor="room" className="text-sm md:text-base">Select Room Type *</Label>
            <Select value={selectedRoom} onValueChange={setSelectedRoom}>
              <SelectTrigger id="room" className="text-sm">
                <SelectValue placeholder="Choose a room type" />
              </SelectTrigger>
              <SelectContent>
                {hotel.rooms.map((room) => (
                  <SelectItem key={room.id} value={room.id} className="text-sm">
                    {room.type} - KSh {room.price.toLocaleString()}/night ({room.available} available)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Guest Details */}
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm md:text-base">Guest Information</h4>
              {isLoggedIn && (
                <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1">
                  <CheckCircle2 className="size-4 text-green-600" />
                  <span className="text-xs font-medium text-green-700">Auto-filled</span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm">Full Name *</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                className="text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+254 712 345 678"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                className="text-sm"
              />
            </div>
          </div>

          {/* Price Summary */}
          {selectedRoomData && (
            <div className="border rounded-lg p-3 md:p-4 bg-cyan-50 space-y-2">
              <div className="flex justify-between text-xs md:text-sm">
                <span>Room Rate ({nights} night{nights > 1 ? 's' : ''})</span>
                <span>KSh {selectedRoomData.price.toLocaleString()} × {nights}</span>
              </div>
              <div className="flex justify-between font-bold text-base md:text-lg pt-2 border-t border-cyan-200">
                <span>Total</span>
                <span className="text-[#00A8E8]">KSh {totalPrice.toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 md:pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1 text-sm md:text-base">
              Cancel
            </Button>
            <Button onClick={handleBooking} className="flex-1 bg-gradient-to-r from-[#0052A3] to-[#003D7A] hover:from-[#003D7A] hover:to-[#002855] text-white text-sm md:text-base shadow-lg hover:shadow-xl transition-all duration-300">
              Confirm Booking
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}