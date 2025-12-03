"use client";

import { addMonths, subMonths } from "date-fns";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/general/huge-icon";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";

interface CalendarNavigationProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

export function CalendarNavigation({
  currentDate,
  onDateChange,
}: CalendarNavigationProps) {
  const navigateMonth = (direction: "prev" | "next") => {
    if (direction === "prev") {
      onDateChange(subMonths(currentDate, 1));
    } else {
      onDateChange(addMonths(currentDate, 1));
    }
  };

  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        size="icon"
        onClick={() => navigateMonth("prev")}
        className="h-8 w-8"
      >
        <Icon icon={ArrowLeft01Icon} size={16} />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => navigateMonth("next")}
        className="h-8 w-8"
      >
        <Icon icon={ArrowRight01Icon} size={16} />
      </Button>
    </div>
  );
}
