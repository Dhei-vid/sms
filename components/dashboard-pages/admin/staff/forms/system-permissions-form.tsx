"use client";

import { useState } from "react";
import { SelectField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SelectItem } from "@/components/ui/select";

export function SystemPermissionsForm({
  onCancel,
  onSave,
}: {
  onCancel: () => void;
  onSave: () => void;
}) {
  const [formData, setFormData] = useState({
    systemRole: "JS 2 Science Teacher",
    accountStatus: true,
  });

  const systemRoles = [
    "Admin",
    "Teacher",
    "HOD",
    "Bursar",
    "HR Admin",
    "Academic Admin",
    "Security Guard",
    "JS 2 Science Teacher",
  ];

  const handleSubmit = () => {
    // Handle form submission
    console.log("System Permissions:", formData);
    if (onSave) {
      onSave();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        System Access & Permissions
      </h2>

      <div className="space-y-6">
        <SelectField
          label="System Role(s)"
          placeholder="Select job title"
          value={formData.systemRole}
          onValueChange={(value) =>
            setFormData({ ...formData, systemRole: value })
          }
        >
          {systemRoles.map((role) => (
            <SelectItem key={role} value={role}>
              {role}
            </SelectItem>
          ))}
        </SelectField>

        <div className="flex flex-row justify-between">
          <div>
            <Label htmlFor="accountStatus">Account Status</Label>
            <p className="text-sm text-gray-600 mb-3">
              Quickly disables access without terminating the profile
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Switch
              id="accountStatus"
              checked={formData.accountStatus}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, accountStatus: checked })
              }
            />
            <span className="text-sm text-gray-600">
              {formData.accountStatus ? "Active" : "Inactive"}
            </span>
          </div>
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
