"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { InputField, SelectField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckboxField } from "@/components/ui/checkbox-field";
import DatePickerIcon from "@/components/ui/date-picker";
import { SelectItem } from "@/components/ui/select";
import type { PersonalInformationState } from "./staff-form-state";
import { useGetSchoolsQuery } from "@/services/schools/schools";

// Helper function to generate school email
function generateSchoolEmail(
  firstName: string,
  lastName: string,
  schoolName: string | null,
): string {
  if (!firstName || !lastName || !schoolName) {
    return "";
  }

  // Clean and format names
  const cleanFirstName = firstName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ".")
    .replace(/[^a-z0-9.]/g, "");
  const cleanLastName = lastName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ".")
    .replace(/[^a-z0-9.]/g, "");

  // Convert school name to domain format (lowercase, remove special chars, replace spaces)
  const schoolDomain = schoolName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "");

  return `${cleanFirstName}.${cleanLastName}@${schoolDomain}.com`;
}

export function PersonalInformationForm({
  value,
  onChange,
  onNext,
  onCancel,
  onSchoolEmailChange,
}: {
  value: PersonalInformationState;
  onChange: (next: PersonalInformationState) => void;
  onNext: () => void;
  onCancel: () => void;
  onSchoolEmailChange?: (email: string) => void;
}) {
  const [openDateOfBirth, setOpenDateOfBirth] = useState(false);
  const formData = value;
  const setFormData = onChange;
  const { data: schoolsData, isLoading: isLoadingSchools } =
    useGetSchoolsQuery();
  const schools = schoolsData?.data || [];

  // Get selected school
  const selectedSchool = schools.find((s) => s.id === formData.schoolId);

  // Auto-generate school email when firstName, lastName, or schoolId changes
  // Use useEffect with proper dependency handling to avoid hydration issues
  useEffect(() => {
    // Only run on client side to avoid hydration mismatch
    if (typeof window === "undefined") return;

    if (formData.firstName && formData.lastName && selectedSchool) {
      const generatedEmail = generateSchoolEmail(
        formData.firstName,
        formData.lastName,
        selectedSchool.name,
      );
      if (onSchoolEmailChange) {
        onSchoolEmailChange(generatedEmail);
      }
    } else if (onSchoolEmailChange) {
      onSchoolEmailChange("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.firstName, formData.lastName, formData.schoolId, selectedSchool?.name]);

  const dateValue = formData.dateOfBirth
    ? new Date(formData.dateOfBirth)
    : undefined;
  const setDateValue = (d: React.SetStateAction<Date | undefined>) => {
    const next = typeof d === "function" ? d(dateValue) : d;
    setFormData({
      ...formData,
      dateOfBirth: next ? format(next, "yyyy-MM-dd") : "",
    });
  };

  const handleGenderChange = (key: "male" | "female") => {
    setFormData({
      ...formData,
      gender: {
        male: key === "male" ? !formData.gender.male : false,
        female: key === "female" ? !formData.gender.female : false,
      },
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Personal & Contact Information
      </h2>

      <div className="space-y-6">
        {/* School Selector */}
        <SelectField
          label="School"
          placeholder={
            isLoadingSchools ? "Loading schools..." : "Select school"
          }
          value={formData.schoolId}
          onValueChange={(value) =>
            setFormData({ ...formData, schoolId: value })
          }
          required
        >
          {schools.map((school) => (
            <SelectItem key={school.id} value={school.id}>
              {school.name}
            </SelectItem>
          ))}
        </SelectField>

        <div className="flex flex-row gap-2">
          <InputField
            id="firstName"
            label="First Name"
            placeholder="E.g., Bello"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />

          <InputField
            id="lastName"
            label="Last Name"
            placeholder="E.g., Fatimah"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
        </div>

        <DatePickerIcon
          label="Date of Birth"
          date={dateValue}
          setDate={setDateValue}
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
          placeholder="Enter residential address"
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
          placeholder="E.g., John Doe +23412347890"
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
