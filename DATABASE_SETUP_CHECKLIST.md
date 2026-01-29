# ✅ Bokex Database Setup Checklist

## Complete this checklist to ensure your database is properly configured

---

## 📋 PRE-SETUP CHECKLIST

### Supabase Account Setup
- [ ] Created Supabase account at https://supabase.com
- [ ] Created new project for Bokex
- [ ] Project is active and running
- [ ] Can access Supabase dashboard

### Environment Variables
- [ ] `SUPABASE_URL` is set correctly
- [ ] `SUPABASE_ANON_KEY` is set correctly
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is set correctly
- [ ] Can verify in Settings → API in Supabase dashboard

---

## 🗄️ DATABASE MIGRATION CHECKLIST

### Running the Migration
- [ ] Opened Supabase SQL Editor
- [ ] Created new query
- [ ] Copied SQL from `/supabase/migrations/001_create_bokex_tables.sql`
- [ ] Pasted into SQL Editor
- [ ] Clicked "Run" button
- [ ] Saw success message (or "table already exists" - both OK)
- [ ] No errors displayed

---

## 📊 TABLE VERIFICATION CHECKLIST

### Table Editor Check
- [ ] Opened Table Editor in Supabase
- [ ] Can see table dropdown menu
- [ ] Table dropdown shows 7 tables:
  - [ ] `users`
  - [ ] `partners`
  - [ ] `properties`
  - [ ] `bookings`
  - [ ] `payments`
  - [ ] `reviews`
  - [ ] `messages`

### Individual Table Checks

#### users table
- [ ] Table opens without errors
- [ ] Can see columns: id, user_id, full_name, email, phone, password_hash, role, registered_at, created_at, updated_at
- [ ] Can click "+ Insert row" button
- [ ] Empty (or has test data if already created)

#### partners table
- [ ] Table opens without errors
- [ ] Can see columns: id, partner_id, business_name, first_name, last_name, email, phone, password_hash, website, address, city, county, property_name, role, registered_at, created_at, updated_at
- [ ] Can click "+ Insert row" button
- [ ] Empty (or has test data if already created)

#### properties table
- [ ] Table opens without errors
- [ ] Can see columns: id, property_id, owner_email, property_name, property_type, room_type, location, city, county, price, description, amenities, images, max_guests, bedrooms, bathrooms, status, created_at, updated_at
- [ ] Can click "+ Insert row" button

#### bookings table
- [ ] Table opens without errors
- [ ] Can see columns: id, booking_id, property_id, hotel_name, hotel_location, room_type, check_in, check_out, nights, guests, total_amount, guest_name, guest_email, guest_phone, property_owner_email, status, payment_status, special_requests, created_at, updated_at
- [ ] Can click "+ Insert row" button

#### payments table
- [ ] Table opens without errors
- [ ] Can see columns: id, transaction_id, booking_id, mpesa_code, amount, phone_number, paybill, business_name, status, payment_method, timestamp, verified_at, created_at
- [ ] Can click "+ Insert row" button

#### reviews table
- [ ] Table opens without errors
- [ ] Can see columns: id, review_id, property_owner, hotel_name, property_id, rating, comment, user_name, user_email, created_at, updated_at
- [ ] Can click "+ Insert row" button

#### messages table
- [ ] Table opens without errors
- [ ] Can see columns: id, message_id, property_owner, sender_name, sender_email, subject, message, read, created_at
- [ ] Can click "+ Insert row" button

---

## 🔐 SECURITY CHECKLIST

### Row Level Security (RLS)
- [ ] Opened Authentication → Policies in Supabase
- [ ] All 7 tables have RLS enabled
- [ ] Each table has 4 policies:
  - [ ] Enable read access for all users
  - [ ] Enable insert for service role
  - [ ] Enable update for service role
  - [ ] Enable delete for service role

### API Keys Security
- [ ] Service Role Key is stored securely
- [ ] Service Role Key is NOT exposed in frontend code
- [ ] Anon Key is used in frontend
- [ ] Service Role Key is used in backend only

---

## 🔗 BACKEND INTEGRATION CHECKLIST

### Server Files
- [ ] `/supabase/functions/server/database.tsx` exists
- [ ] `/supabase/functions/server/email-service.tsx` exists
- [ ] `/supabase/functions/server/index.tsx` updated to use database.tsx
- [ ] No import errors in server code

### API Endpoints Test
Run these tests in your browser or API client:

- [ ] Health check works: `GET /make-server-e0651789/health`
  - Expected: `{ "status": "healthy", "database": "Supabase PostgreSQL" }`

