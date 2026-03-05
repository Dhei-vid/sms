export type UserRole = "admin" | "teacher" | "parent" | "student" | "canteen";

export interface MenuItem {
  id: string;
  label: string;
  icon?: any;
  href: string;
  roles: UserRole[];
  badge?: number | string;
  children?: MenuItem[];
}
