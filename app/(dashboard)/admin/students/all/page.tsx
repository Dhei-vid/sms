"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StudentTable } from "@/components/dashboard-pages/admin/students/components/student-table";

// API
import { useGetAllStudentsQuery } from "@/services/stakeholders/stakeholders";
import type { Stakeholders } from "@/services/stakeholders/stakeholder-types";

export default function AllStudentsPage() {
  const { data: studentsData, isLoading: isAllStudentsLoading } =
    useGetAllStudentsQuery();

  // Filter to only show enrolled students (stage=6)
  const enrolledStudents = useMemo(() => {
    if (!studentsData?.data) return [];
    return studentsData.data.filter(
      (student: Stakeholders) => student.stage === 6,
    );
  }, [studentsData]);

  // Create filtered response object
  const filteredStudentsData = useMemo(() => {
    if (!studentsData) return undefined;
    return {
      ...studentsData,
      data: enrolledStudents,
    };
  }, [studentsData, enrolledStudents]);

  const totalStudents = enrolledStudents.length;

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
              Total Students:{" "}
              {isAllStudentsLoading
                ? "Loading..."
                : totalStudents.toLocaleString()}
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
          {isAllStudentsLoading ? (
            <div className="p-8 text-center text-gray-500">
              Loading students...
            </div>
          ) : (
            <StudentTable
              studentsData={filteredStudentsData}
              isLoading={isAllStudentsLoading}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
