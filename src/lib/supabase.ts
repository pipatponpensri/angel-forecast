// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

// อ่านค่าจาก .env.local (Vite)
const url  = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!url || !anon) {
  throw new Error(
    "Missing Supabase env. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local"
  );
}

// สร้าง client ตัวเดียวสำหรับทั้งแอป
export const supabase = createClient(url, anon, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
