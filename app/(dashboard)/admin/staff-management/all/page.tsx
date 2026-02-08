"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StaffTable } from "@/components/dashboard-pages/admin/staff/components/staff-table/staff-table";
import { Icon } from "@/components/general/huge-icon";
import { AddSquareIcon } from "@hugeicons/core-free-icons";
import { useRouter } from "next/navigation";

// API
import { useGetAllStaffQuery } from "@/services/stakeholders/stakeholders";

export default function AllStaffPage() {
  const router = useRouter();

  const { data: staffDataResponse, isLoading } = useGetAllStaffQuery();
  const staffData = staffDataResponse?.data || [];

  // Calculate active staff count
  const activeStaffCount = staffData.filter(
    (staff) => staff.status?.toLowerCase() === "active" && !staff.is_deleted,
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Manage All Staff Directory
        </h2>
        <p className="text-gray-600 mt-1">
          A summary of the workforce and the primary tools for system
          management.
        </p>
      </div>

      {/* Active Staff Count Card */}
      <div className="grid grid-cols-4 gap-4">
        <div className="lg:col-span-3 bg-background rounded-md px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-9 w-1 bg-orange-500 rounded"></div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Active Staff Count: {activeStaffCount} Active Employees
              </h3>
            </div>
          </div>
        </div>

        <Button
          onClick={() => router.push("/admin/staff-management/add")}
          className="h-full gap-2"
        >
          <Icon icon={AddSquareIcon} size={18} />
          Add New Staff Member
        </Button>
      </div>

      {/* Staff Data Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Staff Data Table
          </CardTitle>
        </CardHeader>
        <CardContent>
          <StaffTable staffData={staffData} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  );
}
