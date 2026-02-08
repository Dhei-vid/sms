"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  InputField,
  TextareaField,
  SelectField,
} from "@/components/ui/input-field";
import { Label } from "@/components/ui/label";
import { CheckboxField } from "../../../ui/checkbox-field";
import { SelectItem } from "@/components/ui/select";
import { toast } from "sonner";

// API
import { useCreateNotificationMutation } from "@/services/shared";
import { useGetSchoolsQuery } from "@/services/schools/schools";
import type { CreateNotifications } from "@/services/shared";

// Role mapping for specifics
const ROLE_MAPPING: Record<string, "teacher" | "parent" | "admin" | "student"> =
  {
    teachers: "teacher",
    parents: "parent",
    admins: "admin",
    students: "student",
  };

const NewNoticeBoard = () => {
  const [noticeTitle, setNoticeTitle] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [targetAudience, setTargetAudience] = useState({
    general: false,
    private: false,
  });
  const [specifics, setSpecifics] = useState({
    teachers: false,
    parents: false,
    admins: false,
    students: false,
  });
  const [noticeContent, setNoticeContent] = useState("");
  const [isPriorityAlert, setIsPriorityAlert] = useState(false);
  const [errors, setErrors] = useState<{
    title?: string;
    school?: string;
    content?: string;
    targetAudience?: string;
    specifics?: string;
  }>({});

  // Fetch schools
  const { data: schoolsData, isLoading: isLoadingSchools } =
    useGetSchoolsQuery();
  const [createNotification, { isLoading: isSubmitting }] =
    useCreateNotificationMutation();
  const schools = schoolsData?.data || [];

  const handleTargetAudienceChange = (key: "general" | "private") => {
    setTargetAudience((prev) => {
      const updated = {
        ...prev,
        [key]: !prev[key],
      };
      // If general is selected, uncheck private and vice versa
      if (key === "general" && updated.general) {
        updated.private = false;
      } else if (key === "private" && updated.private) {
        updated.general = false;
      }
      return updated;
    });
    // Clear specifics when switching to general
    if (key === "general") {
      setSpecifics({
        teachers: false,
        parents: false,
        admins: false,
        students: false,
      });
    }
    // Clear errors
    setErrors((prev) => ({
      ...prev,
      targetAudience: undefined,
      specifics: undefined,
    }));
  };

  const handleSpecificsChange = (
    key: "teachers" | "parents" | "admins" | "students",
  ) => {
    setSpecifics((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    // Clear errors
    setErrors((prev) => ({ ...prev, specifics: undefined }));
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!noticeTitle.trim()) {
      newErrors.title = "Notice title is required";
    }

    if (!selectedSchool) {
      newErrors.school = "Please select a school";
    }

    if (!noticeContent.trim()) {
      newErrors.content = "Notice content is required";
    }

    if (!targetAudience.general && !targetAudience.private) {
      newErrors.targetAudience = "Please select a target audience";
    }

    if (targetAudience.private) {
      const hasSpecifics = Object.values(specifics).some(
        (value) => value === true,
      );
      if (!hasSpecifics) {
        newErrors.specifics = "Please select at least one specific audience";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setNoticeTitle("");
    setSelectedSchool("");
    setTargetAudience({ general: false, private: false });
    setSpecifics({
      teachers: false,
      parents: false,
      admins: false,
      students: false,
    });
    setNoticeContent("");
    setIsPriorityAlert(false);
    setErrors({});
  };

  const handleSubmit = async () => {
    // Validate form
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      // Map form data to API structure
      const targetAudienceValue = targetAudience.general
        ? "general"
        : "private";
      const specificsRoles: string[] = [];

      if (targetAudience.private) {
        Object.entries(specifics).forEach(([key, value]) => {
          if (value && ROLE_MAPPING[key]) {
            specificsRoles.push(ROLE_MAPPING[key]);
          }
        });
      }

      // Build payload - backend accepts target_audience and specifics
      const payload: CreateNotifications & {
        target_audience?: string;
        specifics?: string[];
      } = {
        school_id: selectedSchool,
        title: noticeTitle.trim(),
        content: noticeContent.trim(),
        type: isPriorityAlert ? "warning" : "info", // Set to "warning" for priority alerts, "info" otherwise
        status: "active", // Default status
        classes: [], // Empty array for now, can be extended later
        target_audience: targetAudienceValue,
        specifics: specificsRoles, // Empty array if no specifics selected
      };

      const response = await createNotification(payload as any).unwrap();

      if (response.status) {
        toast.success(response.message || "Notice created successfully!");
        resetForm();
      } else {
        throw new Error(response.message || "Failed to create notice");
      }
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Failed to create notice. Please try again.";
      toast.error(errorMessage);
      console.error("Error creating notification:", error);
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Create New School Notice
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Notice Title */}
        <div className="space-y-2">
          <InputField
            id="notice-title"
            label="Notice Title"
            placeholder="E.g., Mandatory Staff Meeting - Q4 Planning"
            value={noticeTitle}
            onChange={(e) => {
              setNoticeTitle(e.target.value);
              setErrors((prev) => ({ ...prev, title: undefined }));
            }}
            className="h-11"
            required
          />
          {errors.title && (
            <p className="text-sm text-red-600 px-1">{errors.title}</p>
          )}
        </div>

        {/* Select School */}
        <div className="space-y-2">
          <SelectField
            label="School"
            placeholder={
              isLoadingSchools ? "Loading schools..." : "Select a school"
            }
            value={selectedSchool}
            onValueChange={(value) => {
              setSelectedSchool(value);
              setErrors((prev) => ({ ...prev, school: undefined }));
            }}
            required
          >
            {schools.map((school) => (
              <SelectItem key={school.id} value={school.id}>
                {school.name}
              </SelectItem>
            ))}
          </SelectField>
          {errors.school && (
            <p className="text-sm text-red-600 px-1">{errors.school}</p>
          )}
        </div>

        {/* Select Target Audience */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">
            Select Target Audience <span className="text-red-600">*</span>
          </Label>
          <div className="flex flex-row space-x-5">
            <CheckboxField
              id="general-announcement"
              label="General announcement"
              checked={targetAudience.general}
              onCheckedChange={() => handleTargetAudienceChange("general")}
            />
            <CheckboxField
              id="private"
              label="Private"
              checked={targetAudience.private}
              onCheckedChange={() => handleTargetAudienceChange("private")}
            />
          </div>
          {errors.targetAudience && (
            <p className="text-sm text-red-600 px-1">{errors.targetAudience}</p>
          )}
        </div>

        {/* Specifics - Only show when Private is checked */}
        {targetAudience.private && (
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              Specifics <span className="text-red-600">*</span>
            </Label>
            <div className="flex flex-row flex-wrap gap-5">
              <CheckboxField
                id="teachers"
                label="Teachers"
                checked={specifics.teachers}
                onCheckedChange={() => handleSpecificsChange("teachers")}
              />
              <CheckboxField
                id="parents"
                label="Parents"
                checked={specifics.parents}
                onCheckedChange={() => handleSpecificsChange("parents")}
              />
              <CheckboxField
                id="admins"
                label="Admins"
                checked={specifics.admins}
                onCheckedChange={() => handleSpecificsChange("admins")}
              />
              <CheckboxField
                id="students"
                label="Students"
                checked={specifics.students}
                onCheckedChange={() => handleSpecificsChange("students")}
              />
            </div>
            {errors.specifics && (
              <p className="text-sm text-red-600 px-1">{errors.specifics}</p>
            )}
          </div>
        )}

        {/* Notice Content */}
        <div className="space-y-2">
          <TextareaField
            id="notice-content"
            label="Notice Content"
            placeholder="Enter the full details of your announcement here."
            value={noticeContent}
            onChange={(e) => {
              setNoticeContent(e.target.value);
              setErrors((prev) => ({ ...prev, content: undefined }));
            }}
            rows={6}
            className="min-h-32"
            required
          />
          {errors.content && (
            <p className="text-sm text-red-600 px-1">{errors.content}</p>
          )}
        </div>

        {/* Priority Alert & Memo Checkbox */}
        <div className="space-y-2">
          <CheckboxField
            id="priority-alert"
            label="Add to Priority Alerts & Memos"
            checked={isPriorityAlert}
            onCheckedChange={(checked) => setIsPriorityAlert(checked)}
          />
          <p className="text-xs text-gray-500 px-1">
            When checked, this notice will appear in the Priority Alerts & Memos
            section
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="px-6"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="px-6 bg-main-blue hover:bg-main-blue/90"
            disabled={isSubmitting || isLoadingSchools}
          >
            {isSubmitting ? "Posting..." : "Post Notice"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewNoticeBoard;
