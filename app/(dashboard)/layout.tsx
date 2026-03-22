"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { matchMenuItemByPath } from "@/utils";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { UserRole } from "@/lib/types";
import { AuthUser } from "@/services/auth/auth";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { store } from "@/store";
import {
  selectIsAuthenticated,
  selectUser,
  rehydrateAuth,
} from "@/store/slices/authSlice";

function getRoleFromPath(pathname: string): UserRole {
  if (pathname.startsWith("/admin") || pathname === "/dashboard")
    return "admin";
  if (pathname.startsWith("/teacher")) return "teacher";
  if (pathname.startsWith("/parent")) return "parent";
  if (pathname.startsWith("/student")) return "student";
  if (pathname.startsWith("/canteen")) return "canteen";
  return "admin";
}

// Users with "admin" permission → admin UI
function getEffectiveRole(user: AuthUser | null, pathRole: UserRole): UserRole {
  if (!user) return pathRole;
  const permissions = user.permissions as string[];
  if (Array.isArray(permissions) && permissions.includes("admin"))
    return "admin";
  return user.role;
}

function shouldHideSidebar(pathname: string): boolean {
  const quizPagePattern = /^\/student\/(quiz|assignments)\/[^/]+$/;
  if (quizPagePattern.test(pathname)) {
    return true;
  }
  return false;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(rehydrateAuth());
    const { isAuthenticated: auth } = store.getState().auth;
    if (!auth && !pathname.includes("/signin")) {
      router.push("/signin");
    }
  }, [dispatch, pathname, router]);

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const authUser = useAppSelector(selectUser);

  const roleFromPath = getRoleFromPath(pathname);
  const role = getEffectiveRole(authUser, roleFromPath);

  const hideSidebar = shouldHideSidebar(pathname);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const path = matchMenuItemByPath(pathname, role);

  useEffect(() => {
    if (typeof window === "undefined" || pathname.includes("/signin")) return;
    const { isAuthenticated: auth } = store.getState().auth;
    if (!auth) {
      router.push("/signin");
    }
  }, [isAuthenticated, router, pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      } else {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-main-bg">
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

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <div className="p-2">
          <Header
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
