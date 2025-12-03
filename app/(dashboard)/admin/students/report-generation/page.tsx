"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReportTable } from "@/components/dashboard-pages/admin/students/components/report-table";
import { Icon } from "@/components/general/huge-icon";
import { FilterIcon, Csv02Icon } from "@hugeicons/core-free-icons";

interface StudentReport {
  id: string;
  name: string;
  schoolId: string;
  academicGrade: string;
  reportStatus: "completed" | "in-progress";
  progress?: number;
  dateGenerated: string;
  timeGenerated: string;
}

const sampleReports: StudentReport[] = [
  {
    id: "1",
    name: "Chinedu Nwokodi",
    schoolId: "nwokodi.m178023",
    academicGrade: "B+",
    reportStatus: "in-progress",
    progress: 70,
    dateGenerated: "Oct. 10, 2025",
    timeGenerated: "08:15 AM",
  },
  {
    id: "2",
    name: "Adebisi Deborah",
    schoolId: "adebisi.m178024",
    academicGrade: "B-",
    reportStatus: "in-progress",
    progress: 60,
    dateGenerated: "Oct. 10, 2025",
    timeGenerated: "08:15 AM",
  },
  {
    id: "3",
    name: "Dauda Ahfiz",
    schoolId: "ahfiz.m178025",
    academicGrade: "A+",
    reportStatus: "in-progress",
    progress: 80,
    dateGenerated: "Oct. 10, 2025",
    timeGenerated: "08:15 AM",
  },
  {
    id: "4",
    name: "Sarah Collins",
    schoolId: "collins.m178026",
    academicGrade: "A",
    reportStatus: "in-progress",
    progress: 40,
    dateGenerated: "Oct. 10, 2025",
    timeGenerated: "08:15 AM",
  },
  {
    id: "5",
    name: "John Terjiri",
    schoolId: "terjiri.m178027",
    academicGrade: "C+",
    reportStatus: "in-progress",
    progress: 75,
    dateGenerated: "Oct. 10, 2025",
    timeGenerated: "08:15 AM",
  },
  {
    id: "6",
    name: "Chinedu Nwokodi",
    schoolId: "nwokodi.m178023",
    academicGrade: "B+",
    reportStatus: "in-progress",
    progress: 70,
    dateGenerated: "Oct. 10, 2025",
    timeGenerated: "08:15 AM",
  },
  {
    id: "7",
    name: "Adebisi Deborah",
    schoolId: "adebisi.m178024",
    academicGrade: "B-",
    reportStatus: "completed",
    dateGenerated: "Oct. 10, 2025",
    timeGenerated: "08:15 AM",
  },
  {
    id: "8",
    name: "Dauda Ahfiz",
    schoolId: "ahfiz.m178025",
    academicGrade: "A+",
    reportStatus: "completed",
    dateGenerated: "Oct. 10, 2025",
    timeGenerated: "08:15 AM",
  },
];

export default function ReportGenerationPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Report Generation - SS 3 Second Term
        </h2>
        <p className="text-gray-600 mt-1">
          Manage the generation, distribution, and archival of all student
          academic reports.
        </p>
      </div>

      {/* All Student Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">All Student</CardTitle>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2">
                <Icon icon={FilterIcon} size={16} />
                Sort by
              </Button>
              <Button variant="outline" className="gap-2">
                <Icon icon={Csv02Icon} size={16} />
                Download all
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ReportTable students={sampleReports} />
        </CardContent>
      </Card>
    </div>
  );
}
