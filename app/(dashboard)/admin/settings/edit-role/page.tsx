"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { StepNavigation, Step } from "@/components/ui/step-navigation";
import { Edit01Icon, UserIcon } from "@hugeicons/core-free-icons";
import { TemplateSelectionForm } from "@/components/dashboard-pages/admin/settings/edit-role/template-selection-form";
import { ModulePermissionsForm } from "@/components/dashboard-pages/admin/settings/edit-role/module-permissions-form";

type StepId = "template-selection" | "module-permissions";

interface ModulePermission {
  module: string;
  readOnly: boolean;
  readWrite: boolean;
  none: boolean;
}

const modules = [
  "Assessment & Grading",
  "System Settings",
  "CBT Management",
  "LMS Management",
  "Academic Management",
  "Staff Management",
  "Admissions and Students",
  "Finance Management",
];

const steps: Step[] = [
  {
    id: "template-selection",
    label: "Template Selection",
    icon: Edit01Icon,
  },
  {
    id: "module-permissions",
    label: "Module Permissions",
    icon: UserIcon,
  },
];

export default function EditRolePage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<StepId>("template-selection");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [templateDescription, setTemplateDescription] = useState("");
  const [permissions, setPermissions] = useState<ModulePermission[]>(
    modules.map((module) => ({
      module,
      readOnly: false,
      readWrite: false,
      none: true,
    })),
  );

  const handlePermissionChange = (
    moduleIndex: number,
    permissionType: "readOnly" | "readWrite" | "none",
  ) => {
    const newPermissions = [...permissions];
    const module = newPermissions[moduleIndex];

    // Reset all permissions for this module
    module.readOnly = false;
    module.readWrite = false;
    module.none = false;

    // Set the selected permission
    module[permissionType] = true;

    setPermissions(newPermissions);
  };

  const handleBack = () => {
    if (activeStep === "template-selection") {
      router.push("/admin/settings");
    } else {
      setActiveStep("template-selection");
    }
  };

  const handleNext = () => {
    setActiveStep("module-permissions");
  };

  const handleSaveTemplate = () => {
    console.log("Save template", {
      selectedTemplate,
      templateName,
      templateDescription,
      permissions,
    });
    // Handle save logic
    router.push("/admin/settings");
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Edit Role Templates
        </h2>
        <p className="text-gray-600 mt-1">
          View/Edit pre-defined roles like HOD, Teacher, Exam Officer, etc., to
          standardize access rights.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Step Navigation - Tabs */}
        <div className="lg:col-span-1">
          <Card className="bg-background p-0">
            <CardContent className="px-2 py-4">
              <StepNavigation
                steps={steps}
                activeStep={activeStep}
                onStepChange={(stepId) => setActiveStep(stepId as StepId)}
                orientation="vertical"
              />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          {/* Step Content */}
          <Card>
            <CardContent className="px-6">
              {activeStep === "template-selection" && (
                <div className="space-y-6">
                  <TemplateSelectionForm
                    selectedTemplate={selectedTemplate}
                    templateName={templateName}
                    templateDescription={templateDescription}
                    onTemplateChange={setSelectedTemplate}
                    onTemplateNameChange={setTemplateName}
                    onTemplateDescriptionChange={setTemplateDescription}
                  />

                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={handleBack}>
                      Back
                    </Button>
                    <Button className="w-60" onClick={handleNext}>
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {activeStep === "module-permissions" && (
                <div className="space-y-6">
                  <ModulePermissionsForm
                    permissions={permissions}
                    onPermissionChange={handlePermissionChange}
                  />

                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={handleBack}>
                      Back
                    </Button>
                    <Button className="w-60" onClick={handleSaveTemplate}>
                      Save Template
                    </Button>
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
