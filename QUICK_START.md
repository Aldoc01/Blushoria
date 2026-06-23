# 🎀 Blushoria Admin Setup - Quick Start Checklist

## ✅ STEP 1: Go to Supabase Dashboard
- [ ] Open https://supabase.com
- [ ] Sign in to your account
- [ ] Open your Blushoria project
- [ ] Click on **SQL Editor** (left sidebar)

---

## ✅ STEP 2: Create admin_users Table

**Copy and paste this SQL command into the SQL Editor:**

```sql
create table admin_users (
  id bigserial primary key,
  email varchar unique not null,
  password_hash varchar not null,
  is_active boolean default true,
  last_login timestamp,
  created_at timestamp default now()
);

create index idx_admin_users_email on admin_users(email);
```

- [ ] Click **Run** button
- [ ] Wait for success message (green checkmark)

---

## ✅ STEP 3: Create products Table

**Copy and paste this SQL command:**

```sql
create table products (
  id bigserial primary key,
  name varchar not null,
  category varchar not null,
  description text,
  price integer not null,
  image varchar,
  badge varchar,
  is_active boolean default true,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create index idx_products_active on products(is_active);
```

- [ ] Click **Run** button
- [ ] Wait for success message

---

## ✅ STEP 4: Add Your Admin User

**Copy and paste this SQL command:**

```sql
insert into admin_users (email, password_hash, is_active)
values ('admin@blushoria.com', 'password123', true);
```

- [ ] Change `admin@blushoria.com` to YOUR email
- [ ] Change `password123` to YOUR password
- [ ] Click **Run** button
- [ ] You should see "1 row inserted"

---

## ✅ STEP 5: Add Sample Products (Optional)

**Copy and paste this SQL command:**

```sql
insert into products (name, category, description, price, image, badge, is_active) 
values 
  ('Velvet Rose Lip Gloss', 'lipgloss', 'Luxurious velvet finish with rose essence', 5500, 'product1.jpg', 'Best Seller', true),
  ('Honey Glow Face Mask', 'facemask', 'Deep moisturizing honey-infused mask', 3500, 'product2.jpg', 'New', true),
  ('Soft Pink Lip Mask', 'lipmask', 'Nourishing overnight lip treatment', 4000, 'product3.jpg', null, true),
  ('Golden Hour Lip Oil', 'lipoil', 'Shimmering lip oil with golden flecks', 3000, 'product4.jpg', null, true);
```

- [ ] Click **Run** button
- [ ] You should see "4 rows inserted"

---

## ✅ STEP 6: Get Your Supabase API Keys

**These are already in admin-auth.js, but verify they're correct:**

1. [ ] In Supabase Dashboard, click **Settings** (bottom left)
2. [ ] Click **API**
3. [ ] Copy your **Project URL** (looks like: `https://xxxxx.supabase.co`)
4. [ ] Copy your **anon/public key** (long string starting with `sb_`)
5. [ ] Compare with values in `admin-auth.js` lines 3-4

If they don't match, update them in `admin-auth.js`:
```javascript
const SUPABASE_URL = 'YOUR_PROJECT_URL_HERE';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY_HERE';
```

---

## ✅ STEP 7: Test Your Login

1. [ ] Open your Blushoria site
2. [ ] Go to **admin-login.html** (add `/admin-login.html` to your URL)
3. [ ] Enter your email and password
4. [ ] Click **Login**
5. [ ] You should see the admin dashboard with product management

---

## ✅ STEP 8: Verify Tables in Supabase

1. [ ] Go to **Table Editor** (left sidebar in Supabase)
2. [ ] You should see two tables:
   - `admin_users` (with your admin account)
   - `products` (with sample products)

---

## 🎉 YOU'RE DONE!

Your admin panel is now connected to Supabase!

### What you can do now:
✅ Login at `admin-login.html`  
✅ View all products  
✅ Add new products  
✅ Edit product details  
✅ Delete products  
✅ Logout safely  

---

## 🔗 Quick Links

| Page | URL |
|------|-----|
| **Store Home** | `/index.html` |
| **Admin Login** | `/admin-login.html` |
| **Admin Dashboard** | `/admin.html` |
| **Supabase Dashboard** | https://supabase.com |

---

## ❓ Troubleshooting

### "Invalid email or password" error?
- [ ] Double-check your email in Supabase `admin_users` table
- [ ] Make sure the password matches exactly
- [ ] Check browser console (F12) for error details

### Products not showing?
- [ ] Go to Supabase → Table Editor
- [ ] Click `products` table
- [ ] Make sure products are there and `is_active = true`

### Login page won't load?
- [ ] Check internet connection
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Open browser console (F12) and check for errors
- [ ] Make sure Supabase credentials are correct

### Still having issues?
- [ ] Check the SETUP_GUIDE.md file for more details
- [ ] Look at browser console errors (F12)
- [ ] Verify Supabase tables exist in Table Editor

---

## 📝 Your Credentials (Save These!)

```
Email: ________________
Password: ________________
Supabase Project URL: ________________
Supabase Anon Key: ________________
```

---

**Last Updated:** June 23, 2026  
**Status:** ✅ Ready for Production
