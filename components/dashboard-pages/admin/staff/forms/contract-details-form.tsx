"use client";

import { useState } from "react";
import { format } from "date-fns";
import { InputField, SelectField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import DatePickerIcon from "@/components/ui/date-picker";
import { SelectItem } from "@/components/ui/select";
import type { ContractDetailsState } from "./staff-form-state";

export function ContractDetailsForm({
  value,
  onChange,
  onNext,
  onBack,
  onCancel,
}: {
  value: ContractDetailsState;
  onChange: (next: ContractDetailsState) => void;
  onNext: () => void;
  onBack: () => void;
  onCancel: () => void;
}) {
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);
  const formData = value;
  const setFormData = onChange;

  const startDateValue = formData.contractStartDate
    ? new Date(formData.contractStartDate)
    : undefined;
  const setStartDateValue = (d: React.SetStateAction<Date | undefined>) => {
    const next = typeof d === "function" ? d(startDateValue) : d;
    setFormData({
      ...formData,
      contractStartDate: next ? format(next, "yyyy-MM-dd") : "",
    });
  };

  const endDateValue = formData.contractEndDate
    ? new Date(formData.contractEndDate)
    : undefined;
  const setEndDateValue = (d: React.SetStateAction<Date | undefined>) => {
    const next = typeof d === "function" ? d(endDateValue) : d;
    setFormData({
      ...formData,
      contractEndDate: next ? format(next, "yyyy-MM-dd") : "",
    });
  };

  const departments = [
    "Primary",
    "JSS Science",
    "JSS Art",
    "SS Science",
    "SS Art",
    "Admin",
    "NAS",
  ];

  const employmentTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Temporary",
    "Intern",
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Employment & Contract Details
      </h2>

      <div className="space-y-6">
        <InputField
          id="staffId"
          label="Staff ID"
          value={formData.staffId}
          onChange={(e) =>
            setFormData({ ...formData, staffId: e.target.value })
          }
          readOnly
        />

        <SelectField
          label="Staff Type"
          placeholder="Select staff type"
          value={formData.staffType}
          onValueChange={(value) =>
            setFormData({ ...formData, staffType: value })
          }
          required
        >
          <SelectItem value="teacher">Teacher</SelectItem>
          <SelectItem value="staff">Staff</SelectItem>
        </SelectField>

        <InputField
          id="jobTitle"
          label="Job Title/Position"
          placeholder="placeholder"
          value={formData.jobTitle}
          onChange={(e) =>
            setFormData({ ...formData, jobTitle: e.target.value })
          }
        />

        <SelectField
          label="Department/Grade"
          placeholder="Select department/grade applied for"
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

        <SelectField
          label="Employment Type"
          placeholder="Select employment type"
          value={formData.employmentType}
          onValueChange={(value) =>
            setFormData({ ...formData, employmentType: value })
          }
        >
          {employmentTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectField>

        {/* Only show contract dates if employment type is Contract */}
        {formData.employmentType === "Contract" && (
          <>
            <DatePickerIcon
              label="Contract Start Date"
              date={startDateValue}
              setDate={setStartDateValue}
              open={openStartDate}
              setOpen={setOpenStartDate}
            />

            <DatePickerIcon
              label="Contract End Date"
              date={endDateValue}
              setDate={setEndDateValue}
              open={openEndDate}
              setOpen={setOpenEndDate}
            />
          </>
        )}

        <InputField
          id="annualLeaveEntitlement"
          label="Annual Leave Entitlement"
          placeholder="required"
          value={formData.annualLeaveEntitlement}
          onChange={(e) =>
            setFormData({ ...formData, annualLeaveEntitlement: e.target.value })
          }
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={onNext}
          className="w-60 bg-main-blue hover:bg-main-blue/90"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
