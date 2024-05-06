import { redirect } from "next/navigation";

import { getUser } from "@/utils/supabase/server";
import LoginForm from "./components/LoginForm";

export default async function Login() {
  const user = await getUser();
  if (user) {
    redirect("/");
  }
  return <LoginForm />;
}
