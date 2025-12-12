import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpRight01Icon,
  ArrowDownLeft01Icon,
} from "@hugeicons/core-free-icons";
import { Icon } from "@/components/general/huge-icon";
import { cn } from "@/lib/utils";
import { formattedAmount } from "@/common/helper";

interface FinancialMetricCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  currency?: boolean;
  trend?: "up" | "down";
  trendColor?: string;
  arrowColor?: string;
}

export function FinancialMetricCard({
  title,
  value,
  subtitle,
  currency,
  trend,
  trendColor,
  arrowColor,
}: FinancialMetricCardProps) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-4 w-full">
            <p className="text-sm text-gray-600 mb-1">{title}</p>

            <div>
              <p className="text-2xl font-bold text-gray-800 mb-1">
                {currency ? formattedAmount(Number(value)) : value}
              </p>
              <p className={cn("text-xs", trendColor || "text-gray-500")}>
                {subtitle}
              </p>
            </div>
          </div>
          <div className="relative">
            {trend && (
              <>
                {trend === "up" ? (
                  <div className="relative">
                    <Icon
                      size={25}
                      icon={ArrowUpRight01Icon}
                      className={cn(arrowColor || "text-main-blue")}
                    />
                  </div>
                ) : (
                  <div className="relative">
                    <Icon
                      size={25}
                      icon={ArrowDownLeft01Icon}
                      className={cn(arrowColor || "text-main-blue")}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
