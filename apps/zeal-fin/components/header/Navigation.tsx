import { FC, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button, LucIcon, Sheet, SheetContent, SheetTrigger } from "@ui/index";
import { useMedia } from "react-use";

import NavButton from "./NavButton";

interface NavigationProps {}

const routes = [
  {
    href: "/",
    label: "Overview",
  },
  {
    href: "/transactions",
    label: "Transactions",
  },
  {
    href: "/accounts",
    label: "Accounts",
  },
  {
    href: "/categories",
    label: "Categories",
  },
  {
    href: "/settings",
    label: "Settings",
  },
];
const Navigation: FC<NavigationProps> = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useMedia("(max-width: 1024px)");
  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant={"outline"} size={"icon"}>
            <LucIcon iconName="Menu" className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className="h-full px-2">
          <nav className="flex flex-col gap-y-2 pt-6">
            {routes.map((r) => (
              <Button
                key={r.href}
                variant={r.href === pathname ? "secondary" : "ghost"}
                className="justify-start"
                onClick={() => onClick(r.href)}
              >
                {r.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }
  return (
    <nav className="hidden items-center gap-x-2 overflow-x-auto lg:flex">
      {routes.map((r) => {
        return (
          <NavButton
            key={r.href}
            href={r.href}
            label={r.label}
            isActive={pathname === r.href}
          />
        );
      })}
    </nav>
  );
};

export default Navigation;
