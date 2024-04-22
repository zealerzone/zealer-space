import { FC } from "react";

import Header from "../components/Nav/Header";

interface HeaderLayoutProps {
  children: React.ReactNode;
}

const HeaderLayout: FC<HeaderLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-full w-full flex-1 flex-col overflow-x-hidden">
      <Header />
      <main className="max-h-screen flex-1 overflow-y-auto px-5 py-2">
        {children}
      </main>
    </div>
  );
};

export default HeaderLayout;
