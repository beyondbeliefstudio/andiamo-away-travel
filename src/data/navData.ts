export interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
}

export const navData: NavItem[] = [
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Services",
    href: "/services",
  },

  {
    title: "Gallery",
    href: "/gallery",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];
