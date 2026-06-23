# 🗑️ How to Delete Everything & Start Fresh

## ⚠️ WARNING: This will DELETE all data!

Follow these steps to completely reset your Supabase database before setting up fresh.

---

## STEP 1: Delete All Data (Keep Tables)

**Run these commands in Supabase SQL Editor:**

```sql
-- Delete all admin users
delete from admin_users;

-- Delete all products
delete from products;

-- Reset auto-increment counter
alter sequence admin_users_id_seq restart with 1;
alter sequence products_id_seq restart with 1;
```

✅ This deletes all your data but keeps the tables structure

---

## STEP 2: Drop Tables Completely (Full Reset)

**If you want to delete the tables too, run:**

```sql
-- Drop products table first (if it has foreign keys)
drop table if exists products cascade;

-- Drop admin_users table
drop table if exists admin_users cascade;

-- Drop indexes (if they still exist)
drop index if exists idx_admin_users_email;
drop index if exists idx_products_active;
```

✅ This completely removes both tables

---

## STEP 3: Verify Everything is Deleted

**Check what tables exist:**

```sql
-- List all tables
SELECT table_name FROM information_schema.tables WHERE table_schema='public';
```

You should see an empty result or very few tables.

---

## STEP 4: Now Create Fresh Tables

**Once deleted, run the SQL commands from QUICK_START.md:**

### Create admin_users table:
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

### Create products table:
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

---

## STEP 5: Add Fresh Admin User with YOUR Email

```sql
insert into admin_users (email, password_hash, is_active)
values ('airdoc00@gmail.com', 'Blushoria13$$', true);
```

✅ Your credentials are already set!

---

## STEP 6: Add Fresh Products (Optional)

```sql
insert into products (name, category, description, price, image, badge, is_active) 
values 
  ('Velvet Rose Lip Gloss', 'lipgloss', 'Luxurious velvet finish with rose essence', 5500, 'product1.jpg', 'Best Seller', true),
  ('Honey Glow Face Mask', 'facemask', 'Deep moisturizing honey-infused mask', 3500, 'product2.jpg', 'New', true),
  ('Soft Pink Lip Mask', 'lipmask', 'Nourishing overnight lip treatment', 4000, 'product3.jpg', null, true),
  ('Golden Hour Lip Oil', 'lipoil', 'Shimmering lip oil with golden flecks', 3000, 'product4.jpg', null, true);
```

---

## 🚀 COMPLETE RESET & SETUP (All-in-One)

**Copy and paste this ENTIRE block into Supabase SQL Editor:**

```sql
-- DROP OLD TABLES COMPLETELY
drop table if exists products cascade;
drop table if exists admin_users cascade;

-- CREATE NEW admin_users TABLE
create table admin_users (
  id bigserial primary key,
  email varchar unique not null,
  password_hash varchar not null,
  is_active boolean default true,
  last_login timestamp,
  created_at timestamp default now()
);

create index idx_admin_users_email on admin_users(email);

-- CREATE NEW products TABLE
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

-- ADD YOUR ADMIN USER
insert into admin_users (email, password_hash, is_active)
values ('airdoc00@gmail.com', 'Blushoria13$$', true);

-- ADD SAMPLE PRODUCTS
insert into products (name, category, description, price, image, badge, is_active) 
values 
  ('Velvet Rose Lip Gloss', 'lipgloss', 'Luxurious velvet finish with rose essence', 5500, 'product1.jpg', 'Best Seller', true),
  ('Honey Glow Face Mask', 'facemask', 'Deep moisturizing honey-infused mask', 3500, 'product2.jpg', 'New', true),
  ('Soft Pink Lip Mask', 'lipmask', 'Nourishing overnight lip treatment', 4000, 'product3.jpg', null, true),
  ('Golden Hour Lip Oil', 'lipoil', 'Shimmering lip oil with golden flecks', 3000, 'product4.jpg', null, true);
```

---

## 📋 Steps in Supabase Dashboard

1. **Open Supabase** → Your Project
2. **Click "SQL Editor"** (left sidebar)
3. **Paste the COMPLETE RESET code** above
4. **Click "Run"** button
5. **Wait for success** (green checkmark)
6. **Go to "Table Editor"** to verify changes

---

## ✅ Verification Checklist

After running commands, verify in **Table Editor**:
- [ ] Old tables are gone
- [ ] New `admin_users` table exists
- [ ] New `products` table exists
- [ ] Admin user (airdoc00@gmail.com) shows in `admin_users` table
- [ ] 4 sample products show in `products` table

---

## 🎉 Test Your Setup!

Once database is ready:

1. Go to `admin-login.html` on your website
2. Enter credentials:
   - **Email:** airdoc00@gmail.com
   - **Password:** Blushoria13$$
3. Click **Login**
4. You should see the admin dashboard with your 4 products! ✅

---

## Your Credentials (Save This!)

```
Email: airdoc00@gmail.com
Password: Blushoria13$$
```

⚠️ Save these somewhere safe!

