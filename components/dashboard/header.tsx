"use client";

import { Search, Menu, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MenuItem } from "@/lib/types";
import { Icon } from "../general/huge-icon";
import { cn } from "@/lib/utils";

interface HeaderProps {
  metaData?: MenuItem | null;
  searchPlaceholder?: string;
  user?: {
    name: string;
    avatar?: string;
  };
  onMenuClick?: () => void;
  onSidebarToggle?: () => void;
  sidebarCollapsed?: boolean;
}

export function Header({
  metaData,
  searchPlaceholder = "Search students name/ID, staff name/ID",
  user = { name: "Admin" },
  onMenuClick,
  onSidebarToggle,
  sidebarCollapsed = false,
}: HeaderProps) {
  return (
    <header className="max-h-32 lg:h-13 items-center gap-2 w-full p-2 lg:p-0">
      <div className="flex flex-wrap lg:grid lg:grid-cols-6 items-center gap-2 w-full">
        {/* Mobile Menu Button */}
        <div className="bg-background rounded-sm lg:hidden flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 shrink-0"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </div>

        {/* Title */}
        <div className="bg-background h-9 lg:h-13 rounded-md flex items-center gap-2 px-3 lg:px-4 min-w-0 flex-1 lg:flex-none lg:col-span-1">
          {metaData?.icon && (
            <Icon
              icon={metaData.icon}
              size={18}
              className="text-main-blue shrink-0"
            />
          )}
          <h1 className="text-sm lg:text-base font-semibold text-gray-800 line-clamp-1 truncate min-w-0">
            {metaData?.label || "Dashboard"}
          </h1>
        </div>

        {/* Search Bar */}
        <div className="w-full lg:w-auto lg:col-span-4 h-13 lg:h-full rounded-md min-w-0 order-last lg:order-none">
          <div className="flex h-full">
            <div className="relative w-full h-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder={searchPlaceholder}
                className={cn(
                  "pl-10 h-full w-full bg-background focus:bg-white text-sm lg:text-base"
                )}
              />
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="bg-background rounded-md h-9 lg:h-full px-3 lg:px-4 flex items-center gap-2 lg:gap-3 shrink-0 ml-auto lg:ml-0 lg:col-span-1">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-7 w-7 lg:h-8 lg:w-8 rounded-full shrink-0"
            />
          ) : (
            <div className="h-7 w-7 lg:h-8 lg:w-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs lg:text-sm font-medium shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="text-xs lg:text-sm font-medium text-gray-700 truncate">
            {user.name}
          </span>
        </div>
      </div>
    </header>
  );
}
