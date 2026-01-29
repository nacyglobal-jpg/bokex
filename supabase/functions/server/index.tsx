import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as db from "./database.tsx";
import * as emailService from "./email-service.tsx";

const app = new Hono();

// Middleware
app.use("*", cors());
app.use("*", logger(console.log));

// ==================== HEALTH CHECK ====================
app.get("/make-server-e0651789/health", (c) => {
  return c.json({ 
    status: "healthy", 
    service: "Bokex API",
    database: "Supabase PostgreSQL",
    timestamp: new Date().toISOString() 
  });
});

// ==================== AUTH ROUTES ====================

// Register User
app.post("/make-server-e0651789/auth/register", async (c) => {
  try {
    const body = await c.req.json();
    const { fullName, email, phone, password } = body;

    // Validate input
    if (!fullName || !email || !phone || !password) {
      return c.json({ error: "All fields are required" }, 400);
    }

    // Check if user already exists
    const existingUser = await db.getUserByEmail(email);
    if (existingUser) {
      return c.json({ error: "Email already registered" }, 400);
    }

    // Create user in database
    const user = await db.createUser({ fullName, email, phone, password });

    // Send registration email (async, don't wait)
    emailService.sendUserRegistrationEmail({
      fullName,
      email,
      userId: user.user_id,
    }).catch(err => console.error("Failed to send registration email:", err));

    // Return user data (without password)
    const { password_hash: _, ...userWithoutPassword } = user;
    return c.json({ 
      success: true, 
      user: userWithoutPassword,
      message: "Registration successful" 
    });

  } catch (error) {
    console.error("Registration error:", error);
    return c.json({ error: error.message || "Registration failed" }, 500);
  }
});

// Register Partner
app.post("/make-server-e0651789/auth/register-partner", async (c) => {
  try {
    const body = await c.req.json();
    const { businessName, firstName, lastName, email, phone, password, website, address, city, county, propertyName } = body;

    // Validate input
    if (!businessName || !firstName || !lastName || !email || !phone || !password) {
      return c.json({ error: "Required fields missing" }, 400);
    }

    // Check if partner already exists
    const existingPartner = await db.getPartnerByEmail(email);
    if (existingPartner) {
      return c.json({ error: "Email already registered" }, 400);
    }

    // Create partner in database
    const partner = await db.createPartner({
      businessName,
      firstName,
      lastName,
      email,
      phone,
      password,
      website,
      address,
      city,
      county,
      propertyName,
    });

    // Send partner registration email (async, don't wait)
    emailService.sendPartnerRegistrationEmail({
      businessName,
      firstName,
      lastName,
      email,
      partnerId: partner.partner_id,
    }).catch(err => console.error("Failed to send partner registration email:", err));

    // Return partner data (without password)
    const { password_hash: _, ...partnerWithoutPassword } = partner;
    return c.json({ 
      success: true, 
      partner: partnerWithoutPassword,
      message: "Partner registration successful" 
    });

  } catch (error) {
    console.error("Partner registration error:", error);
    return c.json({ error: error.message || "Partner registration failed" }, 500);
  }
});

// Login
app.post("/make-server-e0651789/auth/login", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
    }

    const passwordHash = await db.hashPassword(password);

    // Check if user exists
    let user = await db.getUserByEmail(email);
    let isPartner = false;

    if (!user) {
      // Check if partner exists
      user = await db.getPartnerByEmail(email);
      isPartner = true;
    }

    if (!user) {
      return c.json({ error: "Invalid email or password" }, 401);
    }

    // Verify password
    if (user.password_hash !== passwordHash) {
      return c.json({ error: "Invalid email or password" }, 401);
    }

    // Return user data (without password)
    const { password_hash: _, ...userWithoutPassword } = user;
    return c.json({ 
      success: true, 
      user: userWithoutPassword,
      role: user.role,
      isPartner,
      message: "Login successful" 
    });

  } catch (error) {
    console.error("Login error:", error);
    return c.json({ error: error.message || "Login failed" }, 500);
  }
});

// Get User by Email
app.get("/make-server-e0651789/auth/user/:email", async (c) => {
  try {
    const email = c.req.param("email");
    
    let user = await db.getUserByEmail(email);
    let isPartner = false;

    if (!user) {
      user = await db.getPartnerByEmail(email);
      isPartner = true;
    }

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    const { password_hash: _, ...userWithoutPassword } = user;
    return c.json({ user: userWithoutPassword, isPartner });

  } catch (error) {
    console.error("Get user error:", error);
    return c.json({ error: error.message || "Failed to get user" }, 500);
  }
});

