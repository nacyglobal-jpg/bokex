# 📊 Viewing Your Bokex Data in Supabase

## Quick Access Guide

You've successfully run the Bokex migration! Here's how to view all your data.

---

## 🎯 Quick Start (30 Seconds)

### View Your Tables
1. Open Supabase → **Table Editor**
2. Click the dropdown at the top
3. You should see **8 tables**:
   - ✅ **users** - Guest accounts
   - ✅ **partners** - Property owners
   - ✅ **properties** - Hotel/BnB listings
   - ✅ **rooms** - Room inventory
   - ✅ **bookings** - Reservations
   - ✅ **payments** - M-PESA transactions
   - ✅ **reviews** - Guest ratings
   - ✅ **messages** - Communications

---

## 📋 Viewing Each Table

### 👥 USERS (Guest Accounts)

**Table Editor:**
```
Supabase → Table Editor → Select "users"
```

**Columns you'll see:**
- `id` (UUID) - Database ID
- `user_id` (USR-XXXXXXXXX) - Public ID
- `full_name` - Guest name
- `email` - Login email
- `phone` - Contact number
- `role` - Always "user"
- `registered_at` - Signup date
- `created_at` - Record created
- `updated_at` - Last modified

**SQL Query:**
```sql
SELECT user_id, full_name, email, phone, registered_at
FROM users
ORDER BY registered_at DESC;
```

---

### 🏨 PARTNERS (Property Owners)

**Table Editor:**
```
Supabase → Table Editor → Select "partners"
```

**Columns you'll see:**
- `id` (UUID) - Database ID
- `partner_id` (PTN-XXXXXXXXX) - Public ID
- `first_name`, `last_name` - Owner name
- `email` - Login email
- `phone` - Contact number
- `address` - Physical address
- `location` - County/City
- `business_name` - Business name
- `property_name` - Main property
- `status` - active/inactive
- `registered_at` - Signup date

**SQL Query:**
```sql
SELECT 
  partner_id,
  first_name || ' ' || last_name as owner_name,
  business_name,
  email,
  phone,
  location,
  status
FROM partners
ORDER BY registered_at DESC;
```

---

### 🏠 PROPERTIES (Hotel/BnB Listings)

**Table Editor:**
```
Supabase → Table Editor → Select "properties"
```

**Columns you'll see:**
- `id` (UUID) - Database ID
- `property_id` (PROP-XXXXXXXXX) - Public ID
- `owner_email` - Who owns this (FK to partners)
- `name` - Property name
- `category` - Hotel | BNB | Self Stay House
- `location` - Full location
- `city`, `county` - Location parts
- `description` - Details
- `amenities` (JSON) - ["wifi", "parking", ...]
- `photos` (JSON) - Image URLs
- `base_price` - Price per night (for BnB/Self-stay)
- `rating` - Average rating
- `stars` - Star rating
- `featured` - Featured property?
- `status` - active/inactive

**SQL Query:**
```sql
SELECT 
  property_id,
  name,
  category,
  location,
  base_price,
  rating,
  stars,
  owner_email
FROM properties
WHERE status = 'active'
ORDER BY created_at DESC;
```

**With Owner Info:**
```sql
SELECT 
  p.property_id,
  p.name as property_name,
  p.category,
  p.location,
  p.base_price,
  pt.first_name || ' ' || pt.last_name as owner_name,
  pt.email as owner_email,
  pt.phone as owner_phone
FROM properties p
JOIN partners pt ON p.owner_email = pt.email
WHERE p.status = 'active';
```

---

### 🛏️ ROOMS (Room Inventory)

**Table Editor:**
```
Supabase → Table Editor → Select "rooms"
```

**Columns you'll see:**
- `id` (UUID) - Database ID
- `room_id` (ROOM-XXXXXXXXX) - Public ID
- `property_uuid` - Which property (FK to properties.id)
- `name` - Room name
- `room_category` - studio | 1-bedroom | double-room, etc.
- `bed_type` - 1-bed | 2-beds
- `beds` - e.g., "1 Double Bed"
- `price` - Per night rate
- `capacity` - Max guests
- `available` - Available rooms
- `amenities` (JSON) - Room amenities

