import { redirect } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export const getUser = () => {
  const auth = getSupabaseAuth();
  const user = auth.getUser();
  // if (!user) redirect("/auth/login");

  return user;
};
export function getSupabaseAuth() {
  const supabaseClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  return supabaseClient.auth;
}
