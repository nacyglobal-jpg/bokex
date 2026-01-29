import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Star, 
  Phone, 
  Mail, 
  MessageSquare, 
  CreditCard, 
  Lock, 
  Unlock, 
  Calendar, 
  User, 
  Home, 
  ExternalLink,
  Loader2,
  AlertCircle,
  Users
} from 'lucide-react';
import { toast } from 'sonner';
import bokexLogoWhiteBg from 'figma:asset/f4176c6116fee8091758a5f7301fe959e761c318.png';

interface BookingConfirmationProps {
  bookingDetails: {
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
    // These are revealed after payment
    hotelContactPhone?: string;
    hotelContactEmail?: string;
    hotelMapLink?: string;
    hotelAddress?: string;
  };
  onBackToHome: () => void;
}

export function BookingConfirmation({ bookingDetails, onBackToHome }: BookingConfirmationProps) {
  const [paymentPhone, setPaymentPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  // Save booking to localStorage when component mounts
  useEffect(() => {
    if (bookingDetails) {
      const currentUserEmail = localStorage.getItem('currentUser');
      if (currentUserEmail) {
        saveBookingToLocalStorage(currentUserEmail);
      }
    }
  }, [bookingDetails]);

  const saveBookingToLocalStorage = (userEmail: string) => {
    const existingBookings = localStorage.getItem(`bookings_${userEmail}`);
    const bookings = existingBookings ? JSON.parse(existingBookings) : [];
    
    // Check if booking already exists
    const bookingExists = bookings.some((b: any) => b.bookingId === bookingDetails.bookingId);
    
    if (!bookingExists) {
      const newBooking = {
        ...bookingDetails,
        status: 'upcoming',
        paymentStatus: 'pending',
        bookingDate: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
      };
      
      bookings.unshift(newBooking); // Add to beginning
      localStorage.setItem(`bookings_${userEmail}`, JSON.stringify(bookings));
    }
  };

  const updateBookingPaymentStatus = (userEmail: string) => {
    const existingBookings = localStorage.getItem(`bookings_${userEmail}`);
    if (existingBookings) {
      const bookings = JSON.parse(existingBookings);
      const updatedBookings = bookings.map((b: any) => {
        if (b.bookingId === bookingDetails.bookingId) {
          return { ...b, paymentStatus: 'paid' };
        }
        return b;
      });
      localStorage.setItem(`bookings_${userEmail}`, JSON.stringify(updatedBookings));
    }
  };

  // Validate booking details exist
  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No booking details found</p>
          <Button onClick={onBackToHome}>Return to Home</Button>
        </div>
      </div>
    );
  }

  const handleProceedToPayment = () => {
    if (!paymentPhone) {
      toast.error('Please enter your M-PESA phone number');
      return;
    }

    setIsProcessing(true);
    toast.info('Initiating payment...', {
      description: 'Please check your phone for the M-PESA prompt',
    });

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      
      // Update payment status in localStorage
      const currentUserEmail = localStorage.getItem('currentUser');
      if (currentUserEmail) {
        updateBookingPaymentStatus(currentUserEmail);
      }
      
      toast.success('Payment successful!', {
        description: 'Your booking has been confirmed and payment received.',
      });
    }, 3000);
  };

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast.error('Please enter a message');
      return;
    }

    setMessageSent(true);
    toast.success('Message Sent!', {
      description: 'The hotel will receive your message and respond shortly.',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button onClick={onBackToHome}>
              <img src={bokexLogoWhiteBg} alt="Bokex" className="h-8 md:h-10" />
            </button>
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="size-5" />
              <span className="font-semibold text-sm md:text-base">Booking Confirmed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
        {/* Success Banner */}
        <div className="bg-gradient-to-r from-green-50 to-cyan-50 border-2 border-green-200 rounded-lg p-4 md:p-6 mb-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="size-6 md:size-8 text-green-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                Booking Confirmed Successfully!
              </h1>
              <p className="text-sm md:text-base text-gray-700 mb-3">
                Your booking ID: <span className="font-mono font-semibold text-[#00A8E8]">{bookingDetails.bookingId}</span>
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                We've sent a confirmation email to <strong>{bookingDetails.guestEmail}</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Details Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Booking Details</CardTitle>
                <CardDescription>Review your reservation information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Hotel Info */}
                <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={bookingDetails.hotelImage}
                    alt={bookingDetails.hotelName}
                    className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base md:text-lg mb-1 truncate">
                      {bookingDetails.hotelName}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <MapPin className="size-4 flex-shrink-0" />
                      <span className="truncate">{bookingDetails.hotelLocation}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: bookingDetails.hotelStars }).map((_, i) => (
                        <Star key={i} className="size-3 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm ml-2">({bookingDetails.hotelRating})</span>
                    </div>
                  </div>
                </div>

                {/* Reservation Details Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Calendar className="size-4" />
                      <span className="font-medium">Check-in</span>
                    </div>
                    <p className="font-semibold text-gray-900 ml-6">{bookingDetails.checkIn}</p>
                    {bookingDetails.checkInTime && (
                      <p className="text-xs text-gray-600 ml-6">at {bookingDetails.checkInTime}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Calendar className="size-4" />
                      <span className="font-medium">Check-out</span>
                    </div>
                    <p className="font-semibold text-gray-900 ml-6">{bookingDetails.checkOut}</p>
                    {bookingDetails.checkOutTime && (
                      <p className="text-xs text-gray-600 ml-6">by {bookingDetails.checkOutTime}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Home className="size-4" />
                      <span className="font-medium">Room Type</span>
                    </div>
                    <p className="font-semibold text-gray-900 ml-6">{bookingDetails.roomType}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Clock className="size-4" />
                      <span className="font-medium">Stay Duration</span>
                    </div>
                    <p className="font-semibold text-gray-900 ml-6">
                      {bookingDetails.nights} Night{bookingDetails.nights > 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <User className="size-4" />
                      <span className="font-medium">Guest Name</span>
                    </div>
                    <p className="font-semibold text-gray-900 ml-6">{bookingDetails.guestName}</p>
                  </div>
                  {bookingDetails.guests && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Users className="size-4" />
                        <span className="font-medium">Occupancy</span>
                      </div>
                      <p className="font-semibold text-gray-900 ml-6">
                        {bookingDetails.guests} Guest{bookingDetails.guests > 1 ? 's' : ''}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Payment Section */}
            <Card className={isPaid ? 'border-green-300 bg-green-50/30' : 'border-orange-300 bg-orange-50/30'}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg md:text-xl flex items-center gap-2">
                      {isPaid ? (
                        <>
                          <CheckCircle2 className="size-5 text-green-600" />
                          Payment Completed
                        </>
                      ) : (
                        <>
                          <CreditCard className="size-5 text-orange-600" />
                          Complete Payment
                        </>
                      )}
                    </CardTitle>
                    <CardDescription>
                      {isPaid 
                        ? 'Your payment has been received successfully'
                        : 'Pay via MPESA to access full hotel contact details'}
                    </CardDescription>
                  </div>
                  {isPaid ? (
                    <Unlock className="size-6 text-green-600" />
                  ) : (
                    <Lock className="size-6 text-orange-600" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isPaid ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-green-700 bg-green-100 rounded-lg p-3">
                      <CheckCircle2 className="size-5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-sm">Payment Confirmed</p>
                        <p className="text-xs">KSh {bookingDetails.totalAmount.toLocaleString()} paid via MPESA</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 bg-white rounded p-3 border">
                      <p className="font-medium mb-1">Transaction Details:</p>
                      <p>Paybill: 4005207 - NACY GLOBAL TECHNOLOGIES</p>
                      <p>Amount: KSh {bookingDetails.totalAmount.toLocaleString()}</p>
                      <p>Phone: {paymentPhone}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">Total Amount:</span>
                        <span className="text-2xl font-bold text-[#00A8E8]">
                          KSh {bookingDetails.totalAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mpesa-phone">MPESA Phone Number *</Label>
                      <Input
                        id="mpesa-phone"
                        type="tel"
                        placeholder="e.g., 0712345678"
                        value={paymentPhone}
                        onChange={(e) => setPaymentPhone(e.target.value)}
                        disabled={isProcessing}
                      />
                      <p className="text-xs text-gray-500">
                        You will receive an STK Push prompt on this number
                      </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-gray-700">
                      <p className="font-semibold mb-1">Payment Method: MPESA Paybill</p>
                      <p>Paybill Number: <span className="font-mono font-semibold">4005207</span></p>
                      <p>Business: NACY GLOBAL TECHNOLOGIES</p>
                    </div>

                    <Button 
                      onClick={handleProceedToPayment}
                      disabled={isProcessing}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="size-4 mr-2 animate-spin" />
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <CreditCard className="size-4 mr-2" />
                          Pay KSh {bookingDetails.totalAmount.toLocaleString()} via MPESA
                        </>
                      )}
                    </Button>

                    <div className="flex items-start gap-2 text-xs text-orange-700 bg-orange-50 rounded p-3 border border-orange-200">
                      <AlertCircle className="size-4 flex-shrink-0 mt-0.5" />
                      <p>
                        <strong>Note:</strong> Hotel contact details will be revealed after successful payment
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Message to Property */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl flex items-center gap-2">
                  <MessageSquare className="size-5" />
                  Message to Property
                </CardTitle>
                <CardDescription>
                  Send a message to the hotel about your booking
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea
                    id="message"
                    placeholder="E.g., I'll be arriving late at 10 PM. Please keep my reservation..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    disabled={messageSent}
                  />
                </div>
                <Button 
                  onClick={handleSendMessage}
                  disabled={messageSent}
                  variant="outline"
                  className="w-full"
                >
                  {messageSent ? (
                    <>
                      <CheckCircle2 className="size-4 mr-2 text-green-600" />
                      Message Sent
                    </>
                  ) : (
                    <>
                      <MessageSquare className="size-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
                {messageSent && (
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <CheckCircle2 className="size-3" />
                    Your message has been delivered to the hotel
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            {/* Hotel Contact Details - Locked/Unlocked */}
            <Card className={isPaid ? 'border-green-300' : 'border-gray-300'}>
              <CardHeader>
                <CardTitle className="text-base md:text-lg flex items-center gap-2">
                  {isPaid ? (
                    <>
                      <Unlock className="size-5 text-green-600" />
                      Hotel Contact Details
                    </>
                  ) : (
                    <>
                      <Lock className="size-5 text-gray-400" />
                      Hotel Contact Details
                    </>
                  )}
                </CardTitle>
                <CardDescription>
                  {isPaid 
                    ? 'Contact the hotel directly' 
                    : 'Available after payment'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isPaid ? (
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <Phone className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-600 mb-1">Phone Number</p>
                          <a 
                            href={`tel:${bookingDetails.hotelContactPhone}`}
                            className="font-semibold text-sm text-[#0052A3] hover:underline break-all"
                          >
                            {bookingDetails.hotelContactPhone || '+254 712 345 678'}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <Mail className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-600 mb-1">Email Address</p>
                          <a 
                            href={`mailto:${bookingDetails.hotelContactEmail}`}
                            className="font-semibold text-sm text-[#0052A3] hover:underline break-all"
                          >
                            {bookingDetails.hotelContactEmail || 'contact@hotel.com'}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <MapPin className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-600 mb-1">Address</p>
                          <p className="font-semibold text-sm text-gray-900 break-words">
                            {bookingDetails.hotelAddress || bookingDetails.hotelLocation}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button 
                      onClick={() => window.open(bookingDetails.hotelMapLink || 'https://maps.google.com', '_blank')}
                      variant="outline"
                      className="w-full"
                    >
                      <ExternalLink className="size-4 mr-2" />
                      View on Google Maps
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-gray-100 rounded-lg p-4 text-center">
                      <Lock className="size-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        Contact Details Locked
                      </p>
                      <p className="text-xs text-gray-600">
                        Complete payment to access hotel phone, email, and location details
                      </p>
                    </div>
                    <div className="space-y-2 text-xs text-gray-500">
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <Phone className="size-4 text-gray-400" />
                        <span>Phone: ••• ••• ••••</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <Mail className="size-4 text-gray-400" />
                        <span>Email: •••••@••••.com</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <MapPin className="size-4 text-gray-400" />
                        <span>Address: •••••••••</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Important Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Important Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs md:text-sm text-gray-700">
                <div className="flex gap-2">
                  <CheckCircle2 className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <p>Check-in time: 2:00 PM</p>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <p>Check-out time: 11:00 AM</p>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <p>Please bring a valid ID for check-in</p>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <p>Cancellation free up to 24 hours before check-in</p>
                </div>
              </CardContent>
            </Card>

            {/* Back to Home */}
            <Button 
              onClick={onBackToHome}
              variant="outline"
              className="w-full"
            >
              <Home className="size-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}