import { createClient } from 'jsr:@supabase/supabase-js@2';

// Initialize Supabase client with service role key for full database access
export const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// Hash password using SHA-256
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ==================== USER OPERATIONS ====================

export async function createUser(userData: {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}) {
  const passwordHash = await hashPassword(userData.password);

  const { data, error } = await supabase
    .from('users')
    .insert([{
      full_name: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      password_hash: passwordHash,
      role: 'user',
    }])
    .select()
    .single();

  if (error) throw new Error(`Failed to create user: ${error.message}`);
  return data;
}

export async function getUserByEmail(email: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Failed to get user: ${error.message}`);
  }
  return data;
}

export async function getAllUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Failed to get users: ${error.message}`);
  return data || [];
}

export async function updateUser(email: string, updates: any) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('email', email)
    .select()
    .single();

  if (error) throw new Error(`Failed to update user: ${error.message}`);
  return data;
}

// ==================== PARTNER OPERATIONS ====================

export async function createPartner(partnerData: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password?: string;
  address?: string;
  location?: string;
  nationality?: string;
  dateOfBirth?: string;
  businessName?: string;
  propertyName?: string;
  propertyAddress?: string;
  propertyLocation?: string;
  propertyPhone?: string;
}) {
  const insertData: any = {
    first_name: partnerData.firstName,
    last_name: partnerData.lastName,
    email: partnerData.email,
    phone: partnerData.phone,
    address: partnerData.address,
    location: partnerData.location,
    nationality: partnerData.nationality,
    date_of_birth: partnerData.dateOfBirth,
    business_name: partnerData.businessName,
    property_name: partnerData.propertyName,
    property_address: partnerData.propertyAddress,
    property_location: partnerData.propertyLocation,
    property_phone: partnerData.propertyPhone,
    status: 'active',
  };

  // Only hash password if provided
  if (partnerData.password) {
    insertData.password_hash = await hashPassword(partnerData.password);
  }

  const { data, error } = await supabase
    .from('partners')
    .insert([insertData])
    .select()
    .single();

  if (error) throw new Error(`Failed to create partner: ${error.message}`);
  return data;
}

export async function getPartnerByEmail(email: string) {
  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .eq('email', email)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Failed to get partner: ${error.message}`);
  }
  return data;
}

export async function getAllPartners() {
  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Failed to get partners: ${error.message}`);
  return data || [];
}

export async function updatePartner(email: string, updates: any) {
  const { data, error } = await supabase
    .from('partners')
    .update(updates)
    .eq('email', email)
    .select()
    .single();

  if (error) throw new Error(`Failed to update partner: ${error.message}`);
  return data;
}

// ==================== PROPERTY OPERATIONS ====================

export async function createProperty(propertyData: {
  ownerEmail: string;
  name: string;
  category: string;
  location: string;
  city?: string;
  county?: string;
  description?: string;
  amenities?: string[];
  photos?: string[];
  basePrice?: number;
  rating?: number;
  stars?: number;
  featured?: boolean;
}) {
  const { data, error } = await supabase
    .from('properties')
    .insert([{
      owner_email: propertyData.ownerEmail,
      name: propertyData.name,
      category: propertyData.category,
      location: propertyData.location,
      city: propertyData.city,
      county: propertyData.county,
      description: propertyData.description,
      amenities: propertyData.amenities || [],
      photos: propertyData.photos || [],
      base_price: propertyData.basePrice,
      rating: propertyData.rating || 0,
      stars: propertyData.stars || 0,
      featured: propertyData.featured || false,
      status: 'active',
    }])
    .select()
    .single();

  if (error) throw new Error(`Failed to create property: ${error.message}`);
  return data;
}

export async function getAllProperties() {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Failed to get properties: ${error.message}`);
  return data || [];
}

export async function getPropertyById(propertyId: string) {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('property_id', propertyId)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Failed to get property: ${error.message}`);
  }
  return data;
}

export async function getPropertyByUUID(uuid: string) {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', uuid)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Failed to get property: ${error.message}`);
  }
  return data;
}

