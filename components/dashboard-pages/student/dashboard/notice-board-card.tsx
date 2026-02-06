"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/general/huge-icon";
import {
  NotificationSquareIcon,
  Settings02Icon,
} from "@hugeicons/core-free-icons";

interface Notice {
  title: string;
  description: string;
  time: string;
  icon?: any;
}

interface StudentNoticeBoardCardProps {
  notices?: Notice[];
}

const defaultNotices: Notice[] = [
  {
    title: "School Field Trip",
    description: "LATEST NOTICE: School field trip postponed to Friday",
    time: "Nov. 17th, 2025; 8:00AM",
    icon: NotificationSquareIcon,
  },
  {
    title: "Laboratory Closed",
    description:
      "REMINDER: CBT Lab 1 closed after break period today for reconstruction.",
    time: "12:45 PM",
    icon: Settings02Icon,
  },
];

export function StudentNoticeBoardCard({
  notices = defaultNotices,
}: StudentNoticeBoardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Today on the Notice Board
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {notices.map((notice, index) => (
          <div key={index} className="flex gap-3">
            {notice.icon ? (
              <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                <Icon icon={notice.icon} size={20} className="text-gray-600" />
              </div>
            ) : (
              <div className="h-2 w-2 rounded-full bg-gray-400 mt-2 shrink-0" />
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-gray-800">
                  {notice.title}
                </p>
                <span className="text-xs text-gray-500">{notice.time}</span>
              </div>
              <p className="text-xs text-gray-600">{notice.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
