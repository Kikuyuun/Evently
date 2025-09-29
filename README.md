# Evently - Smart Event & Seat Reservation System

A modern React-based event booking platform with intelligent seat selection, user authentication, and real-time data management powered by Supabase.

## ✨ Features

### 🎯 Core Features
- **Event Discovery**: Browse featured events and categories with real-time search
- **User Authentication**: Secure login/signup with Supabase Auth
- **Event Management**: Create, edit, and delete events with image upload
- **Smart Search**: Real-time search with category filtering
- **User Dashboard**: Manage your events and bookings
- **File Upload**: Direct image upload to Supabase Storage
- **Responsive Design**: Mobile-first design with modern UI

### 🎨 Design System
- Modern UI with Tailwind CSS
- Material Design icons
- Work Sans font family
- Custom color palette with glassmorphism effects
- Dark theme with gradient backgrounds

### 🚀 Technology Stack
- **Frontend**: React 18, React Router v7, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage, RLS)
- **Database**: PostgreSQL with Row Level Security
- **File Storage**: Supabase Storage for images
- **Authentication**: Supabase Auth with email/password

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/evently.git
cd evently
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up Supabase:**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Settings > API to get your project URL and anon key
   - Create a `.env` file in the root directory:
   ```env
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up the database:**
   - Go to SQL Editor in your Supabase dashboard
   - Run the SQL schema from `supabase-schema.sql` (if available)
   - Create the `event-images` storage bucket for file uploads

5. **Start the development server:**
```bash
npm start
```

6. **Open [http://localhost:3000](http://localhost:3000) to view it in the browser.**

## Project Structure

```
src/
├── components/
│   ├── Header.js          # Navigation header
│   ├── FeaturedEvents.js  # Featured events carousel
│   └── CategoryGrid.js    # Event categories grid
├── pages/
│   ├── Home.js            # Homepage
│   ├── EventDetails.js    # Event details page
│   ├── SeatSelection.js   # Interactive seat selection
│   └── BookingConfirmation.js # Booking & payment flow
├── App.js                 # Main app component with routing
├── index.js               # React entry point
└── index.css              # Global styles
```

## Key Features

### 1. Event Discovery
- Featured events carousel with smooth scrolling
- Category-based browsing (Concerts, Festivals, Nightlife, etc.)
- Search functionality
- Responsive grid layouts

### 2. Event Details
- Comprehensive event information
- Multiple date/time options
- Event features and amenities
- Direct booking flow integration

### 3. Smart Seat Selection
- Interactive seat map with visual feedback
- Multiple seating sections (VIP, Premium, Standard, Economy)
- Real-time seat availability
- Price display per seat
- Seat selection with booking summary

### 4. Booking Flow
- Personal information collection
- Payment form with validation
- Booking confirmation with details
- Email confirmation simulation

## Customization

### Colors
The app uses a custom color palette defined in the Tailwind config:
- Primary: #137fec (blue)
- Background Light: #f6f7f8
- Background Dark: #101922

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Flexible grid layouts
- Touch-friendly interface

## Future Enhancements

- User authentication and profiles
- Real-time seat availability updates
- Payment gateway integration
- Email notifications
- Mobile app development
- Admin dashboard for event management
- Analytics and reporting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
