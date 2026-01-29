# 🔍 Quick SQL Queries for Bokex Admin

Copy and paste these queries into Supabase SQL Editor to view your data.

---

## 👥 USER QUERIES

### View all registered users
```sql
SELECT 
  user_id,
  full_name,
  email,
  phone,
  role,
  registered_at
FROM users
ORDER BY registered_at DESC;
```

### Count total users
```sql
SELECT COUNT(*) as total_users FROM users;
```

### Search user by email
```sql
SELECT * FROM users WHERE email = 'user@example.com';
```

---

## 🏨 PARTNER QUERIES

### View all partners
```sql
SELECT 
  partner_id,
  business_name,
  first_name || ' ' || last_name as owner_name,
  email,
  phone,
  city,
  county,
  registered_at
FROM partners
ORDER BY registered_at DESC;
```

### Count total partners
```sql
SELECT COUNT(*) as total_partners FROM partners;
```

### Partners by county
```sql
SELECT 
  county,
  COUNT(*) as partner_count
FROM partners
GROUP BY county
ORDER BY partner_count DESC;
```

---

## 🏠 PROPERTY QUERIES

### View all properties
```sql
SELECT 
  property_id,
  property_name,
  property_type,
  room_type,
  location,
  city,
  price,
  owner_email,
  status,
  created_at
FROM properties
ORDER BY created_at DESC;
```

### Properties by partner
```sql
SELECT * FROM properties 
WHERE owner_email = 'partner@example.com'
ORDER BY created_at DESC;
```

### Properties by location
```sql
SELECT 
  city,
  COUNT(*) as property_count,
  AVG(price) as avg_price
FROM properties
WHERE status = 'active'
GROUP BY city
ORDER BY property_count DESC;
```

### Properties with price range
```sql
SELECT * FROM properties
WHERE price BETWEEN 5000 AND 15000
AND status = 'active'
ORDER BY price ASC;
```

---

## 📅 BOOKING QUERIES

### View all bookings
```sql
SELECT 
  booking_id,
  hotel_name,
  guest_name,
  guest_email,
  check_in,
  check_out,
  nights,
  guests,
  total_amount,
  status,
  payment_status,
  created_at
FROM bookings
ORDER BY created_at DESC;
```

### Bookings for specific user
```sql
SELECT * FROM bookings
WHERE guest_email = 'user@example.com'
ORDER BY created_at DESC;
```

### Bookings for specific partner
```sql
SELECT * FROM bookings
WHERE property_owner_email = 'partner@example.com'
ORDER BY created_at DESC;
```

### Upcoming bookings
```sql
SELECT * FROM bookings
WHERE check_in >= CURRENT_DATE
AND status = 'confirmed'
ORDER BY check_in ASC;
```

### Bookings by status
```sql
SELECT 
  status,
  COUNT(*) as booking_count,
  SUM(total_amount) as total_revenue
FROM bookings
GROUP BY status;
```

### Bookings by payment status
```sql
SELECT 
  payment_status,
  COUNT(*) as count,
  SUM(total_amount) as amount
FROM bookings
GROUP BY payment_status;
```

### Today's check-ins
```sql
SELECT * FROM bookings
WHERE check_in = CURRENT_DATE
ORDER BY created_at;
```

### Monthly booking statistics
```sql
SELECT 
  DATE_TRUNC('month', created_at) as month,
  COUNT(*) as total_bookings,
  SUM(total_amount) as total_revenue
FROM bookings
GROUP BY month
ORDER BY month DESC;
```

---

## 💳 PAYMENT QUERIES

### View all payments
```sql
SELECT 
  transaction_id,
  booking_id,
  mpesa_code,
  amount,
  phone_number,
  status,
  timestamp,
  verified_at
FROM payments
ORDER BY timestamp DESC;
```

### Verified payments only
```sql
SELECT * FROM payments
WHERE status = 'verified'
ORDER BY verified_at DESC;
```

