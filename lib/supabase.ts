import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set.");
}

if (!serviceKey) {
  throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set.");
}

if (!anonKey) {
  throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not set.");
}

export const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false }
});

export const supabaseClient = createClient(supabaseUrl, anonKey);
