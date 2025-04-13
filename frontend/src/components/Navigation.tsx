
import PathConstants from "@/routes/PathConstants";

export interface NavItem {
  name: string;
  href: string;
  icon?: JSX.Element;
  protected?: boolean;
  roles?: string[];
}

export const mainNav: NavItem[] = [
  { name: "Home", href: PathConstants.HOME },
  { name: "Chat", href: PathConstants.BASE_CHAT },
  { name: "About", href: PathConstants.ABOUT },
];

export const userNav: NavItem[] = [
  { name: "Your Profile", href: "/profile" },
  { name: "Settings", href: "/settings" },
  { name: "Sign out", href: "#logout" }, // logout can be intercepted
];

