-- =====================================================
-- ZENOVA EVENT RESERVATION SYSTEM - SUPABASE SETUP
-- =====================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- =====================================================
-- 1. CORE TABLES
-- =====================================================

-- Events table
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
  category TEXT DEFAULT 'General',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'completed', 'draft')),
  tags TEXT[] DEFAULT '{}',
  search_vector tsvector,
  ai_summary TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  seats INTEGER DEFAULT 1,
  total_amount DECIMAL(10,2),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method TEXT,
  payment_reference TEXT,
  special_requests TEXT,
  ai_sentiment TEXT,
  booking_pattern JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  date_of_birth DATE,
  address TEXT,
  city TEXT,
  country TEXT DEFAULT 'Philippines',
  avatar_url TEXT,
  preferences JSONB DEFAULT '{}',
  ai_profile_vector vector(1536),
  favorite_categories TEXT[] DEFAULT '{}',
  booking_history JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event categories table
CREATE TABLE IF NOT EXISTS event_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  color TEXT DEFAULT '#137fec',
  ai_keywords TEXT[] DEFAULT '{}',
  popularity_score DECIMAL(3,2) DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Venues table
CREATE TABLE IF NOT EXISTS venues (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  capacity INTEGER,
  amenities TEXT[],
  contact_info JSONB DEFAULT '{}',
  ai_location_vector vector(1536),
  venue_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seat maps table
CREATE TABLE IF NOT EXISTS seat_maps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  section_name TEXT NOT NULL,
  seat_number TEXT NOT NULL,
  seat_type TEXT DEFAULT 'standard' CHECK (seat_type IN ('vip', 'premium', 'standard', 'economy')),
  price DECIMAL(10,2),
  is_available BOOLEAN DEFAULT true,
  is_reserved BOOLEAN DEFAULT false,
  reserved_by UUID REFERENCES auth.users(id),
  reserved_at TIMESTAMP WITH TIME ZONE,
  ai_demand_score DECIMAL(3,2) DEFAULT 0.5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(event_id, section_name, seat_number)
);

