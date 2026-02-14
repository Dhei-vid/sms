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
  isLoading?: boolean;
  isAddingNote?: boolean;
  onAddAdministrativeNote?: (note: string) => void | Promise<void>;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export function ActivityLogModal({
  open,
  onOpenChange,
  staffName,
  activities,
  isLoading = false,
  isAddingNote = false,
  onAddAdministrativeNote,
  onLoadMore,
  hasMore = false,
}: ActivityLogModalProps) {
  const [addNoteModalOpen, setAddNoteModalOpen] = useState(false);
  const activityList = activities ?? [];
  const [activityLog, setActivityLog] =
    useState<ActivityLogEntry[]>(activityList);

  // Sync activity log from server (includes persisted administrative notes)
  React.useEffect(() => {
    setActivityLog(activityList);
  }, [activityList]);

  const handleAddNote = async (note: string) => {
    if (onAddAdministrativeNote) {
      await onAddAdministrativeNote(note);
      setAddNoteModalOpen(false);
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
        <span className="text-sm">{format(value, "MMM. d, yyyy; h:mma")}</span>
      ),
    },
    {
      key: "associatedCourseResource",
      title: "Associated Course/Resource",
      render: (value) => <span className="text-sm">{value ?? "—"}</span>,
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
          <Button variant="outline" onClick={() => setAddNoteModalOpen(true)}>
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
          {isLoading ? (
            <div className="py-8 text-center text-muted-foreground text-sm">
              Loading activity log…
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={activityLog}
              emptyMessage="No activity log entries found."
              tableClassName="border-collapse"
              showActionsColumn={false}
            />
          )}
        </div>
      </div>

      {/* Add Administrative Note Modal */}
      <AddAdministrativeNoteModal
        open={addNoteModalOpen}
        onOpenChange={setAddNoteModalOpen}
        onSendNote={handleAddNote}
        staffName={staffName}
        isSubmitting={isAddingNote}
      />
    </ModalContainer>
  );
}
