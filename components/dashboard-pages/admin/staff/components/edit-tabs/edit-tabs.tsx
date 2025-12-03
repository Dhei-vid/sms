"use client";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/general/huge-icon";
import {
  User03Icon,
  Briefcase01Icon,
  TransactionHistoryIcon,
  DocumentValidationIcon,
} from "@hugeicons/core-free-icons";

type TabId = "contact" | "employment" | "permissions" | "financial";

interface Tab {
  id: TabId;
  label: string;
  icon: any;
}

const tabs: Tab[] = [
  { id: "contact", label: "Contact Information", icon: User03Icon },
  {
    id: "employment",
    label: "Employment & Role",
    icon: TransactionHistoryIcon,
  },
  {
    id: "permissions",
    label: "System Permissions",
    icon: DocumentValidationIcon,
  },
  {
    id: "financial",
    label: "Financial & Payroll",
    icon: TransactionHistoryIcon,
  },
];

interface EditTabsProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export function EditTabs({ activeTab, onTabChange }: EditTabsProps) {
  return (
    <div className="flex flex-col gap-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "cursor-pointer flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors rounded-md",
            activeTab === tab.id
              ? "bg-main-blue/5 text-main-blue"
              : "text-gray-600 hover:bg-main-blue/5 hover:text-main-blue"
          )}
        >
          <Icon icon={tab.icon} size={18} />
          {tab.label}
        </button>
      ))}
    </div>
  );
}