### Pending payments
```sql
SELECT * FROM payments
WHERE status = 'pending'
ORDER BY timestamp DESC;
```

### Payment by M-PESA code
```sql
SELECT * FROM payments
WHERE mpesa_code = 'SFKXXXXXXXX';
```

### Total revenue (verified payments)
```sql
SELECT 
  SUM(amount) as total_revenue,
  COUNT(*) as total_transactions
FROM payments
WHERE status = 'verified';
```

### Daily revenue
```sql
SELECT 
  DATE(timestamp) as date,
  COUNT(*) as transactions,
  SUM(amount) as daily_revenue
FROM payments
WHERE status = 'verified'
GROUP BY DATE(timestamp)
ORDER BY date DESC;
```

---

## ⭐ REVIEW QUERIES

### View all reviews
```sql
SELECT 
  review_id,
  hotel_name,
  rating,
  comment,
  user_name,
  user_email,
  created_at
FROM reviews
ORDER BY created_at DESC;
```

### Reviews for specific partner
```sql
SELECT * FROM reviews
WHERE property_owner = 'partner@example.com'
ORDER BY created_at DESC;
```

### Average rating per property
```sql
SELECT 
  hotel_name,
  COUNT(*) as review_count,
  ROUND(AVG(rating), 1) as avg_rating
FROM reviews
GROUP BY hotel_name
ORDER BY avg_rating DESC;
```

### 5-star reviews only
```sql
SELECT * FROM reviews
WHERE rating = 5
ORDER BY created_at DESC;
```

### Reviews needing attention (low ratings)
```sql
SELECT * FROM reviews
WHERE rating <= 2
ORDER BY created_at DESC;
```

---

## 💬 MESSAGE QUERIES

### View all messages
```sql
SELECT 
  message_id,
  property_owner,
  sender_name,
  sender_email,
  subject,
  message,
  read,
  created_at
FROM messages
ORDER BY created_at DESC;
```

### Unread messages for partner
```sql
SELECT * FROM messages
WHERE property_owner = 'partner@example.com'
AND read = false
ORDER BY created_at DESC;
```

### Count unread messages by partner
```sql
SELECT 
  property_owner,
  COUNT(*) as unread_count
FROM messages
WHERE read = false
GROUP BY property_owner
ORDER BY unread_count DESC;
```

---

## 📊 DASHBOARD STATISTICS

### Complete admin dashboard stats
```sql
SELECT 
  (SELECT COUNT(*) FROM users) as total_users,
  (SELECT COUNT(*) FROM partners) as total_partners,
  (SELECT COUNT(*) FROM properties WHERE status = 'active') as active_properties,
  (SELECT COUNT(*) FROM bookings) as total_bookings,
  (SELECT COUNT(*) FROM bookings WHERE status = 'confirmed') as confirmed_bookings,
  (SELECT COUNT(*) FROM bookings WHERE status = 'pending') as pending_bookings,
  (SELECT COALESCE(SUM(amount), 0) FROM payments WHERE status = 'verified') as total_revenue,
  (SELECT COUNT(*) FROM payments WHERE status = 'pending') as pending_payments,
  (SELECT COUNT(*) FROM reviews) as total_reviews,
  (SELECT COALESCE(ROUND(AVG(rating), 1), 0) FROM reviews) as avg_rating;
```

### Partner performance rankings
```sql
SELECT 
  p.business_name,
  p.email,
  COUNT(DISTINCT pr.property_id) as properties,
  COUNT(DISTINCT b.booking_id) as bookings,
  COALESCE(SUM(b.total_amount), 0) as earnings,
  COUNT(DISTINCT r.review_id) as reviews,
  COALESCE(ROUND(AVG(r.rating), 1), 0) as avg_rating
FROM partners p
LEFT JOIN properties pr ON p.email = pr.owner_email
LEFT JOIN bookings b ON p.email = b.property_owner_email AND b.payment_status = 'paid'
LEFT JOIN reviews r ON p.email = r.property_owner
GROUP BY p.business_name, p.email
ORDER BY earnings DESC;
```

