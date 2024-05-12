"use client";

import { FC } from "react";
import { useMountedState } from "react-use";

import HeaderLogo from "./HeaderLogo";
import HeaderUserSec from "./HeaderUserSec";
import Navigation from "./Navigation";
import WelcomeMsg from "./WelcomeMsg";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;
  return (
    <header className="bg-secondary mx-auto max-w-screen-2xl px-4 py-8 pb-36 lg:px-14">
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
