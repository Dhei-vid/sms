"use client";

import { useState } from "react";
import { InputField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TermSemesterConfigModal } from "./term-semester-config-modal";
import { LetterGradeDefinitionsModal } from "./letter-grade-definitions-modal";

interface GradingScalesFormProps {
  onAddGradeLevel: () => void;
  numberOfTerms?: number;
}

export function GradingScalesForm({
  onAddGradeLevel,
  numberOfTerms = 3,
}: GradingScalesFormProps) {
  const [gradeName, setGradeName] = useState("");
  const [upperPercentage, setUpperPercentage] = useState("");
  const [lowerPercentage, setLowerPercentage] = useState("");
  const [remark, setRemark] = useState("");
  const [termModalOpen, setTermModalOpen] = useState(false);
  const [gradeTableModalOpen, setGradeTableModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          Grading Scales Configuration
        </h3>
        <Button
          variant="outline"
          onClick={() => setGradeTableModalOpen(true)}
        >
          See Grade Table
        </Button>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-800 mb-4">
          Letter Grade Definitions
        </h4>
        <p className="text-sm text-gray-600 mb-6">
          Define a new grade level by filling in the fields below.
        </p>
      </div>

      <div className="space-y-6">
        <InputField
          label="Grade Name"
          value={gradeName}
          onChange={(e) => setGradeName(e.target.value)}
          placeholder="placeholder"
        />

        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-800">
            Percentage Boundary
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Upper percentage"
              type="number"
              value={upperPercentage}
              onChange={(e) => setUpperPercentage(e.target.value)}
              placeholder="placeholder"
            />
            <InputField
              label="Lower Percentage"
              type="number"
              value={lowerPercentage}
              onChange={(e) => setLowerPercentage(e.target.value)}
              placeholder="placeholder"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Numerical Grade Point (GPA Value)</Label>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => setTermModalOpen(true)}
          >
            Placeholder
          </Button>
        </div>

        <InputField
          label="Principal/HOD Remark"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          placeholder="Placeholder"
        />
      </div>

      {/* Term/Semester Configuration Modal */}
      <TermSemesterConfigModal
        open={termModalOpen}
        onOpenChange={setTermModalOpen}
        numberOfTerms={numberOfTerms}
        onConfirm={(terms) => {
          console.log("Terms configured:", terms);
          // Handle term configuration
        }}
      />

      {/* Letter Grade Definitions Modal */}
      <LetterGradeDefinitionsModal
        open={gradeTableModalOpen}
        onOpenChange={setGradeTableModalOpen}
        onEditGrade={(gradeId) => {
          console.log("Edit grade:", gradeId);
          // Handle edit grade action
        }}
      />
    </div>
  );
}

