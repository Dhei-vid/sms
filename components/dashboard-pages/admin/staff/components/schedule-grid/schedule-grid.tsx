"use client";

import { useState } from "react";
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameDay,
  addWeeks,
  subWeeks,
} from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/general/huge-icon";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";

interface ScheduleEvent {
  id: string;
  title: string;
  day: Date;
  period: number;
  color: "blue" | "green" | "red" | "yellow";
}

interface ScheduleGridProps {
  events: ScheduleEvent[];
  currentWeek: Date;
  onWeekChange: (week: Date) => void;
}

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = [
  { time: "8:00 AM", period: 1 },
  { time: "", period: 2 },
  { time: "", period: 3 },
  { time: "", period: 4 },
  { time: "", period: 5 },
];

const colorClasses = {
  blue: "bg-blue-50 border-l-2 border-blue-600 text-blue-700",
  green: "bg-green-50 border-l-2 border-green-600 text-green-700",
  red: "bg-red-50 border-l-2 border-red-600 text-red-700",
  yellow: "bg-yellow-50 border-l-2 border-yellow-600 text-yellow-700",
};

export function ScheduleGrid({
  events,
  currentWeek,
  onWeekChange,
}: ScheduleGridProps) {
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({
    start: weekStart,
    end: weekEnd,
  }).slice(0, 5); // Only Monday to Friday

  const today = new Date();

  const getEventsForDayAndPeriod = (day: Date, period: number) => {
    return events.filter(
      (event) => isSameDay(event.day, day) && event.period === period,
    );
  };

  const handlePreviousWeek = () => {
    onWeekChange(subWeeks(currentWeek, 1));
  };

  const handleNextWeek = () => {
    onWeekChange(addWeeks(currentWeek, 1));
  };

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      {/* Header with Week Navigation */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePreviousWeek}
            className="h-8 w-8"
          >
            <Icon icon={ArrowLeft01Icon} size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextWeek}
            className="h-8 w-8"
          >
            <Icon icon={ArrowRight01Icon} size={16} />
          </Button>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Days Header */}
          <div className="grid grid-cols-6 border-b">
            <div className="p-3 text-center text-sm font-semibold text-gray-700 bg-gray-50 border-r">
              Time
            </div>
            {weekDays.map((day) => {
              const isToday = isSameDay(day, today);
              return (
                <div
                  key={day.toString()}
                  className={cn(
                    "p-3 text-center text-sm font-semibold border-r",
                    isToday
                      ? "bg-red-50 text-red-700"
                      : "bg-gray-50 text-gray-700",
                  )}
                >
                  <div>{format(day, "EEE")}</div>
                  <div className="text-xs font-normal mt-1">
                    {format(day, "d")}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Time Slots and Events */}
          {timeSlots.map((slot, slotIndex) => (
            <div key={slotIndex} className="grid grid-cols-6">
              {/* Time Column */}
              <div className="p-3 text-sm text-gray-600 border-r border-b bg-gray-50">
                {slot.time || `Period ${slot.period}`}
              </div>
              {/* Day Columns */}
              {weekDays.map((day, dayIndex) => {
                const dayEvents = getEventsForDayAndPeriod(day, slot.period);
                const isToday = isSameDay(day, today);
                return (
                  <div
                    key={`${dayIndex}-${slotIndex}`}
                    className={cn(
                      "min-h-[80px] border-r border-b p-2",
                      isToday && "bg-red-50",
                    )}
                  >
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className={cn(
                          "text-xs px-2 py-1 rounded mb-1 truncate",
                          colorClasses[event.color],
                        )}
                        title={event.title}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
