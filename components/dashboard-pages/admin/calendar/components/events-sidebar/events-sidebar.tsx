"use client";

import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Event {
  id: string;
  title: string;
  description: string;
  date?: Date;
  time?: string;
  color: "blue" | "orange" | "red" | "purple";
}

interface EventsSidebarProps {
  events: Event[];
  monthName?: string;
}

const colorClasses = {
  blue: "bg-main-blue",
  orange: "bg-orange-500",
  red: "bg-red-500",
  purple: "bg-purple-500",
};
const bordercolorClasses = {
  blue: "border-main-blue",
  orange: "border-orange-500",
  red: "border-red-500",
  purple: "border-purple-500",
};

export function EventsSidebar({
  events,
  monthName = "October",
}: EventsSidebarProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {monthName && (
          <h3 className="text-lg font-semibold text-gray-800">
            {monthName} Events
          </h3>
        )}

        <div className="space-y-5">
          {events.map((event) => (
            <div
              key={event.id}
              className={cn(
                bordercolorClasses[event.color],
                "space-y-2 border-t p-2 rounded-md",
              )}
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-1">
                    {event.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {event.description}
                  </p>
                  {(event?.date || event?.time) && (
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      {event.date && (
                        <span>Date: {format(event.date, "MMMM d, yyyy")}</span>
                      )}
                      <div className="flex flex-row gap-2 items-center">
                        <div
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            colorClasses[event.color]
                          }`}
                        />
                        <span>Time: {event.time}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
