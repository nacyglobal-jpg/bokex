# Bokex - Smart Hotel Booking Platform
## Production Deployment Guide

> **Bokex** is a complete hotel booking platform for Kenya, featuring real-time bookings, M-PESA payment integration, and automated email notifications.

---

## 🚀 Platform Overview

**Bokex** is a production-ready hotel booking platform designed exclusively for Kenyan hotels, BnBs, and self-stay houses. All transactions are in **Kenyan Shillings (KES)** with **M-PESA payment integration**.

### Key Features

✅ **Complete Booking System**
- Real-time hotel/BnB listings and availability
- Advanced search and filtering (location, price, amenities, property type)
- Booking management with unique IDs (BKX-XXXXXXXXX)
- Check-in/check-out date management

✅ **Dual Dashboard System**
- **Super Admin Dashboard**: Platform-wide analytics, user management, payment verification
- **Partner/Client Dashboard**: Property management, bookings, earnings, reviews, messages

✅ **M-PESA Payment Integration**
- Paybill: **4005207** (NACY GLOBAL TECHNOLOGIES)
- STK Push payment flow
- Real-time payment verification
- Automated receipt generation

✅ **Email Notification System**
- Automated emails for all major events
- SMTP Server: mail.nacyglobal.com
- Sender: support@nacyglobal.com
- Professional HTML email templates

✅ **User Management**
- User registration with unique IDs (USR-XXXXXXXXX)
- Partner/property owner registration
- Role-based access control
- Secure authentication with password hashing

✅ **Database Integration**
- Supabase backend with KV storage
- RESTful API architecture
- Real-time data synchronization
- Persistent data storage

---

## 📧 Email Notification System

All emails are sent from: **support@nacyglobal.com**

### Email Configuration
```
SMTP Host: mail.nacyglobal.com
SMTP Port: 587
Username: support@nacyglobal.com
Password: @Naffpro2020
From Email: support@nacyglobal.com
```

### Automated Email Types

1. **User Registration**
   - Welcome email with account details
   - User ID (USR-XXXXXXXXX)
   - Platform features overview

2. **Partner Registration**
   - Welcome to partner program
   - Partner ID (USR-XXXXXXXXX)
   - Dashboard access instructions
   - Next steps for property listing

3. **Property Listing Confirmation**
   - Property successfully listed notification
   - Property ID and details
   - Tips for maximizing bookings

4. **Booking Confirmation (Guest)**
   - Complete booking details
   - Booking ID (BKX-XXXXXXXXX)
   - Hotel/property information
   - Check-in/check-out details
   - Total amount in KES

5. **Booking Notification (Property Owner)**
   - New booking alert
   - Guest contact information
   - Booking details and dates
   - Earnings information

6. **Payment Confirmation (Guest)**
   - Payment receipt
   - M-PESA confirmation code
   - Transaction ID
   - Booking reference

7. **Payment Notification (Admin)**
   - Transaction alert to support@nacyglobal.com
   - Full payment details
   - Booking and user information

---

## 💳 M-PESA Payment System

