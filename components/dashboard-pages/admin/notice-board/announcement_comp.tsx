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
import { useGetNotificationsQuery } from "@/services/shared";
import { format } from "date-fns";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slices/authSlice";

// Icon mapping based on notification type
const getIconForType = (type: string) => {
  const iconMap: Record<string, any> = {
    info: InformationCircleIcon,
    notice: LibrariesIcon,
    warning: ComputerTerminal01Icon,
    success: Agreement02Icon,
    error: WorkoutRunIcon,
  };
  return iconMap[type] || InformationCircleIcon;
};

const NoticeGeneralAnnouncementBoard = () => {
  const user = useAppSelector(selectUser);

  // Fetch general announcements - filter by target_audience=general
  // Backend QueryFilter expects: target_audience[eq]=general
  const {
    data: notificationsData,
    isLoading,
    isError,
  } = useGetNotificationsQuery({
    // Pass filter parameter in the format backend expects
    "target_audience[eq]": "general",
  } as any);

  // Filter for general announcements and transform data
  const generalAnnouncements = useMemo(() => {
    if (!notificationsData?.data) return [];

    // Filter and map notifications
    const filtered = notificationsData.data
      .filter((notification) => {
        // Filter for general announcements and non-deleted
        return (
          notification.target_audience === "general" &&
          !notification.is_deleted &&
          notification.status === "active"
        );
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

        // Calculate viewed count (read_users length)
        const viewedCount = notification.read_users?.length || 0;

        // Check if current user has read this notification
        const isUnread = user?.id
          ? !notification.read_users?.includes(user.id)
          : true;

        return {
          id: notification.id,
          title: notification.title,
          content: notification.content,
          postedBy: postedBy,
          viewed: viewedCount.toLocaleString(),
          posted: postedDate,
          icon: getIconForType(notification.type || "info"),
          isUnread: isUnread,
          createdAt: notification.created_at, // Keep for sorting
        };
      })
      .sort((a, b) => {
        // Sort by date (newest first)
        if (!a.createdAt || !b.createdAt) return 0;
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

    // Remove createdAt from final output
    return filtered.map(({ createdAt, ...rest }) => rest);
  }, [notificationsData, user?.id]);

  if (isLoading) {
    return (
      <Card className="bg-background py-0 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500">Loading announcements...</p>
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
              Error loading announcements. Please try again.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (generalAnnouncements.length === 0) {
    return (
      <Card className="bg-background py-0 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500">No general announcements found.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-background py-0 overflow-hidden">
      <CardContent className="p-0">
        {generalAnnouncements.map((announcement, index) => (
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
