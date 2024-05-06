import { createBrowserClient } from "@supabase/ssr";

import { env } from "@/env";

function createClient() {
  const supabaseClient = createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL!,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  return supabaseClient.auth;
}
