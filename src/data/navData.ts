export interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
}

export const navData: NavItem[] = [
  {
    title: "Services",
    href: "/#services",
  },
  {
    title: "About",
    href: "/#about",
  },
  {
    title: "Contact",
    href: "/#contact",
  },
];
