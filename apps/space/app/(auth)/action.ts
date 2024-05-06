"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { createClient } from "@/utils/supabase/server";
import { signupSchema } from "./auth/signup/components/SignupForm";

export async function login(data: { email: string; password: string }) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  // const data = {
  //   email: formData.get("email") as string,
  //   password: formData.get("password") as string,
  // };

  const { error, data: signedInUser } =
    await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/auth/login?message=Could not authenticate user");
  }
  console.log("logge in User -->", signedInUser);

  revalidatePath("/a", "layout");
  redirect("/a/dashboard");
}

export async function signup(data: z.infer<typeof signupSchema>) {
  const supabase = await createClient();

  // TODO - need to add first name and last name to the table

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) {
    // console.log("Auth error->", error);
    redirect("/login?message=Error signing up");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
