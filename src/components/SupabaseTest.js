import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const SupabaseTest = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .limit(5);

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

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="p-8 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20">
        <div className="flex items-center gap-3">
          <div className="spinner"></div>
          <span className="text-white">Testing Supabase connection...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-500/20 backdrop-blur-xl rounded-xl border border-red-500/30">
        <h3 className="text-red-400 font-bold mb-2">❌ Connection Failed</h3>
        <p className="text-red-300 text-sm">{error}</p>
        <p className="text-red-300 text-xs mt-2">
          Please check your .env file and Supabase credentials.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-green-500/20 backdrop-blur-xl rounded-xl border border-green-500/30">
      <h3 className="text-green-400 font-bold mb-4">✅ Supabase Connected Successfully!</h3>
      <p className="text-green-300 text-sm mb-4">
        Found {events.length} events in your database.
      </p>
      
      {events.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-white font-semibold">Sample Events:</h4>
          {events.map((event) => (
            <div key={event.id} className="bg-white/10 rounded-lg p-3">
              <h5 className="text-white font-medium">{event.title}</h5>
              <p className="text-white/70 text-sm">₱{event.price?.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SupabaseTest;
