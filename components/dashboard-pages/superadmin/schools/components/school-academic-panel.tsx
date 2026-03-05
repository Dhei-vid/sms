"use client";

import type { School } from "@/services/schools/schools-type";
import type { KeyValueRow } from "../school-detail-types";
import { SchoolDetailKeyValueTable } from "./school-detail-key-value-table";

function buildAcademicRows(school: School): KeyValueRow[] {
  const term = school.term;
  return [
    { label: "Number of Terms", value: term?.name ?? "—" },
    { label: "Accreditation", value: school.accreditation_number ?? "—" },
    { label: "License", value: school.license_number ?? "—" },
    {
      label: "Student Capacity",
      value: String(school.student_capacity ?? "—"),
    },
    { label: "Staff Capacity", value: "—" },
  ];
}

interface SchoolAcademicPanelProps {
  school: School;
}

export function SchoolAcademicPanel({ school }: SchoolAcademicPanelProps) {
  const rows = buildAcademicRows(school);
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">
        Academic Information
      </h2>
      <SchoolDetailKeyValueTable rows={rows} />
    </div>
  );
}
