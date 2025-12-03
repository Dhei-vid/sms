"use client";

import { useState } from "react";
import { InputField } from "@/components/ui/input-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ApplicantDetailsForm({
  onNext,
  onCancel,
}: {
  onNext: () => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    date: "",
    gender: {
      male: false,
      female: false,
    },
    grade: "",
    parentName: "",
    phoneNumber: "",
    email: "",
  });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Applicant & Parent/Guardian Details
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

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <div className="relative">
            <Input
              id="date"
              type="text"
              placeholder="mm/dd/yy"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="pr-10"
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Gender</Label>
          <div className="flex gap-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="male"
                checked={formData.gender.male}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    gender: {
                      ...formData.gender,
                      male: checked === true,
                      female: checked === true ? false : formData.gender.female,
                    },
                  })
                }
              />
              <Label htmlFor="male" className="font-normal cursor-pointer">
                Male
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="female"
                checked={formData.gender.female}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    gender: {
                      ...formData.gender,
                      female: checked === true,
                      male: checked === true ? false : formData.gender.male,
                    },
                  })
                }
              />
              <Label htmlFor="female" className="font-normal cursor-pointer">
                Female
              </Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="grade">Grade/Class Applying For</Label>
          <Select
            value={formData.grade}
            onValueChange={(value) =>
              setFormData({ ...formData, grade: value })
            }
          >
            <SelectTrigger id="grade" className="w-full">
              <SelectValue placeholder="Select class you are applying for" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="js1">Junior Secondary 1 (JS1)</SelectItem>
              <SelectItem value="js2">Junior Secondary 2 (JS2)</SelectItem>
              <SelectItem value="js3">Junior Secondary 3 (JS3)</SelectItem>
              <SelectItem value="ss1">Senior Secondary 1 (SS1)</SelectItem>
              <SelectItem value="ss2">Senior Secondary 2 (SS2)</SelectItem>
              <SelectItem value="ss3">Senior Secondary 3 (SS3)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <InputField
          id="parentName"
          label="Parent Name"
          placeholder="E.g., Bello Aisha Fatimah"
          value={formData.parentName}
          onChange={(e) =>
            setFormData({ ...formData, parentName: e.target.value })
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
