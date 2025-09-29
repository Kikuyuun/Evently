import React, { useState, useEffect } from 'react';

const SimpleSupabaseTest = () => {
  const [status, setStatus] = useState('Testing...');
  const [details, setDetails] = useState('');

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test 1: Check environment variables
        const url = process.env.REACT_APP_SUPABASE_URL;
        const key = process.env.REACT_APP_SUPABASE_ANON_KEY;
        
        if (!url || !key) {
          setStatus('❌ Environment Variables Missing');
          setDetails('REACT_APP_SUPABASE_URL or REACT_APP_SUPABASE_ANON_KEY not found');
          return;
        }

        if (url.includes('placeholder') || key.includes('placeholder')) {
          setStatus('❌ Placeholder Values Detected');
          setDetails('Please update your .env file with actual Supabase credentials');
          return;
        }

        // Test 2: Try to create Supabase client
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(url, key);

        // Test 3: Try a simple query
        const { data, error } = await supabase
          .from('events')
          .select('count')
          .limit(1);

        if (error) {
          setStatus('❌ Database Query Failed');
          setDetails(`Error: ${error.message}`);
        } else {
          setStatus('✅ Connection Successful!');
          setDetails(`Supabase URL: ${url.substring(0, 30)}...`);
        }

      } catch (err) {
        setStatus('❌ Connection Failed');
        setDetails(`Error: ${err.message}`);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-6 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 max-w-md mx-auto">
      <h3 className="text-white font-bold mb-4 text-center">Supabase Connection Test</h3>
      <div className="text-center">
        <div className="text-lg mb-2">{status}</div>
        <div className="text-sm text-white/70">{details}</div>
      </div>
    </div>
  );
};

export default SimpleSupabaseTest;
