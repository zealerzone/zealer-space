"use client";

import ThemeToggle from "@ui/components/theme-toggle";
import { cn } from "@ui/lib/utils";

import Logo from "@/app/(common)/components/Logo";
import useScroll from "@/hooks/useScroll";
import MobileNav from "./MobileNav";
import Nav from "./Nav";
import UserNav from "./UserNav";

const Header = () => {
  const scrolled = useScroll(5);
  // const selectedLayout = useSelectedLayoutSegment()

  return (
    <header
      className={cn(
        `sticky inset-x-0 top-0 z-30 h-[60px] w-full py-3 transition-all `,
        {
          "dark:bg-accent/75 backdrop-blur-lg": scrolled,
        },
      )}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <Logo />
          </div>
          <div className="flex items-center gap-x-6">
            <Nav
              containerStyles={"hidden lg:flex gap-8 items-center"}
              linkStyles={"relative hover:text-primary transition-all"}
              underlineStyles={
                "absolute left-0 top-full h-[2px] bg-primary w-full"
              }
            />
            <UserNav />
            <ThemeToggle />
            {/* Mobile Nav */}
            <div className="lg:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
