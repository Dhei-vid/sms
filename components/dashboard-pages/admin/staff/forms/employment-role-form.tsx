"use client";

import { useState, useEffect } from "react";
import { InputField, SelectField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import DatePickerIcon from "@/components/ui/date-picker";
import { SelectItem } from "@/components/ui/select";
import type { Stakeholders } from "@/services/stakeholders/stakeholder-types";
import type { StaffEditSavePayload } from "./staff-edit-types";

export function EmploymentRoleForm({
  initialData,
  onCancel,
  onSave,
  isSaving = false,
}: {
  initialData: Stakeholders;
  onCancel: () => void;
  onSave: (payload: StaffEditSavePayload) => void;
  isSaving?: boolean;
}) {
  const [openContractDate, setOpenContractDate] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: "",
    department: "",
    annualLeaveEntitlement: "",
    contractEndDate: undefined as Date | undefined,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        jobTitle: initialData.position ?? "",
        department: initialData.class_assigned ?? "",
        annualLeaveEntitlement: initialData.annual_leave_entitlement ?? "",
        contractEndDate: initialData.contract_end_date
          ? new Date(initialData.contract_end_date)
          : undefined,
      });
    }
  }, [initialData]);

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
    "JSS Science",
    "JSS Art",
    "SS Science",
    "SS Art",
    "Admin",
    "NAS",
  ];

  const handleSubmit = () => {
    const payload: StaffEditSavePayload = {
      stakeholder: {
        position: formData.jobTitle || null,
        annual_leave_entitlement: formData.annualLeaveEntitlement || null,
        contract_end_date: formData.contractEndDate
          ? formData.contractEndDate.toISOString().split("T")[0]
          : null,
      },
    };
    onSave(payload);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Employment & Role</h2>

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
          disabled={isSaving}
          className="w-60 bg-main-blue hover:bg-main-blue/90"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
