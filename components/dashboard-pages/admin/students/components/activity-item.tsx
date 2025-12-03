"use client";

import { Icon } from "@/components/general/huge-icon";
import { cn } from "@/lib/utils";

interface ActivityItemProps {
  type: "withdrawn" | "registered" | "attendance" | "grade";
  title: string;
  description: string;
  timestamp: string;
  icon: any;
}

export function ActivityItem({
  type,
  title,
  description,
  timestamp,
  icon,
}: ActivityItemProps) {
  const getTypeColor = () => {
    switch (type) {
      case "withdrawn":
        return "text-red-600";
      case "registered":
        return "text-purple-600";
      case "attendance":
        return "text-red-600";
      case "grade":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="flex gap-3 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
      <div className={cn("shrink-0", getTypeColor())}>
        <Icon icon={icon} size={20} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-800 mb-1">{title}</p>
        <p className="text-xs text-gray-600 mb-2">{description}</p>
      </div>
      <div>
        <p className="text-xs text-gray-500">{timestamp}</p>
      </div>
    </div>
  );
}
