"use client";

import { Icon } from "@/components/general/huge-icon";
import { cn } from "@/lib/utils";

interface QuickActionCardProps {
  title: string;
  icon: any;
  description?: string;
  onClick?: () => void;
  className?: string;
  textColor?: string;
}

export function QuickActionCard({
  title,
  description,
  icon,
  onClick,
  className,
  textColor,
}: QuickActionCardProps) {
  return (
    <div
      className={cn(
        "cursor-pointer hover:bg-main-blue/5 transition-shadow",
        className
      )}
      onClick={onClick}
    >
      <div className="px-6 py-4">
        <div className="flex items-start gap-3">
          <div className={cn(textColor, "flex items-start")}>
            <Icon icon={icon} size={18} />
          </div>
          <div className="flex-1">
            <h3
              className={cn(
                textColor ? textColor : "text-gray-800",
                "text-sm font-semibold"
              )}
            >
              {title}
            </h3>
            <p className="text-xs text-gray-600">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