// ==================== BOOKING ROUTES ====================

// Create Booking
app.post("/make-server-e0651789/bookings", async (c) => {
  try {
    const bookingData = await c.req.json();

    // Create booking in database
    const booking = await db.createBooking(bookingData);

    // Send booking confirmation emails
    if (bookingData.guestName && bookingData.guestEmail) {
      emailService.sendBookingConfirmationEmail({
        guestName: bookingData.guestName,
        guestEmail: bookingData.guestEmail,
        bookingId: booking.booking_id,
        hotelName: bookingData.hotel_name || bookingData.hotelName,
        hotelLocation: bookingData.hotel_location || bookingData.hotelLocation || '',
        roomType: bookingData.room_type || bookingData.roomType,
        checkIn: bookingData.check_in || bookingData.checkIn,
        checkOut: bookingData.check_out || bookingData.checkOut,
        nights: bookingData.nights,
        guests: bookingData.guests,
        totalAmount: bookingData.total_amount || bookingData.totalAmount,
      }).catch(err => console.error("Failed to send guest confirmation email:", err));
    }

    if (bookingData.propertyOwnerEmail && bookingData.guestName) {
      const owner = await db.getPartnerByEmail(bookingData.propertyOwnerEmail);
      if (owner) {
        emailService.sendBookingNotificationToOwner({
          ownerName: `${owner.first_name} ${owner.last_name}`,
          ownerEmail: owner.email,
          bookingId: booking.booking_id,
          guestName: bookingData.guestName,
          guestEmail: bookingData.guestEmail,
          guestPhone: bookingData.guestPhone || '',
          propertyName: bookingData.hotel_name || bookingData.hotelName,
          roomType: bookingData.room_type || bookingData.roomType,
          checkIn: bookingData.check_in || bookingData.checkIn,
          checkOut: bookingData.check_out || bookingData.checkOut,
          nights: bookingData.nights,
          guests: bookingData.guests,
          totalAmount: bookingData.total_amount || bookingData.totalAmount,
        }).catch(err => console.error("Failed to send owner notification email:", err));
      }
    }

    return c.json({ success: true, booking });

  } catch (error) {
    console.error("Create booking error:", error);
    return c.json({ error: error.message || "Failed to create booking" }, 500);
  }
});

// Get All Bookings (Admin)
app.get("/make-server-e0651789/bookings", async (c) => {
  try {
    const bookings = await db.getAllBookings();
    return c.json({ bookings });
  } catch (error) {
    console.error("Get all bookings error:", error);
    return c.json({ error: error.message || "Failed to get bookings" }, 500);
  }
});

// Get User Bookings
app.get("/make-server-e0651789/bookings/user/:email", async (c) => {
  try {
    const email = c.req.param("email");
    const bookings = await db.getBookingsByUser(email);
    return c.json({ bookings });
  } catch (error) {
    console.error("Get user bookings error:", error);
    return c.json({ error: error.message || "Failed to get user bookings" }, 500);
  }
});

// Get Partner Bookings
app.get("/make-server-e0651789/bookings/partner/:email", async (c) => {
  try {
    const email = c.req.param("email");
    const bookings = await db.getBookingsByPartner(email);
    return c.json({ bookings });
  } catch (error) {
    console.error("Get partner bookings error:", error);
    return c.json({ error: error.message || "Failed to get partner bookings" }, 500);
  }
});

// Get Single Booking
app.get("/make-server-e0651789/bookings/:bookingId", async (c) => {
  try {
    const bookingId = c.req.param("bookingId");
    const booking = await db.getBookingById(bookingId);
    
    if (!booking) {
      return c.json({ error: "Booking not found" }, 404);
    }
    
    return c.json({ booking });
  } catch (error) {
    console.error("Get booking error:", error);
    return c.json({ error: error.message || "Failed to get booking" }, 500);
  }
});

// Update Booking
app.put("/make-server-e0651789/bookings/:bookingId", async (c) => {
  try {
    const bookingId = c.req.param("bookingId");
    const updates = await c.req.json();
    
    const booking = await db.updateBooking(bookingId, updates);
    return c.json({ success: true, booking });
  } catch (error) {
    console.error("Update booking error:", error);
    return c.json({ error: error.message || "Failed to update booking" }, 500);
  }
});

