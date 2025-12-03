"use client";

import { useState } from "react";
import { InputField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";

export function LogisticsInformationView() {
  const [formData, setFormData] = useState({
    lockerNumber: "",
    transportationStop: "",
    dormRoom: "",
  });

  const handleSubmit = () => {
    // Handle form submission
    console.log("Logistics Information:", formData);
  };

  const handleCancel = () => {
    // Reset form or navigate back
    setFormData({
      lockerNumber: "",
      transportationStop: "",
      dormRoom: "",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Logistics Information
      </h2>

      <div className="space-y-6">
        <InputField
          id="lockerNumber"
          label="Locker Number"
          placeholder="placeholder"
          value={formData.lockerNumber}
          onChange={(e) =>
            setFormData({ ...formData, lockerNumber: e.target.value })
          }
        />

        <InputField
          id="transportationStop"
          label="Transportation Stop"
          placeholder="E.g, Stop at Fire Bridge Lugbe"
          value={formData.transportationStop}
          onChange={(e) =>
            setFormData({ ...formData, transportationStop: e.target.value })
          }
        />

        <InputField
          id="dormRoom"
          label="Dorm Room"
          placeholder="placeholder"
          value={formData.dormRoom}
          onChange={(e) =>
            setFormData({ ...formData, dormRoom: e.target.value })
          }
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
