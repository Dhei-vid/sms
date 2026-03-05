"use client";

import Image from "next/image";
import { format, parseISO } from "date-fns";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getSchoolSubscriptionDisplay } from "../school-detail-types";
import type { School } from "@/services/schools/schools-type";
import { cn } from "@/lib/utils";

function formatTierLabel(planName: string): string {
  if (!planName || planName === "—") return "—";
  const capped =
    String(planName).charAt(0).toUpperCase() + String(planName).slice(1);
  return `${capped} Subscriber`;
}

interface SchoolDetailHeaderProps {
  school: School;
}

export function SchoolDetailHeader({ school }: SchoolDetailHeaderProps) {
  const sub = getSchoolSubscriptionDisplay(school);
  const status = school.is_active ? "Active" : "Inactive";
  const tierLabel = formatTierLabel(sub.planName);

  return (
    <Card className="p-4 flex flex-row flex-wrap items-center gap-4">
      <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-muted overflow-hidden shrink-0">
        {school.logo?.image_url ? (
          <Image
            src={school.logo.image_url}
            alt=""
            width={56}
            height={56}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-xs font-medium text-muted-foreground">
            {(school.name ?? "?").slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-xl font-bold text-gray-900 truncate">
            {school.name ?? "—"}
          </h1>
          <Badge
            variant={school.is_active ? "default" : "secondary"}
            className={cn(
              school.is_active &&
                "bg-emerald-500 hover:bg-emerald-500 text-white border-0",
            )}
          >
            {status}
          </Badge>
          {tierLabel !== "—" && (
            <Badge className="bg-main-blue/20 text-main-blue border-0">
              {tierLabel}
            </Badge>
          )}
        </div>
        {sub.endDate && (
          <p className="text-sm text-muted-foreground mt-0.5">
            Subscription: Expires {format(parseISO(sub.endDate), "yyyy-MM-dd")}
          </p>
        )}
      </div>
    </Card>
  );
}
