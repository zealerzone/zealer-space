import { FC } from "react";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import ThemeToggle from "@ui/components/theme-toggle";
import { LucIcon } from "@ui/index";

import HeaderLogo from "./HeaderLogo";
import Navigation from "./Navigation";
import WelcomeMsg from "./WelcomeMsg";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <header className="bg-secondary px-4 py-8 pb-36 lg:px-14">
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-14 flex w-full items-center justify-between">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <div className="flex gap-2">
            <ThemeToggle />
            <ClerkLoaded>
              <UserButton afterSignOutUrl="/" />
            </ClerkLoaded>
            <ClerkLoading>
              <LucIcon
                iconName="LoaderCircle"
                className="size-8 animate-spin text-slate-400"
              />
            </ClerkLoading>
          </div>
        </div>
        <WelcomeMsg />
      </div>
    </header>
  );
};

export default Header;
