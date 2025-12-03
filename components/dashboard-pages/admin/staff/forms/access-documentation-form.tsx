"use client";

import { useState, useRef } from "react";
import { InputField, SelectField } from "@/components/ui/input-field";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";

export function AccessDocumentationForm({
  onSubmit,
  onBack,
  onCancel,
}: {
  onSubmit: () => void;
  onBack: () => void;
  onCancel: () => void;
}) {
  const medicalReportRef = useRef<HTMLInputElement>(null);
  const passportPhotoRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    schoolEmail: "bello.T178031@penentraliahub.edu",
    systemRole: "",
    medicalReport: null as File | null,
    passportPhoto: null as File | null,
  });

  const systemRoles = [
    "Admin",
    "Teacher",
    "HOD",
    "Bursar",
    "HR Admin",
    "Academic Admin",
    "Security Guard",
  ];

  const handleFileChange = (
    field: "medicalReport" | "passportPhoto",
    file: File | null
  ) => {
    setFormData({ ...formData, [field]: file });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Access & Documentation
      </h2>

      <div className="space-y-6">
        <InputField
          id="schoolEmail"
          label="Generate School Email"
          value={formData.schoolEmail}
          onChange={(e) =>
            setFormData({ ...formData, schoolEmail: e.target.value })
          }
          readOnly
        />

        <SelectField
          label="System Role/Permissions"
          placeholder="Select System Role/Permissions"
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

        {/* Medical Report Upload */}
        <div className="space-y-2">
          <Label htmlFor="medicalReport">Medical Report</Label>
          <input
            ref={medicalReportRef}
            type="file"
            id="medicalReport"
            accept=".pdf"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              handleFileChange("medicalReport", file);
            }}
          />
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => medicalReportRef.current?.click()}
          >
            Upload PDF
          </Button>
          <p className="text-xs text-red-600">
            (format: First Name_Surname_Doc. Type.pdf)
          </p>
        </div>

        {/* Passport Photo Upload */}
        <div className="space-y-2">
          <Label htmlFor="passportPhoto">Passport Photo</Label>
          <input
            ref={passportPhotoRef}
            type="file"
            id="passportPhoto"
            accept=".jpg,.jpeg"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              handleFileChange("passportPhoto", file);
            }}
          />
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => passportPhotoRef.current?.click()}
          >
            Upload Jpeg
          </Button>
          <p className="text-xs text-red-600">
            (format: First Name_Surname_Doc. Type.jpg)
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          className="w-60 bg-main-blue hover:bg-main-blue/90"
        >
          Add New Staff
        </Button>
      </div>
    </div>
  );
}
