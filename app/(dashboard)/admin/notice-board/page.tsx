"use client";

import { useState } from "react";
import { NoticeBoardStatus } from "@/common/enum";
import { Icon } from "@/components/general/huge-icon";
import {
  InformationDiamondIcon,
  AddSquareIcon,
  VolumeHighIcon,
} from "@hugeicons/core-free-icons";
import NoticePriorityBoard from "@/components/dashboard-pages/admin/notice-board/priority_comp";
import NewNoticeBoard from "@/components/dashboard-pages/admin/notice-board/new-notice-comp";
import NoticeGeneralAnnouncementBoard from "@/components/dashboard-pages/admin/notice-board/announcement_comp";
import { cn } from "@/lib/utils";

export default function NoticeBoardPage() {
  const [showNotice, setShowNotice] = useState<NoticeBoardStatus>(
    NoticeBoardStatus.PRIORITY
  );
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-background rounded-md mb-6 p-6">
        <h2 className="text-2xl font-bold text-gray-800">Notice Board</h2>
        <p className="text-gray-600 mt-1">
          Create/Manage School-wide Notices, Events, and Key Dates.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Column - Notice Management */}
        <div className="lg:col-span-1 space-y-4 bg-background rounded-md p-6">
          <div className="flex flex-col gap-1 mb-6">
            {/* priority */}
            <button
              onClick={() => setShowNotice(NoticeBoardStatus.PRIORITY)}
              className={cn(
                "cursor-pointer p-3 rounded-md transition-colors",
                showNotice === NoticeBoardStatus.PRIORITY
                  ? "bg-main-blue/5 text-main-blue"
                  : "bg-transparent text-gray-700 hover:bg-main-blue/5 hover:text-main-blue"
              )}
            >
              <div className="flex flex-row gap-2 items-center">
                <Icon icon={InformationDiamondIcon} size={20} />
                <p className="text-sm font-medium">Priority Alerts & Memos</p>
              </div>
            </button>

            {/* General Announcements */}
            <button
              onClick={() => setShowNotice(NoticeBoardStatus.ANNOUCEMENT)}
              className={cn(
                "cursor-pointer p-3 rounded-md transition-colors",
                showNotice === NoticeBoardStatus.ANNOUCEMENT
                  ? "bg-main-blue/5 text-main-blue"
                  : "bg-transparent text-gray-700 hover:bg-main-blue/5 hover:text-main-blue"
              )}
            >
              <div className="flex flex-row gap-2 items-center">
                <Icon icon={VolumeHighIcon} size={20} />
                <p className="text-sm font-medium">General Announcements</p>
              </div>
            </button>

            {/* Post New Notice */}
            <button
              onClick={() => setShowNotice(NoticeBoardStatus.NEW)}
              className={cn(
                "cursor-pointer p-3 rounded-md transition-colors",
                showNotice === NoticeBoardStatus.NEW
                  ? "bg-main-blue/5 text-main-blue"
                  : "bg-transparent text-gray-700 hover:bg-main-blue/5 hover:text-main-blue"
              )}
            >
              <div className="flex flex-row gap-2 items-center">
                <Icon icon={AddSquareIcon} size={20} />
                <p className="text-sm font-medium">Post New Notice</p>
              </div>
            </button>
          </div>
        </div>

        {/* Right Column - List of Notices */}
        <div className="lg:col-span-3">
          {showNotice === NoticeBoardStatus.PRIORITY && <NoticePriorityBoard />}
          {showNotice === NoticeBoardStatus.NEW && <NewNoticeBoard />}
          {showNotice === NoticeBoardStatus.ANNOUCEMENT && (
            <NoticeGeneralAnnouncementBoard />
          )}
        </div>
      </div>
    </div>
  );
}
