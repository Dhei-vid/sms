"use client";

import { useState } from "react";
import * as React from "react";
import { ModalContainer } from "@/components/ui/modal-container";
import { DataTable, TableColumn } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { AddAdministrativeNoteModal } from "./add-administrative-note-modal";

interface ActivityLogEntry {
  id: string;
  loggedAction: string;
  dateTime: Date;
  associatedCourseResource: string;
  status: string;
}

interface ActivityLogModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staffName?: string;
  activities?: ActivityLogEntry[];
  onAddAdministrativeNote?: (note: string) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

const mockActivities: ActivityLogEntry[] = [
  {
    id: "1",
    loggedAction: "Lesson Plan Submitted",
    dateTime: new Date(2025, 10, 7, 10, 45),
    associatedCourseResource: "SS2 Physics",
    status: "Pending HOD Approval",
  },
  {
    id: "2",
    loggedAction: "Course Content Upload",
    dateTime: new Date(2025, 10, 7, 10, 45),
    associatedCourseResource: "Video: Energy Conservation",
    status: "Pending Review",
  },
  {
    id: "3",
    loggedAction: "LMS Login",
    dateTime: new Date(2025, 10, 7, 10, 45),
    associatedCourseResource: "N/A",
    status: "Successfully logged in.",
  },
  {
    id: "4",
    loggedAction: "Quiz Edited",
    dateTime: new Date(2025, 10, 7, 10, 45),
    associatedCourseResource: "JSS3 Maths Quiz 2",
    status: "Saved as Draft.",
  },
];

export function ActivityLogModal({
  open,
  onOpenChange,
  staffName,
  activities = mockActivities,
  onAddAdministrativeNote,
  onLoadMore,
  hasMore = false,
}: ActivityLogModalProps) {
  const [addNoteModalOpen, setAddNoteModalOpen] = useState(false);
  const [activityLog, setActivityLog] = useState<ActivityLogEntry[]>(activities);

  // Update activity log when activities prop changes
  React.useEffect(() => {
    setActivityLog(activities);
  }, [activities]);

  const handleAddNote = (note: string) => {
    // Add the administrative note as a new activity log entry
    const newEntry: ActivityLogEntry = {
      id: `note-${Date.now()}`,
      loggedAction: "Administrative Note Added",
      dateTime: new Date(),
      associatedCourseResource: "N/A",
      status: note,
    };
    setActivityLog((prev) => [newEntry, ...prev]);
    if (onAddAdministrativeNote) {
      onAddAdministrativeNote(note);
    }
  };

  const columns: TableColumn<ActivityLogEntry>[] = [
    {
      key: "loggedAction",
      title: "Logged Action",
      className: "font-medium",
    },
    {
      key: "dateTime",
      title: "Date/Time",
      render: (value) => (
        <span className="text-sm">
          {format(value, "MMM. d, yyyy; h:mma")}
        </span>
      ),
    },
    {
      key: "associatedCourseResource",
      title: "Associated Course/Resource",
      render: (value) => <span className="text-sm">{value}</span>,
    },
    {
      key: "status",
      title: "Status",
      render: (value) => <span className="text-sm">{value}</span>,
    },
  ];

  return (
    <ModalContainer
      open={open}
      onOpenChange={onOpenChange}
      title="Recent Test Activity Log"
      size="4xl"
      footer={
        <div className="flex justify-between w-full">
          <Button
            variant="outline"
            onClick={() => setAddNoteModalOpen(true)}
          >
            Add Administrative Note
          </Button>
          {hasMore && onLoadMore && (
            <Button variant="outline" onClick={onLoadMore}>
              Load More
            </Button>
          )}
        </div>
      }
    >
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto max-h-[60vh]">
          <DataTable
            columns={columns}
            data={activityLog}
            emptyMessage="No activity log entries found."
            tableClassName="border-collapse"
            showActionsColumn={false}
          />
        </div>
      </div>

      {/* Add Administrative Note Modal */}
      <AddAdministrativeNoteModal
        open={addNoteModalOpen}
        onOpenChange={setAddNoteModalOpen}
        onSendNote={handleAddNote}
        staffName={staffName}
      />
    </ModalContainer>
  );
}

