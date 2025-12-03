"use client";

import { useState } from "react";
import { InputField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function ContactInformationForm({
  onCancel,
  onSave,
}: {
  onCancel: () => void;
  onSave: () => void;
}) {
  const [formData, setFormData] = useState({
    primaryPhone: "+234 803 123 4567",
    emergencyContact: "Mrs. Ada Okafor (Wife) - +234 809 987 6543",
    residentialAddress: "45 Unity Crescent, Garki, Abuja",
    password: "",
  });

  const handleSubmit = () => {
    // Handle form submission
    console.log("Contact Information:", formData);
    if (onSave) {
      onSave();
    }
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
          placeholder="E.g. +23412347890"
          value={formData.primaryPhone}
          onChange={(e) =>
            setFormData({ ...formData, primaryPhone: e.target.value })
          }
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

        <div className="space-y-2">
          <Label htmlFor="password">Change Password</Label>
          <InputField
            id="password"
            type="password"
            placeholder="Click to change password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <p className="text-xs text-gray-500">Click to change password</p>
        </div>
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

