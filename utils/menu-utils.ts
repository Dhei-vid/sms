import { MenuItem, UserRole } from "@/lib/types";
import { menuItems } from "@/common/menu-items";

export function getRolePath(role: UserRole, basePath: string): string {
  if (basePath === "/dashboard") {
    return role === "admin" ? "/admin" : `/${role}`;
  }
  const cleanPath = basePath.startsWith("/") ? basePath.slice(1) : basePath;
  return `/${role}/${cleanPath}`;
}

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

export function matchMenuItemByPath(
  pathname: string,
  role: UserRole,
): MenuItem | null {
  const normalizedPath = pathname.replace(/\/$/, "") || "/";
  const roleMenuItems = getMenuItemsByRole(role);

  const isPathMatch = (itemHref: string, currentPath: string): boolean => {
    const normalizedHref = itemHref.replace(/\/$/, "") || "/";

    // Dashboard: exact match only
    if (normalizedHref === "/dashboard" || normalizedHref === "dashboard") {
      const dashboardPath = role === "admin" ? "/admin" : `/${role}`;
      return currentPath === dashboardPath;
    }

    if (currentPath === normalizedHref) return true;

    // Dynamic routes: prefix match
    if (normalizedHref !== "/" && currentPath.startsWith(normalizedHref)) {
      const nextChar = currentPath[normalizedHref.length];
      return nextChar === "/" || nextChar === undefined;
    }

    return false;
  };

  for (const item of roleMenuItems) {
    if (item.id === "separator" || !item.href) continue;

    if (isPathMatch(item.href, normalizedPath)) return item;

    if (item.children && item.children.length > 0) {
      for (const child of item.children) {
        if (isPathMatch(child.href, normalizedPath)) {
          return child;
        }
      }
    }
  }

  return null;
}
