"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@/components/general/huge-icon";
import {
  LibrariesIcon,
  ComputerTerminal01Icon,
  WorkoutRunIcon,
  Agreement02Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import {
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
} from "@/services/shared";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slices/authSlice";
import { format } from "date-fns";

const getIconForType = (type?: string) => {
  switch (type) {
    case "warning":
      return ComputerTerminal01Icon;
    case "error":
      return WorkoutRunIcon;
    case "success":
      return Agreement02Icon;
    case "notice":
      return InformationCircleIcon;
    default:
      return LibrariesIcon;
  }
};

export default function ParentNoticeBoardPage() {
  const user = useAppSelector(selectUser);
  const [markRead] = useMarkNotificationReadMutation();
  const { data: notificationsData, isLoading } = useGetNotificationsQuery({
    per_page: 100,
  });

  const notices = useMemo(() => {
    const list = notificationsData?.data ?? [];
    return list.filter(
      (n) =>
        n.target_audience === "general" ||
        (Array.isArray(n.specifics) && n.specifics.includes("parent")),
    );
  }, [notificationsData?.data]);

  return (
    <div className="space-y-4">
      <div className="bg-background rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Notice Board
        </h1>
        <p className="text-gray-600">
          View notices and announcements for parents.
        </p>
      </div>

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
              const icon = getIconForType(notice.type);
              const isUnread = user?.id
                ? !notice.read_users?.includes(user.id)
                : true;
              const authorName =
                notice.creator?.first_name && notice.creator?.last_name
                  ? `${notice.creator.first_name} ${notice.creator.last_name}`
                  : notice.creator?.username ?? "Admin";

              return (
                <div
                  key={notice.id}
                  className="relative cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    if (isUnread) markRead(notice.id);
                  }}
                  onKeyDown={(e) => {
                    if ((e.key === "Enter" || e.key === " ") && isUnread) {
                      e.preventDefault();
                      markRead(notice.id);
                    }
                  }}
                >
                  {index > 0 && <Separator className="my-0" />}
                  <div className="p-6 hover:bg-main-blue/5 transition-colors">
                    <div className="flex gap-4">
                      <div className="flex items-start text-main-blue">
                        <Icon icon={icon} size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-gray-800">
                            {notice.title}
                          </h3>
                          {isUnread && (
                            <div className="h-3 w-3 rounded-full bg-main-blue" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          {notice.content}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                              <span className="text-xs text-gray-500">
                                Posted by:
                              </span>
                              <span className="text-xs font-medium text-gray-700">
                                {authorName}
                              </span>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">
                            Posted:{" "}
                            {notice.created_at
                              ? format(
                                  new Date(notice.created_at),
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