- [ ] Can call auth endpoints (returns proper error if no data):
  - [ ] `GET /make-server-e0651789/auth/user/test@example.com`
  
- [ ] Can call stats endpoints:
  - [ ] `GET /make-server-e0651789/stats/admin`

---

## 📧 EMAIL SERVICE CHECKLIST

### SMTP Configuration
- [ ] Email service file exists: `/supabase/functions/server/email-service.tsx`
- [ ] SMTP credentials configured:
  - [ ] Host: mail.nacyglobal.com
  - [ ] Port: 587
  - [ ] Username: support@nacyglobal.com
  - [ ] Password: @Naffpro2020
  - [ ] From: support@nacyglobal.com

### Email Templates
- [ ] User registration email template ready
- [ ] Partner registration email template ready
- [ ] Property listing email template ready
- [ ] Booking confirmation email template ready
- [ ] Booking notification to owner template ready
- [ ] Payment confirmation email template ready
- [ ] Payment notification to admin template ready

---

## 🧪 TESTING CHECKLIST

### Test User Flow
- [ ] Register new user on platform
- [ ] Check `users` table in Supabase
- [ ] Confirm new user row appears
- [ ] Confirm `user_id` format is USR-XXXXXXXXX
- [ ] Confirm password is hashed
- [ ] Confirm welcome email received (check email inbox)

### Test Partner Flow
- [ ] Register new partner on platform
- [ ] Check `partners` table in Supabase
- [ ] Confirm new partner row appears
- [ ] Confirm `partner_id` format is USR-XXXXXXXXX
- [ ] Confirm partner welcome email received

### Test Property Listing Flow
- [ ] Partner lists a property
- [ ] Check `properties` table in Supabase
- [ ] Confirm new property row appears
- [ ] Confirm `property_id` format is PROP-XXXXXXXXX
- [ ] Confirm property listing email received

### Test Booking Flow
- [ ] User makes a booking
- [ ] Check `bookings` table in Supabase
- [ ] Confirm new booking row appears
- [ ] Confirm `booking_id` format is BKX-XXXXXXXXX
- [ ] Confirm booking status is 'pending'
- [ ] Confirm guest confirmation email received
- [ ] Confirm owner notification email received

### Test Payment Flow
- [ ] User initiates payment
- [ ] Check `payments` table in Supabase
- [ ] Confirm new payment row appears
- [ ] Confirm `transaction_id` format is TXN-XXXXXXXXXX
- [ ] Confirm M-PESA code is generated
- [ ] Verify payment
- [ ] Confirm payment status changes to 'verified'
- [ ] Confirm booking payment_status changes to 'paid'
- [ ] Confirm booking status changes to 'confirmed'
- [ ] Confirm payment receipt email received
- [ ] Confirm admin notification email received

### Test Review Flow
- [ ] User submits a review
- [ ] Check `reviews` table in Supabase
- [ ] Confirm new review row appears
- [ ] Confirm `review_id` format is REV-XXXXXXXXX

### Test Message Flow
- [ ] User sends message to partner
- [ ] Check `messages` table in Supabase
- [ ] Confirm new message row appears
- [ ] Confirm `message_id` format is MSG-XXXXXXXXX
- [ ] Confirm `read` is false
- [ ] Partner marks as read
- [ ] Confirm `read` changes to true

---

## 📊 ADMIN DASHBOARD CHECKLIST

### Super Admin Dashboard Access
- [ ] Can login as admin
- [ ] Dashboard loads without errors
- [ ] Can see all sections

### Left Side Panel
- [ ] Users section displays
- [ ] Can see count of total users
- [ ] User list shows data from `users` table
- [ ] Can search users
- [ ] Partners section displays
- [ ] Can see count of total partners
- [ ] Partner list shows data from `partners` table
- [ ] Can expand partner to see user details

### Payment Verification Panel
- [ ] Payment verification section loads
- [ ] Can see pending payments from `payments` table
- [ ] Can search by booking ID
- [ ] Can search by user ID
- [ ] Can filter by status
- [ ] Can verify payment (updates database)
- [ ] Can reject payment (updates database)

### Statistics Dashboard
- [ ] Total bookings displays (from `bookings` table)
- [ ] Total revenue displays (from `payments` table)
- [ ] Total users displays (from `users` table)
- [ ] Total partners displays (from `partners` table)
- [ ] Recent bookings list displays
- [ ] Recent payments list displays
- [ ] Charts render correctly
- [ ] All stats update in real-time

---

## 🏨 PARTNER DASHBOARD CHECKLIST

