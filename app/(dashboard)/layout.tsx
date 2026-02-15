"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { matchMenuItemByPath } from "@/utils";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { UserRole } from "@/lib/types";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { store } from "@/store";
import {
  selectIsAuthenticated,
  selectUser,
  rehydrateAuth,
} from "@/store/slices/authSlice";

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
  // Hide sidebar for quiz pages (CBT: /student/quiz/[id], assignments: /student/assignments/[id])
  const quizPagePattern = /^\/student\/(quiz|assignments)\/[^/]+$/;
  if (quizPagePattern.test(pathname)) {
    return true;
  }
  // Add more conditions here for other pages that need sidebar hidden
  // Example: if (pathname.includes("/fullscreen")) return true;
  return false;
}

/**
 * Dashboard Layout Component
 * Main layout wrapper for all dashboard pages
 * Handles authentication, sidebar, and responsive navigation
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Restore auth from localStorage after mount (avoids hydration mismatch)
  // Redirect to signin if still not authenticated after rehydration (e.g. refresh on /student/dashboard)
  useEffect(() => {
    dispatch(rehydrateAuth());
    const { isAuthenticated: auth } = store.getState().auth;
    if (!auth && !pathname.includes("/signin")) {
      router.push("/signin");
    }
  }, [dispatch, pathname, router]);

  // Get authentication state from Redux
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const authUser = useAppSelector(selectUser);

  // Determine role from pathname or authenticated user
  const roleFromPath = getRoleFromPath(pathname);
  const role = authUser?.role || roleFromPath;

  const hideSidebar = shouldHideSidebar(pathname);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const path = matchMenuItemByPath(pathname, role);

  // Redirect to login if user is not authenticated (read from store to avoid
  // race on hard refresh: rehydrateAuth runs first, but isAuthenticated from
  // closure would still be false from initial render)
  useEffect(() => {
    if (typeof window === "undefined" || pathname.includes("/signin")) return;
    const { isAuthenticated: auth } = store.getState().auth;
    if (!auth) {
      router.push("/signin");
    }
  }, [isAuthenticated, router, pathname]);

  // Handle window resize to manage sidebar state
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // Desktop: restore sidebar if it was collapsed
        setMobileMenuOpen(false);
      } else {
        // Mobile: close mobile menu on resize
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-main-bg">
      {/* Desktop Sidebar */}
      {!hideSidebar && (
        <>
          <aside
            className={cn(
              "hidden lg:flex flex-col transition-all duration-300 ease-in-out shrink-0",
              sidebarCollapsed ? "w-16" : "w-sm",
            )}
          >
            <div className="h-full p-2">
              <Sidebar
                role={role}
                collapsed={sidebarCollapsed}
                onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
              />
            </div>
          </aside>

          {/* Mobile Sidebar Sheet */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetContent side="left" className="w-64 p-0 sm:max-w-sm">
              <Sidebar
                role={role}
                collapsed={false}
                onClose={() => setMobileMenuOpen(false)}
              />
            </SheetContent>
          </Sheet>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <div className="p-2">
          <Header
            // user={authUser}
            metaData={path}
            onMenuClick={() => setMobileMenuOpen(true)}
            onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            sidebarCollapsed={sidebarCollapsed}
          />
        </div>
        <main className="flex-1 overflow-y-auto scrollbar-width bg-main-bg p-2">
          {children}
        </main>
      </div>
    </div>
  );
}
