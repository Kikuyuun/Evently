import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FeaturedEvents from '../components/FeaturedEvents';
import CategoryGrid from '../components/CategoryGrid';
import { supabase } from '../lib/supabaseClient';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .or(`title.ilike.%${query}%,description.ilike.%${query}%,venue.ilike.%${query}%,category.ilike.%${query}%`)
        .eq('status', 'active')
        .limit(10);

      if (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } else {
        setSearchResults(data || []);
        setShowResults(true);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      handleSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/search?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <main className="flex flex-1 justify-center p-5 sm:p-10">
      <div className="w-full max-w-6xl">
        {/* Search Bar */}
        <div className="mb-8 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 p-2 shadow-lg relative">
          <form onSubmit={handleSearchSubmit}>
            <label className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                className="form-input h-14 w-full rounded-lg border-0 bg-transparent pl-12 pr-12 text-white placeholder:text-white/70 focus:ring-2 focus:ring-blue-500 transition-all duration-300" 
                placeholder="Search for events, venues, artists" 
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {isSearching && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="spinner w-5 h-5"></div>
                </div>
              )}
            </label>
          </form>

          {/* Search Results Dropdown */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 overflow-hidden z-50">
              {searchResults.map((event) => (
                <Link
                  key={event.id}
                  to={`/event/${event.id}`}
                  className="flex items-center gap-4 p-4 hover:bg-blue-50 transition-colors duration-200"
                  onClick={() => setShowResults(false)}
                >
                  {event.image_url && (
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{event.title}</h3>
                    <p className="text-sm text-gray-600">{event.venue}</p>
                    <p className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-sm font-semibold text-blue-600">
                    ₱{event.price?.toLocaleString()}
                  </div>
                </Link>
              ))}
              <div className="p-3 border-t border-gray-200">
                <Link
                  to={`/search?q=${encodeURIComponent(searchQuery)}`}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  onClick={() => setShowResults(false)}
                >
                  View all results for "{searchQuery}"
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Featured Events Section */}
        <FeaturedEvents />

        {/* Categories Section */}
        <CategoryGrid onCategoryClick={handleCategoryClick} />
      </div>
    </main>
  );
};

export default Home;
