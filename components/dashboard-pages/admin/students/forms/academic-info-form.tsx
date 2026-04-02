"use client";

import { InputField, TextareaField } from "@/components/ui/input-field";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { StudentAcademicState } from "./student-edit-form-state";

export function AcademicInfoForm({
  value,
  onChange,
  onNext,
  onBack,
  onCancel,
}: {
  value: StudentAcademicState;
  onChange: (next: StudentAcademicState) => void;
  onNext: () => void;
  onBack: () => void;
  onCancel: () => void;
}) {
  const formData = value;
  const setFormData = onChange;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Academic Details</h2>
      <p className="text-sm text-gray-600">
        Update the student&apos;s academic history and performance information.
      </p>

      <div className="space-y-6">
        <InputField
          id="currentPreviousSchool"
          label="Current/Previous School"
          placeholder="E.g., ABC Secondary School"
          value={formData.currentPreviousSchool}
          onChange={(e) =>
            setFormData({
              ...formData,
              currentPreviousSchool: e.target.value,
            })
          }
        />

        <div className="space-y-2">
          <Label htmlFor="lastGradeCompleted">Last Grade Completed</Label>
          <Select
            value={formData.lastGradeCompleted || "none"}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                lastGradeCompleted: value === "none" ? "" : value,
              })
            }
          >
            <SelectTrigger id="lastGradeCompleted" className="w-full">
              <SelectValue placeholder="Select last completed grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="JS 1">Junior Secondary 1 (JS1)</SelectItem>
              <SelectItem value="JS 2">Junior Secondary 2 (JS2)</SelectItem>
              <SelectItem value="JS 3">Junior Secondary 3 (JS3)</SelectItem>
              <SelectItem value="SS 1">Senior Secondary 1 (SS1)</SelectItem>
              <SelectItem value="SS 2">Senior Secondary 2 (SS2)</SelectItem>
              <SelectItem value="SS 3">Senior Secondary 3 (SS3)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <InputField
          id="commonExamScore"
          label="Common Entrance Score"
          placeholder="E.g., 250 or N/A"
          value={formData.commonExamScore}
          onChange={(e) =>
            setFormData({
              ...formData,
              commonExamScore: e.target.value,
            })
          }
        />

        <TextareaField
          id="performanceHighlights"
          label="Performance Highlights"
          placeholder="E.g., Distinctions in Mathematics and Science, Sports achievements..."
          value={formData.performanceHighlights}
          onChange={(e) =>
            setFormData({
              ...formData,
              performanceHighlights: e.target.value,
            })
          }
          rows={3}
        />

        <TextareaField
          id="transferReason"
          label="Transfer Reason"
          placeholder="E.g., Relocation, seeking better academic environment..."
          value={formData.transferReason}
          onChange={(e) =>
            setFormData({
              ...formData,
              transferReason: e.target.value,
            })
          }
          rows={2}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="outline" onClick={onBack}>
          Back
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
