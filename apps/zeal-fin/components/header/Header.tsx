import { FC } from "react";
import dynamic from "next/dynamic";

import HeaderLogo from "./HeaderLogo";
// import HeaderUserSec from "./HeaderUserSec";
import WelcomeMsg from "./WelcomeMsg";

const Navigation = dynamic(() => import("@/components/header/Navigation"), {
  ssr: false,
});
const HeaderUserSec = dynamic(
  () => import("@/components/header/HeaderUserSec"),
  {
    ssr: false,
  },
);

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <header className="bg-secondary -z-10 mx-auto max-w-screen-2xl px-4 py-8 pb-36 lg:px-14">
      <div className="mb-14 flex w-full items-center justify-between">
        <div className="flex items-center lg:gap-x-16">
          <HeaderLogo />
          <Navigation />
        </div>
        <HeaderUserSec />
      </div>
      <WelcomeMsg />
    </header>
  );
};

export default Header;
