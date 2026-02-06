"use client";

import { useState } from "react";
import {
  InputField,
  SelectField,
  TextareaField,
} from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import DatePickerIcon from "@/components/ui/date-picker";
import { SelectItem } from "@/components/ui/select";

export function LogStaffAssignmentForm({
  onCancel,
  onSubmit,
}: {
  onCancel: () => void;
  onSubmit: () => void;
}) {
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);
  const [formData, setFormData] = useState({
    staffMember: "",
    assignmentType: "",
    dutyRoleName: "",
    description: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    supervisor: "",
  });

  const assignmentTypeOptions = [
    "Teaching Assignment",
    "Administrative Duty",
    "Supervisory Role",
    "Committee Membership",
    "Event Coordination",
    "Other",
  ];

  const handleSubmit = () => {
    // Handle form submission
    console.log("Staff Assignment:", formData);
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Log Staff Assignment
      </h2>

      <div className="space-y-6">
        <SelectField
          label="Staff Member"
          placeholder="Select staff member"
          value={formData.staffMember}
          onValueChange={(value) =>
            setFormData({ ...formData, staffMember: value })
          }
        >
          <SelectItem value="staff1">Mr. Chinedu Okafor</SelectItem>
          <SelectItem value="staff2">Mrs. Ada Okafor</SelectItem>
          <SelectItem value="staff3">Mr. Adekola</SelectItem>
        </SelectField>

        <SelectField
          label="Assignment Type"
          placeholder="Select assignment type"
          value={formData.assignmentType}
          onValueChange={(value) =>
            setFormData({ ...formData, assignmentType: value })
          }
        >
          {assignmentTypeOptions.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectField>

        <InputField
          id="dutyRoleName"
          label="Duty/Role Name"
          placeholder="placeholder"
          value={formData.dutyRoleName}
          onChange={(e) =>
            setFormData({ ...formData, dutyRoleName: e.target.value })
          }
        />

        <TextareaField
          id="description"
          label="Description/Context"
          placeholder="placeholder"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={4}
        />

        <div className="grid grid-cols-2 gap-4">
          <DatePickerIcon
            label="Start Date"
            date={formData.startDate}
            setDate={(date) =>
              setFormData({
                ...formData,
                startDate:
                  typeof date === "function" ? date(formData.startDate) : date,
              })
            }
            open={openStartDate}
            setOpen={setOpenStartDate}
          />

          <DatePickerIcon
            label="End Date"
            date={formData.endDate}
            setDate={(date) =>
              setFormData({
                ...formData,
                endDate:
                  typeof date === "function" ? date(formData.endDate) : date,
              })
            }
            open={openEndDate}
            setOpen={setOpenEndDate}
          />
        </div>

        <SelectField
          label="Supervisor"
          placeholder="Select the manager responsible for overseeing this duty."
          value={formData.supervisor}
          onValueChange={(value) =>
            setFormData({ ...formData, supervisor: value })
          }
        >
          <SelectItem value="supervisor1">
            Mr. Adekola (VP Student Affairs)
          </SelectItem>
          <SelectItem value="supervisor2">
            Mrs. Ada Okafor (Principal)
          </SelectItem>
          <SelectItem value="supervisor3">
            Mr. Chinedu Okafor (VP Academic)
          </SelectItem>
        </SelectField>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          className="w-60 bg-main-blue hover:bg-main-blue/90"
        >
          Log Assignment
        </Button>
      </div>
    </div>
  );
}
