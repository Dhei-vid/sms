"use client";

import { usePathname } from "next/navigation";
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const role = getRoleFromPath(pathname);

  return (
    <div className="flex space-x-4 h-screen overflow-hidden p-2 bg-main-bg">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col overflow-y-scroll scrollbar-width">
        <Header title="Dashboard" />
        <main className="flex-1 bg-main-bg py-4">{children}</main>
      </div>
    </div>
  );
}