### Partner Dashboard Access
- [ ] Can login as partner
- [ ] Dashboard loads without errors
- [ ] Shows partner-specific data only

### Partner Stats
- [ ] Total bookings displays (filtered by partner email)
- [ ] Total earnings displays (sum of paid bookings)
- [ ] Total properties displays
- [ ] Average rating displays (from reviews)
- [ ] Recent bookings list displays
- [ ] Charts render correctly

### Calendar View
- [ ] Calendar displays
- [ ] Bookings appear on correct dates
- [ ] Can see booking details
- [ ] Dates are clickable

### Reviews Section
- [ ] Reviews display (filtered by partner)
- [ ] Average rating shows
- [ ] Individual reviews list
- [ ] Star ratings display correctly

### Messages Section
- [ ] Messages display (filtered by partner)
- [ ] Unread count shows
- [ ] Can mark as read
- [ ] Read status updates in database

---

## 🔄 DATA FLOW VERIFICATION

### User Registration Flow
```
Frontend → API → Database → Email
   ✓         ✓        ✓        ✓
```
- [ ] All steps complete successfully
- [ ] Data persists in database
- [ ] Email delivered

### Booking Creation Flow
```
Frontend → API → Database → Email (Guest) → Email (Owner)
   ✓         ✓        ✓           ✓              ✓
```
- [ ] All steps complete successfully
- [ ] Both emails delivered

### Payment Verification Flow
```
Frontend → API → Update Payment → Update Booking → Email (Guest) → Email (Admin)
   ✓         ✓           ✓               ✓              ✓               ✓
```
- [ ] All steps complete successfully
- [ ] Database updated correctly
- [ ] Both emails delivered

---

## 📱 FRONTEND INTEGRATION CHECKLIST

### API Client
- [ ] `/src/utils/api.ts` file exists
- [ ] All API functions defined
- [ ] Proper error handling
- [ ] Authorization headers set

### API Usage in Components
- [ ] Registration forms use `api.auth.register()`
- [ ] Login forms use `api.auth.login()`
- [ ] Booking creation uses `api.bookings.create()`
- [ ] Payment uses `api.payments.create()` and `api.payments.verify()`
- [ ] Dashboard uses `api.stats.getAdminStats()` or `api.stats.getPartnerStats()`

---

## 🎯 FINAL VERIFICATION

### Production Readiness
- [ ] All tables created and verified
- [ ] All APIs tested and working
- [ ] Email system tested and working
- [ ] Admin dashboard fully functional
- [ ] Partner dashboard fully functional
- [ ] User flow tested end-to-end
- [ ] Payment flow tested end-to-end
- [ ] No console errors
- [ ] No database errors
- [ ] Performance is acceptable

### Documentation
- [ ] Read `/SUPABASE_SETUP_GUIDE.md`
- [ ] Read `/BOKEX_PRODUCTION_GUIDE.md`
- [ ] Read `/VISUAL_SETUP_INSTRUCTIONS.md`
- [ ] Read `/QUICK_SQL_QUERIES.md`
- [ ] Understand database structure
- [ ] Know how to query data
- [ ] Know how to troubleshoot issues

### Backup & Security
- [ ] Database backups enabled in Supabase
- [ ] API keys stored securely
- [ ] RLS policies verified
- [ ] CORS configured correctly
- [ ] SSL/HTTPS enabled

---

## 🎉 COMPLETION

### All Done? Mark These Final Items:

- [ ] ✅ Database is 100% functional
- [ ] ✅ All features tested
- [ ] ✅ Ready for production use
- [ ] ✅ Team trained on how to use Supabase dashboard
- [ ] ✅ Monitoring set up
- [ ] ✅ Support email configured

---

## 📊 Current Status Summary

**Tables Created:** __ / 7  
**Tables Tested:** __ / 7  
**APIs Working:** __ / 50+  
**Email Templates:** __ / 7  
**Dashboards:** __ / 2  
**Overall Progress:** ___%

---

## 🚀 Next Steps After Completion

1. **Monitor Production**
   - Watch Supabase dashboard for activity
   - Monitor email delivery
   - Track database performance

2. **User Onboarding**
   - Invite initial users
   - Invite partner hotels
   - Monitor first bookings

3. **Optimization**
   - Add database indexes if needed
   - Optimize slow queries
   - Cache frequently accessed data

4. **Scaling**
   - Monitor database size
   - Plan for growth
   - Consider upgrading Supabase plan

---

**Date Completed:** _______________  
**Completed By:** _______________  
**Notes:** _______________

---

© 2026 Bokex Database Setup Checklist
