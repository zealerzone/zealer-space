import { FC } from "react";

import SideNav from "../components/Nav/SideNav";
import HeaderLayout from "./HeaderLayout";

interface SideNavLayoutProps {
  children: React.ReactNode;
}

const SideNavLayout: FC<SideNavLayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <SideNav />
      <HeaderLayout>{children}</HeaderLayout>
    </div>
  );
};

export default SideNavLayout;
