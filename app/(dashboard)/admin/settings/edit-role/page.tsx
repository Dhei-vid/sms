"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { StepNavigation, Step } from "@/components/ui/step-navigation";
import { Edit01Icon, UserIcon } from "@hugeicons/core-free-icons";
import { TemplateSelectionForm } from "@/components/dashboard-pages/admin/settings/edit-role/template-selection-form";
import { ModulePermissionsForm } from "@/components/dashboard-pages/admin/settings/edit-role/module-permissions-form";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slices/authSlice";
import {
  useGetSchoolsQuery,
  useGetSchoolRoleTemplateModulesQuery,
  useGetSchoolRoleTemplatesQuery,
  useGetSchoolRoleTemplateQuery,
  useUpdateSchoolRoleTemplateMutation,
} from "@/services/schools/schools";
import type { ApiResponse } from "@/services/shared-types";
import type {
  RoleTemplate,
  RoleTemplateModulesResponse,
  RoleTemplatesListResponse,
  RoleTemplateModulePermission,
  School,
} from "@/services/schools/schools-type";
import { toast } from "sonner";

function getSchoolsList(data: unknown): School[] {
  if (!data || typeof data !== "object") return [];
  const d = data as { data?: School[] | { data?: School[] } };
  if (Array.isArray(d.data)) return d.data;
  if (d.data && typeof d.data === "object" && Array.isArray((d.data as { data?: School[] }).data)) {
    return (d.data as { data: School[] }).data;
  }
  return [];
}

type StepId = "template-selection" | "module-permissions";

interface ModulePermission {
  module: string;
  readOnly: boolean;
  readWrite: boolean;
  none: boolean;
}

const steps: Step[] = [
  { id: "template-selection", label: "Template Selection", icon: Edit01Icon },
  { id: "module-permissions", label: "Module Permissions", icon: UserIcon },
];

function toModulePermission(m: RoleTemplateModulePermission): ModulePermission {
  return {
    module: m.module ?? "",
    readOnly: !!m.readOnly,
    readWrite: !!m.readWrite,
    none: !!m.none,
  };
}

function toApiModulePermission(p: ModulePermission): RoleTemplateModulePermission {
  return {
    module: p.module,
    readOnly: p.readOnly,
    readWrite: p.readWrite,
    none: p.none,
  };
}