export async function getPropertiesByPartner(email: string) {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('owner_email', email)
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Failed to get partner properties: ${error.message}`);
  return data || [];
}

export async function updateProperty(propertyId: string, updates: any) {
  const { data, error } = await supabase
    .from('properties')
    .update(updates)
    .eq('property_id', propertyId)
    .select()
    .single();

  if (error) throw new Error(`Failed to update property: ${error.message}`);
  return data;
}

// ==================== ROOM OPERATIONS ====================

export async function createRoom(roomData: {
  propertyUuid: string;
  name: string;
  roomCategory?: string;
  bedType?: string;
  beds?: string;
  price: number;
  capacity?: number;
  available?: number;
  amenities?: string[];
}) {
  const { data, error } = await supabase
    .from('rooms')
    .insert([{
      property_uuid: roomData.propertyUuid,
      name: roomData.name,
      room_category: roomData.roomCategory,
      bed_type: roomData.bedType,
      beds: roomData.beds,
      price: roomData.price,
      capacity: roomData.capacity || 1,
      available: roomData.available || 0,
      amenities: roomData.amenities || [],
    }])
    .select()
    .single();

  if (error) throw new Error(`Failed to create room: ${error.message}`);
  return data;
}

export async function getRoomsByProperty(propertyUuid: string) {
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('property_uuid', propertyUuid)
    .order('price', { ascending: true });

  if (error) throw new Error(`Failed to get rooms: ${error.message}`);
  return data || [];
}

export async function getRoomById(roomId: string) {
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('room_id', roomId)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Failed to get room: ${error.message}`);
  }
  return data;
}

export async function updateRoom(roomId: string, updates: any) {
  const { data, error } = await supabase
    .from('rooms')
    .update(updates)
    .eq('room_id', roomId)
    .select()
    .single();

  if (error) throw new Error(`Failed to update room: ${error.message}`);
  return data;
}

export async function deleteRoom(roomId: string) {
  const { error } = await supabase
    .from('rooms')
    .delete()
    .eq('room_id', roomId);

  if (error) throw new Error(`Failed to delete room: ${error.message}`);
  return { success: true };
}

// ==================== BOOKING OPERATIONS ====================

export async function createBooking(bookingData: {
  propertyUuid: string;
  roomUuid?: string;
  guestEmail: string;
  guestName: string;
  guestPhone?: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  totalAmount: number;
  specialRequests?: string;
}) {
  const { data, error } = await supabase
    .from('bookings')
    .insert([{
      property_uuid: bookingData.propertyUuid,
      room_uuid: bookingData.roomUuid,
      guest_email: bookingData.guestEmail,
      guest_name: bookingData.guestName,
      guest_phone: bookingData.guestPhone,
      check_in: bookingData.checkIn,
      check_out: bookingData.checkOut,
      nights: bookingData.nights,
      guests: bookingData.guests,
      total_amount: bookingData.totalAmount,
      special_requests: bookingData.specialRequests,
      status: 'pending',
      payment_status: 'pending',
    }])
    .select()
    .single();

  if (error) throw new Error(`Failed to create booking: ${error.message}`);
  return data;
}

export async function getAllBookings() {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      properties:property_uuid (property_id, name, location, owner_email),
      rooms:room_uuid (room_id, name, price)
    `)
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Failed to get bookings: ${error.message}`);
  return data || [];
}

export async function getBookingById(bookingId: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      properties:property_uuid (property_id, name, location, city, county, owner_email),
      rooms:room_uuid (room_id, name, price, beds)
    `)
    .eq('booking_id', bookingId)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Failed to get booking: ${error.message}`);
  }
  return data;
}

export async function getBookingsByUser(email: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      properties:property_uuid (property_id, name, location, owner_email),
      rooms:room_uuid (room_id, name, price)
    `)
    .eq('guest_email', email)
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Failed to get user bookings: ${error.message}`);
  return data || [];
}

export async function getBookingsByPartner(email: string) {
  // Get all properties owned by this partner first
  const { data: properties } = await supabase
    .from('properties')
    .select('id')
    .eq('owner_email', email);

  if (!properties || properties.length === 0) {
    return [];
  }

  const propertyUuids = properties.map(p => p.id);

  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      properties:property_uuid (property_id, name, location, owner_email),
      rooms:room_uuid (room_id, name, price)
    `)
    .in('property_uuid', propertyUuids)
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Failed to get partner bookings: ${error.message}`);
  return data || [];
}

export async function updateBooking(bookingId: string, updates: any) {
  const { data, error } = await supabase
    .from('bookings')
    .update(updates)
    .eq('booking_id', bookingId)
    .select()
    .single();

  if (error) throw new Error(`Failed to update booking: ${error.message}`);
  return data;
}

export async function deleteBooking(bookingId: string) {
  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('booking_id', bookingId);

  if (error) throw new Error(`Failed to delete booking: ${error.message}`);
  return { success: true };
}

