"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpRight01Icon,
  ArrowDownLeft01Icon,
} from "@hugeicons/core-free-icons";
import { Icon } from "@/components/general/huge-icon";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down";
  trendColor?: string;
}

export function MetricCard({
  title,
  value,
  subtitle,
  trend,
  trendColor,
}: MetricCardProps) {
  return (
    <Card className="p-0">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <div>
              <p className="text-2xl font-bold text-gray-800 mb-1">{value}</p>
              <p className={cn("text-xs", trendColor || "text-gray-500")}>
                {subtitle}
              </p>
            </div>
          </div>
          {trend && (
            <>
              {trend === "up" ? (
                <div className="relative">
                  <Icon
                    size={25}
                    icon={ArrowUpRight01Icon}
                    className={cn(trendColor || "text-gray-400")}
                  />
                </div>
              ) : (
                <div className="relative">
                  <Icon
                    size={25}
                    icon={ArrowDownLeft01Icon}
                    className={cn(trendColor || "text-gray-400")}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
