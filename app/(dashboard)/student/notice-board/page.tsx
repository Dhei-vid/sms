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
import { useGetNoticesQuery } from "@/services/shared";
import { format } from "date-fns";

export default function NoticeBoardPage() {
  const { data: noticesData, isLoading } = useGetNoticesQuery({
    isPublished: true,
    limit: 100,
  });

  const notices = noticesData?.data || [];

  const getIconForPriority = (priority?: string) => {
    switch (priority) {
      case "urgent":
        return ComputerTerminal01Icon;
      case "high":
        return WorkoutRunIcon;
      case "medium":
        return Agreement02Icon;
      default:
        return LibrariesIcon;
    }
  };

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
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">
              Loading notices...
            </div>
          ) : notices.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No notices found
            </div>
          ) : (
            notices.map((notice, index) => {
              const icon = getIconForPriority(notice.priority);
              const isRecent = notice.createdAt
                ? new Date(notice.createdAt).getTime() >
                  Date.now() - 24 * 60 * 60 * 1000
                : false;

              return (
                <div key={notice.id} className="relative cursor-pointer">
                  {index > 0 && <Separator className="my-0" />}
                  <div className="p-6 hover:bg-main-blue/5 transition-colors">
                    <div className="flex gap-4">
                      {/* Icon */}
                      <div className="flex items-start text-main-blue">
                        <Icon icon={icon} size={24} />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-gray-800">
                            {notice.title}
                          </h3>
                          {isRecent && (
                            <div className="h-3 w-3 rounded-full bg-main-blue" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          {notice.content}
                        </p>

                        {/* Footer - Meta Data */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                              <span className="text-xs text-gray-500">
                                Posted by:
                              </span>
                              <span className="text-xs font-medium text-gray-700">
                                {notice.authorName || "Admin"}
                              </span>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">
                            Posted:{" "}
                            {notice.createdAt
                              ? format(
                                  new Date(notice.createdAt),
                                  "MMM d, yyyy; h:mm a",
                                )
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}
