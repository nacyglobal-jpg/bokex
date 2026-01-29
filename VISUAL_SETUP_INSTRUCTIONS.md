# 📸 Visual Step-by-Step Setup Instructions

## How to Set Up Bokex Database in Supabase (With Screenshots Guide)

---

## 🎯 Quick Overview

**What you'll do:**
1. Open Supabase SQL Editor (30 seconds)
2. Copy & paste SQL code (1 minute)
3. Click "Run" button (2 seconds)
4. View your new tables (30 seconds)

**Total time:** ~2 minutes

---

## 📋 STEP 1: Open Supabase Dashboard

1. Go to: **https://supabase.com/dashboard**
2. Click on your **Bokex project** (or create one if you haven't)

```
You should see:
┌─────────────────────────────────────┐
│  Supabase                    [User] │
├─────────────────────────────────────┤
│  Projects                           │
│  > Bokex Production            ✓   │
│  > Other Project                   │
└─────────────────────────────────────┘
```

---

## 📝 STEP 2: Navigate to SQL Editor

**On the left sidebar, click:**

```
┌──────────────────────────┐
│ 🏠 Home                  │
│ 📊 Table Editor          │
│ 🔍 SQL Editor         ← CLICK HERE
│ 🔐 Authentication        │
│ 📦 Storage               │
│ ⚡ Edge Functions        │
│ 📈 Reports               │
└──────────────────────────┘
```

---

## 🆕 STEP 3: Create New Query

**Click the "New Query" button:**

```
┌────────────────────────────────────────┐
│  SQL Editor                            │
│  ┌──────────────┐                     │
│  │ + New query  │  ← CLICK THIS       │
│  └──────────────┘                     │
│                                        │
│  [Empty query editor]                 │
│                                        │
└────────────────────────────────────────┘
```

You'll see an empty text area where you can write SQL.

---

## 📄 STEP 4: Copy the Migration SQL

1. Open the file in your project: `/supabase/migrations/001_create_bokex_tables.sql`

2. **Select ALL the text** (Ctrl+A on Windows, Cmd+A on Mac)

3. **Copy it** (Ctrl+C on Windows, Cmd+C on Mac)

The file starts with:
```sql
-- =====================================================
-- BOKEX DATABASE SCHEMA - PRODUCTION TABLES
-- Run this in Supabase SQL Editor
-- =====================================================
```

And ends with:
```sql
-- All tables created successfully!
-- You can now view these tables in Supabase Table Editor
```

**Copy EVERYTHING between these two lines (including them).**

---

## 📋 STEP 5: Paste Into SQL Editor

1. Click in the SQL Editor text area
2. **Paste** (Ctrl+V on Windows, Cmd+V on Mac)

You should see something like:

```
┌────────────────────────────────────────────────┐
│  SQL Editor                    [Save] [Run] ▶  │
├────────────────────────────────────────────────┤
│                                                │
│  -- =============================              │
│  -- BOKEX DATABASE SCHEMA                     │
│  -- =============================              │
│                                                │
│  CREATE EXTENSION IF NOT EXISTS...            │
│                                                │
│  CREATE TABLE IF NOT EXISTS users (           │
│    id UUID PRIMARY KEY...                     │
│                                                │
│  [... hundreds of lines of SQL ...]           │
│                                                │
└────────────────────────────────────────────────┘
```

---

## ▶️ STEP 6: Run the Query

**Click the "Run" button** (or press F5 / Ctrl+Enter):

```
┌────────────────────────────────────────┐
│  [Save]  [▶ Run]  ← CLICK HERE        │
└────────────────────────────────────────┘
```

**Wait 2-5 seconds...**

You should see:

```
✅ Success. No rows returned
```

**OR if tables already exist:**

```
⚠️ relation "users" already exists
```
(This is fine - tables are already created!)

---

## ✅ STEP 7: Verify Tables Were Created

**Click "Table Editor" in the left sidebar:**

```
┌──────────────────────────┐
│ 🏠 Home                  │
│ 📊 Table Editor     ← CLICK HERE
│ 🔍 SQL Editor            │
└──────────────────────────┘
```

**You should now see a dropdown with 7 new tables:**

```
┌─────────────────────────────────────┐
│ Select a table ▼                    │
├─────────────────────────────────────┤
│ ✓ bookings                          │
│ ✓ messages                          │
│ ✓ partners                          │
│ ✓ payments                          │
│ ✓ properties                        │
│ ✓ reviews                           │
│ ✓ users                             │
└─────────────────────────────────────┘
```

---

## 🔍 STEP 8: Explore Your Tables

### View "users" table

**Click on "users" in the dropdown:**

```
┌──────────────────────────────────────────────────────────────┐
│ Table: users                                    [+ Insert row]│
├──────────────────────────────────────────────────────────────┤
│ id │ user_id │ full_name │ email │ phone │ ... │ created_at │
├────┼─────────┼───────────┼───────┼───────┼─────┼────────────┤
│    │         │           │       │       │     │            │
│    │  (No data yet - will populate when users register)     │
│    │         │           │       │       │     │            │
└──────────────────────────────────────────────────────────────┘
```

### View "bookings" table

**Click on "bookings" in the dropdown:**

```
┌─────────────────────────────────────────────────────────────────┐
│ Table: bookings                                 [+ Insert row]  │
├─────────────────────────────────────────────────────────────────┤
│ id │ booking_id │ hotel_name │ check_in │ total_amount │ ...   │
├────┼────────────┼────────────┼──────────┼──────────────┼───────┤
│    │            │            │          │              │       │
│    │  (No data yet - will populate when bookings are made)    │
│    │            │            │          │              │       │
└─────────────────────────────────────────────────────────────────┘
```

**Same for all other tables:** payments, partners, properties, reviews, messages

---

## 🎉 SUCCESS! What You Just Created

### 7 Production Tables

✅ **users** - For guest accounts  
✅ **partners** - For hotel/property owners  
✅ **properties** - For hotel/BnB listings  
✅ **bookings** - For all reservations  
✅ **payments** - For M-PESA transactions  
✅ **reviews** - For guest reviews  
✅ **messages** - For guest-partner communication  

### With Features

✅ **Unique IDs** - Auto-generated (BKX-XXXXX, USR-XXXXX, etc.)  
✅ **Foreign Keys** - Proper relationships between tables  
✅ **Indexes** - Fast query performance  
✅ **Timestamps** - Auto-updated timestamps  
✅ **Security** - Row Level Security enabled  

---

## 🔄 What Happens Next?

### Automatic Data Population

When users interact with your Bokex platform:

1. **User registers** → New row in `users` table + Welcome email ✉️
2. **Partner registers** → New row in `partners` table + Welcome email ✉️
3. **Property listed** → New row in `properties` table + Confirmation email ✉️
4. **Booking made** → New row in `bookings` table + Confirmation emails ✉️
5. **Payment completed** → New row in `payments` table + Receipt email ✉️
6. **Review posted** → New row in `reviews` table
7. **Message sent** → New row in `messages` table

### View Data in Real-Time

**Option 1: Table Editor (Easy)**
- Click "Table Editor"
- Select table from dropdown
- See all data in spreadsheet view
- Click any cell to edit

**Option 2: SQL Editor (Advanced)**
- Click "SQL Editor"
- Run queries from `/QUICK_SQL_QUERIES.md`
- Get statistics and reports

---

## 📊 Admin Dashboard Integration

Your Super Admin Dashboard will now show:

### Left Side Panel
```
┌─────────────────────────────────┐
│ 👥 Users (X)                    │
│ ├─ USR-17346... John Doe        │
│ ├─ USR-17347... Jane Smith      │
│ └─ ...                          │
│                                 │
│ 🏨 Hotel Partners (X)           │
│ ├─ Safari Hotel Ltd             │
│ │  └─ USR-17348... owner@...    │
│ └─ ...                          │
└─────────────────────────────────┘
```

### Payment Verification
```
┌───────────────────────────────────────────────┐
│ 💳 Payment Verification                       │
├───────────────────────────────────────────────┤
│ Booking ID    | Amount    | M-PESA    | Status│
│ BKX-17346... | KES 25000 | SFK8X7... | Verify│
│ BKX-17347... | KES 15000 | SFK9Y2... | Verify│
└───────────────────────────────────────────────┘
```

### Statistics Dashboard
```
┌──────────────────────────────────┐
│ 📊 Platform Statistics           │
├──────────────────────────────────┤
│ Total Users:       X             │
│ Total Partners:    X             │
│ Total Bookings:    X             │
│ Total Revenue:     KES X,XXX     │
│ Pending Payments:  X             │
│ Verified Payments: X             │
└──────────────────────────────────┘
```

---

## 🛠️ Common Tasks

### Add Test Data Manually

1. Click **Table Editor**
2. Select **"users"** table
3. Click **"+ Insert row"** button
4. Fill in the fields:
   - user_id: `USR-TEST001`
   - full_name: `Test User`
   - email: `test@example.com`
   - phone: `0712345678`
   - password_hash: `test123` (will be hashed in production)
   - role: `user`
5. Click **"Save"**

### Search for Data

**In Table Editor:**
- Click the **filter icon** (🔍)
- Enter search term
- Press Enter

**In SQL Editor:**
```sql
SELECT * FROM users WHERE email = 'test@example.com';
```

### Export Data

1. Go to **Table Editor**
2. Select your table
3. Click **"︙"** (three dots menu)
4. Click **"Download as CSV"**

---

## ❓ Troubleshooting Visual Guide

### ❌ Problem: "Permission denied for table users"

**What you see:**
```
❌ Error: permission denied for table users
```

**Solution:**
1. Check you're using the **Service Role Key** (not Anon Key)
2. In Dashboard → Settings → API
3. Copy **"service_role secret"**
4. Update environment variable `SUPABASE_SERVICE_ROLE_KEY`

---

### ❌ Problem: "Table already exists"

**What you see:**
```
⚠️ relation "users" already exists
⚠️ relation "bookings" already exists
```

**This is GOOD!** ✅
- Tables are already created
- You can skip the migration
- Go straight to Table Editor to view data

---

### ❌ Problem: "No data in tables"

**What you see:**
```
┌────────────────────────┐
│ (No rows)              │
└────────────────────────┘
```

**This is NORMAL!** ✅
- Tables are empty until users register
- Register a test user on your platform
- Or insert test data manually
- Data will appear in real-time

---

## 🎓 Next Steps

1. ✅ **Test User Registration**
   - Go to your Bokex platform
   - Register a new user
   - Check `users` table in Supabase
   - Confirm data appears

2. ✅ **Test Partner Registration**
   - Register as a property owner
   - Check `partners` table
   - Confirm data appears

3. ✅ **Test Booking Flow**
   - Make a test booking
   - Check `bookings` table
   - Verify email was sent

4. ✅ **Test Payment**
   - Complete a payment
   - Check `payments` table
   - Verify M-PESA code saved

5. ✅ **View Admin Dashboard**
   - Login as admin
   - Check statistics
   - Verify all data displays correctly

---

## 📞 Need Help?

If you see any errors or issues:

1. **Screenshot the error message**
2. **Check which step failed**
3. **Verify environment variables are set**
4. **Check Supabase service status**

Common fixes:
- Clear browser cache
- Restart the server
- Check CORS settings
- Verify API keys are correct

---

## ✅ Checklist

Before you finish, verify:

- [ ] Can see 7 tables in Table Editor
- [ ] Can open each table without errors
- [ ] Row Level Security is enabled
- [ ] Service Role Key is configured
- [ ] API endpoints are working
- [ ] Email service is configured
- [ ] Admin dashboard loads correctly

---

**🎉 Congratulations! Your Bokex database is ready for production!**

© 2026 Bokex - Visual Setup Guide
