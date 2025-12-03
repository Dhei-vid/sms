"use client";

import { CalendarGrid } from "../calendar-grid/calendar-grid";
import { CalendarNavigation } from "../calendar-navigation/calendar-navigation";
import { ViewToggles } from "../view-toggles/view-toggles";
import { format } from "date-fns";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  color: "blue" | "purple" | "red" | "green" | "yellow";
}

type CalendarView = "day" | "week" | "month";

interface CalendarContainerProps {
  events: CalendarEvent[];
  currentDate: Date;
  onDateChange: (date: Date) => void;
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
}

export function CalendarContainer({
  events,
  currentDate,
  onDateChange,
  view,
  onViewChange,
}: CalendarContainerProps) {
  return (
    <div className="space-y-4">
      {/* Header: View Toggles on left, Navigation (arrows + date) centered */}
      <div className="flex items-center justify-between w-full relative">
        {/* Toggle */}
        <ViewToggles currentView={view} onViewChange={onViewChange} />

        {/* Date */}
        <span className="text-lg font-semibold text-gray-800 min-w-[140px] text-center">
          {format(currentDate, "MMMM yyyy")}
        </span>

        {/* Calendar arrows */}
        <CalendarNavigation
          currentDate={currentDate}
          onDateChange={onDateChange}
        />
      </div>

      {/* Calendar Grid */}
      {view === "month" && (
        <CalendarGrid
          events={events}
          currentDate={currentDate}
          onDateChange={onDateChange}
        />
      )}
    </div>
  );
}
