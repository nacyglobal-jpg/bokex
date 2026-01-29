# 🚀 Bokex Supabase Database Setup Guide

## Complete Step-by-Step Instructions

Follow these steps to set up your Supabase database with proper tables for the Bokex platform.

---

## 📋 Step 1: Access Supabase SQL Editor

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Select your Bokex project
3. Click on **"SQL Editor"** in the left sidebar
4. Click **"New Query"** button

---

## 📝 Step 2: Run the Database Migration

1. Copy the **ENTIRE** contents of the file: `/supabase/migrations/001_create_bokex_tables.sql`

2. Paste it into the SQL Editor

3. Click **"Run"** or press `Ctrl + Enter` (Windows) / `Cmd + Enter` (Mac)

4. Wait for the query to complete (should take 2-5 seconds)

5. You should see a success message: **"Success. No rows returned"**

---

## ✅ Step 3: Verify Tables Were Created

1. Click on **"Table Editor"** in the left sidebar

2. You should now see **7 new tables**:
   - ✅ **users** - Registered guest users
   - ✅ **partners** - Property owners/hotel managers
   - ✅ **properties** - Hotel/BnB listings
   - ✅ **bookings** - All bookings made on the platform
   - ✅ **payments** - M-PESA payment transactions
   - ✅ **reviews** - Guest reviews and ratings
   - ✅ **messages** - Guest-to-partner messages

3. Click on each table to view its structure and columns

---

## 🔍 Step 4: Inspect Table Structures

### **users** table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | TEXT | Unique ID (USR-XXXXXXXXX) |
| full_name | TEXT | User's full name |
| email | TEXT | User's email (unique) |
| phone | TEXT | Phone number |
| password_hash | TEXT | Hashed password |
| role | TEXT | User role (default: 'user') |
| registered_at | TIMESTAMP | Registration date |
| created_at | TIMESTAMP | Record creation |
| updated_at | TIMESTAMP | Last update |

### **partners** table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| partner_id | TEXT | Unique ID (USR-XXXXXXXXX) |
| business_name | TEXT | Business/hotel name |
| first_name | TEXT | Owner's first name |
| last_name | TEXT | Owner's last name |
| email | TEXT | Email (unique) |
| phone | TEXT | Phone number |
| password_hash | TEXT | Hashed password |
| website | TEXT | Website URL |
| address | TEXT | Physical address |
| city | TEXT | City location |
| county | TEXT | County location |
| property_name | TEXT | Main property name |
| role | TEXT | Role (default: 'partner') |
| registered_at | TIMESTAMP | Registration date |
| created_at | TIMESTAMP | Record creation |
| updated_at | TIMESTAMP | Last update |

### **properties** table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| property_id | TEXT | Unique ID (PROP-XXXXXXXXX) |
| owner_email | TEXT | Partner email (FK) |
| property_name | TEXT | Property name |
| property_type | TEXT | Type (Hotel, BnB, etc.) |
| room_type | TEXT | Room category |
| location | TEXT | Location description |
| city | TEXT | City |
| county | TEXT | County |
| price | DECIMAL | Price per night (KES) |
| description | TEXT | Property description |
| amenities | JSONB | Amenities array |
| images | JSONB | Image URLs array |
| max_guests | INTEGER | Maximum guests |
| bedrooms | INTEGER | Number of bedrooms |
| bathrooms | INTEGER | Number of bathrooms |
| status | TEXT | Active/inactive |
| created_at | TIMESTAMP | Record creation |
| updated_at | TIMESTAMP | Last update |

### **bookings** table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| booking_id | TEXT | Unique ID (BKX-XXXXXXXXX) |
| property_id | TEXT | Property reference |
| hotel_name | TEXT | Hotel/property name |
| hotel_location | TEXT | Location |
| room_type | TEXT | Room type |
| check_in | DATE | Check-in date |
| check_out | DATE | Check-out date |
| nights | INTEGER | Number of nights |
| guests | INTEGER | Number of guests |
| total_amount | DECIMAL | Total cost (KES) |
| guest_name | TEXT | Guest name |
| guest_email | TEXT | Guest email (FK) |
| guest_phone | TEXT | Guest phone |
| property_owner_email | TEXT | Owner email (FK) |
| status | TEXT | Booking status |
| payment_status | TEXT | Payment status |
| special_requests | TEXT | Guest requests |
| created_at | TIMESTAMP | Booking creation |
| updated_at | TIMESTAMP | Last update |

### **payments** table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| transaction_id | TEXT | Unique ID (TXN-XXXXXXXXX) |
| booking_id | TEXT | Booking reference (FK) |
| mpesa_code | TEXT | M-PESA confirmation code |
| amount | DECIMAL | Payment amount (KES) |
| phone_number | TEXT | M-PESA phone number |
| paybill | TEXT | Paybill number (4005207) |
| business_name | TEXT | Business name |
| status | TEXT | Payment status |
| payment_method | TEXT | Payment method |
| timestamp | TIMESTAMP | Payment time |
| verified_at | TIMESTAMP | Verification time |
| created_at | TIMESTAMP | Record creation |

### **reviews** table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| review_id | TEXT | Unique ID (REV-XXXXXXXXX) |
| property_owner | TEXT | Owner email (FK) |
| hotel_name | TEXT | Property name |
| property_id | TEXT | Property reference |
| rating | INTEGER | Rating (1-5) |
| comment | TEXT | Review comment |
| user_name | TEXT | Reviewer name |
| user_email | TEXT | Reviewer email |
| created_at | TIMESTAMP | Review creation |
| updated_at | TIMESTAMP | Last update |

