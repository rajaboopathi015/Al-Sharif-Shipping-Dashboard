import {
  BarChart3,
  Box,
  ChartColumn,
  Home,
  PackageCheck,
  RefreshCcw,
  type LucideIcon,
} from "lucide-react";

export type SidebarNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const sidebarNavItems: SidebarNavItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/", label: "Shipping Container Lines", icon: Box },
  { href: "/analytics", label: "Division Performance - Revised", icon: BarChart3 },
  { href: "/analytics", label: "Shipping Revenue", icon: ChartColumn },
  { href: "/containers", label: "Shipping Non Containers - Operation", icon: PackageCheck },
  { href: "/containers", label: "Shipping PDA Operation", icon: RefreshCcw },
];
