"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import {
  CalendarContainer,
  EventsSidebar,
  CreateEventModal,
} from "@/components/dashboard-pages/admin/calendar/components";
import { Icon } from "@/components/general/huge-icon";
import { AddSquareIcon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  color: "blue" | "purple" | "red" | "green" | "yellow";
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  color: "blue" | "orange" | "red" | "purple";
}

type CalendarView = "day" | "week" | "month";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 22)); // October 22, 2025
  const [view, setView] = useState<CalendarView>("month");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calendar events for custom calendar
  const calendarEvents: CalendarEvent[] = [
    {
      id: "1",
      title: "Independence Day",
      date: new Date(2025, 9, 1), // October 1
      color: "green",
    },
    {
      id: "2",
      title: "Public Holiday",
      date: new Date(2025, 9, 1),
      color: "yellow",
    },
    {
      id: "3",
      title: "Election Manifestos",
      date: new Date(2025, 9, 22), // October 22
      color: "blue",
    },
    {
      id: "4",
      title: "PTA Meeting",
      date: new Date(2025, 9, 22), // October 22
      color: "purple",
    },
    {
      id: "5",
      title: "Deadline for SS3...",
      date: new Date(2025, 9, 28), // October 28
      color: "red",
    },
    {
      id: "6",
      title: "Annual Inter-Hou...",
      date: new Date(2025, 9, 31), // October 31
      color: "purple",
    },
  ];

  // Events for the sidebar list
  const eventsList: Event[] = [
    {
      id: "1",
      title: "Election Manifestos",
      description: "Today is the D-Day for every of our aspirants.",
      date: new Date(2025, 9, 22),
      time: "12:00 PM - 1:30 PM",
      color: "blue",
    },
    {
      id: "2",
      title: "PTA Meeting",
      description: "New digital learning initiatives. Assembly hall",
      date: new Date(2025, 9, 22),
      time: "3:00 PM - 4:45 PM",
      color: "orange",
    },
    {
      id: "3",
      title: "Deadline for SS3 Graduation Fees",
      description: "Payment window closes for SS3 graduation fees",
      date: new Date(2025, 9, 28),
      time: "12 midnight",
      color: "red",
    },
    {
      id: "4",
      title: "Annual Inter-House Sports Day",
      description: "Physical health day for all students and staffs.",
      date: new Date(2025, 9, 31),
      time: "9:00 AM - 3:00 PM",
      color: "purple",
    },
  ];

  const handleAddEvent = () => {
    setIsModalOpen(true);
  };

  const handleEventSubmit = (eventData: any) => {
    // Handle event creation
    console.log("Event created:", eventData);
    // You can add logic here to add the event to the calendar
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">School Calendar</h2>
        <p className="text-gray-600 mt-1">
          Create/Manage School-wide Notices, Events, and Key Dates.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <CalendarContainer
                events={calendarEvents}
                currentDate={currentDate}
                onDateChange={setCurrentDate}
                view={view}
                onViewChange={setView}
              />
            </CardContent>
          </Card>
        </div>

        {/* Events Sidebar */}
        <div className="lg:col-span-1 space-y-3">
          <Card>
            <CardContent>
              <Button
                variant={"outline"}
                onClick={handleAddEvent}
                className="w-full gap-2"
              >
                <Icon icon={AddSquareIcon} size={18} />
                Add New Event
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <EventsSidebar
                events={eventsList}
                monthName={format(currentDate, "MMMM")}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Create Event Modal */}
      <CreateEventModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleEventSubmit}
      />
    </div>
  );
}
