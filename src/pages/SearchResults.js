import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { formatPeso } from '../lib/setupExampleData';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';

  useEffect(() => {
    fetchEvents();
  }, [query, category]);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);

    try {
      let supabaseQuery = supabase
        .from('events')
        .select('*')
        .eq('status', 'active')
        .order('date', { ascending: true });

      if (query) {
        // Search by query
        supabaseQuery = supabaseQuery.or(
          `title.ilike.%${query}%,description.ilike.%${query}%,venue.ilike.%${query}%,category.ilike.%${query}%`
        );
      }

      if (category) {
        // Filter by category
        supabaseQuery = supabaseQuery.eq('category', category);
      }

      const { data, error } = await supabaseQuery;

      if (error) {
        setError(error.message);
      } else {
        setEvents(data || []);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getPageTitle = () => {
    if (category) {
      return `Events in ${category}`;
    }
    if (query) {
      return `Search results for "${query}"`;
    }
    return 'All Events';
  };

  const getPageDescription = () => {
    if (category) {
      return `Discover amazing ${category.toLowerCase()} events`;
    }
    if (query) {
      return `Found ${events.length} events matching your search`;
    }
    return 'Browse all available events';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-white text-lg">Searching events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{getPageTitle()}</h1>
          <p className="text-white/70">{getPageDescription()}</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 text-red-300 border border-red-500/30 rounded-lg">
            Error: {error}
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-white/70">
            {events.length} {events.length === 1 ? 'event' : 'events'} found
          </p>
        </div>

        {/* Events Grid */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Link
                key={event.id}
                to={`/event/${event.id}`}
                className="group"
              >
                <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 overflow-hidden hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  {/* Event Image */}
                  {event.image_url && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  )}

                  {/* Event Details */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {event.title}
                    </h3>
                    
                    <p className="text-white/70 mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    {/* Event Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-white/80">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-white/80">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{event.venue}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-white/80">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <span>{event.category}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-blue-400">
                        {formatPeso(event.price)}
                      </div>
                      <div className="text-sm text-white/70">
                        {event.current_bookings || 0} / {event.max_capacity || '∞'} booked
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* No Results */
          <div className="text-center py-12">
            <div className="text-white/50 text-lg mb-4">
              {query ? `No events found for "${query}"` : 'No events found'}
            </div>
            <Link
              to="/"
              className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-lg text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            >
              Browse All Events
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
