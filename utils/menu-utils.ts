import { MenuItem, UserRole } from "@/lib/types";
import { menuItems } from "@/common/menu-items";

/**
 * Helper function to get role-specific path
 * @param role - The user's role
 * @param basePath - The base path from menu item
 * @returns The role-specific path
 */
export function getRolePath(role: UserRole, basePath: string): string {
  if (basePath === "/dashboard") {
    return role === "admin" ? "/admin" : `/${role}`;
  }
  // Remove leading slash if present and add role prefix
  const cleanPath = basePath.startsWith("/") ? basePath.slice(1) : basePath;
  return `/${role}/${cleanPath}`;
}

/**
 * Get menu items filtered by role with role-specific paths
 * @param role - The user's role
 * @returns Array of menu items filtered by role with role-specific paths
 */
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

/**
 * Matches the current URL pathname with sidebar menu items and returns the matched menu item object.
 * Searches through both parent items and their children (nested items).
 *
 * @param pathname - The current URL pathname (e.g., "/admin/students" or "/student/my-grades")
 * @param role - The user's role to filter menu items
 * @returns The matched MenuItem object, or null if no match is found
 */
export function matchMenuItemByPath(
  pathname: string,
  role: UserRole,
): MenuItem | null {
  // Normalize pathname - remove trailing slashes
  const normalizedPath = pathname.replace(/\/$/, "") || "/";

  // Get role-specific menu items
  const roleMenuItems = getMenuItemsByRole(role);

  // Helper function to check if a path matches
  const isPathMatch = (itemHref: string, currentPath: string): boolean => {
    // Normalize item href - remove trailing slashes
    const normalizedHref = itemHref.replace(/\/$/, "") || "/";

    // Handle dashboard special case - exact match only
    if (normalizedHref === "/dashboard" || normalizedHref === "dashboard") {
      const dashboardPath = role === "admin" ? "/admin" : `/${role}`;
      return currentPath === dashboardPath;
    }

    // For exact match
    if (currentPath === normalizedHref) {
      return true;
    }

    // For prefix match (handles dynamic routes like /admin/students/[id])
    // Only match if the path starts with the href and the next character is / or end of string
    if (normalizedHref !== "/" && currentPath.startsWith(normalizedHref)) {
      const nextChar = currentPath[normalizedHref.length];
      return nextChar === "/" || nextChar === undefined;
    }

    return false;
  };

  // Search through menu items and their children
  for (const item of roleMenuItems) {
    // Skip separators
    if (item.id === "separator" || !item.href) {
      continue;
    }

    // Check if current item matches
    if (isPathMatch(item.href, normalizedPath)) {
      return item;
    }

    // Check children if they exist
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
