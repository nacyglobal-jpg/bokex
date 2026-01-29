import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/app/components/ui/dialog';
import {
  Calendar,
  MapPin,
  Star,
  Clock,
  Users,
  Home,
  CheckCircle2,
  XCircle,
  MessageSquare,
  ArrowLeft,
  AlertCircle,
  ThumbsUp,
  Edit,
  CreditCard,
  Plus,
  Minus,
} from 'lucide-react';
import { toast } from 'sonner';
import bokexLogoWhiteBg from 'figma:asset/f4176c6116fee8091758a5f7301fe959e761c318.png';

interface Booking {
  bookingId: string;
  hotelName: string;
  hotelImage: string;
  hotelLocation: string;
  hotelStars: number;
  hotelRating: number;
  roomType: string;
  checkIn: string;
  checkOut: string;
  checkInTime?: string;
  checkOutTime?: string;
  nights: number;
  guests?: number;
  totalAmount: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  status: 'upcoming' | 'current' | 'past' | 'cancelled';
  paymentStatus: 'paid' | 'pending';
  bookingDate: string;
  review?: {
    rating: number;
    comment: string;
    date: string;
  };
}

interface MyBookingsProps {
  onBackToHome: () => void;
  userEmail: string;
}

export function MyBookings({ onBackToHome, userEmail }: MyBookingsProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [rating, setRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);

  // Edit booking state
  const [editCheckIn, setEditCheckIn] = useState<Date | undefined>(undefined);
  const [editCheckOut, setEditCheckOut] = useState<Date | undefined>(undefined);
  const [editGuests, setEditGuests] = useState(2);

  useEffect(() => {
    loadBookings();
  }, [userEmail]);

  const loadBookings = () => {
    const storedBookings = localStorage.getItem(`bookings_${userEmail}`);
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
  };

  const saveBookings = (updatedBookings: Booking[]) => {
    localStorage.setItem(`bookings_${userEmail}`, JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
  };

  const handleOpenReviewModal = (booking: Booking) => {
    setSelectedBooking(booking);
    if (booking.review) {
      setRating(booking.review.rating);
      setReviewComment(booking.review.comment);
    } else {
      setRating(0);
      setReviewComment('');
    }
    setIsReviewModalOpen(true);
  };

  const handleSubmitReview = () => {
    if (!selectedBooking) return;

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (!reviewComment.trim()) {
      toast.error('Please write a review comment');
      return;
    }

    const updatedBookings = bookings.map((booking) => {
      if (booking.bookingId === selectedBooking.bookingId) {
        return {
          ...booking,
          review: {
            rating,
            comment: reviewComment,
            date: new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }),
          },
        };
      }
      return booking;
    });

    saveBookings(updatedBookings);
    setIsReviewModalOpen(false);
    toast.success('Review submitted successfully!', {
      description: 'Thank you for your feedback.',
    });
  };

  const handleCancelBooking = (booking: Booking) => {
    if (booking.status === 'past') {
      toast.error('Cannot cancel past bookings');
      return;
    }

    const updatedBookings = bookings.map((b) => {
      if (b.bookingId === booking.bookingId) {
        return { ...b, status: 'cancelled' as const };
      }
      return b;
    });

    saveBookings(updatedBookings);
    toast.success('Booking cancelled successfully', {
      description: 'Your booking has been cancelled.',
    });
  };

  const handleOpenEditModal = (booking: Booking) => {
    setSelectedBooking(booking);
    // Parse the date strings to Date objects
    const checkInDate = new Date(booking.checkIn);
    const checkOutDate = new Date(booking.checkOut);
    setEditCheckIn(checkInDate);
    setEditCheckOut(checkOutDate);
    setEditGuests(booking.guests || 2);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (!selectedBooking || !editCheckIn || !editCheckOut) {
      toast.error('Please select check-in and check-out dates');
      return;
    }

    if (editCheckOut <= editCheckIn) {
      toast.error('Check-out date must be after check-in date');
      return;
    }

    const nights = Math.ceil((editCheckOut.getTime() - editCheckIn.getTime()) / (1000 * 60 * 60 * 24));
    const pricePerNight = selectedBooking.totalAmount / selectedBooking.nights;
    const newTotalAmount = Math.round(pricePerNight * nights);

    const updatedBookings = bookings.map((booking) => {
      if (booking.bookingId === selectedBooking.bookingId) {
        return {
          ...booking,
          checkIn: editCheckIn.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          }),
          checkOut: editCheckOut.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          }),
          nights: nights,
          guests: editGuests,
          totalAmount: newTotalAmount,
        };
      }
      return booking;
    });

    saveBookings(updatedBookings);
    setIsEditModalOpen(false);
    toast.success('Booking updated successfully!', {
      description: `Total amount updated to KSh ${newTotalAmount.toLocaleString()}`,
    });
  };

  const handleProceedToPayment = (booking: Booking) => {
    // Show payment processing dialog
    toast.info('Processing payment...', {
      description: 'Opening MPESA STK Push',
    });

    // Simulate payment - in real app, this would trigger actual payment
    setTimeout(() => {
      const updatedBookings = bookings.map((b) => {
        if (b.bookingId === booking.bookingId) {
          return { ...b, paymentStatus: 'paid' as const };
        }
        return b;
      });

      saveBookings(updatedBookings);
      toast.success('Payment successful!', {
        description: 'Your booking is now confirmed.',
      });
    }, 2000);
  };

  const currentBookings = bookings.filter(
    (b) => b.status === 'current' || b.status === 'upcoming'
  );
  const pastBookings = bookings.filter((b) => b.status === 'past');
  const cancelledBookings = bookings.filter((b) => b.status === 'cancelled');

  const getStatusBadge = (status: string, paymentStatus: string) => {
    if (status === 'cancelled') {
      return (
        <div className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
          <XCircle className="size-3" />
          Cancelled
        </div>
      );
    }

    if (paymentStatus === 'pending') {
      return (
        <div className="flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
          <AlertCircle className="size-3" />
          Payment Pending
        </div>
      );
    }

    if (status === 'current') {
      return (
        <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
          <CheckCircle2 className="size-3" />
          Current Stay
        </div>
      );
    }

    if (status === 'upcoming') {
      return (
        <div className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
          <Clock className="size-3" />
          Upcoming
        </div>
      );
    }

    if (status === 'past') {
      return (
        <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
          <CheckCircle2 className="size-3" />
          Completed
        </div>
      );
    }

    return null;
  };

  const BookingCard = ({ booking }: { booking: Booking }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Hotel Image */}
          <div className="flex-shrink-0">
            <img
              src={booking.hotelImage}
              alt={booking.hotelName}
              className="w-full md:w-48 h-40 object-cover rounded-lg"
            />
          </div>

          {/* Booking Details */}
          <div className="flex-1 space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg md:text-xl truncate">
                  {booking.hotelName}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <MapPin className="size-4 flex-shrink-0" />
                  <span className="truncate">{booking.hotelLocation}</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: booking.hotelStars }).map((_, i) => (
                    <Star key={i} className="size-3 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm ml-1">({booking.hotelRating})</span>
                </div>
              </div>
              {getStatusBadge(booking.status, booking.paymentStatus)}
            </div>

            {/* Booking Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div>
                <p className="text-gray-600 text-xs">Check-in</p>
                <p className="font-semibold truncate">{booking.checkIn.split(',')[0]}</p>
                {booking.checkInTime && (
                  <p className="text-xs text-gray-500">{booking.checkInTime}</p>
                )}
              </div>
              <div>
                <p className="text-gray-600 text-xs">Check-out</p>
                <p className="font-semibold truncate">{booking.checkOut.split(',')[0]}</p>
                {booking.checkOutTime && (
                  <p className="text-xs text-gray-500">{booking.checkOutTime}</p>
                )}
              </div>
              <div>
                <p className="text-gray-600 text-xs">Room Type</p>
                <p className="font-semibold truncate">{booking.roomType}</p>
              </div>
              <div>
                <p className="text-gray-600 text-xs">Guests</p>
                <p className="font-semibold">{booking.guests || 2}</p>
              </div>
            </div>

            {/* Booking ID and Amount */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t">
              <div>
                <p className="text-xs text-gray-600">Booking ID</p>
                <p className="font-mono font-semibold text-sm text-[#00A8E8]">
                  {booking.bookingId}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-600">Total Amount</p>
                <p className="font-bold text-lg text-[#0052A3]">
                  KSh {booking.totalAmount.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Review Display (if exists) */}
            {booking.review && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="size-4 text-yellow-600" />
                  <span className="font-semibold text-sm">Your Review</span>
                  <div className="flex items-center gap-1 ml-auto">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`size-3 ${
                          i < booking.review!.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700">{booking.review.comment}</p>
                <p className="text-xs text-gray-500 mt-2">Reviewed on {booking.review.date}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-2">
              {booking.status === 'past' && !booking.review && (
                <Button
                  onClick={() => handleOpenReviewModal(booking)}
                  size="sm"
                  className="bg-[#00A8E8] hover:bg-[#0052A3]"
                >
                  <Star className="size-4 mr-1" />
                  Write Review
                </Button>
              )}
              {booking.status === 'past' && booking.review && (
                <Button
                  onClick={() => handleOpenReviewModal(booking)}
                  size="sm"
                  variant="outline"
                >
                  <Star className="size-4 mr-1" />
                  Edit Review
                </Button>
              )}
              {booking.paymentStatus === 'pending' && booking.status !== 'cancelled' && (
                <Button
                  onClick={() => handleProceedToPayment(booking)}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <CreditCard className="size-4 mr-1" />
                  Pay Now
                </Button>
              )}
              {booking.paymentStatus === 'paid' && (booking.status === 'current' || booking.status === 'upcoming') && (
                <Button
                  onClick={() => handleOpenEditModal(booking)}
                  size="sm"
                  className="bg-[#00A8E8] hover:bg-[#0052A3]"
                >
                  <Edit className="size-4 mr-1" />
                  Edit Booking
                </Button>
              )}
              {(booking.status === 'current' || booking.status === 'upcoming') && (
                <Button
                  onClick={() => handleCancelBooking(booking)}
                  size="sm"
                  variant="outline"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <XCircle className="size-4 mr-1" />
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={onBackToHome}
                variant="ghost"
                size="icon"
                className="md:hidden"
              >
                <ArrowLeft className="size-5" />
              </Button>
              <button onClick={onBackToHome}>
                <img src={bokexLogoWhiteBg} alt="Bokex" className="h-8 md:h-10" />
              </button>
            </div>
            <Button onClick={onBackToHome} variant="outline" className="hidden md:flex">
              <ArrowLeft className="size-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {/* Page Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            My Bookings
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            View and manage all your hotel reservations
          </p>
        </div>

        {bookings.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="size-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Bookings Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start exploring hotels and make your first booking!
              </p>
              <Button onClick={onBackToHome} className="bg-[#00A8E8] hover:bg-[#0052A3]">
                <Home className="size-4 mr-2" />
                Explore Hotels
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="current" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="current" className="text-xs md:text-sm">
                Current & Upcoming ({currentBookings.length})
              </TabsTrigger>
              <TabsTrigger value="past" className="text-xs md:text-sm">
                Past ({pastBookings.length})
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="text-xs md:text-sm">
                Cancelled ({cancelledBookings.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="space-y-4">
              {currentBookings.length === 0 ? (
                <Card className="text-center py-8">
                  <CardContent>
                    <Clock className="size-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No current or upcoming bookings</p>
                  </CardContent>
                </Card>
              ) : (
                currentBookings.map((booking) => (
                  <BookingCard key={booking.bookingId} booking={booking} />
                ))
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {pastBookings.length === 0 ? (
                <Card className="text-center py-8">
                  <CardContent>
                    <CheckCircle2 className="size-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No past bookings</p>
                  </CardContent>
                </Card>
              ) : (
                pastBookings.map((booking) => (
                  <BookingCard key={booking.bookingId} booking={booking} />
                ))
              )}
            </TabsContent>

            <TabsContent value="cancelled" className="space-y-4">
              {cancelledBookings.length === 0 ? (
                <Card className="text-center py-8">
                  <CardContent>
                    <XCircle className="size-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No cancelled bookings</p>
                  </CardContent>
                </Card>
              ) : (
                cancelledBookings.map((booking) => (
                  <BookingCard key={booking.bookingId} booking={booking} />
                ))
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>

      {/* Review Modal */}
      <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedBooking?.review ? 'Edit Your Review' : 'Write a Review'}
            </DialogTitle>
            <DialogDescription>
              Share your experience at {selectedBooking?.hotelName}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Star Rating */}
            <div className="space-y-2">
              <Label>Rating *</Label>
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRating(i + 1)}
                    onMouseEnter={() => setHoveredStar(i + 1)}
                    onMouseLeave={() => setHoveredStar(0)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`size-8 ${
                        i < (hoveredStar || rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
                {rating > 0 && (
                  <span className="text-sm text-gray-600 ml-2">
                    {rating} star{rating > 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>

            {/* Review Comment */}
            <div className="space-y-2">
              <Label htmlFor="review-comment">Your Review *</Label>
              <Textarea
                id="review-comment"
                placeholder="Tell us about your stay... What did you like? What could be improved?"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                rows={5}
                className="resize-none"
              />
              <p className="text-xs text-gray-500">
                Your review helps other travelers make informed decisions
              </p>
            </div>

            {/* Hotel Info */}
            <div className="bg-gray-50 rounded-lg p-3 border">
              <div className="flex items-center gap-3">
                <img
                  src={selectedBooking?.hotelImage}
                  alt={selectedBooking?.hotelName}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">
                    {selectedBooking?.hotelName}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    {selectedBooking?.hotelLocation}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {selectedBooking?.checkIn.split(',')[0]} - {selectedBooking?.checkOut.split(',')[0]}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => setIsReviewModalOpen(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitReview}
                className="flex-1 bg-[#00A8E8] hover:bg-[#0052A3]"
              >
                <ThumbsUp className="size-4 mr-2" />
                Submit Review
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Booking Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              Edit Booking
            </DialogTitle>
            <DialogDescription>
              Update your booking details
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Check-in Date */}
            <div className="space-y-2">
              <Label>Check-in Date *</Label>
              <Input
                type="date"
                value={editCheckIn?.toISOString().split('T')[0] || ''}
                onChange={(e) => setEditCheckIn(new Date(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Check-out Date */}
            <div className="space-y-2">
              <Label>Check-out Date *</Label>
              <Input
                type="date"
                value={editCheckOut?.toISOString().split('T')[0] || ''}
                onChange={(e) => setEditCheckOut(new Date(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Number of Guests */}
            <div className="space-y-2">
              <Label>Number of Guests *</Label>
              <Input
                type="number"
                value={editGuests}
                onChange={(e) => setEditGuests(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => setIsEditModalOpen(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveEdit}
                className="flex-1 bg-[#00A8E8] hover:bg-[#0052A3]"
              >
                <ThumbsUp className="size-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}