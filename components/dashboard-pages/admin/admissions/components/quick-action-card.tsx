"use client";

import { Icon } from "@/components/general/huge-icon";
import { cn } from "@/lib/utils";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: any;
  onClick?: () => void;
  className?: string;
}

export function QuickActionCard({
  title,
  description,
  icon,
  onClick,
  className,
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
          <div className="flex items-start">
            <Icon icon={icon} size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
