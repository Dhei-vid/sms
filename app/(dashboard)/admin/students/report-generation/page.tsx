"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReportTable } from "@/components/dashboard-pages/admin/students/components/report-table";
import { Icon } from "@/components/general/huge-icon";
import { SelectField } from "@/components/ui/input-field";
import { SelectItem } from "@/components/ui/select";
import { FilterIcon, Csv02Icon } from "@hugeicons/core-free-icons";
import { useGetAllResultsQuery } from "@/services/results/results";

const TERM_OPTIONS = [
  { value: "first-term", label: "First Term" },
  { value: "second-term", label: "Second Term" },
  { value: "third-term", label: "Third Term" },
];

export default function ReportGenerationPage() {
  const searchParams = useSearchParams();
  const [term, setTerm] = useState(searchParams.get("term") ?? "first-term");
  const [session, setSession] = useState(
    searchParams.get("session") ?? new Date().getFullYear().toString(),
  );
  const [classFilter, setClassFilter] = useState(
    searchParams.get("class_name") ?? "ss3",
  );

  const { data: resultData } = useGetAllResultsQuery();

  return (
    <div className="space-y-6">
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {/* Add something here */}
          Report Generation -
        </h2>
        <p className="text-gray-600 mt-1">
          Manage the generation, distribution, and archival of all student
          academic reports.
        </p>
      </div>

      {/* {true && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-700">
              Report status: {reportStatus.studentsWithResults} of{" "}
              {reportStatus.totalStudents} students have results (
              {reportStatus.percentageComplete}% complete).
            </p>
          </CardContent>
        </Card>
      )} */}

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              <SelectField
                label=""
                value={term}
                onValueChange={setTerm}
                placeholder="Term"
              >
                {TERM_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectField>
              <SelectField
                label=""
                value={classFilter}
                onValueChange={setClassFilter}
                placeholder="Class"
              >
                <SelectItem key={"none"} value={"none"}>
                  None
                </SelectItem>
              </SelectField>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Icon icon={FilterIcon} size={16} />
                Sort by
              </Button>
              <Button variant="outline" className="gap-2" onClick={() => {}}>
                <Icon icon={Csv02Icon} size={16} />
                Download all
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {false ? (
            <p className="text-sm text-gray-500 py-8 text-center">
              Loading reports...
            </p>
          ) : [].length === 0 ? (
            <p className="text-sm text-gray-500 py-8 text-center">
              No report cards found for the selected term and class.
            </p>
          ) : (
            <ReportTable students={[]} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
