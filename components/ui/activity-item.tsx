"use client";

import { Icon } from "@/components/general/huge-icon";
import { cn } from "@/lib/utils";

export interface ActivityItemProps {
  icon: any;
  iconColor: string;
  title: string;
  description: string;
  time: string;
  iconBg?: boolean;
}

export function ActivityItem({
  icon: IconComponent,
  iconColor,
  title,
  description,
  time,
  iconBg = false,
}: ActivityItemProps) {
  const bgColor = iconColor.includes("green")
    ? "bg-green-100"
    : iconColor.includes("red")
    ? "bg-red-100"
    : iconColor.includes("blue-400")
    ? "bg-blue-100"
    : iconColor.includes("blue")
    ? "bg-blue-100"
    : iconColor.includes("orange")
    ? "bg-orange-100"
    : "bg-gray-100";

  return (
    <div className="flex gap-3 p-4">
      <div
        className={cn(
          "rounded-full flex items-center justify-center shrink-0",
          iconBg && `${bgColor} h-6 w-6`
        )}
      >
        <Icon icon={IconComponent} size={18} className={iconColor} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="text-sm font-medium text-gray-800">{title}</p>
          <span className="text-xs text-gray-500 shrink-0">{time}</span>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