**SQL Query:**
```sql
SELECT 
  room_id,
  name,
  room_category,
  beds,
  price,
  capacity,
  available
FROM rooms
ORDER BY price ASC;
```

**With Property Info:**
```sql
SELECT 
  r.room_id,
  r.name as room_name,
  r.price,
  r.capacity,
  r.available,
  p.property_id,
  p.name as property_name,
  p.location
FROM rooms r
JOIN properties p ON r.property_uuid = p.id
ORDER BY p.name, r.price;
```

---

### 📅 BOOKINGS (Reservations)

**Table Editor:**
```
Supabase → Table Editor → Select "bookings"
```

**Columns you'll see:**
- `id` (UUID) - Database ID
- `booking_id` (BKX-XXXXXXXXX) - Public ID
- `property_uuid` - Which property (FK)
- `room_uuid` - Which room (FK, nullable)
- `guest_email` - Guest email
- `guest_name` - Guest name
- `guest_phone` - Contact
- `check_in`, `check_out` - Dates
- `nights` - Number of nights
- `guests` - Number of guests
- `total_amount` - Total cost (KES)
- `status` - pending | confirmed | cancelled | completed
- `payment_status` - pending | paid | failed
- `special_requests` - Guest notes

**SQL Query:**
```sql
SELECT 
  booking_id,
  guest_name,
  check_in,
  check_out,
  nights,
  total_amount,
  status,
  payment_status
FROM bookings
ORDER BY created_at DESC
LIMIT 20;
```

**Complete Booking Details:**
```sql
SELECT 
  b.booking_id,
  b.guest_name,
  b.guest_email,
  b.check_in,
  b.check_out,
  b.nights,
  b.guests,
  b.total_amount,
  b.status,
  b.payment_status,
  p.property_id,
  p.name as property_name,
  p.location,
  r.room_id,
  r.name as room_name,
  r.price as room_price
FROM bookings b
JOIN properties p ON b.property_uuid = p.id
LEFT JOIN rooms r ON b.room_uuid = r.id
ORDER BY b.created_at DESC;
```

---

### 💳 PAYMENTS (M-PESA Transactions)

**Table Editor:**
```
Supabase → Table Editor → Select "payments"
```

**Columns you'll see:**
- `id` (UUID) - Database ID
- `transaction_id` (TXN-XXXXXXXXXX) - Public ID
- `booking_uuid` - Which booking (FK)
- `mpesa_code` - M-PESA confirmation code
- `amount` - Payment amount (KES)
- `phone_number` - M-PESA number
- `paybill` - 4005207
- `business_name` - NACY GLOBAL TECHNOLOGIES
- `status` - pending | verified | rejected | failed
- `payment_method` - mpesa
- `initiated_at` - When payment started
- `verified_at` - When verified

**SQL Query:**
```sql
SELECT 
  transaction_id,
  mpesa_code,
  amount,
  phone_number,
  status,
  initiated_at,
  verified_at
FROM payments
ORDER BY initiated_at DESC;
```

**Payments with Booking Info:**
```sql
SELECT 
  p.transaction_id,
  p.mpesa_code,
  p.amount,
  p.status,
  p.verified_at,
  b.booking_id,
  b.guest_name,
  b.guest_email,
  prop.name as property_name
FROM payments p
JOIN bookings b ON p.booking_uuid = b.id
JOIN properties prop ON b.property_uuid = prop.id
ORDER BY p.initiated_at DESC;
```

**Revenue Summary:**
```sql
SELECT 
  COUNT(*) as total_transactions,
  SUM(amount) as total_revenue,
  SUM(CASE WHEN status = 'verified' THEN amount ELSE 0 END) as verified_revenue,
  SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) as pending_revenue
FROM payments;
```

---

### ⭐ REVIEWS (Guest Ratings)

