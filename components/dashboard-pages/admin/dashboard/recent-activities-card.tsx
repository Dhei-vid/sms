"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/general/huge-icon";
import {
  Configuration02Icon,
  ConstellationIcon,
  CheckmarkCircle03Icon,
} from "@hugeicons/core-free-icons";

interface Activity {
  title: string;
  time: string;
  description: string;
  icon?: any;
  iconColor?: string;
  iconBgColor?: string;
}

interface RecentActivitiesCardProps {
  activities?: Activity[];
}

const defaultActivities: Activity[] = [
  {
    title: "SS2A - Physics Practical",
    time: "10:00 AM",
    description:
      "Practical for SS2A science class for simple Pendulum experiment has started",
    icon: ConstellationIcon,
    iconColor: "text-blue-600",
    iconBgColor: "bg-blue-100",
  },
  {
    title: "JS 3A Class Attendance",
    time: "9:32 AM",
    description: "Total of 39 out of 41 students attended the class",
    icon: CheckmarkCircle03Icon,
    iconColor: "text-purple-600",
    iconBgColor: "bg-purple-100",
  },
  {
    title: "Maintenance Required",
    time: "8:15 AM",
    description: "Biology testing equipment in need of maintenance",
    icon: Configuration02Icon,
    iconColor: "text-blue-600",
    iconBgColor: "bg-blue-100",
  },
];

export function RecentActivitiesCard({
  activities = defaultActivities,
}: RecentActivitiesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Recent Activities
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex gap-4">
            {activity.icon ? (
              <div className={`flex items-start justify-center shrink-0`}>
                <Icon
                  icon={activity.icon}
                  size={18}
                  className={activity.iconColor || "text-gray-600"}
                />
              </div>
            ) : (
              <div className="h-2 w-2 rounded-full bg-gray-400 mt-2 shrink-0" />
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-gray-800">
                  {activity.title}
                </p>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
              <p className="text-xs text-gray-600">{activity.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
