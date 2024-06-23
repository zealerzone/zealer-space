"use client";

import { FC } from "react";
import { cn } from "@ui/lib/utils";

import useScroll from "@/hooks/useScroll";

interface HeaderLayoutProps {
  children: React.ReactNode;
}

const HeaderLayout: FC<HeaderLayoutProps> = ({ children }) => {
  const scrolled = useScroll(5);
  return (
    <header
      className={cn(
        `sticky inset-x-0 top-0 z-30 h-[60px] w-full py-3 transition-all `,
        {
          "dark:bg-accent/75 backdrop-blur-lg": scrolled,
        },
      )}
    >
      <div className="container mx-auto">{children}</div>
    </header>
  );
};

export default HeaderLayout;