**Table Editor:**
```
Supabase → Table Editor → Select "reviews"
```

**Columns you'll see:**
- `id` (UUID) - Database ID
- `review_id` (REV-XXXXXXXXX) - Public ID
- `property_uuid` - Which property (FK)
- `rating` - 1-5 stars
- `comment` - Review text
- `user_name` - Reviewer name
- `user_email` - Reviewer email

**SQL Query:**
```sql
SELECT 
  review_id,
  rating,
  comment,
  user_name,
  created_at
FROM reviews
ORDER BY created_at DESC;
```

**Reviews with Property Info:**
```sql
SELECT 
  r.review_id,
  r.rating,
  r.comment,
  r.user_name,
  r.created_at,
  p.property_id,
  p.name as property_name
FROM reviews r
JOIN properties p ON r.property_uuid = p.id
ORDER BY r.created_at DESC;
```

**Average Ratings by Property:**
```sql
SELECT 
  p.property_id,
  p.name,
  COUNT(r.id) as review_count,
  ROUND(AVG(r.rating), 1) as avg_rating
FROM properties p
LEFT JOIN reviews r ON p.id = r.property_uuid
GROUP BY p.id, p.property_id, p.name
HAVING COUNT(r.id) > 0
ORDER BY avg_rating DESC;
```

---

### 💬 MESSAGES (Communications)

**Table Editor:**
```
Supabase → Table Editor → Select "messages"
```

**Columns you'll see:**
- `id` (UUID) - Database ID
- `message_id` (MSG-XXXXXXXXX) - Public ID
- `property_uuid` - Related property (nullable)
- `partner_email` - Recipient (FK)
- `sender_name` - Who sent it
- `sender_email` - Sender email
- `subject` - Message subject
- `message` - Message content
- `read` - Read status (true/false)

**SQL Query:**
```sql
SELECT 
  message_id,
  sender_name,
  sender_email,
  subject,
  read,
  created_at
FROM messages
ORDER BY created_at DESC;
```

**Unread Messages:**
```sql
SELECT 
  message_id,
  partner_email,
  sender_name,
  subject,
  created_at
FROM messages
WHERE read = false
ORDER BY created_at DESC;
```

**Messages by Partner:**
```sql
SELECT 
  m.message_id,
  m.sender_name,
  m.sender_email,
  m.subject,
  m.read,
  m.created_at,
  p.name as property_name
FROM messages m
LEFT JOIN properties p ON m.property_uuid = p.id
WHERE m.partner_email = 'partner@example.com'
ORDER BY m.created_at DESC;
```

---

## 🔍 Advanced Queries

### Dashboard Statistics

```sql
SELECT 
  (SELECT COUNT(*) FROM users) as total_users,
  (SELECT COUNT(*) FROM partners WHERE status = 'active') as active_partners,
  (SELECT COUNT(*) FROM properties WHERE status = 'active') as active_properties,
  (SELECT COUNT(*) FROM rooms) as total_rooms,
  (SELECT COUNT(*) FROM bookings) as total_bookings,
  (SELECT COUNT(*) FROM bookings WHERE status = 'confirmed') as confirmed_bookings,
  (SELECT COALESCE(SUM(amount), 0) FROM payments WHERE status = 'verified') as total_revenue,
  (SELECT COUNT(*) FROM reviews) as total_reviews,
  (SELECT COALESCE(ROUND(AVG(rating), 1), 0) FROM reviews) as avg_rating;
```

### Partner Performance

