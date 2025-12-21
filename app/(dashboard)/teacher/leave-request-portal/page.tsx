"use client";

import { useState } from "react";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, TableColumn } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { TeacherLeaveRequestModal } from "@/components/dashboard-pages/teacher/leave-request-portal/teacher-leave-request-modal";

type LeaveStatus = "Pending Approval" | "Approved" | "Rejected" | "Cancelled";

interface LeaveRequest {
  id: string;
  requestType: string;
  dateRange: string;
  status: LeaveStatus;
  submittedOn: string;
}

const leaveRequests: LeaveRequest[] = [
  {
    id: "LR-2025-001",
    requestType: "Medical Leave",
    dateRange: "Nov. 16–18, 2025",
    status: "Pending Approval",
    submittedOn: "Nov. 10, 2025",
  },
  {
    id: "LR-2025-002",
    requestType: "Exam Supervision Relief",
    dateRange: "Nov. 20, 2025",
    status: "Approved",
    submittedOn: "Nov. 05, 2025",
  },
  {
    id: "LR-2025-003",
    requestType: "Personal Leave",
    dateRange: "Dec. 01–02, 2025",
    status: "Rejected",
    submittedOn: "Nov. 02, 2025",
  },
  {
    id: "LR-2025-004",
    requestType: "Conference Attendance",
    dateRange: "Dec. 10–12, 2025",
    status: "Approved",
    submittedOn: "Nov. 01, 2025",
  },
];

function getStatusColor(status: LeaveStatus): string {
  switch (status) {
    case "Approved":
      return "text-green-600";
    case "Pending Approval":
      return "text-orange-600";
    case "Rejected":
      return "text-red-600";
    case "Cancelled":
      return "text-gray-500";
    default:
      return "text-gray-700";
  }
}

export default function TeacherLeaveRequestPortalPage() {
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);

  const columns: TableColumn<LeaveRequest>[] = [
    {
      key: "id",
      title: "Request ID",
      render: (value) => (
        <span className="font-medium text-gray-800">{value as string}</span>
      ),
    },
    {
      key: "requestType",
      title: "Request Type",
      render: (value) => (
        <span className="text-gray-800">{value as string}</span>
      ),
    },
    {
      key: "dateRange",
      title: "Date Range",
      render: (value) => (
        <span className="text-gray-700">{value as string}</span>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (value) => {
        const status = value as LeaveStatus;
        return (
          <span className={`text-sm font-medium ${getStatusColor(status)}`}>
            {status}
          </span>
        );
      },
    },
    {
      key: "submittedOn",
      title: "Submitted On",
      render: (value) => (
        <span className="text-gray-700">{value as string}</span>
      ),
    },
    {
      key: "action",
      title: "Action",
      render: () => (
        <button className="text-main-blue hover:underline text-sm font-medium">
          View Details
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="bg-background rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Leave Request Portal
        </h1>
        <p className="text-gray-600">
          The staff members central hub for managing their leave entitlements
          and tracking the status of submitted requests.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricCard
          title="Annual Leave Entitlement"
          value="8/15 days"
          trend="up"
          trendColor="text-main-blue"
        />
        <MetricCard
          title="Pending Requests"
          value="Nil"
          trend="up"
          trendColor="text-main-blue"
        />
      </div>

      {/* New leave request button */}
      <Button
        variant={"outline"}
        className="w-full h-11"
        onClick={() => setLeaveModalOpen(true)}
      >
        Submit New Leave Request
      </Button>

      {/* Actions + Table */}
      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Leave Request History
            </CardTitle>
            <p className="text-sm text-gray-600">
              A consolidated log of all leave requests submitted in the current
              academic year.
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <DataTable
              columns={columns}
              data={leaveRequests}
              showActionsColumn={false}
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit New Leave Request Modal */}
      <TeacherLeaveRequestModal
        open={leaveModalOpen}
        onOpenChange={setLeaveModalOpen}
      />
    </div>
  );
}
