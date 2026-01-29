# 🗄️ Bokex Database Documentation

## Overview

This document provides access to all database setup and management resources for the Bokex hotel booking platform.

---

## 📚 Documentation Guide

### 🚀 Getting Started (READ FIRST)
**File:** [`/SUPABASE_SETUP_GUIDE.md`](/SUPABASE_SETUP_GUIDE.md)  
**What it covers:**
- Complete step-by-step setup instructions
- Table structures and descriptions
- How to run the migration
- Verification steps
- Troubleshooting common issues

**👉 Start here if you're setting up the database for the first time!**

---

### 📸 Visual Instructions (BEGINNER FRIENDLY)
**File:** [`/VISUAL_SETUP_INSTRUCTIONS.md`](/VISUAL_SETUP_INSTRUCTIONS.md)  
**What it covers:**
- Screenshot-based guide
- Visual representation of each step
- What you should see at each stage
- Common UI elements explained
- Troubleshooting with visuals

**👉 Perfect if you prefer visual guides!**

---

### ✅ Setup Checklist (VERIFICATION)
**File:** [`/DATABASE_SETUP_CHECKLIST.md`](/DATABASE_SETUP_CHECKLIST.md)  
**What it covers:**
- Complete checklist of all setup steps
- Testing procedures
- Verification items
- Progress tracking
- Final sign-off items

**👉 Use this to ensure nothing is missed!**

---

### 🔍 SQL Query Reference (DAILY USE)
**File:** [`/QUICK_SQL_QUERIES.md`](/QUICK_SQL_QUERIES.md)  
**What it covers:**
- Pre-written SQL queries
- User, partner, booking queries
- Statistics and reports
- Data export queries
- Common administrative tasks

**👉 Copy-paste queries for viewing data!**

---

### 📖 Production Guide (COMPLETE REFERENCE)
**File:** [`/BOKEX_PRODUCTION_GUIDE.md`](/BOKEX_PRODUCTION_GUIDE.md)  
**What it covers:**
- Complete platform overview
- API documentation
- Email system details
- M-PESA payment integration
- Security features
- Deployment information

**👉 Your complete reference manual!**

---

## 🗂️ Database Files

### Migration SQL
**File:** [`/supabase/migrations/001_create_bokex_tables.sql`](/supabase/migrations/001_create_bokex_tables.sql)  
**Purpose:** Creates all 7 production tables  
**Usage:** Copy and paste into Supabase SQL Editor

### Database Helper Functions
**File:** [`/supabase/functions/server/database.tsx`](/supabase/functions/server/database.tsx)  
**Purpose:** Database operations and queries  
**Contains:**
- User CRUD operations
- Partner CRUD operations
- Booking management
- Payment processing
- Property management
- Review and message handling

### Email Service
**File:** [`/supabase/functions/server/email-service.tsx`](/supabase/functions/server/email-service.tsx)  
**Purpose:** Automated email notifications  
**Contains:**
- 7 professional HTML email templates
- SMTP configuration
- Email sending functions

### Main Server
**File:** [`/supabase/functions/server/index.tsx`](/supabase/functions/server/index.tsx)  
**Purpose:** Main API server  
**Contains:**
- 50+ API endpoints
- Authentication routes
- Business logic
- Email triggers

### Frontend API Client
**File:** [`/src/utils/api.ts`](/src/utils/api.ts)  
**Purpose:** Frontend API integration  
**Contains:**
- Easy-to-use API functions
- Error handling
- Type definitions

---

## 📊 Database Structure

### Tables Overview

| Table | Rows (typical) | Purpose | Key Fields |
|-------|----------------|---------|------------|
| **users** | 100-10,000 | Guest accounts | user_id, email, full_name |
| **partners** | 10-1,000 | Property owners | partner_id, business_name, email |
| **properties** | 50-5,000 | Hotel listings | property_id, property_name, price |
| **bookings** | 500-50,000 | Reservations | booking_id, check_in, total_amount |
| **payments** | 500-50,000 | Transactions | transaction_id, mpesa_code, status |
| **reviews** | 200-20,000 | Guest reviews | review_id, rating, comment |
| **messages** | 100-10,000 | Communications | message_id, subject, read |

### Relationships

```
users ──────┐
            ├──> bookings ──> payments
partners ───┘         └──> reviews

partners ──> properties

partners ──> messages
```

---

## 🚀 Quick Start (5 Minutes)

### 1. Run Migration
```
1. Open Supabase SQL Editor
2. Copy /supabase/migrations/001_create_bokex_tables.sql
3. Paste and click "Run"
4. Wait for success message
```

### 2. Verify Tables
```
1. Open Table Editor
2. Check dropdown shows 7 tables
3. Click each table to verify structure
```

### 3. Test API
```
1. Register a test user
2. Check users table in Supabase
3. Verify data appears
```

### 4. View Data
```
1. Go to Table Editor
2. Select any table
3. View all records
```

**Done!** ✅

---

## 🎯 Common Tasks

### View All Bookings
```sql
SELECT * FROM bookings ORDER BY created_at DESC LIMIT 20;
```
*Run in Supabase SQL Editor*