### Recent activity (last 24 hours)
```sql
SELECT 
  'User Registration' as activity_type,
  full_name as details,
  registered_at as timestamp
FROM users
WHERE registered_at >= NOW() - INTERVAL '24 hours'

UNION ALL

SELECT 
  'Partner Registration',
  business_name,
  registered_at
FROM partners
WHERE registered_at >= NOW() - INTERVAL '24 hours'

UNION ALL

SELECT 
  'New Booking',
  'BKX: ' || booking_id || ' - ' || hotel_name,
  created_at
FROM bookings
WHERE created_at >= NOW() - INTERVAL '24 hours'

UNION ALL

SELECT 
  'Payment Verified',
  'TXN: ' || transaction_id || ' - KES ' || amount,
  verified_at
FROM payments
WHERE verified_at >= NOW() - INTERVAL '24 hours'

ORDER BY timestamp DESC;
```

---

## 🔗 JOINED QUERIES (WITH RELATIONSHIPS)

### Bookings with payment details
```sql
SELECT 
  b.booking_id,
  b.hotel_name,
  b.guest_name,
  b.check_in,
  b.check_out,
  b.total_amount,
  b.status as booking_status,
  p.mpesa_code,
  p.status as payment_status,
  p.verified_at
FROM bookings b
LEFT JOIN payments p ON b.booking_id = p.booking_id
ORDER BY b.created_at DESC;
```

### Properties with owner details
```sql
SELECT 
  prop.property_id,
  prop.property_name,
  prop.price,
  prop.location,
  part.business_name,
  part.first_name || ' ' || part.last_name as owner_name,
  part.email,
  part.phone
FROM properties prop
JOIN partners part ON prop.owner_email = part.email
WHERE prop.status = 'active'
ORDER BY prop.created_at DESC;
```

### Bookings with guest and owner info
```sql
SELECT 
  b.booking_id,
  b.hotel_name,
  u.full_name as guest_name,
  u.email as guest_email,
  u.phone as guest_phone,
  p.business_name as property_business,
  p.first_name || ' ' || p.last_name as owner_name,
  b.check_in,
  b.check_out,
  b.total_amount
FROM bookings b
JOIN users u ON b.guest_email = u.email
JOIN partners p ON b.property_owner_email = p.email
ORDER BY b.created_at DESC;
```

---

## 🗑️ DELETE QUERIES (USE WITH CAUTION!)

### Delete test data
```sql
-- Delete test users
DELETE FROM users WHERE email LIKE '%test%';

-- Delete test bookings
DELETE FROM bookings WHERE booking_id LIKE '%TEST%';

-- Delete old pending payments (older than 30 days)
DELETE FROM payments 
WHERE status = 'pending' 
AND timestamp < NOW() - INTERVAL '30 days';
```

---

## 📥 EXPORT QUERIES

### Export users to CSV format
```sql
COPY (
  SELECT user_id, full_name, email, phone, registered_at
  FROM users
  ORDER BY registered_at DESC
) TO '/tmp/users_export.csv' WITH CSV HEADER;
```

### Export bookings to CSV format
```sql
COPY (
  SELECT * FROM bookings
  ORDER BY created_at DESC
) TO '/tmp/bookings_export.csv' WITH CSV HEADER;
```

---

## 💡 USEFUL TIPS

1. **To limit results:** Add `LIMIT 10` at the end of any query
2. **To search:** Use `WHERE column LIKE '%search%'`
3. **To filter dates:** Use `WHERE date_column >= '2026-01-01'`
4. **To count:** Use `SELECT COUNT(*) FROM table`
5. **To sum:** Use `SELECT SUM(column) FROM table`
6. **To average:** Use `SELECT AVG(column) FROM table`

---

**Copy any query above and paste into Supabase SQL Editor to run it!**

© 2026 Bokex Database Queries
