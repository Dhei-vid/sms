"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CalendarView = "day" | "week" | "month";

interface ViewTogglesProps {
  currentView: CalendarView;
  onViewChange: (view: CalendarView) => void;
}

export function ViewToggles({ currentView, onViewChange }: ViewTogglesProps) {
  return (
    <div className="flex border p-1 rounded-md items-center gap-1">
      <Button
        variant={currentView === "day" ? "default" : "outline"}
        size="sm"
        onClick={() => onViewChange("day")}
        className={cn(
          currentView === "day" &&
            "bg-main-blue/5 text-main-blue hover:bg-main-blue/10",
          "border-none",
        )}
      >
        Day
      </Button>
      <Button
        variant={currentView === "week" ? "default" : "outline"}
        size="sm"
        onClick={() => onViewChange("week")}
        className={cn(
          currentView === "week" &&
            "bg-main-blue/5 text-main-blue hover:bg-main-blue/10",
          "border-none",
        )}
      >
        Week
      </Button>
      <Button
        variant={currentView === "month" ? "default" : "outline"}
        size="sm"
        onClick={() => onViewChange("month")}
        className={cn(
          currentView === "month" &&
            "bg-main-blue/5 text-main-blue hover:bg-main-blue/10",
          "border-none",
        )}
      >
        Month
      </Button>
    </div>
  );
}
