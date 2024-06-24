import { FC } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
// import { SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import ThemeToggle from "@ui/components/theme-toggle";
import { Button } from "@ui/index";

import Logo from "@/components/common/Logo";
import HeaderLayout from "./HeaderLayout";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  const { userId } = auth();
  return (
    <HeaderLayout>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start">
          <Logo />
        </div>
        <div className="flex items-center gap-x-6">
          {/* <Nav
            containerStyles={"hidden lg:flex gap-8 items-center"}
            linkStyles={"relative hover:text-primary transition-all"}
            underlineStyles={
              "absolute left-0 top-full h-[2px] bg-primary w-full"
            }
          /> */}
          <div>Nav</div>
          {userId && <UserButton afterSignOutUrl="/" />}
          {!userId && (
            <Link href="/auth/sign-in" className="font-bold">
              Become a Zealer
            </Link>
          )}
          <Button>Become a Zealer</Button>
          <ThemeToggle />
          {/* Mobile Nav */}
          <div className="lg:hidden">
            {/* <MobileNav /> */}
            <div>Mobile Nav</div>
          </div>
        </div>
      </div>
    </HeaderLayout>
  );
};

export default Header;