### Payment Details
- **Paybill Number**: 4005207
- **Business Name**: NACY GLOBAL TECHNOLOGIES
- **Payment Method**: STK Push (automatic prompt to user's phone)
- **Currency**: KES (Kenyan Shillings)

### Payment Flow
1. User completes booking form
2. System initiates M-PESA STK push to user's phone
3. User enters M-PESA PIN on their phone
4. Payment is verified
5. Confirmation emails sent to all parties
6. Booking status updated to "confirmed"

### Important Notes
- **NO TAX CALCULATIONS**: All prices are final room rates only
- Kenya-based platform for Kenyan properties only
- All amounts displayed in KES

---

## 🗄️ Database Structure

### Supabase Backend API

**Base URL**: `https://{projectId}.supabase.co/functions/v1/make-server-e0651789`

### Data Collections

#### Users
- Key: `user:{email}`
- Fields: userId, fullName, email, phone, password (hashed), role, registeredAt

#### Partners (Property Owners)
- Key: `partner:{email}`
- Fields: partnerId, businessName, firstName, lastName, email, phone, password (hashed), propertyName, city, county, registeredAt

#### Bookings
- Key: `booking:{bookingId}`
- Fields: bookingId (BKX-XXXXXXXXX), hotelName, roomType, checkIn, checkOut, nights, guests, totalAmount, guestEmail, guestPhone, propertyOwnerEmail, status, paymentStatus

#### Payments
- Key: `payment:{transactionId}`
- Fields: id, bookingId, mpesaCode, amount, phoneNumber, status, timestamp, paybill, businessName

#### Reviews
- Key: `review:{reviewId}`
- Fields: id, propertyOwner, hotelName, rating, comment, userName, userEmail, createdAt

#### Messages
- Key: `message:{messageId}`
- Fields: id, propertyOwner, senderName, senderEmail, subject, message, read, createdAt

#### Properties
- Key: `property:{propertyId}`
- Fields: id, ownerEmail, propertyName, propertyType, roomType, location, price, amenities, createdAt

---

## 🔌 API Integration

### Frontend API Client

Located in `/src/utils/api.ts`

```typescript
import api from '@/utils/api';

// User Registration
const result = await api.auth.register({
  fullName: "John Doe",
  email: "john@example.com",
  phone: "0712345678",
  password: "SecurePass123"
});

// Create Booking
const booking = await api.bookings.create({
  hotelName: "Safari Hotel",
  guestEmail: "guest@example.com",
  checkIn: "2026-02-01",
  checkOut: "2026-02-05",
  totalAmount: 25000
});

// Get Partner Stats
const stats = await api.stats.getPartnerStats("partner@example.com");
```

### Available API Endpoints

**Authentication**
- POST `/auth/register` - Register user
- POST `/auth/register-partner` - Register partner
- POST `/auth/login` - Login
- GET `/auth/user/:email` - Get user by email

**Bookings**
- POST `/bookings` - Create booking
- GET `/bookings` - Get all bookings (admin)
- GET `/bookings/user/:email` - Get user bookings
- GET `/bookings/partner/:email` - Get partner bookings
- GET `/bookings/:bookingId` - Get single booking
- PUT `/bookings/:bookingId` - Update booking
- DELETE `/bookings/:bookingId` - Delete booking

**Payments**
- POST `/payments` - Initiate payment
- POST `/payments/verify` - Verify payment
- GET `/payments` - Get all payments (admin)
- GET `/payments/booking/:bookingId` - Get payment by booking

**Reviews**
- POST `/reviews` - Create review
- GET `/reviews` - Get all reviews
- GET `/reviews/partner/:email` - Get partner reviews
- DELETE `/reviews/:reviewId` - Delete review

**Messages**
- POST `/messages` - Send message
- GET `/messages/partner/:email` - Get partner messages
- PUT `/messages/:messageId/read` - Mark as read

**Properties**
- POST `/properties` - Create property
- GET `/properties` - Get all properties
- GET `/properties/partner/:email` - Get partner properties
- GET `/properties/:propertyId` - Get single property
- PUT `/properties/:propertyId` - Update property

**Statistics**
- GET `/stats/admin` - Get admin dashboard stats
- GET `/stats/partner/:email` - Get partner dashboard stats

**Users**
- GET `/users` - Get all users (admin)
- GET `/partners` - Get all partners (admin)
- PUT `/users/:email` - Update user
- PUT `/partners/:email` - Update partner

---

## 🎯 Unique Features

### Kenya-Specific
- All properties are Kenyan hotels, BnBs, and self-stay houses
- M-PESA integration (Kenya's leading mobile payment)
- Kenyan phone number validation (07XX, 01XX, +2547XX)
- County-based location filtering

### No Tax System
- **IMPORTANT**: This platform does NOT add taxes to bookings
- All displayed prices are final room rates
- No VAT, service charges, or other taxes calculated
- Clean pricing for Kenyan market

### Property Categories
- Hotels & Resorts
- BnBs (Bed & Breakfasts)
- Self-Stay Houses
- Apartments & Villas

---

## 🔐 Security Features

1. **Password Security**
   - SHA-256 password hashing
   - Secure storage in Supabase
   - Never exposed in API responses

2. **Authentication**
   - Session-based authentication
   - Role-based access control (User, Partner, Admin)
   - Protected API endpoints

3. **Data Validation**
   - Email format validation
   - Phone number validation (Kenyan format)
   - Input sanitization

4. **CORS Protection**
   - Configured for specific origins
   - Secure headers

---

## 📱 Platform Access

### User Roles

**1. Regular Users (Guests)**
- Browse hotels and properties
- Make bookings
- View booking history
- Leave reviews
- Make payments via M-PESA

**2. Partners (Property Owners)**
- List properties
- Manage bookings
- View earnings
- Respond to reviews
- Communicate with guests
- Access analytics dashboard

**3. Super Admin**
- Full platform access
- User management
- Payment verification
- Platform analytics
- Partner approval

---

## 🎨 User Interface Features

### Responsive Design
- Mobile-first approach
- Desktop and tablet optimized
- Touch-friendly interfaces

### Real-time Updates
- Live booking status
- Payment verification updates
- Message notifications

### Search & Filtering
- Location-based search
- Price range filters
- Amenity filters (WiFi, Pool, Parking, etc.)
- Star rating filters
- Property type filters

### Booking Flow
1. Search properties
2. Select property and dates
3. Review details
4. Login/Register
5. Confirm booking
6. M-PESA payment
7. Receive confirmation

---

## 🚦 Deployment Status

**Status**: ✅ **PRODUCTION READY**

### Completed Components

✅ Frontend Application (React + TypeScript)  
✅ Supabase Backend Integration  
✅ RESTful API (Hono Server)  
✅ Email Service (SMTP configured)  
✅ M-PESA Payment Integration  
✅ User Authentication System  
✅ Admin Dashboard  
✅ Partner Dashboard  
✅ Booking Management  
✅ Payment Verification  
✅ Review System  
✅ Messaging System  
✅ Property Management  
✅ Real-time Statistics  

---

## 📞 Support & Contact

**Email**: support@nacyglobal.com  
**Business**: NACY GLOBAL TECHNOLOGIES  
**M-PESA Paybill**: 4005207

---

## 📋 Environment Variables

Required for production deployment:

```env
# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email (already configured in server)
SMTP_HOST=mail.nacyglobal.com
SMTP_PORT=587
SMTP_USER=support@nacyglobal.com
SMTP_PASS=@Naffpro2020
```

---

## 🎉 Production Features Summary

| Feature | Status | Description |
|---------|--------|-------------|
| User Registration | ✅ Live | Email verification with unique IDs |
| Partner Registration | ✅ Live | Property owner onboarding |
| Property Listing | ✅ Live | Multi-property support |
| Search & Filters | ✅ Live | Advanced search capabilities |
| Booking System | ✅ Live | Real-time availability |
| M-PESA Payments | ✅ Live | Paybill 4005207 |
| Email Notifications | ✅ Live | All major events |
| Admin Dashboard | ✅ Live | Platform management |
| Partner Dashboard | ✅ Live | Property management |
| Reviews & Ratings | ✅ Live | Guest feedback |
| Messaging | ✅ Live | Guest-Partner communication |
| Analytics | ✅ Live | Real-time statistics |

---

## 🔄 Data Migration from localStorage

If you have existing data in localStorage, it will continue to work alongside the Supabase database. New data will be stored in Supabase automatically.

---

**© 2026 Bokex - Smart Hotel Booking Platform for Kenya**  
**Powered by NACY GLOBAL TECHNOLOGIES**
