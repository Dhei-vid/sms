"use client";

import { Checkbox } from "@/components/ui/checkbox";

interface ModulePermission {
  module: string;
  readOnly: boolean;
  readWrite: boolean;
  none: boolean;
}

interface ModulePermissionsFormProps {
  /** Module names from backend (GET role-templates response.modules). */
  modules: string[];
  permissions: ModulePermission[];
  onPermissionChange: (
    moduleIndex: number,
    permissionType: "readOnly" | "readWrite" | "none",
  ) => void;
}

export function ModulePermissionsForm({
  modules,
  permissions,
  onPermissionChange,
}: ModulePermissionsFormProps) {
  return (
    <div className="space-y-4">
      {modules.map((module, index) => {
        const modulePermission = permissions[index];
        return (
          <div
            key={module}
            className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
          >
            <span className="text-sm font-medium text-gray-800 flex-1">
              {module}
            </span>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={modulePermission.readOnly}
                  onCheckedChange={() => onPermissionChange(index, "readOnly")}
                />
                <span className="text-sm text-gray-700">Read-Only</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={modulePermission.readWrite}
                  onCheckedChange={() => onPermissionChange(index, "readWrite")}
                />
                <span className="text-sm text-gray-700">Read & Write</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={modulePermission.none}
                  onCheckedChange={() => onPermissionChange(index, "none")}
                />
                <span className="text-sm text-gray-700">None</span>
              </label>
            </div>
          </div>
        );
      })}
    </div>
  );
}
