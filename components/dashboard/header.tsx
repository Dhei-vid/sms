"use client";

import { Search, Grid3x3 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  searchPlaceholder?: string;
  user?: {
    name: string;
    avatar?: string;
  };
}

export function Header({
  title,
  searchPlaceholder = "Search students name/ID, staff name/ID",
  user = { name: "Admin" },
}: HeaderProps) {
  return (
    <header className="grid grid-cols-6 h-13 items-center gap-2 w-full">
      {/* Title */}
      <div className="bg-background h-full rounded-md flex items-center gap-2 px-4">
        <Grid3x3 className="h-5 w-5 text-gray-600" />
        <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
      </div>

      {/* Search Bar */}
      <div className="col-span-4 h-full w-full rounded-md">
        <div className="flex m-auto">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder={searchPlaceholder}
              className={cn("pl-10 h-13 w-full bg-background focus:bg-white")}
            />
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="bg-background rounded-md h-full px-4 flex items-center gap-3">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="h-8 w-8 rounded-full"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-medium">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="text-sm font-medium text-gray-700">{user.name}</span>
      </div>
    </header>
  );
}