-- AI Analytics table
CREATE TABLE IF NOT EXISTS ai_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  analysis_type TEXT NOT NULL,
  analysis_data JSONB NOT NULL,
  confidence_score DECIMAL(3,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Chat logs table
CREATE TABLE IF NOT EXISTS ai_chat_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  message TEXT NOT NULL,
  response TEXT,
  intent TEXT,
  sentiment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 2. INDEXES
-- =====================================================

-- Full-text search indexes
CREATE INDEX IF NOT EXISTS idx_events_search_vector ON events USING GIN(search_vector);
CREATE INDEX IF NOT EXISTS idx_events_tags ON events USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_events_title_trgm ON events USING GIN(title gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_events_description_trgm ON events USING GIN(description gin_trgm_ops);

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);
CREATE INDEX IF NOT EXISTS idx_reservations_user_id ON reservations(user_id);
CREATE INDEX IF NOT EXISTS idx_reservations_event_id ON reservations(event_id);

-- =====================================================
-- 3. FUNCTIONS
-- =====================================================

-- Function to update search vector
CREATE OR REPLACE FUNCTION update_event_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector := to_tsvector('english', 
        COALESCE(NEW.title, '') || ' ' || 
        COALESCE(NEW.description, '') || ' ' || 
        COALESCE(NEW.venue, '') || ' ' || 
        COALESCE(NEW.category, '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Function to update current_bookings count
CREATE OR REPLACE FUNCTION update_event_bookings()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE events 
        SET current_bookings = current_bookings + NEW.seats
        WHERE id = NEW.event_id;
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        UPDATE events 
        SET current_bookings = current_bookings - OLD.seats + NEW.seats
        WHERE id = NEW.event_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE events 
        SET current_bookings = current_bookings - OLD.seats
        WHERE id = OLD.event_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

-- =====================================================
-- 4. TRIGGERS
-- =====================================================

-- Trigger to update search vector
CREATE TRIGGER update_event_search_vector_trigger
    BEFORE INSERT OR UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_event_search_vector();

-- Triggers for updated_at
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reservations_updated_at BEFORE UPDATE ON reservations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_venues_updated_at BEFORE UPDATE ON venues
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger to update booking counts
CREATE TRIGGER update_event_bookings_trigger
    AFTER INSERT OR UPDATE OR DELETE ON reservations
    FOR EACH ROW EXECUTE FUNCTION update_event_bookings();

-- =====================================================
-- 5. ROW LEVEL SECURITY
-- =====================================================

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE seat_maps ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_chat_logs ENABLE ROW LEVEL SECURITY;

-- Events policies
CREATE POLICY "Anyone can view active events" ON events 
    FOR SELECT USING (status = 'active');

CREATE POLICY "Users can view their own events" ON events 
    FOR SELECT USING (auth.uid() = created_by);

CREATE POLICY "Users can create events" ON events 
    FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own events" ON events 
    FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own events" ON events 
    FOR DELETE USING (auth.uid() = created_by);

-- Reservations policies
CREATE POLICY "Users can view their own reservations" ON reservations 
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Event creators can view event reservations" ON reservations 
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM events 
            WHERE events.id = reservations.event_id 
            AND events.created_by = auth.uid()
        )
    );

CREATE POLICY "Users can create reservations" ON reservations 
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reservations" ON reservations 
    FOR UPDATE USING (auth.uid() = user_id);

-- User profiles policies
CREATE POLICY "Users can view their own profile" ON user_profiles 
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON user_profiles 
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON user_profiles 
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Other policies
CREATE POLICY "Anyone can view categories" ON event_categories 
    FOR SELECT USING (true);

CREATE POLICY "Anyone can view venues" ON venues 
    FOR SELECT USING (true);

CREATE POLICY "Anyone can view seat maps" ON seat_maps 
    FOR SELECT USING (true);

-- =====================================================
-- 6. SAMPLE DATA
-- =====================================================

-- Insert event categories
INSERT INTO event_categories (name, description, icon, color, ai_keywords) VALUES
('Concerts', 'Live music performances and concerts', 'music_note', '#e91e63', ARRAY['music', 'live', 'concert', 'band', 'artist']),
('Festivals', 'Music festivals and cultural events', 'festival', '#ff9800', ARRAY['festival', 'outdoor', 'music', 'culture', 'celebration']),
('Nightlife', 'Club events and nightlife experiences', 'nightlife', '#9c27b0', ARRAY['club', 'dance', 'night', 'party', 'dj']),
('Art & Culture', 'Art exhibitions and cultural showcases', 'palette', '#795548', ARRAY['art', 'culture', 'exhibition', 'museum', 'gallery']),
('Sports', 'Sports events and competitions', 'sports', '#4caf50', ARRAY['sports', 'competition', 'athletic', 'game', 'tournament']),
('Theater', 'Theater performances and shows', 'theater_comedy', '#3f51b5', ARRAY['theater', 'drama', 'performance', 'stage', 'acting']),
('Comedy', 'Comedy shows and stand-up performances', 'comedy', '#ff5722', ARRAY['comedy', 'humor', 'stand-up', 'laugh', 'entertainment']),
('Workshops', 'Educational workshops and seminars', 'school', '#607d8b', ARRAY['workshop', 'education', 'learning', 'seminar', 'training'])
ON CONFLICT (name) DO NOTHING;

-- Insert sample venues
INSERT INTO venues (name, address, city, capacity, amenities) VALUES
('Madison Square Garden', '4 Pennsylvania Plaza, New York, NY', 'New York', 20000, ARRAY['Parking', 'Food Court', 'Accessibility', 'VIP Lounge']),
('Central Park', 'Central Park, New York, NY', 'New York', 50000, ARRAY['Outdoor', 'Food Trucks', 'Restrooms', 'First Aid']),
('Club XYZ', '123 Nightlife St, Manila', 'Manila', 500, ARRAY['Bar', 'Dance Floor', 'VIP Section', 'Sound System']),
('Metropolitan Museum', '1000 5th Ave, New York, NY', 'New York', 1000, ARRAY['Air Conditioning', 'Gift Shop', 'Cafe', 'Guided Tours'])
ON CONFLICT DO NOTHING;

-- =====================================================
-- 7. HELPFUL FUNCTIONS
-- =====================================================

-- Function to search events
CREATE OR REPLACE FUNCTION search_events(search_query TEXT)
RETURNS TABLE (
    id UUID,
    title TEXT,
    description TEXT,
    date DATE,
    venue TEXT,
    price DECIMAL(10,2),
    category TEXT,
    relevance_score REAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        e.id,
        e.title,
        e.description,
        e.date,
        e.venue,
        e.price,
        e.category,
        ts_rank(e.search_vector, plainto_tsquery('english', search_query)) as relevance_score
    FROM events e
    WHERE e.search_vector @@ plainto_tsquery('english', search_query)
    AND e.status = 'active'
    ORDER BY relevance_score DESC;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- SETUP COMPLETE!
-- =====================================================
