import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import UserDropdown from './UserDropdown';

const Header = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial user
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="relative backdrop-blur-xl bg-white/10 border-b border-white/20 px-10 py-4 shadow-lg">
      <div className="flex items-center justify-between whitespace-nowrap">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3 text-white hover:text-blue-400 transition-colors duration-300">
            <svg className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd"></path>
              <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
            <h2 className="text-xl font-bold text-shadow-sm">Evently</h2>
          </Link>
          <nav className="flex items-center gap-8">
            <Link className="text-white text-sm font-semibold hover:text-blue-400 transition-colors duration-300" to="/">Home</Link>
            <Link className="text-white/90 text-sm font-semibold hover:text-blue-400 transition-colors duration-300" to="/search">Explore</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <label className="relative hidden lg:block">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input className="form-input w-48 rounded-lg border-0 bg-white/15 backdrop-blur-sm pl-10 text-white placeholder:text-white/70 focus:ring-2 focus:ring-blue-500 focus:bg-white/25 transition-all duration-300" placeholder="Search" type="text" />
          </label>
          
          {loading ? (
            <div className="flex items-center gap-4">
              <div className="spinner w-5 h-5"></div>
            </div>
          ) : user ? (
            <UserDropdown user={user} />
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/signup" className="rounded-lg bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 transition-all duration-300 border border-white/20">
                Sign Up
              </Link>
              <Link to="/login" className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-2 text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Log In
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
