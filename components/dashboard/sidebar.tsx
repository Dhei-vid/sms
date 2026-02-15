"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { menuItems } from "@/common/menu-items";
import { getRolePath } from "@/utils/menu-utils";
import { UserRole } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useUnreadNoticeCount } from "@/hooks/use-unread-notice-count";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Icon } from "../general/huge-icon";
import { Button } from "../ui/button";

interface SidebarProps {
  role: UserRole;
  onClose?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function Sidebar({
  role,
  onClose,
  collapsed = false,
  onToggleCollapse,
}: SidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const unreadNoticeCount = useUnreadNoticeCount();

  // Filter navigation items by role - same pattern as the example
  const filteredNavItems = menuItems.filter((item) =>
    item.roles.includes(role),
  );

  // Helper function to check if a nav item is active
  const isActiveRoute = (itemHref: string) => {
    // Exact match for dashboard
    if (itemHref === "/dashboard") {
      return pathname === itemHref || pathname === `${itemHref}/`;
    }
    // For other routes, check if pathname starts with the item href
    // This handles dynamic routes like /admin/students/[id]
    return pathname.startsWith(itemHref);
  };

  // Get role-specific path for href using utility function
  const getRoleSpecificPath = (basePath: string) => {
    return getRolePath(role, basePath);
  };

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  return (
    <div className="flex flex-col space-y-4 h-full rounded-md">
      {/* Logo & Toggle */}
      <div className="rounded-md flex items-center justify-between gap-3 p-4 lg:p-6 border-b border-border h-13 bg-background">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 transition-opacity",
            collapsed && "justify-center",
          )}
          onClick={onClose}
        >
          <Image
            className="w-7 h-7 shrink-0"
            src={"/logo/sms_icon_blue.png"}
            alt={"logo"}
            width={40}
            height={40}
          />
          {!collapsed && (
            <span className="font-bold text-lg whitespace-nowrap">PH-SMS</span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-width bg-background rounded-md">
        <div className="p-4 space-y-2">
          {filteredNavItems.map((item, index) => {
            const rolePath = getRoleSpecificPath(item.href);
            const hasChildren = item.children && item.children.length > 0;
            const filteredChildren = hasChildren
              ? item.children!.filter((child) => child.roles.includes(role))
              : [];
            const isExpanded = expandedItems.includes(item.id);
            const active = isActiveRoute(rolePath);

            return (
              <div key={index}>
                {item.id === "separator" ? (
                  <Separator orientation="horizontal" />
                ) : hasChildren ? (
                  <>
                    <button
                      onClick={() => toggleExpanded(item.id)}
                      className={cn(
                        "cursor-pointer group w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                        active
                          ? "bg-main-blue/10 text-main-blue"
                          : "text-muted-foreground",
                        collapsed && "justify-center",
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {item.icon && (
                          <Icon
                            icon={item.icon}
                            size={18}
                            className="shrink-0"
                          />
                        )}
                        {!collapsed && (
                          <>
                            <span className="truncate">{item.label}</span>
                            {item.badge && (
                              <span
                                className={cn(
                                  "px-2 py-0.5 text-xs font-medium rounded-full shrink-0",
                                  active
                                    ? "bg-primary-foreground/20 text-primary-foreground"
                                    : "bg-muted text-muted-foreground",
                                )}
                              >
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}
                      </div>
                      {!collapsed && (
                        <ChevronRight
                          className={cn(
                            "h-4 w-4 transition-transform text-muted-foreground shrink-0",
                            isExpanded && "rotate-90",
                          )}
                        />
                      )}
                    </button>
                    {!collapsed &&
                      isExpanded &&
                      filteredChildren.length > 0 && (
                        <div className="ml-6 mt-1 space-y-2">
                          {filteredChildren.map((child) => {
                            const childPath = getRoleSpecificPath(child.href);
                            const childActive = isActiveRoute(childPath);
                            return (
                              <Link
                                key={child.id}
                                href={childPath}
                                onClick={onClose}
                                className={cn(
                                  "group flex items-center gap-3 px-3 py-2 rounded-lg text-xs lg:text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                                  childActive
                                    ? "bg-main-blue/10 text-main-blue"
                                    : "text-muted-foreground",
                                )}
                              >
                                {child.icon && (
                                  <Icon icon={child.icon} size={18} />
                                )}
                                {child.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                  </>
                ) : (
                  <Link
                    href={rolePath}
                    onClick={onClose}
                    className={cn(
                      "group flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                      active
                        ? "bg-main-blue/10 text-main-blue"
                        : "text-muted-foreground",
                      collapsed && "justify-center",
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    {item.icon && (
                      <Icon icon={item.icon} size={18} className="shrink-0" />
                    )}
                    {!collapsed && (
                      <>
                        <span className="truncate">{item.label}</span>
                        {(item.id === "notice-board"
                          ? unreadNoticeCount > 0
                          : item.badge) && (
                          <span
                            className={cn(
                              "ml-auto px-2 py-0.5 text-xs font-medium rounded-full shrink-0",
                              active
                                ? "bg-muted text-muted-foreground"
                                : "bg-muted text-muted-foreground",
                            )}
                          >
                            {item.id === "notice-board"
                              ? unreadNoticeCount
                              : item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Help & Support */}
      {role === "admin" && !collapsed && (
        <div className="p-4 space-y-4 bg-background rounded-md">
          {/* Header */}
          <div className="space-y-3">
            <div className="flex flex-row gap-2 items-center">
              <div className="w-fit rounded-full bg-main-blue p-2">
                <Image
                  className={"w-5 h-5"}
                  src={"/logo/sms_icon_white.png"}
                  alt={"SMS_logo"}
                  width={30}
                  height={30}
                />
              </div>
              <p className="font-semibold text-xl">Upgrade Pro!</p>
            </div>

            {/* Pro message */}
            <div>
              <p className="text-sm text-gray-500">
                Upgrade to Pro and elevate your experience today
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="grid grid-cols-2 space-x-2">
            <Button>Upgrade</Button>
            <Button variant={"outline"}>Learn More</Button>
          </div>
        </div>
      )}
    </div>
  );
}
