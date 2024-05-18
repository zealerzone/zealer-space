"use client";

import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import ThemeToggle from "@ui/components/theme-toggle";
import { LucIcon } from "@ui/index";
import { useMountedState } from "react-use";

const HeaderUserSec = () => {
  const ismOunted = useMountedState();

  if (!ismOunted) return null;
  return (
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
  );
};

export default HeaderUserSec;
