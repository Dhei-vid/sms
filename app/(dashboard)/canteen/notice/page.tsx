"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@/components/general/huge-icon";
import {
  LibrariesIcon,
  ComputerTerminal01Icon,
  WorkoutRunIcon,
  Agreement02Icon,
} from "@hugeicons/core-free-icons";

interface Notice {
  id: number;
  title: string;
  description: string;
  postedBy: string;
  viewed: string;
  posted: string;
  icon: any;
  isUnread?: boolean;
}

const notices: Notice[] = [
  {
    id: 1,
    title: "Election Manifestos",
    description:
      "Today is the D-Day for every of our aspirants. Time is 12:00 PM - 1:30 PM",
    postedBy: "Admin Academics",
    viewed: "2,934",
    posted: "October 22, 10:32 AM",
    icon: LibrariesIcon,
    isUnread: true,
  },
  {
    id: 2,
    title: "Mid-Term Exams Begin",
    description:
      "Schedule for all grades is now finalized and posted in the Academic Management module.",
    postedBy: "Principal",
    viewed: "2,934",
    posted: "October 22, 9:32 AM",
    icon: ComputerTerminal01Icon,
    isUnread: true,
  },
  {
    id: 3,
    title: "Annual Inter-House Sports Day",
    description:
      "Next Friday, 9:00 AM - 3:00 PM. All staff attendance is mandatory.",
    postedBy: "Principal",
    viewed: "2,934",
    posted: "October 22, 8:30 AM",
    icon: WorkoutRunIcon,
    isUnread: true,
  },
  {
    id: 4,
    title: "PTA General Meeting: Topic",
    description:
      "New Digital Learning Initiatives. Wednesday at 3:00 PM in the Assembly Hall.",
    postedBy: "Principal",
    viewed: "2,934",
    posted: "October 17, 9:32 AM",
    icon: Agreement02Icon,
  },
];

export default function CanteenNoticeBoardPage() {
  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="bg-background rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Notice Board</h1>
        <p className="text-gray-600">
          View all School-wide Notices, Events, and Key Dates.
        </p>
      </div>

      {/* Notices List */}
      <Card className="bg-background py-0 overflow-hidden">
        <CardContent className="p-0">
          {notices.map((notice, index) => (
            <div key={notice.id} className="relative cursor-pointer">
              {index > 0 && <Separator className="my-0" />}
              <div className="p-6 hover:bg-main-blue/5 transition-colors">
                <div className="flex gap-4">
                  {/* Icon */}
                  <div className="flex items-start text-main-blue">
                    <Icon icon={notice.icon} size={24} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-gray-800">
                        {notice.title}
                      </h3>
                      {notice.isUnread && (
                        <div className="h-3 w-3 rounded-full bg-main-blue" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      {notice.description}
                    </p>

                    {/* Footer - Meta Data */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                          <span className="text-xs text-gray-500">
                            Posted by:
                          </span>
                          <span className="text-xs font-medium text-gray-700">
                            {notice.postedBy}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                          <span className="text-xs text-gray-500">Viewed:</span>
                          <span className="text-xs font-medium text-gray-700">
                            {notice.viewed}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">
                        Posted: {notice.posted}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
