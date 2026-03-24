export type UserRole =
  | "admin"
  | "teacher"
  | "parent"
  | "student"
  | "canteen"
  | "vendor"
  | "staff";

export interface MenuItem {
  id: string;
  label: string;
  icon?: any;
  href: string;
  roles: UserRole[];
  badge?: number | string;
  children?: MenuItem[];
}
