"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@/components/general/huge-icon";
import {
  Configuration01Icon,
  LibrariesIcon,
  ComputerTerminal01Icon,
  WorkoutRunIcon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import {
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
} from "@/services/shared";
import { format } from "date-fns";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slices/authSlice";
import { cn } from "@/lib/utils";

// Icon mapping based on notification type
const getIconForType = (type: string) => {
  const iconMap: Record<string, any> = {
    error: WorkoutRunIcon,
    warning: ComputerTerminal01Icon,
    notice: InformationCircleIcon,
    info: InformationCircleIcon,
    success: Configuration01Icon,
    log: LibrariesIcon,
  };
  return iconMap[type] || InformationCircleIcon;
};

// Priority level for sorting (lower number = higher priority)
const getPriorityLevel = (type: string): number => {
  switch (type) {
    case "error":
      return 1; // Highest priority
    case "warning":
      return 2; // High priority
    case "notice":
      return 3; // Medium priority
    default:
      return 4; // Lower priority
  }
};

// Get color for notification type
const getTypeColor = (type: string): string => {
  switch (type) {
    case "error":
      return "text-red-600";
    case "warning":
      return "text-amber-600";
    case "notice":
      return "text-blue-600";
    default:
      return "text-main-blue";
  }
};

const NoticePriorityBoard = () => {
  const user = useAppSelector(selectUser);
  const [markRead] = useMarkNotificationReadMutation();

  // Fetch all notifications - we'll filter for priority types (warning, error)
  const {
    data: notificationsData,
    isLoading,
    isError,
  } = useGetNotificationsQuery({});

  // Filter and transform priority notifications
  const priorityNotifications = useMemo(() => {
    if (!notificationsData?.data) return [];

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return notificationsData.data
      .filter((notification) => {
        // Filter for priority types (error, warning) and optionally recent notices
        const isPriorityType =
          notification.type === "error" ||
          notification.type === "warning" ||
          notification.type === "notice";

        // Must be active and not deleted
        const isActive =
          notification.status === "active" && !notification.is_deleted;

        // Check if recent (within 30 days) for notice type
        const isRecent =
          notification.type === "notice"
            ? notification.created_at &&
              new Date(notification.created_at) >= thirtyDaysAgo
            : true; // Always include error and warning regardless of date

        return isPriorityType && isActive && isRecent;
      })
      .map((notification) => {
        // Format posted date
        const postedDate = notification.created_at
          ? format(new Date(notification.created_at), "MMMM d, h:mm a")
          : "Unknown date";

        // Get creator name
        const postedBy =
          notification.creator?.first_name && notification.creator?.last_name
            ? `${notification.creator.first_name} ${notification.creator.last_name}`
            : notification.creator?.username || "Admin";

        // Check if current user has read this notification
        const isUnread = user?.id
          ? !notification.read_users?.includes(user.id)
          : true;

        return {
          id: notification.id,
          title: notification.title,
          description: notification.content,
          postedBy: postedBy,
          datePosted: postedDate,
          icon: getIconForType(notification.type || "info"),
          type: notification.type || "info",
          isUnread: isUnread,
          createdAt: notification.created_at,
          priorityLevel: getPriorityLevel(notification.type || "info"),
        };
      })
      .sort((a, b) => {
        // Sort by priority level first (errors first, then warnings)
        if (a.priorityLevel !== b.priorityLevel) {
          return a.priorityLevel - b.priorityLevel;
        }
        // Then sort by date (newest first)
        if (!a.createdAt || !b.createdAt) return 0;
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      })
      .map(({ createdAt, priorityLevel, ...rest }) => rest); // Remove helper fields
  }, [notificationsData, user?.id]);

  if (isLoading) {
    return (
      <Card className="bg-background py-0 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500">Loading priority alerts...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="bg-background py-0 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-12">
            <p className="text-red-600">
              Error loading priority alerts. Please try again.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (priorityNotifications.length === 0) {
    return (
      <Card className="bg-background py-0 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500">
              No priority alerts or memos at this time.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-background py-0 overflow-hidden">
      <CardContent className="p-0">
        {priorityNotifications.map((notice, index) => (
          <div
            key={notice.id}
            className="cursor-pointer relative"
            role="button"
            tabIndex={0}
            onClick={() => {
              if (notice.isUnread) {
                markRead(notice.id);
              }
            }}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.key === " ") && notice.isUnread) {
                e.preventDefault();
                markRead(notice.id);
              }
            }}
          >
            {index > 0 && <Separator className="my-0" />}
            <div className="p-6 hover:bg-main-blue/5 transition-colors">
              <div className="flex gap-4">
                {/* Icon with type-based color */}
                <div
                  className={cn("flex items-start", getTypeColor(notice.type))}
                >
                  <Icon icon={notice.icon} size={24} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-800">
                        {notice.title}
                      </h3>
                      {/* Priority badge */}
                      {notice.type === "error" && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700 rounded">
                          Critical
                        </span>
                      )}
                      {notice.type === "warning" && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded">
                          Urgent
                        </span>
                      )}
                    </div>
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
