"use client";

import { usePathname } from "next/navigation";
import { menuItems } from "@/common/menu-items";
import { matchMenuItemByPath } from "@/utils";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { UserRole } from "@/lib/types";

// Extract role from pathname
function getRoleFromPath(pathname: string): UserRole {
  if (pathname.startsWith("/admin") || pathname === "/dashboard")
    return "admin";
  if (pathname.startsWith("/teacher")) return "teacher";
  if (pathname.startsWith("/parent")) return "parent";
  if (pathname.startsWith("/student")) return "student";
  if (pathname.startsWith("/canteen")) return "canteen";
  return "admin"; // default
}

// Check if sidebar should be hidden based on URL
function shouldHideSidebar(pathname: string): boolean {
  // Hide sidebar for quiz pages (dynamic route: /student/assignments/[quiz])
  // Pattern: /student/assignments/ followed by a number/ID
  const quizPagePattern = /^\/student\/assignments\/[^/]+$/;
  if (quizPagePattern.test(pathname)) {
    return true;
  }
  // Add more conditions here for other pages that need sidebar hidden
  // Example: if (pathname.includes("/fullscreen")) return true;
  return false;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const role = getRoleFromPath(pathname);
  const hideSidebar = shouldHideSidebar(pathname);

  const path = matchMenuItemByPath(pathname, role);

  return (
    <div className="flex space-x-4 h-screen overflow-hidden py-2 pl-2 bg-main-bg">
      {!hideSidebar && <Sidebar role={role} />}
      <div className="flex-1 flex flex-col overflow-y-scroll scrollbar-width">
        <Header metaData={path} />
        <main className="flex-1 bg-main-bg py-4">{children}</main>
      </div>
    </div>
  );
}
