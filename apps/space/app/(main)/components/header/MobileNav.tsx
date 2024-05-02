import { Sheet, SheetContent, SheetTrigger } from "@ui/components/ui/sheet";
import { LucIcon, Separator } from "@ui/index";

import Logo from "@/app/(common)/components/Logo";
import Social from "@/app/(common)/components/Social";
import Nav from "./Nav";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger className="flex items-center justify-center">
        <LucIcon iconName="Menu" className="h-6 w-6 cursor-pointer" />
      </SheetTrigger>
      <SheetContent>
        <div className="flex h-full flex-col items-center justify-between py-8">
          <div className="mb-[10%] flex w-full flex-col items-center ">
            <div className="flex items-center justify-center gap-6">
              <Logo />
              <h2 className="h2">Zealer</h2>
            </div>
            <Separator className="mb-[30%] mt-[10%]" />
            <Nav
              containerStyles={"flex flex-col items-center gap-8"}
              linkStyles={"relative hover:text-primary transition-all"}
              underlineStyles={
                "absolute left-0 top-full h-[2px] bg-primary w-full"
              }
            />
          </div>
          <Social
            containerStyle={"flex gap-x-10 mx-auto lg:mx-0"}
            iconStyle={
              "text-foreground text-[22px] hover:text-primary transition-all"
            }
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
