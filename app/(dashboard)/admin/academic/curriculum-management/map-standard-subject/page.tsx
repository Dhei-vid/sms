"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { StepNavigation, Step } from "@/components/ui/step-navigation";
import { SelectField } from "@/components/ui/input-field";
import { SelectItem } from "@/components/ui/select";
import {
  DataTable,
  TableColumn,
  TableAction,
} from "@/components/ui/data-table";
import { format } from "date-fns";
import { AssignmentsIcon, ResourcesAddIcon } from "@hugeicons/core-free-icons";

type StepId = "standards-mapping" | "draft-outlines";

const steps: Step[] = [
  {
    id: "standards-mapping",
    label: "Standards Mapping",
    icon: ResourcesAddIcon,
  },
  {
    id: "draft-outlines",
    label: "Draft Subject Outlines",
    icon: AssignmentsIcon,
  },
];

interface DraftOutline {
  id: string;
  subjectName: string;
  applicableGrades: string[];
  lastEditedBy: string;
  lastModifiedDate: Date;
}

interface MappingRow {
  id: string;
  internalUnit: string;
  internalTopic: string;
  externalStandard: string;
}

const draftOutlinesData: DraftOutline[] = [
  {
    id: "1",
    subjectName: "Further Mathematics",
    applicableGrades: ["SS 1", "SS 2", "SS 3"],
    lastEditedBy: "Dr. Femi I. (HOD)",
    lastModifiedDate: new Date(2025, 10, 4, 16, 30),
  },
  {
    id: "2",
    subjectName: "Integrated Science",
    applicableGrades: ["JS 1", "JS 2", "JS 3"],
    lastEditedBy: "Ms. Kara A. (Academic Admin)",
    lastModifiedDate: new Date(2025, 10, 4, 16, 30),
  },
];

const mappingData: MappingRow[] = [
  {
    id: "1",
    internalUnit: "Unit 3: Plant Life",
    internalTopic: "Topic 3.1: Photosynthesis",
    externalStandard:
      "WAEC Objective 4.2: Describe the process of photosynthesis.",
  },
  {
    id: "2",
    internalUnit: "Unit 3: Plant Life",
    internalTopic: "Topic 3.1: Photosynthesis",
    externalStandard:
      "WAEC Objective 4.2: Describe the process of photosynthesis.",
  },
  {
    id: "3",
    internalUnit: "Unit 3: Plant Life",
    internalTopic: "Topic 3.1: Photosynthesis",
    externalStandard:
      "WAEC Objective 4.2: Describe the process of photosynthesis.",
  },
  {
    id: "4",
    internalUnit: "Unit 3: Plant Life",
    internalTopic: "Topic 3.1: Photosynthesis",
    externalStandard:
      "WAEC Objective 4.2: Describe the process of photosynthesis.",
  },
  {
    id: "5",
    internalUnit: "Unit 3: Plant Life",
    internalTopic: "Topic 3.1: Photosynthesis",
    externalStandard:
      "WAEC Objective 4.2: Describe the process of photosynthesis.",
  },
];

const subjectOptions = [
  { value: "ss2-biology", label: "SS2 Biology" },
  { value: "ss2-chemistry", label: "SS2 Chemistry" },
  { value: "ss2-physics", label: "SS2 Physics" },
  { value: "jss2-integrated-science", label: "JSS2 Integrated Science" },
];

const standardOptions = [
  { value: "waec-2026", label: "WAEC 2026 Syllabus" },
  { value: "national-curriculum", label: "National Curriculum" },
  { value: "q4", label: "Q4" },
];

export default function MapStandardSubjectPage() {
  const [activeStep, setActiveStep] = useState<StepId>("standards-mapping");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedStandard, setSelectedStandard] = useState<string>("");

  const handleStepChange = (stepId: string) => {
    setActiveStep(stepId as StepId);
  };

  const draftOutlinesColumns: TableColumn<DraftOutline>[] = [
    {
      key: "subjectName",
      title: "Subject Name",
      className: "font-medium",
    },
    {
      key: "applicableGrades",
      title: "Applicable Grade(s)",
      render: (value) => <span className="text-sm">{value.join(", ")}</span>,
    },
    {
      key: "lastEditedBy",
      title: "Last Edited By",
    },
    {
      key: "lastModifiedDate",
      title: "Last Modified Date",
      render: (value) => (
        <div className="flex flex-col gap-1">
          <p className="text-sm">{format(value, "LLL. d, yyyy")}</p>
          <p className="text-xs text-gray-500 font-light">
            {format(value, "h:mm a")}
          </p>
        </div>
      ),
    },
  ];

  const draftOutlinesActions: TableAction<DraftOutline>[] = [
    {
      type: "link",
      config: {
        label: "Continue Editing",
        href: (row) =>
          `/admin/academic/curriculum-management/add-edit-subject-outline?id=${row.id}`,
        className: "text-main-blue hover:text-main-blue/80",
      },
    },
  ];

  const mappingColumns: TableColumn<MappingRow>[] = [
    {
      key: "internal",
      title: "Subject: SS2 Biology - Internal Curriculum",
      render: (value, row) => (
        <div className="space-y-1">
          <p className="text-sm font-medium">{row.internalUnit}</p>
          <p className="text-sm text-gray-600">{row.internalTopic}</p>
        </div>
      ),
    },
    {
      key: "externalStandard",
      title: "External Standard - WAEC 2026 Syllabus",
      render: (value) => <p className="text-sm">{value}</p>,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Map Standard to Subject
        </h2>
        <p className="text-gray-600 mt-1">
          This is a critical process for accreditation and ensuring educational
          quality.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Navigation */}
        <div className="lg:col-span-1">
          <Card className="bg-background p-0">
            <CardContent className="px-2 py-4">
              <StepNavigation
                steps={steps}
                activeStep={activeStep}
                onStepChange={handleStepChange}
                orientation="vertical"
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-3">
          <Card className="p-0 bg-background">
            <CardContent className="p-6">
              {activeStep === "standards-mapping" ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Standards Mapping Interface
                    </h3>

                    <div className="space-y-4">
                      <SelectField
                        label="Select Subject"
                        value={selectedSubject}
                        onValueChange={setSelectedSubject}
                        placeholder="Choose Subject (e.g., SS2 Biology)"
                      >
                        {subjectOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectField>

                      <SelectField
                        label="Select Standard"
                        value={selectedStandard}
                        onValueChange={setSelectedStandard}
                        placeholder="Choose Standard (e.g., WAEC 2026 Syllabus, National Curriculum, Q4)"
                      >
                        {standardOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectField>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-800">
                      Mapping Table
                    </h4>
                    <div className="border rounded-lg overflow-hidden">
                      <DataTable
                        columns={mappingColumns}
                        data={mappingData}
                        emptyMessage="No mappings available. Select a subject and standard to begin."
                        tableClassName="border-collapse"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Draft Subject Outlines Access ({draftOutlinesData.length})
                    </h3>
                  </div>
                  <div className="border rounded-lg overflow-hidden">
                    <DataTable
                      columns={draftOutlinesColumns}
                      data={draftOutlinesData}
                      actions={draftOutlinesActions}
                      emptyMessage="No draft subject outlines available."
                      tableClassName="border-collapse"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
