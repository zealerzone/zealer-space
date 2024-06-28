import React from "react";

import Header from "@/components/header";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {children}
    </div>
  );
};

export default AdminLayout;
