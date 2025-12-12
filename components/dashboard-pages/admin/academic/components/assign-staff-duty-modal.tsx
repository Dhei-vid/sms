"use client";

import { useState } from "react";
import { ModalContainer } from "@/components/ui/modal-container";
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
  { value: "primary-1", label: "Primary 1" },
  { value: "primary-2", label: "Primary 2" },
  { value: "primary-3", label: "Primary 3" },
  { value: "primary-4", label: "Primary 4" },
  { value: "primary-5", label: "Primary 5" },
  { value: "primary-6", label: "Primary 6" },
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

const teacherOptions = [
  { value: "teacher-1", label: "Mr. Uche E." },
  { value: "teacher-2", label: "Dr. Femi I." },
  { value: "teacher-3", label: "Mrs. Kemi O." },
];

const staffOptions = [
  { value: "staff-1", label: "Mr. John Doe" },
  { value: "staff-2", label: "Mrs. Jane Smith" },
  { value: "staff-3", label: "Dr. Michael Brown" },
];

export function AssignStaffDutyModal({
  open,
  onOpenChange,
  onConfirm,
}: AssignStaffDutyModalProps) {
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

  const handleSubmit = () => {
    const submitData: DutyAssignmentData = {
      ...formData,
      dutyType,
    };

    if (dutyType === "non-teaching") {
      submitData.startTime = `${startTime.hour.padStart(2, "0")}:${
        startTime.minute
      } ${startTime.period}`;
      submitData.endTime = `${endTime.hour.padStart(2, "0")}:${
        endTime.minute
      } ${endTime.period}`;
    }

    if (onConfirm) {
      onConfirm(submitData);
    }
    handleClose(false);
  };

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
                  : "bg-white text-gray-700 hover:bg-main-blue/5 border-0 shadow-none"
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
                  : "bg-white text-gray-700 hover:bg-main-blue/5 border-0 shadow-none"
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
            <Button variant="outline" onClick={() => handleClose(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {dutyType === "teaching"
                ? "Confirm & Update Timetable"
                : "Confirm Duty Assignment"}
            </Button>
          </div>
        </div>
    </ModalContainer>
  );
}
