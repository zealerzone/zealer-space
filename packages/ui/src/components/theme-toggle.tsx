"use client";

import { FC } from "react";
import { useTheme } from "next-themes";

import { LucIcon } from "./LucIcon";
import { Button } from "./ui/button";

interface ThemeToggleProps {}

const ThemeToggle: FC<ThemeToggleProps> = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      size={"icon"}
      variant={"outline"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <LucIcon
        iconName="Moon"
        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <LucIcon
        iconName="Sun"
        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100"
      />
    </Button>
  );
};

export default ThemeToggle;
