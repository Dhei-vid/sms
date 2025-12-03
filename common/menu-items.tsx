import {
  DashboardSquare03Icon,
  NotificationSquareIcon,
  Calendar03Icon,
  Chat01Icon,
  GraduateMaleIcon,
  StudentsIcon,
  GlobalEducationIcon,
  Money03Icon,
  TeacherIcon,
  ComputerProgramming02Icon,
  OnlineLearning02Icon,
  AnalyticsUpIcon,
  StudentIcon,
  Settings01Icon,
  ArrowRight02Icon,
} from "@hugeicons/core-free-icons";

import { MenuItem, UserRole } from "../lib/types";

// Helper function to get role-specific path
function getRolePath(role: UserRole, basePath: string): string {
  if (basePath === "/dashboard") {
    return role === "admin" ? "/admin" : `/${role}`;
  }
  // Remove leading slash if present and add role prefix
  const cleanPath = basePath.startsWith("/") ? basePath.slice(1) : basePath;
  return `/${role}/${cleanPath}`;
}

// Menu items configuration with role-based access
export const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: DashboardSquare03Icon,
    href: "/dashboard",
    roles: ["admin", "teacher", "parent", "student", "canteen"],
  },
  {
    id: "notice-board",
    label: "Notice Board",
    icon: NotificationSquareIcon,
    href: "/notice-board",
    roles: ["admin", "teacher", "parent", "student"],
    badge: 4,
  },
  {
    id: "calendar",
    label: "Calendar",
    icon: Calendar03Icon,
    href: "/calendar",
    roles: ["admin", "teacher", "parent", "student"],
    badge: 1,
  },
  {
    id: "messages",
    label: "Messages",
    icon: Chat01Icon,
    href: "/messages",
    roles: ["admin", "teacher", "parent", "student"],
    badge: 3,
  },
  {
    id: "separator",
    label: "",
    href: "",
    roles: ["admin", "teacher", "parent", "student"],
  },
  {
    id: "admissions",
    label: "Admissions",
    icon: GraduateMaleIcon,
    href: "/admissions",
    roles: ["admin"],
  },
  {
    id: "students",
    label: "Students",
    icon: StudentsIcon,
    href: "/students",
    roles: ["admin", "teacher"],
  },
  {
    id: "staff-management",
    label: "Staff Management",
    icon: TeacherIcon,
    href: "/staff-management",
    roles: ["admin"],
  },
  {
    id: "separator",
    label: "",
    href: "",
    roles: ["admin", "teacher", "parent", "student"],
  },
  {
    id: "finance",
    label: "Finance",
    icon: Money03Icon,
    href: "/finance",
    roles: ["admin"],
    children: [
      {
        id: "fee&revenue",
        label: "Fee & Revenue Management",
        icon: ArrowRight02Icon,
        href: "/finance",
        roles: ["admin"],
      },
      {
        id: "dailyoperations",
        label: "Daily Operations & Treasury",
        icon: ArrowRight02Icon,
        href: "/finance",
        roles: ["admin"],
      },
      {
        id: "reporting&compliance",
        label: "Reporting & Compliance",
        icon: ArrowRight02Icon,
        href: "/finance",
        roles: ["admin"],
      },
    ],
  },
  {
    id: "separator",
    label: "",
    href: "",
    roles: ["admin", "teacher", "parent", "student"],
  },
  {
    id: "academic-management",
    label: "Academic Management",
    icon: GlobalEducationIcon,
    href: "/academic",
    roles: ["admin", "teacher"],
  },
  {
    id: "cbt-management",
    label: "CBT Management",
    icon: ComputerProgramming02Icon,
    href: "/cbt",
    roles: ["admin", "teacher"],
  },
  {
    id: "learning-management",
    label: "Learning Management",
    icon: OnlineLearning02Icon,
    href: "/learning",
    roles: ["admin", "teacher", "student"],
  },
  {
    id: "separator",
    label: "",
    href: "",
    roles: ["admin", "teacher", "parent", "student"],
  },
  {
    id: "report-analysis",
    label: "Report & Analysis",
    icon: AnalyticsUpIcon,
    href: "/reports",
    roles: ["admin", "teacher"],
  },
  {
    id: "alumni-management",
    label: "Alumni Management",
    icon: StudentIcon,
    href: "/alumni",
    roles: ["admin"],
  },
  {
    id: "system-settings",
    label: "System Settings",
    icon: Settings01Icon,
    href: "/settings",
    roles: ["admin"],
  },
];

// Get menu items filtered by role with role-specific paths
export function getMenuItemsByRole(role: UserRole): MenuItem[] {
  return menuItems
    .filter((item) => item.roles.includes(role))
    .map((item) => {
      const rolePath = getRolePath(role, item.href);
      if (item.children) {
        return {
          ...item,
          href: rolePath,
          children: item.children
            .filter((child) => child.roles.includes(role))
            .map((child) => ({
              ...child,
              href: getRolePath(role, child.href),
            })),
        };
      }
      return {
        ...item,
        href: rolePath,
      };
    });
}
