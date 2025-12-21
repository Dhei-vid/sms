"use client";

import { useState } from "react";
import { ModalContainer } from "@/components/ui/modal-container";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import { SelectField, InputField } from "@/components/ui/input-field";

export function ReportGenerationModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [generationType, setGenerationType] = useState<string>("end-of-term");
  const [academicTerm, setAcademicTerm] = useState<string>("first-term");
  const [grade, setGrade] = useState<string>("js1");
  const [reportStatus, setReportStatus] = useState<string>("");

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <ModalContainer
      open={isOpen}
      onOpenChange={handleClose}
      size="xl"
      title={
        <div className="flex flex-col">
          <p className="text-lg font-bold">Generate Student Report</p>
          <p className="text-sm">
            Check Report Status before generating any batch.
          </p>
        </div>
      }
      footer={
        <div className="grid grid-cols-2 gap-3 w-full">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              // Logic to generate report goes here
              handleClose();
            }}
          >
            Generate Report
          </Button>
        </div>
      }
    >
      <div className="py-4 space-y-5">
        {/* Generation Type selection */}
        <SelectField
          label="Generation Type"
          placeholder="Select a batch"
          value={generationType}
          onValueChange={setGenerationType}
        >
          {[
            {
              value: "end-of-term",
              label: "End-of-Term Report",
            },
            {
              value: "end-of-midterm",
              label: "End-of-Midterm Report",
            },
            {
              value: "interhouse-sports",
              label: "Interhouse Sports Report",
            },
          ].map((type, index) => (
            <SelectItem key={index} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectField>

        {/* Academic Term Select Field */}
        <SelectField
          label="Academic Term"
          placeholder="Select a term"
          value={academicTerm}
          onValueChange={setAcademicTerm}
        >
          {[
            {
              value: "first-term",
              label: "First Term",
            },
            {
              value: "second-term",
              label: "Second Term",
            },
            {
              value: "third-term",
              label: "Third Term",
            },
          ].map((type, index) => (
            <SelectItem key={index} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectField>

        {/* Grade/Class Select Field */}
        <SelectField
          label="Grade/Class"
          placeholder="Select a grade/class"
          value={grade}
          onValueChange={setGrade}
        >
          {[
            {
              value: "js1",
              label: "JS1",
            },
            {
              value: "js2",
              label: "JS2",
            },
            {
              value: "js3",
              label: "JS3",
            },
            {
              value: "ss1",
              label: "SS1",
            },
            {
              value: "ss2",
              label: "SS2",
            },
            {
              value: "ss3",
              label: "SS3",
            },
          ].map((type, index) => (
            <SelectItem key={index} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectField>

        {/* Report Status Check */}
        <InputField
          label="Report Status Check"
          placeholder="90% completed"
          value={reportStatus}
          onChange={(e) => setReportStatus(e.target.value)}
        />
      </div>
    </ModalContainer>
  );
}
