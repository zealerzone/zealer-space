import React from "react";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <div className="flex h-screen w-full">
      {/* Nav Bar */}
      <div className="">{children}</div>
    </div>
  );
};

export default MainLayout;
