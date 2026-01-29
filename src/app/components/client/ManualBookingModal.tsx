import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { Calendar, User, Hotel, DollarSign, Clock, Users, Minus, Plus } from 'lucide-react';

interface ManualBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (booking: ManualBookingData) => void;
}

export interface ManualBookingData {
  guest: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  room: string;
  price: number;
  nights: number;
  guests: number;
  status: 'confirmed' | 'pending';
  paymentStatus: 'paid' | 'pending' | 'partial';
  specialRequests?: string;
}

const roomTypes = [
  { value: 'Standard Room', price: 32865 },
  { value: 'Deluxe Room', price: 39445 },
  { value: 'King Suite', price: 49075 },
  { value: 'Executive Suite', price: 65730 },
  { value: 'Presidential Suite', price: 98150 },
];

export function ManualBookingModal({ isOpen, onClose, onSubmit }: ManualBookingModalProps) {
  const [formData, setFormData] = useState<ManualBookingData>({
    guest: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    room: '',
    price: 0,
    nights: 1,
    guests: 1,
    status: 'confirmed',
    paymentStatus: 'pending',
    specialRequests: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [durationMode, setDurationMode] = useState<'dates' | 'days'>('dates');

  const handleRoomChange = (roomType: string) => {
    const selectedRoom = roomTypes.find(r => r.value === roomType);
    setFormData(prev => ({
      ...prev,
      room: roomType,
      price: selectedRoom ? selectedRoom.price * prev.nights : 0,
    }));
  };

  const calculateNights = (checkIn: string, checkOut: string) => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const handleCheckInChange = (value: string) => {
    if (durationMode === 'dates') {
      const nights = calculateNights(value, formData.checkOut);
      const selectedRoom = roomTypes.find(r => r.value === formData.room);
      setFormData(prev => ({
        ...prev,
        checkIn: value,
        nights,
        price: selectedRoom ? selectedRoom.price * nights : 0,
      }));
    } else {
      // In days mode, calculate checkout based on nights
      const checkInDate = new Date(value);
      const checkOutDate = new Date(checkInDate);
      checkOutDate.setDate(checkOutDate.getDate() + formData.nights);
      const selectedRoom = roomTypes.find(r => r.value === formData.room);
      setFormData(prev => ({
        ...prev,
        checkIn: value,
        checkOut: checkOutDate.toISOString().split('T')[0],
        price: selectedRoom ? selectedRoom.price * prev.nights : 0,
      }));
    }
  };

  const handleCheckOutChange = (value: string) => {
    const nights = calculateNights(formData.checkIn, value);
    const selectedRoom = roomTypes.find(r => r.value === formData.room);
    setFormData(prev => ({
      ...prev,
      checkOut: value,
      nights,
      price: selectedRoom ? selectedRoom.price * nights : 0,
    }));
  };

  const handleDaysChange = (days: number) => {
    if (days < 1) days = 1;
    if (days > 365) days = 365;
    
    const selectedRoom = roomTypes.find(r => r.value === formData.room);
    
    // Update checkout date if check-in is set
    let newCheckOut = formData.checkOut;
    if (formData.checkIn) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(checkInDate);
      checkOutDate.setDate(checkOutDate.getDate() + days);
      newCheckOut = checkOutDate.toISOString().split('T')[0];
    }
    
    setFormData(prev => ({
      ...prev,
      nights: days,
      checkOut: newCheckOut,
      price: selectedRoom ? selectedRoom.price * days : 0,
    }));
  };

  const handleGuestsChange = (count: number) => {
    if (count < 1) count = 1;
    if (count > 20) count = 20;
    
    setFormData(prev => ({
      ...prev,
      guests: count,
    }));
  };

  const handleDurationModeChange = (mode: 'dates' | 'days') => {
    setDurationMode(mode);
    if (mode === 'days' && formData.checkIn) {
      // Recalculate checkout based on current nights
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(checkInDate);
      checkOutDate.setDate(checkOutDate.getDate() + formData.nights);
      setFormData(prev => ({
        ...prev,
        checkOut: checkOutDate.toISOString().split('T')[0],
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.guest.trim()) newErrors.guest = 'Guest name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.checkIn) newErrors.checkIn = 'Check-in date is required';
    if (!formData.checkOut) newErrors.checkOut = 'Check-out date is required';
    if (!formData.room) newErrors.room = 'Room type is required';
    
    if (formData.checkIn && formData.checkOut) {
      const checkIn = new Date(formData.checkIn);
      const checkOut = new Date(formData.checkOut);
      if (checkOut <= checkIn) {
        newErrors.checkOut = 'Check-out must be after check-in';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      guest: '',
      email: '',
      phone: '',
      checkIn: '',
      checkOut: '',
      room: '',
      price: 0,
      nights: 1,
      guests: 1,
      status: 'confirmed',
      paymentStatus: 'pending',
      specialRequests: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Create Manual Booking
          </DialogTitle>
          <p className="text-sm text-gray-600">
            Add a new booking manually to your property calendar
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Guest Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-900 font-semibold">
              <User className="size-5" />
              <h3>Guest Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="guest">Guest Name *</Label>
                <input
                  id="guest"
                  type="text"
                  value={formData.guest}
                  onChange={(e) => setFormData({ ...formData, guest: e.target.value })}
                  className={`w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8E8] ${
                    errors.guest ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="John Doe"
                />
                {errors.guest && <p className="text-xs text-red-500 mt-1">{errors.guest}</p>}
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8E8] ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+254 700 123 456"
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8E8] ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="john.doe@example.com"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Booking Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-900 font-semibold">
              <Calendar className="size-5" />
              <h3>Booking Details</h3>
            </div>

            {/* Duration Mode Toggle */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <Label className="mb-2">Stay Duration Method</Label>
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => handleDurationModeChange('dates')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    durationMode === 'dates'
                      ? 'bg-[#00A8E8] text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Select Dates
                </button>
                <button
                  type="button"
                  onClick={() => handleDurationModeChange('days')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    durationMode === 'days'
                      ? 'bg-[#00A8E8] text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Number of Days
                </button>
              </div>
            </div>

            {durationMode === 'dates' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="checkIn">Check-in Date *</Label>
                  <input
                    id="checkIn"
                    type="date"
                    value={formData.checkIn}
                    onChange={(e) => handleCheckInChange(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8E8] ${
                      errors.checkIn ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.checkIn && <p className="text-xs text-red-500 mt-1">{errors.checkIn}</p>}
                </div>

                <div>
                  <Label htmlFor="checkOut">Check-out Date *</Label>
                  <input
                    id="checkOut"
                    type="date"
                    value={formData.checkOut}
                    onChange={(e) => handleCheckOutChange(e.target.value)}
                    min={formData.checkIn || new Date().toISOString().split('T')[0]}
                    className={`w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8E8] ${
                      errors.checkOut ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.checkOut && <p className="text-xs text-red-500 mt-1">{errors.checkOut}</p>}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="checkIn">Check-in Date *</Label>
                  <input
                    id="checkIn"
                    type="date"
                    value={formData.checkIn}
                    onChange={(e) => handleCheckInChange(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8E8] ${
                      errors.checkIn ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.checkIn && <p className="text-xs text-red-500 mt-1">{errors.checkIn}</p>}
                </div>

                <div>
                  <Label>Number of Days *</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => handleDaysChange(formData.nights - 1)}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
                    >
                      <Minus className="size-4 text-gray-600" />
                    </button>
                    <input
                      type="number"
                      value={formData.nights}
                      onChange={(e) => handleDaysChange(parseInt(e.target.value) || 1)}
                      min="1"
                      max="365"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"
                    />
                    <button
                      type="button"
                      onClick={() => handleDaysChange(formData.nights + 1)}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
                    >
                      <Plus className="size-4 text-gray-600" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.checkOut && `Check-out: ${new Date(formData.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`}
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="room">Room Type *</Label>
                <select
                  id="room"
                  value={formData.room}
                  onChange={(e) => handleRoomChange(e.target.value)}
                  className={`w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8E8] ${
                    errors.room ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select room type</option>
                  {roomTypes.map((room) => (
                    <option key={room.value} value={room.value}>
                      {room.value} - KSh {room.price.toLocaleString()}/night
                    </option>
                  ))}
                </select>
                {errors.room && <p className="text-xs text-red-500 mt-1">{errors.room}</p>}
              </div>

              <div>
                <Label>Total Guests *</Label>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => handleGuestsChange(formData.guests - 1)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    <Minus className="size-4 text-gray-600" />
                  </button>
                  <div className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white">
                    <div className="flex items-center justify-center gap-2">
                      <Users className="size-4 text-gray-500" />
                      <span className="font-semibold text-gray-900">
                        {formData.guests} {formData.guests === 1 ? 'Person' : 'People'}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleGuestsChange(formData.guests + 1)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    <Plus className="size-4 text-gray-600" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Maximum 20 guests per booking</p>
              </div>
            </div>

            {/* Stay Duration Summary */}
            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-cyan-900">
                <Clock className="size-4" />
                <span className="text-sm font-medium">
                  Stay Summary: {formData.nights} night{formData.nights !== 1 ? 's' : ''} for {formData.guests} guest{formData.guests !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>

          {/* Payment & Status */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-900 font-semibold">
              <DollarSign className="size-5" />
              <h3>Payment & Status</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status">Booking Status</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'confirmed' | 'pending' })}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"
                >
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <div>
                <Label htmlFor="paymentStatus">Payment Status</Label>
                <select
                  id="paymentStatus"
                  value={formData.paymentStatus}
                  onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value as 'paid' | 'pending' | 'partial' })}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"
                >
                  <option value="pending">Pending</option>
                  <option value="partial">Partial Payment</option>
                  <option value="paid">Fully Paid</option>
                </select>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Total Amount:</span>
                <span className="text-2xl font-bold text-[#0052A3]">
                  KSh {formData.price.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {formData.nights} night{formData.nights !== 1 ? 's' : ''} × {formData.room || 'Select room'}
              </p>
            </div>
          </div>

          {/* Special Requests */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-900 font-semibold">
              <Hotel className="size-5" />
              <h3>Special Requests (Optional)</h3>
            </div>

            <div>
              <textarea
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8E8] resize-none"
                rows={3}
                placeholder="Any special requests or notes about this booking..."
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#0052A3] hover:bg-[#003d7a]"
            >
              Create Booking
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}