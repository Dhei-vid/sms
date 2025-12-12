"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
    date: "Date: Nov. 14th, 2025; 2:45 PM",
  },
  {
    title: "On the Notice Board",
    description: "School Field Trip Postponed to Fridat",
    date: "Date: Nov. 17th, 2025; 8:00 AM",
  },
];

export function UpcomingEventsCard({
  events = defaultEvents,
}: UpcomingEventsCardProps) {
  return (
    <Card className="bg-gray-50 ">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Upcoming Event
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-0">
        {events.map((event, index) => (
          <div key={index}>
            {index > 0 && <Separator className="my-4" />}
            <div className="flex flex-col gap-1">
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