// Delete Booking
app.delete("/make-server-e0651789/bookings/:bookingId", async (c) => {
  try {
    const bookingId = c.req.param("bookingId");
    await db.deleteBooking(bookingId);
    return c.json({ success: true, message: "Booking deleted" });
  } catch (error) {
    console.error("Delete booking error:", error);
    return c.json({ error: error.message || "Failed to delete booking" }, 500);
  }
});

// ==================== PAYMENT ROUTES ====================

// Create Payment
app.post("/make-server-e0651789/payments", async (c) => {
  try {
    const { bookingId, phoneNumber, amount } = await c.req.json();

    // Generate M-PESA code (mock for now)
    const mpesaCode = `SFK${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    // Create payment in database
    const payment = await db.createPayment({
      bookingId,
      phoneNumber,
      amount,
      mpesaCode,
    });

    return c.json({ 
      success: true, 
      payment,
      mpesaCode,
      message: "Payment initiated. Please check your phone for M-PESA prompt." 
    });

  } catch (error) {
    console.error("Create payment error:", error);
    return c.json({ error: error.message || "Failed to initiate payment" }, 500);
  }
});

// Verify Payment
app.post("/make-server-e0651789/payments/verify", async (c) => {
  try {
    const { bookingId, mpesaCode } = await c.req.json();

    // Get payment
    const payment = await db.getPaymentByBookingId(bookingId);
    
    if (!payment) {
      return c.json({ error: "Payment not found" }, 404);
    }

    // Update payment status
    await db.updatePayment(payment.transaction_id, {
      status: 'verified',
      mpesa_code: mpesaCode || payment.mpesa_code,
      verified_at: new Date().toISOString(),
    });

    // Update booking payment status
    await db.updateBooking(bookingId, {
      payment_status: 'paid',
      status: 'confirmed',
    });

    // Get booking details for email
    const booking = await db.getBookingById(bookingId);
    
    // Send payment confirmation email
    if (booking && booking.guest_email) {
      emailService.sendPaymentConfirmationEmail({
        guestName: booking.guest_name,
        guestEmail: booking.guest_email,
        bookingId: booking.booking_id,
        mpesaCode: mpesaCode || payment.mpesa_code,
        amount: payment.amount,
        hotelName: booking.hotel_name,
        transactionId: payment.transaction_id,
      }).catch(err => console.error("Failed to send payment confirmation email:", err));

      // Send payment notification to admin
      emailService.sendPaymentNotificationToAdmin({
        bookingId: booking.booking_id,
        guestName: booking.guest_name,
        guestEmail: booking.guest_email,
        mpesaCode: mpesaCode || payment.mpesa_code,
        amount: payment.amount,
        hotelName: booking.hotel_name,
        propertyOwnerEmail: booking.property_owner_email,
        transactionId: payment.transaction_id,
      }).catch(err => console.error("Failed to send admin notification:", err));
    }

    return c.json({ 
      success: true, 
      message: "Payment verified successfully",
      paymentStatus: 'verified' 
    });

  } catch (error) {
    console.error("Verify payment error:", error);
    return c.json({ error: error.message || "Failed to verify payment" }, 500);
  }
});

// Get All Payments (Admin)
app.get("/make-server-e0651789/payments", async (c) => {
  try {
    const payments = await db.getAllPayments();
    return c.json({ payments });
  } catch (error) {
    console.error("Get all payments error:", error);
    return c.json({ error: error.message || "Failed to get payments" }, 500);
  }
});

// Get Payment by Booking ID
app.get("/make-server-e0651789/payments/booking/:bookingId", async (c) => {
  try {
    const bookingId = c.req.param("bookingId");
    const payment = await db.getPaymentByBookingId(bookingId);
    
    if (!payment) {
      return c.json({ error: "Payment not found" }, 404);
    }
    
    return c.json({ payment });
  } catch (error) {
    console.error("Get payment error:", error);
    return c.json({ error: error.message || "Failed to get payment" }, 500);
  }
});

// ==================== REVIEW ROUTES ====================

// Create Review
app.post("/make-server-e0651789/reviews", async (c) => {
  try {
    const reviewData = await c.req.json();
    const review = await db.createReview(reviewData);
    return c.json({ success: true, review });
  } catch (error) {
    console.error("Create review error:", error);
    return c.json({ error: error.message || "Failed to create review" }, 500);
  }
});

// Get All Reviews
app.get("/make-server-e0651789/reviews", async (c) => {
  try {
    const reviews = await db.getAllReviews();
    return c.json({ reviews });
  } catch (error) {
    console.error("Get all reviews error:", error);
    return c.json({ error: error.message || "Failed to get reviews" }, 500);
  }
});

// Get Partner Reviews
app.get("/make-server-e0651789/reviews/partner/:email", async (c) => {
  try {
    const email = c.req.param("email");
    const reviews = await db.getReviewsByPartner(email);
    return c.json({ reviews });
  } catch (error) {
    console.error("Get partner reviews error:", error);
    return c.json({ error: error.message || "Failed to get partner reviews" }, 500);
  }
});

// Delete Review
app.delete("/make-server-e0651789/reviews/:reviewId", async (c) => {
  try {
    const reviewId = c.req.param("reviewId");
    await db.deleteReview(reviewId);
    return c.json({ success: true, message: "Review deleted" });
  } catch (error) {
    console.error("Delete review error:", error);
    return c.json({ error: error.message || "Failed to delete review" }, 500);
  }
});

// ==================== MESSAGE ROUTES ====================

// Send Message
app.post("/make-server-e0651789/messages", async (c) => {
  try {
    const messageData = await c.req.json();
    const message = await db.createMessage(messageData);
    return c.json({ success: true, message });
  } catch (error) {
    console.error("Create message error:", error);
    return c.json({ error: error.message || "Failed to send message" }, 500);
  }
});

// Get Partner Messages
app.get("/make-server-e0651789/messages/partner/:email", async (c) => {
  try {
    const email = c.req.param("email");
    const messages = await db.getMessagesByPartner(email);
    return c.json({ messages });
  } catch (error) {
    console.error("Get partner messages error:", error);
    return c.json({ error: error.message || "Failed to get messages" }, 500);
  }
});

// Mark Message as Read
app.put("/make-server-e0651789/messages/:messageId/read", async (c) => {
  try {
    const messageId = c.req.param("messageId");
    const message = await db.markMessageAsRead(messageId);
    return c.json({ success: true, message });
  } catch (error) {
    console.error("Mark message as read error:", error);
    return c.json({ error: error.message || "Failed to mark message as read" }, 500);
  }
});

// ==================== PROPERTY ROUTES ====================

// Create Property
app.post("/make-server-e0651789/properties", async (c) => {
  try {
    const propertyData = await c.req.json();
    const property = await db.createProperty(propertyData);

    // Send property listing email
    if (propertyData.owner_email || propertyData.ownerEmail) {
      const ownerEmail = propertyData.owner_email || propertyData.ownerEmail;
      const owner = await db.getPartnerByEmail(ownerEmail);
      
      if (owner) {
        emailService.sendPropertyListingEmail({
          ownerName: `${owner.first_name} ${owner.last_name}`,
          ownerEmail: owner.email,
          propertyName: propertyData.property_name || propertyData.propertyName,
          propertyType: propertyData.property_type || propertyData.propertyType,
          propertyId: property.property_id,
        }).catch(err => console.error("Failed to send property listing email:", err));
      }
    }

    return c.json({ success: true, property });
  } catch (error) {
    console.error("Create property error:", error);
    return c.json({ error: error.message || "Failed to create property" }, 500);
  }
});

// Get All Properties
app.get("/make-server-e0651789/properties", async (c) => {
  try {
    const properties = await db.getAllProperties();
    return c.json({ properties });
  } catch (error) {
    console.error("Get all properties error:", error);
    return c.json({ error: error.message || "Failed to get properties" }, 500);
  }
});

// Get Partner Properties
app.get("/make-server-e0651789/properties/partner/:email", async (c) => {
  try {
    const email = c.req.param("email");
    const properties = await db.getPropertiesByPartner(email);
    return c.json({ properties });
  } catch (error) {
    console.error("Get partner properties error:", error);
    return c.json({ error: error.message || "Failed to get partner properties" }, 500);
  }
});

// Get Single Property
app.get("/make-server-e0651789/properties/:propertyId", async (c) => {
  try {
    const propertyId = c.req.param("propertyId");
    const property = await db.getPropertyById(propertyId);
    
    if (!property) {
      return c.json({ error: "Property not found" }, 404);
    }
    
    return c.json({ property });
  } catch (error) {
    console.error("Get property error:", error);
    return c.json({ error: error.message || "Failed to get property" }, 500);
  }
});

// Update Property
app.put("/make-server-e0651789/properties/:propertyId", async (c) => {
  try {
    const propertyId = c.req.param("propertyId");
    const updates = await c.req.json();
    
    const property = await db.updateProperty(propertyId, updates);
    return c.json({ success: true, property });
  } catch (error) {
    console.error("Update property error:", error);
    return c.json({ error: error.message || "Failed to update property" }, 500);
  }
});

// ==================== STATISTICS ROUTES ====================

// Get Admin Stats
app.get("/make-server-e0651789/stats/admin", async (c) => {
  try {
    const [bookings, payments, users, partners, properties, reviews] = await Promise.all([
      db.getAllBookings(),
      db.getAllPayments(),
      db.getAllUsers(),
      db.getAllPartners(),
      db.getAllProperties(),
      db.getAllReviews(),
    ]);

    const totalRevenue = payments
      .filter(p => p.status === 'verified')
      .reduce((sum, p) => sum + parseFloat(p.amount), 0);

    const pendingPayments = payments.filter(p => p.status === 'pending').length;
    const verifiedPayments = payments.filter(p => p.status === 'verified').length;

    const stats = {
      totalBookings: bookings.length,
      totalRevenue,
      totalUsers: users.length,
      totalPartners: partners.length,
      totalProperties: properties.length,
      totalReviews: reviews.length,
      pendingPayments,
      verifiedPayments,
      recentBookings: bookings.slice(0, 10),
      recentPayments: payments.slice(0, 10),
    };

    return c.json({ stats });
  } catch (error) {
    console.error("Get admin stats error:", error);
    return c.json({ error: error.message || "Failed to get admin stats" }, 500);
  }
});

// Get Partner Stats
app.get("/make-server-e0651789/stats/partner/:email", async (c) => {
  try {
    const email = c.req.param("email");
    
    const [bookings, properties, reviews] = await Promise.all([
      db.getBookingsByPartner(email),
      db.getPropertiesByPartner(email),
      db.getReviewsByPartner(email),
    ]);

    const totalEarnings = bookings
      .filter(b => b.payment_status === 'paid')
      .reduce((sum, b) => sum + parseFloat(b.total_amount), 0);

    const averageRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    const stats = {
      totalBookings: bookings.length,
      totalEarnings,
      totalProperties: properties.length,
      totalReviews: reviews.length,
      averageRating: averageRating.toFixed(1),
      recentBookings: bookings.slice(0, 5),
      pendingBookings: bookings.filter(b => b.status === 'pending').length,
      confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
    };

    return c.json({ stats });
  } catch (error) {
    console.error("Get partner stats error:", error);
    return c.json({ error: error.message || "Failed to get partner stats" }, 500);
  }
});

// ==================== USER MANAGEMENT ROUTES ====================

// Get All Users (Admin)
app.get("/make-server-e0651789/users", async (c) => {
  try {
    const users = await db.getAllUsers();
    // Remove password hashes from response
    const sanitizedUsers = users.map(({ password_hash, ...user }) => user);
    return c.json({ users: sanitizedUsers });
  } catch (error) {
    console.error("Get all users error:", error);
    return c.json({ error: error.message || "Failed to get users" }, 500);
  }
});

// Get All Partners (Admin)
app.get("/make-server-e0651789/partners", async (c) => {
  try {
    const partners = await db.getAllPartners();
    // Remove password hashes from response
    const sanitizedPartners = partners.map(({ password_hash, ...partner }) => partner);
    return c.json({ partners: sanitizedPartners });
  } catch (error) {
    console.error("Get all partners error:", error);
    return c.json({ error: error.message || "Failed to get partners" }, 500);
  }
});

// Update User
app.put("/make-server-e0651789/users/:email", async (c) => {
  try {
    const email = c.req.param("email");
    const updates = await c.req.json();
    
    // Don't allow password updates through this endpoint
    delete updates.password_hash;
    
    const user = await db.updateUser(email, updates);
    const { password_hash: _, ...userWithoutPassword } = user;
    
    return c.json({ success: true, user: userWithoutPassword });
  } catch (error) {
    console.error("Update user error:", error);
    return c.json({ error: error.message || "Failed to update user" }, 500);
  }
});

// Update Partner
app.put("/make-server-e0651789/partners/:email", async (c) => {
  try {
    const email = c.req.param("email");
    const updates = await c.req.json();
    
    // Don't allow password updates through this endpoint
    delete updates.password_hash;
    
    const partner = await db.updatePartner(email, updates);
    const { password_hash: _, ...partnerWithoutPassword } = partner;
    
    return c.json({ success: true, partner: partnerWithoutPassword });
  } catch (error) {
    console.error("Update partner error:", error);
    return c.json({ error: error.message || "Failed to update partner" }, 500);
  }
});

// Start server
Deno.serve(app.fetch);
