"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Event {
  title: string;
  description: string;
  date: string;
}

interface UpcomingEventsCardProps {
  events?: Event[];
}

const defaultEvents: Event[] = [
  {
    title: "Mathematics Quiz",
    description: "Algebra Review Quiz",
    date: "Nov. 14th, 2025; 2:45 PM",
  },
  {
    title: "Science Project Submission",
    description: "Unit 4: Photosynthesis Project Submission",
    date: "Nov. 17th, 2025",
  },
];

export function UpcomingEventsCard({
  events = defaultEvents,
}: UpcomingEventsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Upcoming Event
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="h-2 w-2 rounded-full bg-gray-400 mt-2 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{event.title}</p>
              <p className="text-xs text-gray-600">{event.description}</p>
              <p className="text-xs text-gray-500 mt-1">{event.date}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
