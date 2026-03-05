"use client";

import { Icon } from "@/components/general/huge-icon";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type {
  SchoolDetailSectionId,
  SchoolDetailSectionConfig,
} from "../school-detail-types";

interface SchoolDetailSectionNavProps {
  sections: SchoolDetailSectionConfig[];
  activeSection: SchoolDetailSectionId;
  onSectionChange: (id: SchoolDetailSectionId) => void;
}

export function SchoolDetailSectionNav({
  sections,
  activeSection,
  onSectionChange,
}: SchoolDetailSectionNavProps) {
  return (
    <Card className="p-3 h-fit">
      <nav className="space-y-1">
        {sections.map((s) => {
          const isActive = activeSection === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onSectionChange(s.id)}
              className={cn(
                "flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors",
                isActive
                  ? "bg-main-blue/10 text-main-blue"
                  : "text-gray-600 hover:bg-main-blue/5 hover:text-gray-800",
              )}
            >
              <Icon icon={s.icon} size={18} />
              {s.label}
            </button>
          );
        })}
      </nav>
    </Card>
  );
}
