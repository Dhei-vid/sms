"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { InputField, SelectField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import DatePickerIcon from "@/components/ui/date-picker";
import { SelectItem } from "@/components/ui/select";

export function EmploymentRoleForm({
  onCancel,
  onSave,
}: {
  onCancel: () => void;
  onSave: () => void;
}) {
  const [openContractDate, setOpenContractDate] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: "JS 2 Science Teacher",
    department: "JSS Science",
    annualLeaveEntitlement: "20",
    contractEndDate: undefined as Date | undefined,
  });

  const jobTitles = [
    "JS 2 Science Teacher",
    "HOD Science",
    "P5 Teacher",
    "Bursar",
    "Security Guard",
    "HR Admin",
    "Academic Admin",
  ];

  const departments = [
    "Primary",
    "JSS Science",
    "JSS Art",
    "SS Science",
    "SS Art",
    "Admin",
    "NAS",
  ];

  const handleSubmit = () => {
    // Handle form submission
    console.log("Employment & Role:", formData);
    if (onSave) {
      onSave();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Employment & Role
      </h2>

      <div className="space-y-6">
        <SelectField
          label="Job Title/Position"
          placeholder="Select job title"
          value={formData.jobTitle}
          onValueChange={(value) =>
            setFormData({ ...formData, jobTitle: value })
          }
        >
          {jobTitles.map((title) => (
            <SelectItem key={title} value={title}>
              {title}
            </SelectItem>
          ))}
        </SelectField>

        <SelectField
          label="Department/Grade"
          placeholder="Select class"
          value={formData.department}
          onValueChange={(value) =>
            setFormData({ ...formData, department: value })
          }
        >
          {departments.map((dept) => (
            <SelectItem key={dept} value={dept}>
              {dept}
            </SelectItem>
          ))}
        </SelectField>

        <InputField
          id="annualLeaveEntitlement"
          label="Annual Leave Entitlement"
          placeholder="Adjusts the yearly leave allocation."
          value={formData.annualLeaveEntitlement}
          onChange={(e) =>
            setFormData({ ...formData, annualLeaveEntitlement: e.target.value })
          }
        />

        <DatePickerIcon
          label="Contract End Date"
          date={formData.contractEndDate}
          setDate={(date) =>
            setFormData({
              ...formData,
              contractEndDate:
                typeof date === "function"
                  ? date(formData.contractEndDate)
                  : date,
            })
          }
          open={openContractDate}
          setOpen={setOpenContractDate}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          className="w-60 bg-main-blue hover:bg-main-blue/90"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}