```sql
SELECT 
  pt.partner_id,
  pt.first_name || ' ' || pt.last_name as owner_name,
  pt.business_name,
  COUNT(DISTINCT p.id) as properties_count,
  COUNT(DISTINCT r.id) as rooms_count,
  COUNT(DISTINCT b.id) as bookings_count,
  COALESCE(SUM(CASE WHEN b.payment_status = 'paid' THEN b.total_amount ELSE 0 END), 0) as total_earnings,
  COUNT(DISTINCT rev.id) as reviews_count,
  COALESCE(ROUND(AVG(rev.rating), 1), 0) as avg_rating
FROM partners pt
LEFT JOIN properties p ON pt.email = p.owner_email
LEFT JOIN rooms r ON p.id = r.property_uuid
LEFT JOIN bookings b ON p.id = b.property_uuid
LEFT JOIN reviews rev ON p.id = rev.property_uuid
GROUP BY pt.id, pt.partner_id, pt.first_name, pt.last_name, pt.business_name
ORDER BY total_earnings DESC;
```

### Upcoming Check-ins

```sql
SELECT 
  b.booking_id,
  b.guest_name,
  b.guest_phone,
  b.check_in,
  b.guests,
  p.name as property_name,
  p.location,
  r.name as room_name
FROM bookings b
JOIN properties p ON b.property_uuid = p.id
LEFT JOIN rooms r ON b.room_uuid = r.id
WHERE b.check_in >= CURRENT_DATE
  AND b.status = 'confirmed'
ORDER BY b.check_in ASC;
```

### Revenue by Month

```sql
SELECT 
  DATE_TRUNC('month', initiated_at) as month,
  COUNT(*) as transactions,
  SUM(amount) as total_revenue,
  SUM(CASE WHEN status = 'verified' THEN amount ELSE 0 END) as verified_revenue
FROM payments
GROUP BY month
ORDER BY month DESC;
```

---

## 🎯 Important UUIDs vs IDs

Your schema uses **TWO types of identifiers**:

### 1. **UUIDs (Internal)**
- `id` column - Database UUID (never shown to users)
- Used for **foreign key relationships**
- Example: `550e8400-e29b-41d4-a716-446655440000`

### 2. **Public IDs (External)**
- `user_id`, `partner_id`, `booking_id`, etc.
- Generated with prefixes (USR-, PTN-, BKX-, etc.)
- Shown to users in UI and emails
- Example: `BKX-A7K9P2M4X`

**When querying relationships, use UUIDs:**
```sql
-- ✅ CORRECT (using UUID)
SELECT * FROM bookings WHERE property_uuid = '550e8400-...';

-- ❌ WRONG (using public ID)
SELECT * FROM bookings WHERE property_uuid = 'PROP-ABC123';
```

**To query by public ID, use the ID column:**
```sql
-- ✅ CORRECT
SELECT * FROM bookings WHERE booking_id = 'BKX-A7K9P2M4X';
```

---

## 📊 Exporting Data

### Export as CSV
1. Go to **Table Editor**
2. Select your table
3. Click **⋮** (three dots menu)
4. Click **Download as CSV**

### Export Specific Query Results
1. Run query in **SQL Editor**
2. Click **Download CSV** button below results

---

## 🔄 Real-Time Monitoring

### Watch for New Data
1. Open **Table Editor**
2. Select table
3. Click **🔄 Refresh** button periodically
4. Or enable **Auto-refresh** if available

### Monitor Activity
```sql
-- Recent activity (last 24 hours)
SELECT 'New User' as type, full_name as detail, registered_at as timestamp
FROM users
WHERE registered_at >= NOW() - INTERVAL '24 hours'

UNION ALL

SELECT 'New Booking', booking_id, created_at
FROM bookings
WHERE created_at >= NOW() - INTERVAL '24 hours'

UNION ALL

SELECT 'Payment', transaction_id, initiated_at
FROM payments
WHERE initiated_at >= NOW() - INTERVAL '24 hours'

ORDER BY timestamp DESC;
```

---

## ✅ You're All Set!

Your Bokex database is fully operational. Data will populate automatically as:
- Users register → `users` table
- Partners sign up → `partners` table
- Properties listed → `properties` + `rooms` tables
- Bookings made → `bookings` table
- Payments processed → `payments` table
- Reviews posted → `reviews` table
- Messages sent → `messages` table

**Start testing your platform and watch the data appear!** 🎉

---

© 2026 Bokex - Data Viewing Guide