// ==================== PAYMENT OPERATIONS ====================

export async function createPayment(paymentData: {
  bookingUuid: string;
  amount: number;
  phoneNumber: string;
  mpesaCode?: string;
}) {
  const { data, error } = await supabase
    .from('payments')
    .insert([{
      booking_uuid: paymentData.bookingUuid,
      amount: paymentData.amount,
      phone_number: paymentData.phoneNumber,
      mpesa_code: paymentData.mpesaCode,
      status: 'pending',
    }])
    .select()
    .single();

  if (error) throw new Error(`Failed to create payment: ${error.message}`);
  return data;
}

export async function getAllPayments() {
  const { data, error } = await supabase
    .from('payments')
    .select(`
      *,
      bookings:booking_uuid (booking_id, guest_name, guest_email, total_amount)
    `)
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Failed to get payments: ${error.message}`);
  return data || [];
}

export async function getPaymentByBookingUuid(bookingUuid: string) {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('booking_uuid', bookingUuid)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Failed to get payment: ${error.message}`);
  }
  return data;
}

export async function getPaymentByTransactionId(transactionId: string) {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('transaction_id', transactionId)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Failed to get payment: ${error.message}`);
  }
  return data;
}

export async function updatePayment(transactionId: string, updates: any) {
  const { data, error } = await supabase
    .from('payments')
    .update(updates)
    .eq('transaction_id', transactionId)
    .select()
    .single();

  if (error) throw new Error(`Failed to update payment: ${error.message}`);
  return data;
}

// ==================== REVIEW OPERATIONS ====================

export async function createReview(reviewData: {
  propertyUuid: string;
  rating: number;
  comment?: string;
  userName?: string;
  userEmail?: string;
}) {
  const { data, error } = await supabase
    .from('reviews')
    .insert([{
      property_uuid: reviewData.propertyUuid,
      rating: reviewData.rating,
      comment: reviewData.comment,
      user_name: reviewData.userName,
      user_email: reviewData.userEmail,
    }])
    .select()
    .single();

  if (error) throw new Error(`Failed to create review: ${error.message}`);
  return data;
}

export async function getAllReviews() {
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      properties:property_uuid (property_id, name, owner_email)
    `)
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Failed to get reviews: ${error.message}`);
  return data || [];
}

export async function getReviewsByProperty(propertyUuid: string) {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('property_uuid', propertyUuid)
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Failed to get property reviews: ${error.message}`);
  return data || [];
}

export async function getReviewsByPartner(email: string) {
  // Get all properties owned by this partner
  const { data: properties } = await supabase
    .from('properties')
    .select('id')
    .eq('owner_email', email);

  if (!properties || properties.length === 0) {
    return [];
  }

  const propertyUuids = properties.map(p => p.id);

  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      properties:property_uuid (property_id, name, owner_email)
    `)
    .in('property_uuid', propertyUuids)
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Failed to get partner reviews: ${error.message}`);
  return data || [];
}

export async function deleteReview(reviewId: string) {
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('review_id', reviewId);

  if (error) throw new Error(`Failed to delete review: ${error.message}`);
  return { success: true };
}

// ==================== MESSAGE OPERATIONS ====================

export async function createMessage(messageData: {
  propertyUuid?: string;
  partnerEmail: string;
  senderName: string;
  senderEmail: string;
  subject?: string;
  message: string;
}) {
  const { data, error } = await supabase
    .from('messages')
    .insert([{
      property_uuid: messageData.propertyUuid,
      partner_email: messageData.partnerEmail,
      sender_name: messageData.senderName,
      sender_email: messageData.senderEmail,
      subject: messageData.subject,
      message: messageData.message,
      read: false,
    }])
    .select()
    .single();

  if (error) throw new Error(`Failed to create message: ${error.message}`);
  return data;
}

export async function getMessagesByPartner(email: string) {
  const { data, error } = await supabase
    .from('messages')
    .select(`
      *,
      properties:property_uuid (property_id, name)
    `)
    .eq('partner_email', email)
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Failed to get partner messages: ${error.message}`);
  return data || [];
}

export async function markMessageAsRead(messageId: string) {
  const { data, error } = await supabase
    .from('messages')
    .update({ read: true })
    .eq('message_id', messageId)
    .select()
    .single();

  if (error) throw new Error(`Failed to mark message as read: ${error.message}`);
  return data;
}
