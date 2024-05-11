import { FC } from "react";
import Link from "next/link";
import { buttonVariants } from "@ui/index";
import { cn } from "@ui/lib/utils";

interface NavButtonProps {
  href: string;
  label: string;
  isActive: boolean;
}

const NavButton: FC<NavButtonProps> = ({ href, isActive, label }) => {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "hover:bg-primary/50 hover:text-primary-foreground text-primary border-none outline-none transition focus:bg-white/30 focus-visible:ring-transparent focus-visible:ring-offset-0",
        isActive ? "bg-primary/80 text-primary-foreground" : "bg-transparent",
      )}
    >
      {label}
    </Link>
  );
};

export default NavButton;
