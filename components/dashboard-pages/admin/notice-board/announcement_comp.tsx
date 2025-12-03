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

interface Announcement {
  id: number;
  title: string;
  content: string;
  postedBy: string;
  viewed: string;
  posted: string;
  icon: any;
  isUnread?: boolean;
}

const announcements: Announcement[] = [
  {
    id: 1,
    title: "Election Manifestos",
    content:
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
    content:
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
    content:
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
    content:
      "New Digital Learning Initiatives. Wednesday at 3:00 PM in the Assembly Hall.",
    postedBy: "Principal",
    viewed: "2,934",
    posted: "October 17, 9:32 AM",
    icon: Agreement02Icon,
  },
  {
    id: 5,
    title: "Election Manifestos",
    content:
      "We get the chance to hear from the aspirants of each position in the Student Union Government. Date of Manifesto 22 - Oct. - 2025",
    postedBy: "Admin Academics",
    viewed: "2,934",
    posted: "October 17, 9:32 AM",
    icon: LibrariesIcon,
  },
];

const NoticeGeneralAnnouncementBoard = () => {
  return (
    <Card className="bg-background py-0 overflow-hidden">
      <CardContent className="p-0">
        {announcements.map((announcement, index) => (
          <div key={announcement.id} className="relative cursor-pointer">
            {index > 0 && <Separator className="my-0" />}
            <div className="p-6 hover:bg-main-blue/5 transition-colors">
              <div className="flex gap-4">
                {/* Icon */}
                <div className="flex items-start text-main-blue">
                  <Icon icon={announcement.icon} size={24} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-gray-800">
                      {announcement.title}
                    </h3>
                    {announcement.isUnread && (
                      <div className="h-3 w-3 rounded-full bg-main-blue" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {announcement.content}
                  </p>

                  {/* Footer - Meta Data */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 bg-main-blue/5 rounded-sm px-3 py-1">
                        <span className="text-xs text-gray-500">
                          Posted by:
                        </span>
                        <span className="text-xs">{announcement.postedBy}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-main-blue/5 rounded-sm px-3 py-1">
                        <span className="text-xs text-gray-500">Viewed:</span>
                        <span className="text-xs font-medium text-gray-700">
                          {announcement.viewed}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">
                      Posted: {announcement.posted}
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

export default NoticeGeneralAnnouncementBoard;
