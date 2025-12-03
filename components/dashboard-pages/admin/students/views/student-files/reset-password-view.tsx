"use client";

import { useState } from "react";
import { InputField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";

export function ResetPasswordView() {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = () => {
    // Handle form submission
    console.log("Reset Password:", formData);
  };

  const handleCancel = () => {
    // Reset form or navigate back
    setFormData({
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Reset Password</h2>

      <div className="space-y-6">
        <InputField
          id="newPassword"
          label="New Password"
          type="password"
          placeholder="Enter new password"
          value={formData.newPassword}
          onChange={(e) =>
            setFormData({ ...formData, newPassword: e.target.value })
          }
        />

        <InputField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm new password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
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
