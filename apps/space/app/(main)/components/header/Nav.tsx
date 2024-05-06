"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MotionSpan } from "@ui/index";

import { mainNavConfig } from "@/utils/config/navItems";

interface NavProps {
  containerStyles?: string;
  linkStyles?: string;
  underlineStyles?: string;
}
const Nav = ({ containerStyles, linkStyles, underlineStyles }: NavProps) => {
  const path = usePathname();
  return (
    <nav className={`${containerStyles}`}>
      {mainNavConfig.mainNav.map((link, index) => {
        const isActive = path === link.href;

        return (
          <Link
            key={index}
            href={link.href}
            className={`capitalize ${linkStyles}`}
          >
            {isActive && (
              <MotionSpan
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                transition={{ type: "tween" }}
                layoutId="underline"
                className={`${underlineStyles}`}
              />
            )}
            {link.title}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
