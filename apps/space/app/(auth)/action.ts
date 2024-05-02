"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { toast } from "@ui/index";

import { getSupabaseAuth } from "@/utils/supabase/server";

export async function login(data: { email: string; password: string }) {
  const supabase = getSupabaseAuth();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  // const data = {
  //   email: formData.get("email") as string,
  //   password: formData.get("password") as string,
  // };

  const { error } = await supabase.signInWithPassword(data);

  if (error) {
    toast.error(error.message);
    redirect("/error");
  }

  revalidatePath("/a", "layout");
  redirect("/a/dashboard");
}

export async function signup(data: {
  email: string;
  password: string;
  confirm: string;
}) {
  const supabase = getSupabaseAuth();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  // const data = {
  //   email: formData.get("email") as string,
  //   password: formData.get("password") as string,
  // };

  const { error } = await supabase.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) {
    toast.error(error.message);
    // console.log("Auth error->", error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function logout() {
  const supabase = getSupabaseAuth();
  await supabase.signOut();
  redirect("/");
}
