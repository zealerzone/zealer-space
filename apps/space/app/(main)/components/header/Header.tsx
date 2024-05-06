import ThemeToggle from "@ui/components/theme-toggle";

import Logo from "@/app/(common)/components/Logo";
import HeaderLayout from "./HeaderLayout";
import MobileNav from "./MobileNav";
import Nav from "./Nav";
import UserNav from "./UserNav";

const Header = () => {

  return (
    <HeaderLayout>
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
    </HeaderLayout>
  );
};

export default Header;
