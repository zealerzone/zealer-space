export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type NavConfig = {
  mainNav: MainNavItem[];
};

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
    instagram: string;
  };
};

export const mainNavConfig: NavConfig = {
  mainNav: [
    {
      title: "home",
      href: "/",
    },
    {
      title: "articles",
      href: "/articles",
    },
    {
      title: "events",
      href: "/events",
    },
    {
      title: "contact",
      href: "/contact",
    },
  ],
};
