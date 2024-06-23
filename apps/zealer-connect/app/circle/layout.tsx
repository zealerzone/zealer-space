import React from "react";

import Sidebar from "./_components/sidebar";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <div className=" h-screen">
      <Sidebar />
      <div className=" pl-[60px]">{children}</div>
    </div>
  );
};

export default MainLayout;
