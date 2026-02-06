"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputField, TextareaField } from "@/components/ui/input-field";
import { Label } from "@/components/ui/label";
import { CheckboxField } from "../../../ui/checkbox-field";

const NewNoticeBoard = () => {
  const [noticeTitle, setNoticeTitle] = useState("");
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

  const handleTargetAudienceChange = (key: "general" | "private") => {
    setTargetAudience((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSpecificsChange = (
    key: "teachers" | "parents" | "admins" | "students",
  ) => {
    setSpecifics((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log({
      noticeTitle,
      targetAudience,
      specifics,
      noticeContent,
    });
  };

  const handleCancel = () => {
    // Reset form
    setNoticeTitle("");
    setTargetAudience({ general: false, private: false });
    setSpecifics({
      teachers: false,
      parents: false,
      admins: false,
      students: false,
    });
    setNoticeContent("");
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
        <InputField
          id="notice-title"
          label="Notice Title"
          placeholder="E.g., Mandatory Staff Meeting - Q4 Planning"
          value={noticeTitle}
          onChange={(e) => setNoticeTitle(e.target.value)}
          className="h-11"
        />

        {/* Select Target Audience */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">
            Select Target Audience
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
        </div>

        {/* Specifics - Only show when Private is checked */}
        {targetAudience.private && (
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              Specifics
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
          </div>
        )}

        {/* Notice Content */}
        <TextareaField
          id="notice-content"
          label="Notice Content"
          placeholder="Enter the full details of your announcement here."
          value={noticeContent}
          onChange={(e) => setNoticeContent(e.target.value)}
          rows={6}
          className="min-h-32"
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={handleCancel} className="px-6">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="px-6 bg-main-blue hover:bg-main-blue/90"
          >
            Post Notice
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewNoticeBoard;
