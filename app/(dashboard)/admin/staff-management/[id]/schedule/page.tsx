"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScheduleGrid } from "@/components/dashboard-pages/admin/staff/components/schedule-grid/schedule-grid";
import { StaffEventSidebar } from "@/components/dashboard-pages/admin/staff/components/staff-event/staff-event-sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/general/huge-icon";
import { AddSquareIcon } from "@hugeicons/core-free-icons";

interface ScheduleEvent {
  id: string;
  title: string;
  day: Date;
  period: number;
  color: "blue" | "green" | "red" | "yellow";
}

export default function SchedulePage({
  searchParams,
}: {
  searchParams?: { id?: string; name?: string };
}) {
  const staffName = searchParams?.name || "Mr. Chinedu Okafor";

  const [currentWeek, setCurrentWeek] = useState(new Date(2025, 9, 22)); // October 22, 2025

  // Schedule events for the week
  const scheduleEvents: ScheduleEvent[] = [
    {
      id: "1",
      title: "JSS2 Math",
      day: new Date(2025, 9, 27), // Monday
      period: 1,
      color: "blue",
    },
    {
      id: "2",
      title: "JSS2 Math",
      day: new Date(2025, 9, 27), // Monday
      period: 3,
      color: "blue",
    },
    {
      id: "3",
      title: "SS2 Calculus",
      day: new Date(2025, 9, 27), // Monday
      period: 4,
      color: "green",
    },
    {
      id: "4",
      title: "JSS2 Math",
      day: new Date(2025, 9, 28), // Tuesday
      period: 1,
      color: "blue",
    },
    {
      id: "5",
      title: "JSS2 Math",
      day: new Date(2025, 9, 28), // Tuesday
      period: 5,
      color: "blue",
    },
    {
      id: "6",
      title: "SS2 Calculus",
      day: new Date(2025, 9, 28), // Tuesday
      period: 4,
      color: "green",
    },
  ];

  const officialAssignments = {
    header: "Official Assignment",
    content: [
      {
        title: "Duty/Role",
        description: "House Master (Blue House)",
      },
      {
        title: "Team/Duration",
        description: "2025/2026 Academic year",
      },
      {
        title: "Supervisor",
        description: "Mr. Adekola (VP Student Affairs)",
      },
      {
        title: "Resources Assigned",
        description: "Access to Staff Room A Key",
      },
    ],
  };

  const resourceAllocation = {
    header: "Resource Allocation Summary",
    content: [
      {
        title: "Office/Desk",
        description: "Room A-101",
      },
      {
        title: "School Laptop",
        description: "Serial: XZY-789",
      },
      {
        title: "Locker Key",
        description: "Key 14A",
      },
    ],
  };

  const handleWeekSelect = (value: string) => {
    if (value === "current") {
      setCurrentWeek(new Date());
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Schedule & Assignments: {staffName}
        </h2>
        <p className="text-gray-600 mt-1">
          View the complete teaching load and official duty roster for this
          employee.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schedule Grid */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="space-y-6">
              <div className="flex flex-row items-start justify-between">
                <div>
                  <span className="text-sm font-semibold text-gray-700">
                    Workload KPI:{" "}
                  </span>
                  <span className="text-sm text-gray-600">12 Period/Week</span>
                </div>

                <Select value="current" onValueChange={handleWeekSelect}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Current Week</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <ScheduleGrid
                events={scheduleEvents}
                currentWeek={currentWeek}
                onWeekChange={setCurrentWeek}
              />
            </CardContent>
          </Card>
        </div>

        {/* Assignments Sidebar */}
        <div className="lg:col-span-1">
          {/* Events Sidebar */}
          <div className="lg:col-span-1 space-y-3">
            <Card>
              <CardContent>
                <Button
                  variant={"outline"}
                  onClick={() => {}}
                  className="w-full gap-2"
                >
                  <Icon icon={AddSquareIcon} size={18} />
                  Log New Resources
                </Button>
              </CardContent>
            </Card>

            {/* official Assignment Card */}
            <StaffEventSidebar {...officialAssignments} />

            {/* Resouce allocation summary Card */}
            <StaffEventSidebar {...resourceAllocation} />
          </div>
        </div>
      </div>
    </div>
  );
}
