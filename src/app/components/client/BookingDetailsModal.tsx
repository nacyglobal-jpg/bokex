import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { useState } from 'react';
import { 
  X, 
  Calendar, 
  MapPin, 
  User, 
  Users, 
  Phone, 
  Mail, 
  DollarSign,
  CheckCircle,
  Clock,
  Bed,
  Moon,
  CreditCard,
  MessageSquare,
  Edit,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';

interface Booking {
  id: number;
  bookingId: string;
  guest: string;
  avatar: string;
  checkIn: string;
  checkOut: string;
  room: string;
  price: number;
  status: 'confirmed' | 'pending' | 'checked-in' | 'completed' | 'canceled';
  bookingDate: string;
  nights: number;
  guests: number;
  email?: string;
  phone?: string;
  specialRequests?: string;
  paymentMethod?: string;
  paymentStatus?: string;
}

interface BookingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: Booking | null;
  onStatusChange?: (bookingId: number, newStatus: Booking['status']) => void;
  onDelete?: (bookingId: number) => void;
}

export function BookingDetailsModal({ 
  isOpen, 
  onClose, 
  bookingData: booking,
  onStatusChange,
  onDelete
}: BookingDetailsModalProps) {
  if (!isOpen || !booking) return null;

  const handleStatusChange = (newStatus: Booking['status']) => {
    if (booking.status === newStatus) {
      toast.info('Booking is already in this status');
      return;
    }

    // Show confirmation for critical status changes
    if (newStatus === 'canceled') {
      if (!window.confirm('Are you sure you want to cancel this booking? This will notify the guest.')) {
        return;
      }
    }

    if (onStatusChange) {
      onStatusChange(booking.id, newStatus);
      const statusMessages: Record<Booking['status'], string> = {
        pending: '⏳ Booking marked as Pending - Awaiting confirmation',
        confirmed: '✅ Booking Confirmed - Guest will be notified',
        'checked-in': '🏨 Guest Checked In - Welcome!',
        completed: '✨ Booking Completed - Thank you!',
        canceled: '❌ Booking Canceled - Guest will be notified'
      };
      toast.success(statusMessages[newStatus]);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this booking? This action cannot be undone.')) {
      if (onDelete) {
        onDelete(booking.id);
        toast.success('Booking deleted successfully');
        onClose();
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'checked-in': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-purple-100 text-purple-700';
      case 'canceled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl my-8">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#0A2540] to-[#00A8E8] text-white p-6 rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold">Booking Details</h2>
                <Badge className={`${getStatusColor(booking.status)} hover:${getStatusColor(booking.status)}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1).replace('-', ' ')}
                </Badge>
              </div>
              <p className="text-cyan-100 text-sm font-mono">Booking ID: {booking.bookingId}</p>
            </div>
            <button
              onClick={onClose}
              className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[calc(100vh-16rem)] overflow-y-auto">
          {/* Guest Information */}
          <Card className="border-2 border-gray-100">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="size-5 text-[#00A8E8]" />
                Guest Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={booking.avatar} />
                  <AvatarFallback className="bg-[#00A8E8] text-white text-xl">
                    {booking.guest.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{booking.guest}</h3>
                  <div className="flex flex-col gap-1 mt-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="size-4 text-[#00A8E8]" />
                      <span>{booking.email || `${booking.guest.toLowerCase().replace(' ', '.')}@email.com`}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="size-4 text-[#00A8E8]" />
                      <span>{booking.phone || '+254 7XX XXX XXX'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Dates & Duration */}
            <Card className="border-2 border-gray-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="size-5 text-[#00A8E8]" />
                  Dates & Duration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Check-In</span>
                  <span className="text-sm font-semibold text-gray-900">{booking.checkIn}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Check-Out</span>
                  <span className="text-sm font-semibold text-gray-900">{booking.checkOut}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <Moon className="size-4" />
                    Nights
                  </span>
                  <span className="text-sm font-bold text-[#0052A3]">{booking.nights}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <Users className="size-4" />
                    Guests
                  </span>
                  <span className="text-sm font-bold text-[#0052A3]">{booking.guests}</span>
                </div>
              </CardContent>
            </Card>

            {/* Room Information */}
            <Card className="border-2 border-gray-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Bed className="size-5 text-[#00A8E8]" />
                  Room Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Room Type</span>
                  <span className="text-sm font-semibold text-gray-900">{booking.room}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Booked On</span>
                  <span className="text-sm font-semibold text-gray-900">{booking.bookingDate}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Information */}
          <Card className="border-2 border-[#00A8E8]/20 bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <DollarSign className="size-5 text-[#00A8E8]" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Amount</span>
                <span className="text-2xl font-bold text-[#0052A3]">
                  KSh {booking.price.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#00A8E8]/20">
                <span className="text-sm text-gray-600">Payment Method</span>
                <span className="text-sm font-semibold text-gray-900">
                  {booking.paymentMethod || 'MPESA PAYBILL'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Payment Status</span>
                <Badge className="bg-green-100 text-green-700">
                  <CheckCircle className="size-3 mr-1" />
                  {booking.paymentStatus || 'Paid'}
                </Badge>
              </div>
              <div className="bg-white/60 rounded-lg p-3 mt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Paybill:</span>
                  <span className="font-bold text-[#00A8E8]">4005207</span>
                </div>
                <div className="flex items-center justify-between text-xs mt-1">
                  <span className="text-gray-600">Business:</span>
                  <span className="font-bold text-gray-900">NACY GLOBAL TECHNOLOGIES</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Special Requests */}
          {booking.specialRequests && (
            <Card className="border-2 border-gray-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <MessageSquare className="size-5 text-[#00A8E8]" />
                  Special Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">{booking.specialRequests}</p>
              </CardContent>
            </Card>
          )}

          {/* Status Management */}
          <Card className="border-2 border-gray-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="size-5 text-[#00A8E8]" />
                Booking Status Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  <strong>Status Workflow:</strong> Pending → Confirmed → Checked In → Completed
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {(['pending', 'confirmed', 'checked-in', 'completed', 'canceled'] as const).map((status) => (
                  <Button
                    key={status}
                    size="sm"
                    variant={booking.status === status ? 'default' : 'outline'}
                    onClick={() => handleStatusChange(status)}
                    className={booking.status === status ? 'bg-[#0052A3] hover:bg-[#003d7a]' : ''}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 p-6 bg-gray-50 rounded-b-2xl">
          <div className="flex items-center justify-between gap-3">
            <Button
              variant="outline"
              onClick={handleDelete}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
            >
              <Trash2 className="size-4 mr-2" />
              Delete Booking
            </Button>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onClose}
              >
                Close
              </Button>
              <Button
                className="bg-[#00A8E8] hover:bg-[#0086ba]"
                onClick={() => {
                  toast.success('Booking details sent to guest via email');
                }}
              >
                <Mail className="size-4 mr-2" />
                Send Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}