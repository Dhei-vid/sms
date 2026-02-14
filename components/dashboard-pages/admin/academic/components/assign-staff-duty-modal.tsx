"use client";

import { useState } from "react";
import { ModalContainer } from "@/components/ui/modal-container";
import { useAssignDutyMutation } from "@/services/stakeholders/stakeholders";
import { useGetAllStaffQuery } from "@/services/stakeholders/stakeholders";
import { toast } from "sonner";
import { InputField } from "@/components/ui/input-field";
import { SelectField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import DatePickerIcon from "@/components/ui/date-picker";
import { TimeRangeInput, TimeValue } from "@/components/ui/time-range-input";
import { cn } from "@/lib/utils";

type DutyType = "teaching" | "non-teaching";

interface AssignStaffDutyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: (data: DutyAssignmentData) => void;
}

interface DutyAssignmentData {
  dutyType: DutyType;
  // Teaching Duty fields
  teacher?: string;
  class?: string;
  subject?: string;
  day?: string;
  period?: string;
  classroom?: string;
  // Non-Teaching Duty fields
  staffMember?: string;
  dutyTypeName?: string;
  date?: Date;
  startTime?: string;
  endTime?: string;
}

const classOptions = [
  { value: "jss-1", label: "JSS 1" },
  { value: "jss-2", label: "JSS 2" },
  { value: "jss-3", label: "JSS 3" },
  { value: "ss-1", label: "SS 1" },
  { value: "ss-2", label: "SS 2" },
  { value: "ss-3", label: "SS 3" },
];

const subjectOptions = [
  { value: "mathematics", label: "Mathematics" },
  { value: "english", label: "English" },
  { value: "physics", label: "Physics" },
  { value: "chemistry", label: "Chemistry" },
  { value: "biology", label: "Biology" },
  { value: "art", label: "Art" },
];

const dayOptions = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
];

const periodOptions = [
  { value: "1", label: "Period 1" },
  { value: "2", label: "Period 2" },
  { value: "3", label: "Period 3" },
  { value: "4", label: "Period 4" },
  { value: "5", label: "Period 5" },
  { value: "6", label: "Period 6" },
];

const classroomOptions = [
  { value: "classroom-1", label: "Classroom 1" },
  { value: "classroom-2", label: "Classroom 2" },
  { value: "classroom-3", label: "Classroom 3" },
  { value: "hall-a", label: "Hall A" },
  { value: "hall-b", label: "Hall B" },
  { value: "lab-1", label: "Lab 1" },
];


function getNextWeekday(dayName: string): Date {
  const days: Record<string, number> = { monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5 };
  const target = days[dayName.toLowerCase()] ?? 1;
  const d = new Date();
  const diff = (target - d.getDay() + 7) % 7 || 7;
  d.setDate(d.getDate() + diff);
  return d;
}

