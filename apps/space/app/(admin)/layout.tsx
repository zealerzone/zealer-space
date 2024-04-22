import { redirect } from "next/navigation";

import { isLoggedIn } from "@/utils/supabase/server";
import SideNavLayout from "./layouts/SideNavLayout";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const loggedIn = await isLoggedIn();
  if (!loggedIn) {
    redirect("/auth/login");
  }
  return (
    <div className="flex min-h-screen flex-col">
      <SideNavLayout>{children}</SideNavLayout>
    </div>
  );
};

export default AdminLayout;
