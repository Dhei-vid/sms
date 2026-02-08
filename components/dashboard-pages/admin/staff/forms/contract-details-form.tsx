"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { InputField, SelectField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import DatePickerIcon from "@/components/ui/date-picker";
import { SelectItem } from "@/components/ui/select";

export function ContractDetailsForm({
  onNext,
  onBack,
  onCancel,
}: {
  onNext: () => void;
  onBack: () => void;
  onCancel: () => void;
}) {
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);
  const [formData, setFormData] = useState({
    staffId: "bello.T178031",
    staffType: "", // "teacher" or "staff"
    jobTitle: "",
    department: "",
    employmentType: "",
    contractStartDate: undefined as Date | undefined,
    contractEndDate: undefined as Date | undefined,
    annualLeaveEntitlement: "",
  });

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

        <DatePickerIcon
          label="Contract Start Date"
          date={formData.contractStartDate}
          setDate={(date) =>
            setFormData({
              ...formData,
              contractStartDate:
                typeof date === "function"
                  ? date(formData.contractStartDate)
                  : date,
            })
          }
          open={openStartDate}
          setOpen={setOpenStartDate}
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
          open={openEndDate}
          setOpen={setOpenEndDate}
        />

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
