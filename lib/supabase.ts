import { createClient } from '@supabase/supabase-js';

export function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase environment variables are required.');
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    global: {
      fetch
    }
  });
}

export type CustomerRecord = {
  id: string;
  name: string;
  phone: string;
  city: string;
  preferred_language: string;
  created_at: string;
};

export type ConversationRecord = {
  id: string;
  customer_id: string;
  message: string;
  sender: 'customer' | 'assistant';
  timestamp: string;
};

export type OrderRecord = {
  id: string;
  customer_id: string;
  perfume_name: string;
  quantity: number;
  status: string;
  created_at: string;
};
