import { projectId, publicAnonKey } from '/utils/supabase/info';

// Base API URL
const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-e0651789`;

// Helper function to make API requests
async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${publicAnonKey}`,
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

// ==================== AUTH API ====================

export const authAPI = {
  // Register new user
  register: async (userData: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Register new partner (hotel/property owner)
  registerPartner: async (partnerData: {
    businessName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    website?: string;
    address?: string;
    city?: string;
    county?: string;
    propertyName?: string;
  }) => {
    return apiRequest('/auth/register-partner', {
      method: 'POST',
      body: JSON.stringify(partnerData),
    });
  },

  // Login
  login: async (credentials: { email: string; password: string }) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Get user by email
  getUser: async (email: string) => {
    return apiRequest(`/auth/user/${email}`);
  },
};

// ==================== BOOKING API ====================

export const bookingAPI = {
  // Create new booking
  create: async (bookingData: any) => {
    return apiRequest('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },

  // Get all bookings (admin only)
  getAll: async () => {
    return apiRequest('/bookings');
  },

  // Get user's bookings
  getUserBookings: async (email: string) => {
    return apiRequest(`/bookings/user/${email}`);
  },

  // Get partner's bookings
  getPartnerBookings: async (email: string) => {
    return apiRequest(`/bookings/partner/${email}`);
  },

  // Get single booking
  getById: async (bookingId: string) => {
    return apiRequest(`/bookings/${bookingId}`);
  },

  // Update booking
  update: async (bookingId: string, updateData: any) => {
    return apiRequest(`/bookings/${bookingId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  },

  // Delete booking
  delete: async (bookingId: string) => {
    return apiRequest(`/bookings/${bookingId}`, {
      method: 'DELETE',
    });
  },
};

// ==================== PAYMENT API ====================

export const paymentAPI = {
  // Initiate payment
  create: async (paymentData: {
    bookingId: string;
    phoneNumber: string;
    amount: number;
  }) => {
    return apiRequest('/payments', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  },

  // Verify payment
  verify: async (verificationData: {
    bookingId: string;
    mpesaCode?: string;
  }) => {
    return apiRequest('/payments/verify', {
      method: 'POST',
      body: JSON.stringify(verificationData),
    });
  },

  // Get all payments (admin only)
  getAll: async () => {
    return apiRequest('/payments');
  },

  // Get payment by booking ID
  getByBookingId: async (bookingId: string) => {
    return apiRequest(`/payments/booking/${bookingId}`);
  },
};

// ==================== REVIEW API ====================

export const reviewAPI = {
  // Create review
  create: async (reviewData: {
    propertyOwner?: string;
    hotelName?: string;
    rating: number;
    comment: string;
    userName?: string;
    userEmail?: string;
  }) => {
    return apiRequest('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  },

  // Get all reviews
  getAll: async () => {
    return apiRequest('/reviews');
  },

  // Get partner reviews
  getPartnerReviews: async (email: string) => {
    return apiRequest(`/reviews/partner/${email}`);
  },

  // Delete review
  delete: async (reviewId: string) => {
    return apiRequest(`/reviews/${reviewId}`, {
      method: 'DELETE',
    });
  },
};

// ==================== MESSAGE API ====================

export const messageAPI = {
  // Send message
  create: async (messageData: {
    propertyOwner: string;
    senderName: string;
    senderEmail: string;
    subject: string;
    message: string;
  }) => {
    return apiRequest('/messages', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  },

  // Get partner messages
  getPartnerMessages: async (email: string) => {
    return apiRequest(`/messages/partner/${email}`);
  },

  // Mark message as read
  markAsRead: async (messageId: string) => {
    return apiRequest(`/messages/${messageId}/read`, {
      method: 'PUT',
    });
  },
};

// ==================== PROPERTY API ====================

export const propertyAPI = {
  // Create property
  create: async (propertyData: any) => {
    return apiRequest('/properties', {
      method: 'POST',
      body: JSON.stringify(propertyData),
    });
  },

  // Get all properties
  getAll: async () => {
    return apiRequest('/properties');
  },

  // Get partner properties
  getPartnerProperties: async (email: string) => {
    return apiRequest(`/properties/partner/${email}`);
  },

  // Get single property
  getById: async (propertyId: string) => {
    return apiRequest(`/properties/${propertyId}`);
  },

  // Update property
  update: async (propertyId: string, updateData: any) => {
    return apiRequest(`/properties/${propertyId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  },
};

// ==================== STATS API ====================

export const statsAPI = {
  // Get admin stats
  getAdminStats: async () => {
    return apiRequest('/stats/admin');
  },

  // Get partner stats
  getPartnerStats: async (email: string) => {
    return apiRequest(`/stats/partner/${email}`);
  },
};

// ==================== USER API ====================

export const userAPI = {
  // Get all users (admin only)
  getAll: async () => {
    return apiRequest('/users');
  },

  // Get all partners (admin only)
  getAllPartners: async () => {
    return apiRequest('/partners');
  },

  // Update user
  updateUser: async (email: string, updateData: any) => {
    return apiRequest(`/users/${email}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  },

  // Update partner
  updatePartner: async (email: string, updateData: any) => {
    return apiRequest(`/partners/${email}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  },
};

// Export all APIs
export default {
  auth: authAPI,
  bookings: bookingAPI,
  payments: paymentAPI,
  reviews: reviewAPI,
  messages: messageAPI,
  properties: propertyAPI,
  stats: statsAPI,
  users: userAPI,
};