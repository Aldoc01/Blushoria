# 🎀 Blushoria Admin Setup Guide

## Step 1: Create Supabase Tables

Go to your Supabase dashboard and run these SQL commands in the SQL Editor.

### Create admin_users table
```sql
create table admin_users (
  id bigserial primary key,
  email varchar unique not null,
  password_hash varchar not null,
  is_active boolean default true,
  last_login timestamp,
  created_at timestamp default now()
);

-- Create index for faster queries
create index idx_admin_users_email on admin_users(email);
```

### Create products table
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

-- Create index for faster queries
create index idx_products_active on products(is_active);
```

---

## Step 2: Insert Sample Admin User

Run this in Supabase SQL Editor:
```sql
insert into admin_users (email, password_hash, is_active)
values ('admin@blushoria.com', 'password123', true);
```

> ⚠️ **Important:** For production, use hashed passwords! For now, we're using plain text for testing.

---

## Step 3: Add Sample Products

Run this in Supabase SQL Editor:
```sql
insert into products (name, category, description, price, image, badge, is_active) 
values 
  ('Velvet Rose Lip Gloss', 'lipgloss', 'Luxurious velvet finish with rose essence', 5500, 'product1.jpg', 'Best Seller', true),
  ('Honey Glow Face Mask', 'facemask', 'Deep moisturizing honey-infused mask', 3500, 'product2.jpg', 'New', true),
  ('Soft Pink Lip Mask', 'lipmask', 'Nourishing overnight lip treatment', 4000, 'product3.jpg', null, true),
  ('Golden Hour Lip Oil', 'lipoil', 'Shimmering lip oil with golden flecks', 3000, 'product4.jpg', null, true);
```

---

## Step 4: Enable Row Level Security (RLS) - Optional but Recommended

For better security, enable RLS policies:

```sql
-- Enable RLS on tables
alter table admin_users enable row level security;
alter table products enable row level security;

-- Create policy for products (public read)
create policy "Products are viewable by everyone"
  on products for select
  using (is_active = true);

-- Create policy for admin_users (no public access)
create policy "Admin users not publicly accessible"
  on admin_users for select
  using (false);
```

---

## Step 5: Verify Your Supabase Credentials

Make sure your `admin-auth.js` has the correct URL and Key:

```javascript
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your_anon_key_here';
```

Get these from:
1. Go to Supabase Dashboard
2. Click **Settings** → **API**
3. Copy **Project URL** and **anon/public key**

---

## Step 6: Test the Login

1. Open `admin-login.html` in your browser
2. Enter credentials:
   - Email: `admin@blushoria.com`
   - Password: `password123`
3. You should be redirected to the admin dashboard

---

## Step 7: Manage Products

Once logged in at `admin.html`, you can:
- ✅ View all active products
- ✅ Add new products
- ✅ Edit existing products
- ✅ Delete products (soft delete - marks as inactive)

---

## Troubleshooting

### Login not working?
- Check browser console (F12) for errors
- Verify email and password in Supabase `admin_users` table
- Make sure Supabase credentials are correct in `admin-auth.js`

### Products not loading?
- Check if `products` table has data
- Verify RLS policies aren't blocking access
- Check browser console for error messages

### CORS errors?
- This is normal for Supabase from browser
- Supabase handles CORS automatically

---

## File Structure

```
Blushoria/
├── index.html              (Main store page)
├── admin-login.html        (Login page)
├── admin.html              (Dashboard)
├── admin-auth.js           (Supabase auth logic)
├── admin-app.js            (Product management)
├── admin-styles.css        (Dashboard styles)
├── app.js                  (Store functionality)
└── SETUP_GUIDE.md         (This file)
```

---

## Next Steps

1. ✅ Create Supabase tables
2. ✅ Add admin user
3. ✅ Add sample products
4. ✅ Test login at admin-login.html
5. ✅ Start managing products!

Need help? Check the admin dashboard for error messages in the browser console.