### View Revenue Statistics
```sql
SELECT 
  SUM(amount) as total_revenue,
  COUNT(*) as total_transactions
FROM payments 
WHERE status = 'verified';
```

### Export User List
*In Table Editor → users → ⋮ → Download as CSV*

### Search by Email
*In Table Editor → Filter icon → Enter email*

---

## 📧 Email Configuration

All emails sent from: **support@nacyglobal.com**

**SMTP Server:** mail.nacyglobal.com:587  
**Credentials:** Pre-configured in email-service.tsx

**Email Triggers:**
- User registration → Welcome email
- Partner registration → Welcome email
- Property listing → Confirmation email
- Booking created → Guest + Owner emails
- Payment verified → Receipt + Admin alert

---

## 🔐 Security

### Row Level Security (RLS)
✅ Enabled on all 7 tables  
✅ Public read access  
✅ Service role write access  
✅ Secure by default

### API Keys
- **Anon Key** → Frontend (public)
- **Service Role Key** → Backend (secret)

### Password Security
- SHA-256 hashing
- Never stored in plain text
- Never exposed in API responses

---

## 🆘 Troubleshooting

### Problem: Can't see tables
**Solution:** Run the migration SQL file

### Problem: Permission denied
**Solution:** Check service role key is set correctly

### Problem: No data in tables
**Solution:** Normal! Data populates when users register/book

### Problem: Email not sending
**Solution:** Check SMTP credentials and server status

### Problem: API errors
**Solution:** Check Supabase project is running and keys are correct

---

## 📞 Support Resources

### Supabase Resources
- Dashboard: https://supabase.com/dashboard
- Docs: https://supabase.com/docs
- Status: https://status.supabase.com

### Bokex Resources
- Production Guide: `/BOKEX_PRODUCTION_GUIDE.md`
- Setup Guide: `/SUPABASE_SETUP_GUIDE.md`
- SQL Queries: `/QUICK_SQL_QUERIES.md`

### Email Support
**Technical Issues:** support@nacyglobal.com  
**Business:** NACY GLOBAL TECHNOLOGIES

---

## 📋 Pre-Setup Checklist

Before you start, ensure you have:

- [ ] Supabase account created
- [ ] Bokex project created in Supabase
- [ ] Environment variables configured:
  - [ ] SUPABASE_URL
  - [ ] SUPABASE_ANON_KEY
  - [ ] SUPABASE_SERVICE_ROLE_KEY
- [ ] Access to Supabase dashboard
- [ ] Access to SQL Editor

---

## 🎓 Learning Path

**Day 1: Setup**
1. Read `/SUPABASE_SETUP_GUIDE.md`
2. Run migration
3. Verify tables created
4. Read `/VISUAL_SETUP_INSTRUCTIONS.md`

**Day 2: Testing**
1. Register test user
2. Register test partner
3. Create test booking
4. Verify data in Supabase
5. Use `/DATABASE_SETUP_CHECKLIST.md`

**Day 3: Operations**
1. Learn SQL queries from `/QUICK_SQL_QUERIES.md`
2. Practice viewing data
3. Export test data
4. Read `/BOKEX_PRODUCTION_GUIDE.md`

**Week 2: Production**
1. Monitor real user data
2. Generate reports
3. Manage users and partners
4. Verify payments

---

## 🔄 Maintenance

### Daily
- Monitor new registrations
- Verify payments
- Check email delivery

### Weekly
- Review booking statistics
- Export revenue reports
- Check database performance

### Monthly
- Database backup verification
- Review and optimize queries
- Update documentation if needed

---

## 📊 Database Metrics to Monitor

- **Table Sizes:** Track growth over time
- **Query Performance:** Slow queries need indexes
- **Active Connections:** Monitor concurrent users
- **Storage Used:** Plan for scaling
- **Email Delivery Rate:** Ensure 99%+ delivery

---

## 🎉 Success Indicators

You'll know setup is successful when:

✅ All 7 tables visible in Table Editor  
✅ Can insert and view data  
✅ Admin dashboard shows statistics  
✅ Partner dashboard loads correctly  
✅ Email notifications work  
✅ Booking flow completes successfully  
✅ Payment verification works  
✅ No console errors  

---

## 📅 Version History

**v1.0** - January 2026
- Initial database schema
- 7 production tables
- Email integration
- Complete API suite
- Admin dashboard integration
- Partner dashboard integration

---

## 🚀 Next Steps

After completing database setup:

1. ✅ **Go Live**
   - Open platform to users
   - Start accepting bookings
   - Monitor first transactions

2. ✅ **Optimize**
   - Add indexes for slow queries
   - Cache frequently accessed data
   - Optimize email delivery

3. ✅ **Scale**
   - Monitor database growth
   - Plan capacity upgrades
   - Consider CDN for images

4. ✅ **Enhance**
   - Add analytics
   - Implement A/B testing
   - Add more payment methods

---

**Your database is production-ready!** 🎉

For detailed setup instructions, start with [`/SUPABASE_SETUP_GUIDE.md`](/SUPABASE_SETUP_GUIDE.md)

---

© 2026 Bokex - Smart Hotel Booking Platform  
Powered by Supabase & NACY GLOBAL TECHNOLOGIES
