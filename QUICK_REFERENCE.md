# ⚡ Bokex Quick Reference Card

## Essential Commands & Queries

---

## 🗄️ Your Tables

```
users         partners      properties    rooms
bookings      payments      reviews       messages
```

---

## 🔍 View Data (Supabase)

### **Table Editor** (No SQL)
```
Supabase → Table Editor → Select table
```

### **SQL Editor**
```
Supabase → SQL Editor → Paste query → Run
```

---

## 📊 Most Common Queries

### See All Bookings
```sql
SELECT * FROM bookings ORDER BY created_at DESC LIMIT 20;
```

### See Revenue
```sql
SELECT SUM(amount) FROM payments WHERE status = 'verified';
```

### See Recent Users
```sql
SELECT user_id, full_name, email FROM users ORDER BY registered_at DESC LIMIT 10;
```

### See Partners
```sql
SELECT partner_id, business_name, email FROM partners ORDER BY created_at DESC;
```

### See Properties
```sql
SELECT property_id, name, location, base_price FROM properties WHERE status = 'active';
```

---

## 🆔 ID Formats

```
USR-K7H9P2M4X  → User
PTN-A3F8L1N6Z  → Partner
PROP-Y5R2T9W3K → Property
ROOM-X1Q8M3N7P → Room
BKX-L4J6H8K2M  → Booking
TXN-1734678900 → Transaction
REV-P9Z3X5C7V  → Review
MSG-W2E4R6T8Y  → Message
```

---

## 📧 Email Info

**From:** support@nacyglobal.com  
**SMTP:** mail.nacyglobal.com:587  
**Types:** 7 automated templates

---

## 💳 Payment Info

**Paybill:** 4005207  
**Business:** NACY GLOBAL TECHNOLOGIES  
**Method:** M-PESA STK Push

---

## 🎯 Quick Tests

### Test User
```
1. Register user
2. Check: Supabase → users table
3. Check: Email inbox
```

### Test Booking
```
1. Make booking
2. Check: Supabase → bookings table
3. Check: 2 emails sent
```

### Test Payment
```
1. Pay with M-PESA
2. Verify in admin dashboard
3. Check: Supabase → payments table
```

---

## 📱 Dashboard Access

**Admin:** Login → Admin Dashboard  
**Partner:** Login → Partner Dashboard  
**Guest:** Login → My Bookings

---

## 🆘 Quick Fixes

### Tables Empty?
**Normal!** They fill when users register/book.

### Foreign Key Error?
Use **UUIDs** not public IDs for relationships.

### Email Not Sending?
Check SMTP config in `email-service.tsx`

---

## 📚 Documentation Files

**Start Here:** `/START_HERE.md`  
**View Data:** `/VIEWING_YOUR_DATA.md`  
**SQL Queries:** `/QUICK_SQL_QUERIES.md`  
**Complete Guide:** `/BOKEX_PRODUCTION_GUIDE.md`

---

## 🚀 Production Checklist

- [ ] Tables created (8/8)
- [ ] User test passed
- [ ] Booking test passed
- [ ] Payment test passed
- [ ] Emails working (7/7)
- [ ] Admin dashboard working
- [ ] Ready to go live!

---

**© 2026 Bokex 🇰🇪**
