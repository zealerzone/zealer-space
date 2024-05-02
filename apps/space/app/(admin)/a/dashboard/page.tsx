import { getUser } from "@/utils/supabase/server";
import CircleSwitcher from "../../components/Nav/CircleSwitcher";

const DashboardPage = async () => {
  const ser = await getUser();

  return (
    <div>
      <div></div>
      <div>Hello {ser?.email}</div>
    </div>
  );
};

export default DashboardPage;
