import { getUser } from "@/utils/supabase/server";

const DashboardPage = async () => {
  const ser = await getUser();

  return (
    <div>
      <div>Hello {ser?.email}</div>
    </div>
  );
};

export default DashboardPage;
