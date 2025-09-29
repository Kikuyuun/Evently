import { createClient } from '@supabase/supabase-js';

// Prefer runtime env (window.ENV) when available (e.g., Netlify free tier)
const runtimeEnv = (typeof window !== 'undefined' && (window as any).ENV) ? (window as any).ENV : {};

const supabaseUrl =
  runtimeEnv.REACT_APP_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey =
  runtimeEnv.REACT_APP_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY || 'placeholder-key';

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder') || supabaseAnonKey === 'placeholder-key') {
  console.warn('Supabase credentials are missing. Ensure env.js or .env provides REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


