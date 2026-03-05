"use client";

import { Icon } from "@/components/general/huge-icon";
import { NotificationsType } from "@/services/notifications/notification-types";
import { cn } from "@/lib/utils";
import { formatDate, isValidDate } from "@/common/helper";

interface StaffActivityItemProps {
  type: NotificationsType;
  title: string;
  description?: string | string[];
  timestamp?: string;
  icon?: any;
}

export function StaffActivityItem({
  type,
  title,
  description,
  timestamp,
  icon,
}: StaffActivityItemProps) {
  const getTypeColor = () => {
    switch (type) {
      case "hired":
        return "text-green-600";
      case "absent":
        return "text-orange-600";
      case "resignation":
        return "text-red-600";
      case "leave":
        return "text-blue-600";
      case "appraisal":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="flex gap-3 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
      {icon && (
        <div className={cn("shrink-0", getTypeColor())}>
          <Icon icon={icon} size={20} />
        </div>
      )}

      <div className="flex-1">
        <p className="text-sm font-medium text-gray-800 mb-1">{title}</p>
        <p className="text-xs text-gray-600 mb-2">{description}</p>
      </div>
      {timestamp && isValidDate(new Date(timestamp)) && (
        <div>
          <p className="text-xs text-gray-500 shrink-0">
            {formatDate(new Date(timestamp))}
          </p>
        </div>
      )}
    </div>
  );
}
