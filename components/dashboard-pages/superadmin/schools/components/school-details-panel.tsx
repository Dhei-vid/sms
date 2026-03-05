"use client";

import { format, parseISO } from "date-fns";
import type { School } from "@/services/schools/schools-type";
import type { KeyValueRow } from "../school-detail-types";
import { SchoolDetailKeyValueTable } from "./school-detail-key-value-table";

function formatDate(value: string | null | undefined): string {
  if (!value) return "—";
  try {
    return format(parseISO(value), "MMM d, yyyy");
  } catch {
    return value;
  }
}

function capitalize(s: string): string {
  return String(s).charAt(0).toUpperCase() + String(s).slice(1);
}

function buildDetailsRows(school: School): KeyValueRow[] {
  const websiteValue = school.website ? (
    <a
      href={
        school.website.startsWith("http")
          ? school.website
          : `https://${school.website}`
      }
      target="_blank"
      rel="noopener noreferrer"
      className="text-main-blue hover:underline"
    >
      {school.website}
    </a>
  ) : (
    "—"
  );

  return [
    { label: "School Full Name", value: school.name ?? "—" },
    { label: "School Email", value: school.email ?? "—" },
    { label: "School Address", value: school.address ?? "—" },
    { label: "Primary Contact", value: school.phone ?? "—" },
    {
      label: "School Type",
      value: school.type ? capitalize(school.type) : "—",
    },
    { label: "Established", value: formatDate(school.established_date) },
    { label: "Website", value: websiteValue },
  ];
}

interface SchoolDetailsPanelProps {
  school: School;
}

export function SchoolDetailsPanel({ school }: SchoolDetailsPanelProps) {
  const rows = buildDetailsRows(school);
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">School Details</h2>
      <SchoolDetailKeyValueTable rows={rows} />
    </div>
  );
}
