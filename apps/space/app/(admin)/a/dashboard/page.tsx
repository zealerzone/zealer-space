import { getUser } from "@/utils/supabase/server";
import CircleSwitcher from "../../components/Nav/CircleSwitcher";

const DashboardPage = async () => {
  const { email } = await getUser();

  return (
    <div>
      <div></div>
      <div>Hello {email}</div>
    </div>
  );
};

export default DashboardPage;
