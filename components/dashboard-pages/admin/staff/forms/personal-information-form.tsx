"use client";

import { useState } from "react";
import { InputField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckboxField } from "@/components/ui/checkbox-field";
import DatePickerIcon from "@/components/ui/date-picker";

export function PersonalInformationForm({
  onNext,
  onCancel,
}: {
  onNext: () => void;
  onCancel: () => void;
}) {
  const [openDateOfBirth, setOpenDateOfBirth] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: undefined as Date | undefined,
    gender: { male: false, female: false },
    residentialAddress: "",
    phoneNumber: "",
    email: "",
    emergencyContact: "",
  });

  const handleGenderChange = (key: "male" | "female") => {
    setFormData((prev) => ({
      ...prev,
      gender: {
        male: key === "male" ? !prev.gender.male : false,
        female: key === "female" ? !prev.gender.female : false,
      },
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Personal & Contact Information
      </h2>

      <div className="space-y-6">
        <InputField
          id="fullName"
          label="Full name (surname first, first name, middle name)"
          placeholder="E.g., Bello Aisha Fatimah"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
        />

        <DatePickerIcon
          label="Date of Birth"
          date={formData.dateOfBirth}
          setDate={(date) =>
            setFormData({
              ...formData,
              dateOfBirth:
                typeof date === "function" ? date(formData.dateOfBirth) : date,
            })
          }
          open={openDateOfBirth}
          setOpen={setOpenDateOfBirth}
          placeholder="Select date of birth"
        />

        <div className="space-y-2">
          <Label>Gender</Label>
          <div className="flex gap-6">
            <CheckboxField
              id="male"
              label="Male"
              checked={formData.gender.male}
              onCheckedChange={() => handleGenderChange("male")}
            />
            <CheckboxField
              id="female"
              label="Female"
              checked={formData.gender.female}
              onCheckedChange={() => handleGenderChange("female")}
            />
          </div>
        </div>

        <InputField
          id="residentialAddress"
          label="Residential Address"
          placeholder="placeholder"
          value={formData.residentialAddress}
          onChange={(e) =>
            setFormData({ ...formData, residentialAddress: e.target.value })
          }
        />

        <InputField
          id="phoneNumber"
          label="Primary Phone Number"
          placeholder="E.g., +23412347890"
          value={formData.phoneNumber}
          onChange={(e) =>
            setFormData({ ...formData, phoneNumber: e.target.value })
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
          label="Emergency Contact & Phone Number"
          placeholder="placeholder"
          value={formData.emergencyContact}
          onChange={(e) =>
            setFormData({ ...formData, emergencyContact: e.target.value })
          }
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
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