### **messages** table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| message_id | TEXT | Unique ID (MSG-XXXXXXXXX) |
| property_owner | TEXT | Owner email (FK) |
| sender_name | TEXT | Sender name |
| sender_email | TEXT | Sender email |
| subject | TEXT | Message subject |
| message | TEXT | Message content |
| read | BOOLEAN | Read status |
| created_at | TIMESTAMP | Message creation |

---

## 🔐 Step 5: Verify Row Level Security (RLS)

All tables have RLS enabled with policies that allow:
- ✅ Full read access for all users
- ✅ Full write access for service role (backend)
- ✅ Secure data access patterns

You can view RLS policies in **Authentication > Policies**

---

## 🔄 Step 6: Test the Database

### Option A: Insert Test Data via SQL

```sql
-- Insert a test user
INSERT INTO users (user_id, full_name, email, phone, password_hash, role)
VALUES ('USR-TEST001', 'Test User', 'test@example.com', '0712345678', 'hashed_password', 'user');

-- Insert a test partner
INSERT INTO partners (partner_id, business_name, first_name, last_name, email, phone, password_hash)
VALUES ('USR-PARTNER001', 'Test Hotel', 'John', 'Doe', 'partner@example.com', '0712345678', 'hashed_password');

-- Query the data
SELECT * FROM users;
SELECT * FROM partners;
```

### Option B: Test via API

The backend server will automatically create records when you:
1. Register a new user on the platform
2. Register a new partner
3. Create a booking
4. Make a payment

---

## 📊 Step 7: View Data in Supabase Dashboard

### **Table Editor** (Recommended)
1. Go to **Table Editor**
2. Select any table from the dropdown
3. View all records in a spreadsheet-like interface
4. You can:
   - ✏️ Edit records directly
   - ➕ Add new records manually
   - 🗑️ Delete records
   - 🔍 Filter and search
   - 📥 Export data

### **SQL Editor** (Advanced)
Run queries to view data:

```sql
-- View all bookings
SELECT * FROM bookings ORDER BY created_at DESC;

-- View bookings with payment info
SELECT b.*, p.mpesa_code, p.status as payment_status
FROM bookings b
LEFT JOIN payments p ON b.booking_id = p.booking_id
ORDER BY b.created_at DESC;

-- View partner statistics
SELECT 
  p.email,
  p.business_name,
  COUNT(b.id) as total_bookings,
  SUM(b.total_amount) as total_earnings
FROM partners p
LEFT JOIN bookings b ON p.email = b.property_owner_email
GROUP BY p.email, p.business_name;

-- View recent reviews
SELECT * FROM reviews ORDER BY created_at DESC LIMIT 10;
```

---

## 🎯 Step 8: Connect to Admin Dashboard

Once the tables are created, your Super Admin Dashboard will automatically show:

✅ **Users Tab** - All registered users from `users` table  
✅ **Partners Tab** - All property owners from `partners` table  
✅ **Bookings** - All bookings from `bookings` table  
✅ **Payments** - Payment verification from `payments` table  
✅ **Reviews** - All reviews from `reviews` table  
✅ **Statistics** - Real-time aggregated data  

---

## 🔧 Troubleshooting

### Problem: "relation already exists" error
**Solution:** Tables already created! You can skip the migration.

### Problem: "permission denied" error
**Solution:** Make sure you're using the Service Role Key in your environment variables.

### Problem: Can't see data in dashboard
**Solution:** 
1. Check RLS policies are enabled
2. Verify service role key is correct
3. Check API endpoints are working

### Problem: Foreign key constraint errors
**Solution:** 
1. Make sure parent records exist (e.g., user must exist before creating booking)
2. Email addresses must match exactly

---

## 📧 Email Integration Status

After database setup, all emails will be sent automatically:

✅ User registration → Welcome email  
✅ Partner registration → Partner welcome  
✅ Property listing → Listing confirmation  
✅ New booking → Guest & owner notifications  
✅ Payment verified → Receipt & admin alert  

**Email sender:** support@nacyglobal.com  
**SMTP configured:** mail.nacyglobal.com:587  

---

## 🎉 You're All Set!

Your Bokex platform now has a **production-ready database** with:

- ✅ 7 structured tables
- ✅ Proper relationships (foreign keys)
- ✅ Indexes for fast queries
- ✅ Row Level Security
- ✅ Automatic timestamps
- ✅ Full CRUD operations via API

### Next Steps:

1. ✅ Start using the platform
2. ✅ Register test users and partners
3. ✅ Create test bookings
4. ✅ Verify data appears in Supabase Table Editor
5. ✅ Check admin dashboard statistics
6. ✅ Monitor email notifications

---

## 📚 Additional Resources

- **Supabase Docs:** https://supabase.com/docs
- **Table Editor Guide:** https://supabase.com/docs/guides/database/tables
- **SQL Editor Guide:** https://supabase.com/docs/guides/database/sql-editor
- **API Reference:** See `/BOKEX_PRODUCTION_GUIDE.md`

---

**© 2026 Bokex - Powered by Supabase & NACY GLOBAL TECHNOLOGIES**
