import { supabase } from './supabaseClient';

// Example user credentials
export const EXAMPLE_USER = {
  email: 'demo@evently.com',
  password: 'demo123456',
  name: 'Demo User'
};

// Create example user (this should be run on the server side with service role key)
export async function createExampleUser() {
  try {
    // Note: This requires service role key and should be run server-side
    // For now, we'll just provide the credentials for manual creation
    console.log('Example user credentials:');
    console.log('Email:', EXAMPLE_USER.email);
    console.log('Password:', EXAMPLE_USER.password);
    console.log('Name:', EXAMPLE_USER.name);
    
    return {
      success: true,
      message: 'Example user credentials provided. Please create this user manually in Supabase Auth.',
      credentials: EXAMPLE_USER
    };
  } catch (error) {
    console.error('Error creating example user:', error);
    return { success: false, error: error.message };
  }
}

// Create events table structure
export async function createEventsTable() {
  try {
    // This would create the events table if it doesn't exist
    // In a real implementation, you'd run this SQL in Supabase SQL editor:
    const createEventsTableSQL = `
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
    `;
    
    const createReservationsTableSQL = `
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
    `;
    
    console.log('SQL to create events table:');
    console.log(createEventsTableSQL);
    console.log('\nSQL to create reservations table:');
    console.log(createReservationsTableSQL);
    
    return {
      success: true,
      message: 'Table creation SQL provided. Please run these in Supabase SQL editor.',
      sql: {
        events: createEventsTableSQL,
        reservations: createReservationsTableSQL
      }
    };
  } catch (error) {
    console.error('Error creating tables:', error);
    return { success: false, error: error.message };
  }
}

// Insert example events
export async function insertExampleEvents() {
  const exampleEvents = [
    {
      title: "Live Music Extravaganza",
      description: "Experience the energy of live music with top artists.",
      date: "2024-03-15",
      time: "19:00",
      venue: "Madison Square Garden",
      price: 2250.00, // ₱2,250
      max_capacity: 20000,
      image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDf6PDzACB6AblgLy5UJM5L36jgaFPv31BRMOgSroMkoekzzMLeQt-rKrVCejgDbTt8ICpsoqngGEM3_KnuBMeWqsI8_ryv5UPmJSKh6EEt6KZdDGG7Z5-jcwascPQLjryyXa3cIa-kLjMwk4IdUWpBVsUZrZ2wWuh1lqDmN-QTIfOyQ4iaUH77TvjTdf_gfagvuYTa4CrqhAqjYdy75xcsoPhuWz_gvDsEtjOplW0pEl05_H67PqPrymc3h9t6HZyGTXZk11JV3Oq-"
    },
    {
      title: "Summer Music Festival",
      description: "Join us for a weekend of music, fun, and community.",
      date: "2024-07-20",
      time: "18:00",
      venue: "Central Park",
      price: 3750.00, // ₱3,750
      max_capacity: 50000,
      image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCaDVOhA6-YP9IS6zKf7RUesYJVLibr6RvrxMDeaJi-MwTI4DuX-ZZhRI_Ire1ucNrpc_4rh6JCzUjU5lpYvCLEewBJwrKNzQsgMOfflPb9dxva0awHRGq-0aAeVQaCKtmEXmWL8jNxLYG90pDLi_cwWL_11wcIHP1GLNFqwrAcy_rMTywYxi5h6J_RFfiOlUs2KBtAKlGpHwk92XgKjvc5rrJYCNatcgA5qCeVM3L_LCA6GzSXuyiaBL8dpd39Wkd8K1pdrttvFxMs"
    },
    {
      title: "Nightlife Experience",
      description: "Dance the night away at the hottest clubs in town.",
      date: "2024-04-10",
      time: "22:00",
      venue: "Club XYZ",
      price: 1500.00, // ₱1,500
      max_capacity: 500,
      image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbawe3uZdvxKPKMcuKCS-xBn-xiQfEkffz_5vjxX8SqQcFE_WZGScdY1PdhYEIkoIS_LVxPrbrat0I96OVmeNJ90vE7ffLQVTcdZW-KfZx0qzb3kD514ZtM0nInMCOnP7cggLrVcQbVaClnKdSDoMBWJHrFYIimDncUGoem40LiKpcg1kC3IkJwNbAXrKwGcPZQKZWknafUGHMSQXfkBit0OUVOpCFWX3OOuZWPZz3NQEOfsI2lBkYRUvOtYcNXVcjFNNKcGA9pdDq"
    },
    {
      title: "Art & Culture Showcase",
      description: "Explore a diverse collection of contemporary art.",
      date: "2024-05-18",
      time: "14:00",
      venue: "Metropolitan Museum",
      price: 1250.00, // ₱1,250
      max_capacity: 1000,
      image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuJOvg7cM9V-2jGpwdZlwWSC_GNJ-mhvEBPpcl0oxvlDXkRFY6YbWaKxKOHBXdm3VYb6LLHncK6vG18ltYS14cPo_vUD00yGZmWb2wrzUt0WG8ToFBN-tr0Xjxbwd2Ekv-aqDlIcc_DiKJi2O7rzyF8708lfe9EoVX3wSVsafHPHxukGZJ3Fy5gp_Ct1-NPERzcm2AdIz22FB0V4mrAZpeGM7xf2hOzfn-uaTM5pzYjbA3NGR83iBkEAvKFP7Yfyt794bECs8T50-j"
    }
  ];

  try {
    const { data, error } = await supabase
      .from('events')
      .insert(exampleEvents);

    if (error) {
      console.error('Error inserting example events:', error);
      return { success: false, error: error.message };
    }

    return {
      success: true,
      message: 'Example events inserted successfully',
      data: data
    };
  } catch (error) {
    console.error('Error inserting example events:', error);
    return { success: false, error: error.message };
  }
}

// Format currency to peso
export function formatPeso(amount) {
  return `₱${amount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Initialize example data
export async function initializeExampleData() {
  console.log('🚀 Initializing example data...');
  
  // Create example user
  const userResult = await createExampleUser();
  console.log('👤 User creation:', userResult);
  
  // Create tables
  const tableResult = await createEventsTable();
  console.log('📊 Table creation:', tableResult);
  
  // Insert example events
  const eventsResult = await insertExampleEvents();
  console.log('🎉 Events insertion:', eventsResult);
  
  return {
    user: userResult,
    tables: tableResult,
    events: eventsResult
  };
}
