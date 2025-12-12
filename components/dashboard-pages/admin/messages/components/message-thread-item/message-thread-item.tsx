"use client";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/general/huge-icon";
import { Building01Icon, SharedDriveIcon } from "@hugeicons/core-free-icons";
import Image from "next/image";

interface MessageThreadItemProps {
  id: string;
  name: string;
  description: string;
  lastMessage?: string;
  timestamp?: string;
  unreadCount?: number;
  avatar?: string;
  icon?: any;
  isSelected?: boolean;
  onClick?: () => void;
}

export function MessageThreadItem({
  id,
  name,
  description,
  lastMessage,
  timestamp,
  unreadCount,
  avatar,
  icon,
  isSelected = false,
  onClick,
}: MessageThreadItemProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "cursor-pointer flex items-center gap-2 p-3 rounded-lg transition-colors hover:bg-main-blue/5 hover:text-main-blue",
        isSelected && "bg-main-blue/5 text-main-blue"
      )}
    >
      <div className="flex gap-2 items-start w-full">
        {/* Avatar or Icon */}
        {avatar ? (
          <div className="relative h-12 w-12 rounded-full overflow-hidden shrink-0">
            <Image
              src={avatar}
              alt={name}
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
        ) : icon ? (
          <div className="rounded-md flex items-start shrink-0">
            <Icon icon={icon} size={24} className="text-main-blue" />
          </div>
        ) : (
          <div className="rounded-full bg-purple-100 flex items-center justify-center shrink-0">
            <Icon icon={SharedDriveIcon} size={24} className="text-main-blue" />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-sm font-semibold text-gray-800 truncate">
              {name}
            </h3>
          </div>
          <p className="text-xs text-gray-600 line-clamp-1">{description}</p>
          {lastMessage && (
            <p className="text-sm text-gray-500 line-clamp-1">{lastMessage}</p>
          )}
        </div>

        <div>
          {timestamp && (
            <span className="text-xs text-gray-500 shrink-0">{timestamp}</span>
          )}

          {/* Unread Badge */}
          {unreadCount && unreadCount > 0 && (
            <div className="place-self-end">
              <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-main-blue text-white text-xs font-medium">
                {unreadCount}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
