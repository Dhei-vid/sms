"use client";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/general/huge-icon";
import {
  User03Icon,
  DocumentValidationIcon,
  TransactionHistoryIcon,
  LockPasswordIcon,
} from "@hugeicons/core-free-icons";

type SectionId =
  | "contact"
  | "logistics"
  | "medical"
  | "activity"
  | "results"
  | "password";

interface Section {
  id: SectionId;
  label: string;
  icon: any;
}

const sections: Section[] = [
  { id: "contact", label: "Contact Information", icon: User03Icon },
  {
    id: "logistics",
    label: "Logistics Information",
    icon: TransactionHistoryIcon,
  },
  { id: "medical", label: "Medical Notes", icon: DocumentValidationIcon },
  { id: "activity", label: "Log Major Activity", icon: DocumentValidationIcon },
  {
    id: "results",
    label: "View Students Result",
    icon: TransactionHistoryIcon,
  },
  { id: "password", label: "Reset Password", icon: LockPasswordIcon },
];

interface SchoolFileNavProps {
  activeSection: SectionId;
  onSectionChange: (section: SectionId) => void;
}

export function SchoolFileNav({
  activeSection,
  onSectionChange,
}: SchoolFileNavProps) {
  return (
    <div className="flex flex-col gap-1">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionChange(section.id)}
          className={cn(
            "cursor-pointer flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors rounded-md",
            activeSection === section.id
              ? "bg-main-blue/5 text-main-blue"
              : "text-gray-600 hover:bg-main-blue/5 hover:text-main-blue"
          )}
        >
          <Icon icon={section.icon} size={18} />
          {section.label}
        </button>
      ))}
    </div>
  );
}