export function AssignStaffDutyModal({
  open,
  onOpenChange,
  onConfirm,
}: AssignStaffDutyModalProps) {
  const [assignDuty, { isLoading }] = useAssignDutyMutation();
  const { data: staffResponse } = useGetAllStaffQuery(undefined, { skip: !open });

  const staffList = staffResponse?.data ?? [];
  const teachers = staffList.filter((s) => s.type === "teacher");
  const staffMembers = staffList.filter((s) => s.type === "staff" || s.type === "teacher");
  const teacherOptions = teachers.map((t) => ({
    value: t.id,
    label: t.user ? `${(t.user as { first_name?: string }).first_name ?? ""} ${(t.user as { last_name?: string }).last_name ?? ""}`.trim() || t.id : t.id,
  }));
  const staffOptions = staffMembers.map((t) => ({
    value: t.id,
    label: t.user ? `${(t.user as { first_name?: string }).first_name ?? ""} ${(t.user as { last_name?: string }).last_name ?? ""}`.trim() || t.id : t.id,
  }));

  const [dutyType, setDutyType] = useState<DutyType>("teaching");
  const [formData, setFormData] = useState<DutyAssignmentData>({
    dutyType: "teaching",
  });

  // Time state for non-teaching duty
  const [startTime, setStartTime] = useState<TimeValue>({
    hour: "1",
    minute: "00",
    period: "AM",
  });
  const [endTime, setEndTime] = useState<TimeValue>({
    hour: "2",
    minute: "00",
    period: "AM",
  });

  const handleClose = (open: boolean) => {
    if (!open) {
      // Reset form when modal closes
      setDutyType("teaching");
      setFormData({ dutyType: "teaching" });
      setStartTime({ hour: "1", minute: "00", period: "AM" });
      setEndTime({ hour: "2", minute: "00", period: "AM" });
    }
    onOpenChange(open);
  };

  const handleSubmit = async () => {
    const stakeholderId = dutyType === "teaching" ? formData.teacher : formData.staffMember;
    if (!stakeholderId) {
      toast.error("Please select a staff member");
      return;
    }

    const isTeaching = dutyType === "teaching";
    let payload: Record<string, unknown> = {
      type: isTeaching ? "teaching" : "non teaching",
      stakeholder_id: stakeholderId,
    };

    if (isTeaching) {
      const dateForDay = formData.day ? getNextWeekday(formData.day) : new Date();
      payload = {
        ...payload,
        class_grade: formData.class ?? "",
        subject: formData.subject ?? "",
        date: formatDate(dateForDay),
        period: formData.period ?? "",
        classroom: formData.classroom ?? "",
      };
    } else {
      const dateStr = formData.date ? formatDate(formData.date) : formatDate(new Date());
      const st = `${startTime.hour.padStart(2, "0")}:${startTime.minute}:00`;
      const et = `${endTime.hour.padStart(2, "0")}:${endTime.minute}:00`;
      payload = {
        ...payload,
        duty_type: formData.dutyTypeName ?? "",
        date: dateStr,
        start_time: to24h(st, startTime.period),
        end_time: to24h(et, endTime.period),
      };
    }

    try {
      await assignDuty(payload as unknown as Parameters<typeof assignDuty>[0]).unwrap();
      toast.success("Duty assigned successfully");
      onConfirm?.({
        ...formData,
        dutyType,
        startTime: (payload as { start_time?: string }).start_time,
        endTime: (payload as { end_time?: string }).end_time,
      });
      handleClose(false);
    } catch {
      toast.error("Failed to assign duty");
    }
  };

  function formatDate(d: Date): string {
    return d.toISOString().slice(0, 10);
  }

  function to24h(time: string, period: string): string {
    let [h, m] = time.split(":").map(Number);
    if (period === "PM" && h < 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`;
  }

  return (
    <ModalContainer
      open={open}
      onOpenChange={handleClose}
      title="Assign Staff to Duty"
      size="2xl"
      maxHeight="90vh"
    >
      <div className="space-y-6 py-4">
        {/* Duty Type Toggle */}
        <div className="flex gap-2 border rounded-md p-1">
          <Button
            type="button"
            variant={dutyType === "teaching" ? "default" : "outline"}
            onClick={() => {
              setDutyType("teaching");
              setFormData({ dutyType: "teaching" });
            }}
            className={cn(
              "flex-1",
              dutyType === "teaching"
                ? "bg-main-blue/5 text-main-blue hover:bg-main-blue/10"
                : "bg-white text-gray-700 hover:bg-main-blue/5 border-0 shadow-none",
            )}
          >
            Teaching Duty
          </Button>
          <Button
            type="button"
            variant={dutyType === "non-teaching" ? "default" : "outline"}
            onClick={() => {
              setDutyType("non-teaching");
              setFormData({ dutyType: "non-teaching" });
            }}
            className={cn(
              "flex-1",
              dutyType === "non-teaching"
                ? "bg-main-blue/5 text-main-blue hover:bg-main-blue/10"
                : "bg-white text-gray-700 hover:bg-main-blue/5 border-0 shadow-none",
            )}
          >
            Non-Teaching Duty
          </Button>
        </div>

        {/* Teaching Duty Form */}
        {dutyType === "teaching" && (
          <div className="space-y-6">
            <SelectField
              label="Select Teacher"
              value={formData.teacher || ""}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, teacher: value }))
              }
              placeholder="Search by staff name/ID."
            >
              {teacherOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectField>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <SelectField
                label="Select Class"
                value={formData.class || ""}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, class: value }))
                }
                placeholder="Select school class"
              >
                {classOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectField>

              <SelectField
                label="Select Subject"
                value={formData.subject || ""}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, subject: value }))
                }
                placeholder="Select subject"
              >
                {subjectOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <SelectField
                label="Select Day"
                value={formData.day || ""}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, day: value }))
                }
                placeholder="Select day"
              >
                {dayOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectField>

              <SelectField
                label="Select Period"
                value={formData.period || ""}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, period: value }))
                }
                placeholder="Select period"
              >
                {periodOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectField>
            </div>

            <SelectField
              label="Select Classroom"
              value={formData.classroom || ""}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, classroom: value }))
              }
              placeholder="Select classroom"
            >
              {classroomOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectField>
          </div>
        )}

        {/* Non-Teaching Duty Form */}
        {dutyType === "non-teaching" && (
          <div className="space-y-6">
            <SelectField
              label="Select Staff Member"
              value={formData.staffMember || ""}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, staffMember: value }))
              }
              placeholder="Search by staff name/ID."
            >
              {staffOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectField>

            <InputField
              label="Duty Type"
              placeholder="E.g., Morning Gate Duty, Lunch Supervision, Library Duty."
              value={formData.dutyTypeName || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  dutyTypeName: e.target.value,
                }))
              }
            />

            <DatePickerIcon
              label="Date Picker"
              date={formData.date}
              setDate={(date) =>
                setFormData((prev) => ({ ...prev, date: date as Date }))
              }
              placeholder="mm/dd/yy"
            />

            <TimeRangeInput
              label="Time Input"
              startTime={startTime}
              endTime={endTime}
              onStartTimeChange={setStartTime}
              onEndTimeChange={setEndTime}
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-4">
          <Button variant="outline" onClick={() => handleClose(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading
              ? "Saving..."
              : dutyType === "teaching"
                ? "Confirm & Update Timetable"
                : "Confirm Duty Assignment"}
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
}
