"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@/components/general/huge-icon";
import {
  Configuration01Icon,
  MoneyAdd01Icon,
  NewJobIcon,
  LibrariesIcon,
} from "@hugeicons/core-free-icons";

interface Notice {
  id: string;
  title: string;
  description: string;
  postedBy: string;
  datePosted: string;
  icon: any;
  isUnread?: boolean;
}

const notices: Notice[] = [
  {
    id: "1",
    title: "Server Maintenance Scheduled",
    description:
      "Core systems will be offline from 11:00 PM - 3:00 AM on Friday.",
    postedBy: "Technical Advisor",
    datePosted: "October 22, 9:32 AM",
    icon: Configuration01Icon,
    isUnread: true,
  },
  {
    id: "2",
    title: "Q4 Budget Submission",
    description:
      "Departmental budget proposals are due by end-of-day next Monday.",
    postedBy: "Accountant",
    datePosted: "October 22, 8:30 AM",
    icon: MoneyAdd01Icon,
    isUnread: true,
  },
  {
    id: "3",
    title: "New Hire Orientation",
    description:
      "Chemistry and IT faculty orientation on Tuesday in the main conference room on Monday.",
    postedBy: "HR- Academics",
    datePosted: "October 17, 9:32 AM",
    icon: NewJobIcon,
  },
  {
    id: "4",
    title: "Library Renovation",
    description:
      "The library is closed all week. Books and resources moved to Room 402.",
    postedBy: "Librarian",
    datePosted: "October 17, 9:32 AM",
    icon: LibrariesIcon,
  },
];

const NoticePriorityBoard = () => {
  return (
    <Card className="bg-background py-0 overflow-hidden">
      <CardContent className="p-0">
        {notices.map((notice, index) => (
          <div key={notice.id} className="cursor-pointer relative">
            {index > 0 && <Separator className="my-0" />}
            <div className="p-6 hover:bg-main-blue/5 transition-colors">
              <div className="flex gap-4">
                {/* Icon */}
                <div className="flex items-start text-main-blue">
                  <Icon icon={notice.icon} size={24} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
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

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 text-xs font-medium bg-main-blue/5 rounded-sm">
                        {notice.postedBy}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {notice.datePosted}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default NoticePriorityBoard;
