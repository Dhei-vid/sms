"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StudentTable } from "@/components/dashboard-pages/admin/students/components/student-table";

export default function AllStudentsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-background rounded-md mb-6 p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          All Penetraliahub Students List
        </h2>
        <p className="text-gray-600 mt-1">
          Manage Student Records (IEP, Grades, Class Assignment).
        </p>
      </div>

      {/* Total Students Summary */}
      <div className="bg-background rounded-md p-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-1 bg-orange-500 rounded"></div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              Total Students: 1900
            </h3>
          </div>
        </div>
      </div>

      {/* All Classes Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">All Classes</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <StudentTable />
        </CardContent>
      </Card>
    </div>
  );
}
