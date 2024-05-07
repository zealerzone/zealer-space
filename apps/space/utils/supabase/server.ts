"use server";

import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";


export const getUser = async () => {
  const supabase = await createClient();
  return (await supabase.auth?.getUser())?.data?.user;
};
export const isLoggedIn = async () => {
  const supabase = await createClient();
  const user = (await supabase.auth?.getUser())?.data?.user;

  if (user) {
    return true;
  } else {
    return false;
  }
};

export const createClient = () => {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            /* empty */
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            /* empty */
          }
        },
      },
    },
  );
};
