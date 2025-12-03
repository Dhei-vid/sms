"use client";

import { useState } from "react";
import { InputField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";

export function ContactInformationView() {
  const [formData, setFormData] = useState({
    primaryPhone: "",
    email: "",
    emergencyContact: "",
    residentialAddress: "",
  });

  const handleSubmit = () => {
    // Handle form submission
    console.log("Contact Information:", formData);
  };

  const handleCancel = () => {
    // Reset form or navigate back
    setFormData({
      primaryPhone: "",
      email: "",
      emergencyContact: "",
      residentialAddress: "",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Contact Information
      </h2>

      <div className="space-y-6">
        <InputField
          id="primaryPhone"
          label="Primary Phone Number"
          placeholder="E.g., +23412347890"
          value={formData.primaryPhone}
          onChange={(e) =>
            setFormData({ ...formData, primaryPhone: e.target.value })
          }
        />

        <InputField
          id="email"
          label="Email Address"
          type="email"
          placeholder="E.g., aisha.bello@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <InputField
          id="emergencyContact"
          label="Emergency Contact & Number"
          placeholder="E.g., Bello Aisha Fatimah, +23412347890"
          value={formData.emergencyContact}
          onChange={(e) =>
            setFormData({ ...formData, emergencyContact: e.target.value })
          }
        />

        <InputField
          id="residentialAddress"
          label="Residential Address"
          placeholder="E.g., Bello Aisha Fatimah"
          value={formData.residentialAddress}
          onChange={(e) =>
            setFormData({ ...formData, residentialAddress: e.target.value })
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
