export type UserRole = "admin" | "teacher" | "parent" | "student" | "canteen";
import type { ReactNode } from "react";

import { HugeiconsIcon } from "@hugeicons/react";
import type { ComponentProps } from "react";

// HugeiconsIconProps & RefAttributes<SVGSVGElement>

export interface MenuItem {
  id: string;
  label: string;
  icon?: any;
  href: string;
  roles: UserRole[]; // Roles that can access this menu item
  badge?: number | string; // Optional badge count
  children?: MenuItem[]; // Submenu items
}
