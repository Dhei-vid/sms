"use client";

import { useState } from "react";
import { InputField } from "@/components/ui/input-field";
import { TextareaField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";

export function MedicalNotesView() {
  const [formData, setFormData] = useState({
    reviewer: "",
    report: "",
  });

  const handleSubmit = () => {
    // Handle form submission
    console.log("Medical Notes:", formData);
  };

  const handleCancel = () => {
    // Reset form or navigate back
    setFormData({
      reviewer: "",
      report: "",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Medical Examinations
      </h2>

      <div className="space-y-6">
        <InputField
          id="reviewer"
          label="Reviewer"
          placeholder="Doctors name"
          value={formData.reviewer}
          onChange={(e) =>
            setFormData({ ...formData, reviewer: e.target.value })
          }
        />

        <TextareaField
          id="report"
          label="Report"
          placeholder="Placeholder"
          value={formData.report}
          onChange={(e) => setFormData({ ...formData, report: e.target.value })}
          rows={6}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} className="w-60">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
