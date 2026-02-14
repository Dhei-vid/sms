"use client";

import { useState, useEffect } from "react";
import { ModalContainer } from "@/components/ui/modal-container";
import { useUpdateScheduleMutation } from "@/services/schedules/schedules";
import { useGetAllStaffQuery } from "@/services/stakeholders/stakeholders";
import { SelectField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import { toast } from "sonner";
import type { ScheduleEvent } from "@/services/schedules/schedule-types";

interface AssignInvigilatorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  schedule: ScheduleEvent | null;
  onSuccess?: () => void;
}

export function AssignInvigilatorModal({
  open,
  onOpenChange,
  schedule,
  onSuccess,
}: AssignInvigilatorModalProps) {
  const [invigilatorId, setInvigilatorId] = useState<string>("");

  const { data: staffResponse } = useGetAllStaffQuery(undefined, { skip: !open });
  const [updateSchedule, { isLoading }] = useUpdateScheduleMutation();

  const staffList = staffResponse?.data ?? [];
  const staffOptions = staffList.map((s) => ({
    value: s.id,
    label:
      s.user && typeof s.user === "object" && "first_name" in s.user && "last_name" in s.user
        ? `${(s.user as { first_name?: string }).first_name ?? ""} ${(s.user as { last_name?: string }).last_name ?? ""}`.trim() || s.id
        : s.id,
  }));

  useEffect(() => {
    if (open && schedule) {
      const current = schedule.invigilator_id ?? "";
      setInvigilatorId(current || "__unassigned__");
    }
  }, [open, schedule]);

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setInvigilatorId("");
    }
    onOpenChange(isOpen);
  };

  const handleSubmit = async () => {
    if (!schedule?.id) {
      toast.error("No schedule selected.");
      return;
    }

    const value = invigilatorId === "__unassigned__" ? null : invigilatorId;
    if (!value && !schedule.invigilator_id) {
      handleClose(false);
      return;
    }

    try {
      await updateSchedule({
        id: schedule.id,
        data: { invigilator_id: value },
      }).unwrap();
      toast.success("Invigilator assigned successfully.");
      onSuccess?.();
      handleClose(false);
    } catch {
      toast.error("Failed to assign invigilator.");
    }
  };

  if (!schedule) return null;

  return (
    <ModalContainer
      open={open}
      onOpenChange={handleClose}
      title="Assign Invigilator"
      size="md"
    >
      <div className="space-y-6 py-4">
        <p className="text-sm text-gray-600">
          Assign an invigilator for <strong>{schedule.title || schedule.description || "this exam"}</strong>
        </p>

        <SelectField
          label="Select Invigilator"
          value={invigilatorId}
          onValueChange={setInvigilatorId}
          placeholder="Choose a staff member"
        >
          <SelectItem value="__unassigned__">Unassigned</SelectItem>
          {staffOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectField>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={() => handleClose(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Saving…" : "Assign Invigilator"}
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
}