export default function EditRolePage() {
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const userSchoolId = user?.school_id ?? "";

  const [activeStep, setActiveStep] = useState<StepId>("template-selection");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [templateDescription, setTemplateDescription] = useState("");
  const [permissions, setPermissions] = useState<ModulePermission[]>([]);

  const { data: schoolsResponse } = useGetSchoolsQuery(undefined, {
    skip: !!userSchoolId,
  });
  const schoolsList = useMemo(
    () => getSchoolsList(schoolsResponse),
    [schoolsResponse],
  );
  const firstSchoolId = schoolsList[0]?.id ?? "";
  const schoolId = userSchoolId || firstSchoolId;

  const { data: modulesResponse, isError: modulesError } =
    useGetSchoolRoleTemplateModulesQuery(schoolId, { skip: !schoolId });
  const { data: listResponse, isLoading: listLoading, isError: listError } =
    useGetSchoolRoleTemplatesQuery(schoolId, { skip: !schoolId });
  const { data: detailResponse, isLoading: detailLoading } =
    useGetSchoolRoleTemplateQuery(
      { schoolId, templateId: selectedTemplate },
      { skip: !schoolId || !selectedTemplate },
    );
  const [updateTemplate, { isLoading: isSaving }] =
    useUpdateSchoolRoleTemplateMutation();

  const roleTemplates =
    (listResponse as RoleTemplatesListResponse | undefined)?.roleTemplates ?? [];
  const modulesFromApi =
    (modulesResponse as RoleTemplateModulesResponse | undefined)?.modules ??
    (listResponse as RoleTemplatesListResponse | undefined)?.modules ??
    [];
  const templateOptions = useMemo(() => {
    const list = Array.isArray(roleTemplates) ? roleTemplates : [];
    return list.map((t: { id?: string; name?: string }) => ({
      value: t?.id ?? "",
      label: t?.name || t?.id || "",
    }));
  }, [roleTemplates]);

  const loadedTemplate = (detailResponse as ApiResponse<RoleTemplate> | undefined)?.data;

  // Initialize permissions when we have modules from API (and no permissions yet)
  useEffect(() => {
    if (modulesFromApi.length > 0 && permissions.length === 0 && !loadedTemplate) {
      setPermissions(
        modulesFromApi.map((module) => ({
          module,
          readOnly: false,
          readWrite: false,
          none: true,
        })),
      );
    }
  }, [modulesFromApi, loadedTemplate]);

  // When template detail loads, fill name, description, and permissions (ordered by backend modules)
  useEffect(() => {
    if (!loadedTemplate || modulesFromApi.length === 0) return;
    setTemplateName(loadedTemplate.name ?? "");
    setTemplateDescription(loadedTemplate.description ?? "");
    const perms = loadedTemplate.modulePermissions ?? [];
    const ordered = modulesFromApi.map((module) => {
      const found = perms.find((p) => p.module === module);
      if (found) return toModulePermission(found);
      return { module, readOnly: false, readWrite: false, none: true };
    });
    setPermissions(ordered);
  }, [loadedTemplate, modulesFromApi]);

  const handlePermissionChange = (
    moduleIndex: number,
    permissionType: "readOnly" | "readWrite" | "none",
  ) => {
    const base =
      permissions.length === modulesFromApi.length ? permissions : permissionsForForm;
    const newPermissions = base.map((p, i) =>
      i === moduleIndex
        ? {
            ...p,
            readOnly: permissionType === "readOnly",
            readWrite: permissionType === "readWrite",
            none: permissionType === "none",
          }
        : p,
    );
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

  // Permissions array for the form: same length as modules (pad with defaults if needed)
  const permissionsForForm = useMemo(() => {
    if (modulesFromApi.length === 0) return [];
    if (permissions.length === modulesFromApi.length) return permissions;
    return modulesFromApi.map((module, i) => {
      const p = permissions[i];
      if (p && p.module === module) return p;
      return {
        module,
        readOnly: false,
        readWrite: false,
        none: true,
      };
    });
  }, [modulesFromApi, permissions]);

  const handleSaveTemplate = async () => {
    if (!schoolId || !selectedTemplate) {
      toast.error("Please select a template to save.");
      return;
    }
    try {
      await updateTemplate({
        schoolId,
        templateId: selectedTemplate,
        data: {
          id: selectedTemplate,
          name: templateName || selectedTemplate,
          description: templateDescription,
          modulePermissions: permissionsForForm.map(toApiModulePermission),
        },
      }).unwrap();
      toast.success("Role template saved.");
      router.push("/admin/settings");
    } catch {
      toast.error("Failed to save role template.");
    }
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
                  {!schoolId ? (
                    <div className="py-6 text-center text-muted-foreground text-sm">
                      No school available. Link your account to a school or create one first.
                    </div>
                  ) : listError ? (
                    <div className="py-6 text-center text-destructive text-sm">
                      Failed to load templates. Check your connection and try again.
                    </div>
                  ) : listLoading ? (
                    <div className="py-6 text-center text-muted-foreground text-sm">
                      Loading templates…
                    </div>
                  ) : (
                    <TemplateSelectionForm
                      selectedTemplate={selectedTemplate}
                      templateName={templateName}
                      templateDescription={templateDescription}
                      onTemplateChange={setSelectedTemplate}
                      onTemplateNameChange={setTemplateName}
                      onTemplateDescriptionChange={setTemplateDescription}
                      templateOptions={templateOptions}
                    />
                  )}

                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={handleBack}>
                      Back
                    </Button>
                    <Button
                      className="w-60"
                      onClick={handleNext}
                      disabled={!selectedTemplate || detailLoading}
                    >
                      {detailLoading ? "Loading…" : "Next"}
                    </Button>
                  </div>
                </div>
              )}

              {activeStep === "module-permissions" && (
                <div className="space-y-6">
                  {!schoolId ? (
                    <div className="py-6 text-center text-muted-foreground text-sm">
                      No school available.
                    </div>
                  ) : modulesError ? (
                    <div className="py-6 text-center text-destructive text-sm">
                      Failed to load permission modules. Try again later.
                    </div>
                  ) : modulesFromApi.length === 0 && !listLoading ? (
                    <div className="py-6 text-center text-muted-foreground text-sm">
                      No permission modules available. They may still be loading.
                    </div>
                  ) : modulesFromApi.length === 0 ? (
                    <div className="py-6 text-center text-muted-foreground text-sm">
                      Loading modules…
                    </div>
                  ) : (
                    <ModulePermissionsForm
                      modules={modulesFromApi}
                      permissions={permissionsForForm}
                      onPermissionChange={handlePermissionChange}
                    />
                  )}

                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={handleBack}>
                      Back
                    </Button>
                    <Button
                      className="w-60"
                      onClick={handleSaveTemplate}
                      disabled={isSaving}
                    >
                      {isSaving ? "Saving…" : "Save Template"}
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
