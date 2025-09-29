# 🚀 Evently Setup Instructions

## 📧 Example User Credentials

**Email:** `demo@evently.com`  
**Password:** `demo123456`

## 🗄️ Database Setup

### 1. Create Tables in Supabase SQL Editor

Run these SQL commands in your Supabase SQL Editor:

```sql
-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TIME,
  venue TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  max_capacity INTEGER,
  current_bookings INTEGER DEFAULT 0,
  image_url TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending',
  seats INTEGER DEFAULT 1,
  total_amount DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Create policies for events
CREATE POLICY "Anyone can view events" ON events FOR SELECT USING (true);
CREATE POLICY "Users can create events" ON events FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Users can update their own events" ON events FOR UPDATE USING (auth.uid() = created_by);
CREATE POLICY "Users can delete their own events" ON events FOR DELETE USING (auth.uid() = created_by);

-- Create policies for reservations
CREATE POLICY "Users can view their own reservations" ON reservations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create reservations" ON reservations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own reservations" ON reservations FOR UPDATE USING (auth.uid() = user_id);
```

### 2. Create Example User

In Supabase Auth, create a new user with:
- **Email:** `demo@evently.com`
- **Password:** `demo123456`

### 3. Insert Example Events

Run this SQL to insert example events:

```sql
INSERT INTO events (title, description, date, time, venue, price, max_capacity, image_url) VALUES
('Live Music Extravaganza', 'Experience the energy of live music with top artists.', '2024-03-15', '19:00', 'Madison Square Garden', 2250.00, 20000, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDf6PDzACB6AblgLy5UJM5L36jgaFPv31BRMOgSroMkoekzzMLeQt-rKrVCejgDbTt8ICpsoqngGEM3_KnuBMeWqsI8_ryv5UPmJSKh6EEt6KZdDGG7Z5-jcwascPQLjryyXa3cIa-kLjMwk4IdUWpBVsUZrZ2wWuh1lqDmN-QTIfOyQ4iaUH77TvjTdf_gfagvuYTa4CrqhAqjYdy75xcsoPhuWz_gvDsEtjOplW0pEl05_H67PqPrymc3h9t6HZyGTXZk11JV3Oq-'),
('Summer Music Festival', 'Join us for a weekend of music, fun, and community.', '2024-07-20', '18:00', 'Central Park', 3750.00, 50000, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaDVOhA6-YP9IS6zKf7RUesYJVLibr6RvrxMDeaJi-MwTI4DuX-ZZhRI_Ire1ucNrpc_4rh6JCzUjU5lpYvCLEewBJwrKNzQsgMOfflPb9dxva0awHRGq-0aAeVQaCKtmEXmWL8jNxLYG90pDLi_cwWL_11wcIHP1GLNFqwrAcy_rMTywYxi5h6J_RFfiOlUs2KBtAKlGpHwk92XgKjvc5rrJYCNatcgA5qCeVM3L_LCA6GzSXuyiaBL8dpd39Wkd8K1pdrttvFxMs'),
('Nightlife Experience', 'Dance the night away at the hottest clubs in town.', '2024-04-10', '22:00', 'Club XYZ', 1500.00, 500, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbawe3uZdvxKPKMcuKCS-xBn-xiQfEkffz_5vjxX8SqQcFE_WZGScdY1PdhYEIkoIS_LVxPrbrat0I96OVmeNJ90vE7ffLQVTcdZW-KfZx0qzb3kD514ZtM0nInMCOnP7cggLrVcQbVaClnKdSDoMBWJHrFYIimDncUGoem40LiKpcg1kC3IkJwNbAXrKwGcPZQKZWknafUGHMSQXfkBit0OUVOpCFWX3OOuZWPZz3NQEOfsI2lBkYRUvOtYcNXVcjFNNKcGA9pdDq'),
('Art & Culture Showcase', 'Explore a diverse collection of contemporary art.', '2024-05-18', '14:00', 'Metropolitan Museum', 1250.00, 1000, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuJOvg7cM9V-2jGpwdZlwWSC_GNJ-mhvEBPpcl0oxvlDXkRFY6YbWaKxKOHBXdm3VYb6LLHncK6vG18ltYS14cPo_vUD00yGZmWb2wrzUt0WG8ToFBN-tr0Xjxbwd2Ekv-aqDlIcc_DiKJi2O7rzyF8708lfe9EoVX3wSVsafHPHxukGZJ3Fy5gp_Ct1-NPERzcm2AdIz22FB0V4mrAZpeGM7xf2hOzfn-uaTM5pzYjbA3NGR83iBkEAvKFP7Yfyt794bECs8T50-j');
```

## 🎯 Features Added

### ✅ **Example User**
- Email: `demo@evently.com`
- Password: `demo123456`
- Ready to use for testing

### ✅ **Event Creation**
- Logged-in users can create events
- Full form with all necessary fields
- Beautiful glassmorphism design
- Peso currency support

### ✅ **Dashboard**
- View all events
- Create new events
- Manage existing events
- User authentication

### ✅ **Currency Conversion**
- All prices now display in Philippine Peso (₱)
- Proper formatting with commas
- Consistent across all components

### ✅ **Reservation System**
- Database tables ready for reservations
- User can book events
- Track booking status

## 🚀 How to Use

1. **Login** with the example credentials
2. **Navigate to Dashboard** to see all events
3. **Create New Event** using the "Create Event" button
4. **View Events** with peso pricing
5. **Book Events** through the reservation system

## 💰 Currency Examples

- Live Music Extravaganza: **₱2,250.00**
- Summer Music Festival: **₱3,750.00**
- Nightlife Experience: **₱1,500.00**
- Art & Culture Showcase: **₱1,250.00**

All prices are now displayed in Philippine Peso with proper formatting!
