"use client";

import { useRouter } from "next/navigation";
import { Search, Menu, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuItem } from "@/lib/types";
import { Icon } from "../general/huge-icon";
import { cn } from "@/lib/utils";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectUser } from "@/store/slices/authSlice";
import { logout } from "@/store/slices/authSlice";

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
  searchPlaceholder = "Search sidebar",
  user: userProp,
  onMenuClick,
  onSidebarToggle,
  sidebarCollapsed = false,
}: HeaderProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(selectUser);

  const user = authUser
    ? {
        name: authUser.first_name + " " + authUser?.last_name,
        avatar: userProp?.avatar,
      }
    : userProp || { name: "Guest" };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/signin");
  };
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
        <div className="bg-background h-9 lg:h-13 rounded-md flex items-center gap-2 px-3 min-w-0 flex-1 lg:flex-none lg:col-span-2">
          {metaData?.icon && (
            <Icon
              icon={metaData.icon}
              size={15}
              className="text-main-blue shrink-0"
            />
          )}
          <div className="flex flex-row flex-wrap gap-1 items-center">
            <h1 className="text-sm font-semibold text-gray-800 line-clamp-1 truncate">
              {metaData?.label || "Dashboard"}
            </h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full lg:w-auto lg:col-span-3 h-13 lg:h-full rounded-md min-w-0 order-last lg:order-0">
          <div className="flex h-full">
            <div className="relative w-full h-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder={searchPlaceholder}
                className={cn(
                  "pl-10 h-full w-full bg-background focus:bg-white text-sm lg:text-base",
                )}
              />
            </div>
          </div>
        </div>

        {/* User Info with Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="bg-background rounded-md h-9 lg:h-full px-3 lg:px-4 flex items-center gap-2 lg:gap-3 shrink-0 ml-auto lg:ml-0 lg:col-span-1 cursor-pointer hover:bg-accent transition-colors">
              {user.avatar ? (
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="h-7 w-7 lg:h-8 lg:w-8 rounded-full shrink-0"
                />
              ) : (
                <div className="h-7 w-7 lg:h-8 lg:w-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xs lg:text-sm font-medium shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="text-xs lg:text-sm font-medium text-gray-700 truncate">
                {user.name}
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 focus:text-red-600 cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
