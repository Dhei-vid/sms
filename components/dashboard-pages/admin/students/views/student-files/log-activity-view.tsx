"use client";

import { useState } from "react";
import { InputField } from "@/components/ui/input-field";
import { TextareaField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";

export function LogActivityView() {
  const [formData, setFormData] = useState({
    activityTitle: "",
    date: "",
    description: "",
  });

  const handleSubmit = () => {
    // Handle form submission
    console.log("Activity Log:", formData);
  };

  const handleCancel = () => {
    // Reset form or navigate back
    setFormData({
      activityTitle: "",
      date: "",
      description: "",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Log Major Activity Content
      </h2>

      <div className="space-y-6">
        <InputField
          id="activityTitle"
          label="Activity Title"
          placeholder="placeholder"
          value={formData.activityTitle}
          onChange={(e) =>
            setFormData({ ...formData, activityTitle: e.target.value })
          }
        />

        <InputField
          id="date"
          label="Date"
          placeholder="placeholder"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />

        <TextareaField
          id="description"
          label="Description"
          placeholder="Placeholder"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
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
