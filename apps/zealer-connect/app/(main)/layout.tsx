import React from "react";

import Header from "./_components/header";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
