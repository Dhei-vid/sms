"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TextareaField } from "@/components/ui/input-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { StudentStatusState } from "./student-edit-form-state";

export function StudentStatusForm({
  value,
  onChange,
  onBack,
  onCancel,
  onSubmit,
  isSubmitting,
}: {
  value: StudentStatusState;
  onChange: (next: StudentStatusState) => void;
  onBack: () => void;
  onCancel: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}) {
  const formData = value;
  const setFormData = onChange;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Status & Notes</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="initialStatus">Student Status</Label>
          <Select
            value={formData.initialStatus}
            onValueChange={(value) =>
              setFormData({ ...formData, initialStatus: value })
            }
          >
            <SelectTrigger id="initialStatus" className="w-full">
              <SelectValue placeholder="Select student status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="graduated">Graduated</SelectItem>
              <SelectItem value="withdrawn">Withdrawn</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TextareaField
          id="adminNotes"
          label="Admin Notes"
          placeholder="Add any notes about this student..."
          value={formData.adminNotes}
          onChange={(e) =>
            setFormData({ ...formData, adminNotes: e.target.value })
          }
          rows={4}
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
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-60 bg-main-blue hover:bg-main-blue/90"
        >
          {isSubmitting ? "Saving…" : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
