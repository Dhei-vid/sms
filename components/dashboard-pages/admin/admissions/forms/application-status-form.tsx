"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TextareaField } from "@/components/ui/input-field";
import { Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export function ApplicationStatusForm({
  onBack,
  onCancel,
  onSubmit,
}: {
  onBack: () => void;
  onCancel: () => void;
  onSubmit: () => void;
}) {
  const [formData, setFormData] = useState({
    initialStatus: "",
    adminNotes: "",
    dateSubmitted: "",
  });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Application Status
      </h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="initialStatus">Initial Status</Label>
          <Select
            value={formData.initialStatus}
            onValueChange={(value) =>
              setFormData({ ...formData, initialStatus: value })
            }
          >
            <SelectTrigger id="initialStatus" className="w-full">
              <SelectValue placeholder="Select applicant status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New Applicant</SelectItem>
              <SelectItem value="pending">Pending Interview</SelectItem>
              <SelectItem value="under-review">Under Review</SelectItem>
              <SelectItem value="accepted">Application Accepted</SelectItem>
              <SelectItem value="rejected">Application Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TextareaField
          id="adminNotes"
          label="Admin Notes"
          placeholder="text"
          value={formData.adminNotes}
          onChange={(e) =>
            setFormData({ ...formData, adminNotes: e.target.value })
          }
          rows={4}
        />

        <div className="space-y-2">
          <Label htmlFor="dateSubmitted">Date Submitted</Label>
          <div className="relative">
            <Input
              id="dateSubmitted"
              type="text"
              placeholder="mm/dd/yy"
              value={formData.dateSubmitted}
              onChange={(e) =>
                setFormData({ ...formData, dateSubmitted: e.target.value })
              }
              className="pr-10"
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
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
          Submit Application
        </Button>
      </div>
    </div>
  );
}
