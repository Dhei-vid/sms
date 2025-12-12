"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface QuestionSelectionFormProps {
  formData: {
    questionShuffle: boolean;
    answerShuffle: boolean;
    partialCredit: boolean;
  };
  onFormDataChange: (
    data: Partial<QuestionSelectionFormProps["formData"]>
  ) => void;
  onBack: () => void;
  onCancel: () => void;
  onNext: () => void;
}

export function QuestionSelectionForm({
  formData,
  onFormDataChange,
  onBack,
  onCancel,
  onNext,
}: QuestionSelectionFormProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">
        Question Selection & Randomization
      </h3>

      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4 p-4 border rounded-lg">
          <div className="flex-1">
            <Label className="text-sm font-semibold text-gray-800 mb-1 block">
              Question Shuffle
            </Label>
            <p className="text-sm text-gray-600">
              Randomizes the order of questions for each student.
            </p>
          </div>
          <Checkbox
            checked={formData.questionShuffle}
            onCheckedChange={(checked) =>
              onFormDataChange({ questionShuffle: checked === true })
            }
            className="mt-1"
          />
        </div>

        <div className="flex items-start justify-between gap-4 p-4 border rounded-lg">
          <div className="flex-1">
            <Label className="text-sm font-semibold text-gray-800 mb-1 block">
              Answer Shuffle
            </Label>
            <p className="text-sm text-gray-600">
              Randomizes the options (A, B, C, D) for each question.
            </p>
          </div>
          <Checkbox
            checked={formData.answerShuffle}
            onCheckedChange={(checked) =>
              onFormDataChange({ answerShuffle: checked === true })
            }
            className="mt-1"
          />
        </div>

        <div className="flex items-start justify-between gap-4 p-4 border rounded-lg">
          <div className="flex-1">
            <Label className="text-sm font-semibold text-gray-800 mb-1 block">
              Partial Credit
            </Label>
            <p className="text-sm text-gray-600">
              Allows for partial scores on multi-select or matching question
              types.
            </p>
          </div>
          <Checkbox
            checked={formData.partialCredit}
            onCheckedChange={(checked) =>
              onFormDataChange({ partialCredit: checked === true })
            }
            className="mt-1"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button className="w-60" onClick={onNext}>
          Next
        </Button>
      </div>
    </div>
  );
}
