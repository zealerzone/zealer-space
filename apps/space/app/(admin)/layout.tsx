import SideNavLayout from "./layouts/SideNavLayout";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <SideNavLayout>{children}</SideNavLayout>
    </div>
  );
};

export default AdminLayout;
