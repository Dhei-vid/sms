"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import {
  DataTable,
  TableColumn,
  TableAction,
} from "@/components/ui/data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/general/huge-icon";
import {
  Edit01Icon,
  ElearningExchangeIcon,
  PrinterIcon,
} from "@hugeicons/core-free-icons";
import { format } from "date-fns";
import type { UserRequest } from "@/services/user-requests/user-request-types";
import { useGetUserRequestsQuery } from "@/services/user-requests/user-requests";

interface LeaveRequest {
  id: string;
  name: string;
  staffId: string;
  role: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  status: "pending" | "approved" | "denied" | "current";
  statusLabel: string;
  coverage: string;
  coverageLink?: boolean;
  duration: number;
}

export default function LeaveRequestsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("all");

  const { data: userRequestData, isLoading: isUserRequestLoading } =
    useGetUserRequestsQuery();

  // Transform API data to LeaveRequest format
  const leaveRequests: LeaveRequest[] = useMemo(() => {
    if (!userRequestData?.data) return [];

    // Filter for leave type requests only
    const leaveTypeRequests = userRequestData.data.filter(
      (req) => req.type === "leave",
    );

    return leaveTypeRequests.map((req: UserRequest) => {
      const staffName = req.staff_member?.user
        ? `${req.staff_member.user.first_name || ""} ${req.staff_member.user.last_name || ""}`.trim()
        : "Unknown Staff";

      const staffId =
        req.staff_member?.admission_number ||
        req.staff_member_id?.slice(0, 8).toUpperCase() ||
        "N/A";

      const role = req.staff_member?.position || "Staff";

      // Format dates
      const startDate = req.start_date
        ? format(new Date(req.start_date), "yyyy/MM/dd")
        : "N/A";
      const endDate = req.end_date
        ? format(new Date(req.end_date), "yyyy/MM/dd")
        : "N/A";

      // Calculate duration
      let duration = 0;
      if (req.start_date && req.end_date) {
        const start = new Date(req.start_date);
        const end = new Date(req.end_date);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      }

      // Map status
      const statusMap: Record<
        string,
        "pending" | "approved" | "denied" | "current"
      > = {
        pending: "pending",
        approved: "approved",
        rejected: "denied",
        cancelled: "denied",
      };
      const status = statusMap[req.status?.toLowerCase() || ""] || "pending";

      const statusLabelMap: Record<string, string> = {
        pending: "Pending Request",
        approved: "Approved Request",
        denied: "Denied Request",
        current: "Current Leave",
      };
      const statusLabel = statusLabelMap[status] || "Pending Request";

      // Coverage staff
      const coverageName = req.coverage_staff?.user
        ? `${req.coverage_staff.user.first_name || ""} ${req.coverage_staff.user.last_name || ""}`.trim()
        : null;
      const coverageRole = req.coverage_staff?.position || null;
      const coverage = coverageName
        ? `${coverageName}${coverageRole ? `, ${coverageRole}` : ""}`
        : "Assign Coverage";
      const coverageLink = !coverageName;

      return {
        id: req.id,
        name: staffName,
        staffId: staffId,
        role: role,
        leaveType: req.leave_type || "Leave",
        startDate: startDate,
        endDate: endDate,
        status: status,
        statusLabel: statusLabel,
        coverage: coverage,
        coverageLink: coverageLink,
        duration: duration,
      };
    });
  }, [userRequestData]);

  // Calculate metrics from API data
  const metrics = useMemo(() => {
    if (!userRequestData?.data) {
      return {
        currentlyOnLeave: 0,
        pendingRequests: 0,
        upcomingAbsences: 0,
        avgApprovalTime: 0,
      };
    }

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    // Filter for leave type requests only
    const leaveTypeRequests = userRequestData.data.filter(
      (req: UserRequest) => req.type === "leave",
    );

    // Currently on Leave: approved requests where current date is between start and end date
    const currentlyOnLeave = leaveTypeRequests.filter((req: UserRequest) => {
      const status = req.status?.toLowerCase();
      if (status !== "approved" && status !== "current") return false;
      if (!req.start_date || !req.end_date) return false;
      try {
        const start = new Date(req.start_date);
        const end = new Date(req.end_date);
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
        return now >= start && now <= end;
      } catch {
        return false;
      }
    }).length;

    // Pending Requests: count of pending status
    const pendingRequests = leaveTypeRequests.filter(
      (req: UserRequest) => req.status?.toLowerCase() === "pending",
    ).length;

    // Upcoming Absences: approved requests where start date is in the future
    const upcomingAbsences = leaveTypeRequests.filter((req: UserRequest) => {
      if (req.status?.toLowerCase() !== "approved") return false;
      if (!req.start_date) return false;
      try {
        const start = new Date(req.start_date);
        start.setHours(0, 0, 0, 0);
        return start > now;
      } catch {
        return false;
      }
    }).length;

    // Average Approval Time: calculate average days between created_at and updated_at for approved requests
    let avgApprovalTime = 0;
    const approvedRequests = leaveTypeRequests.filter(
      (req: UserRequest) => req.status?.toLowerCase() === "approved",
    );

    if (approvedRequests.length > 0) {
      const totalDays = approvedRequests.reduce(
        (sum: number, req: UserRequest) => {
          if (req.created_at && req.updated_at) {
            try {
              const created = new Date(req.created_at);
              const updated = new Date(req.updated_at);
              const diffTime = Math.abs(updated.getTime() - created.getTime());
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              return sum + diffDays;
            } catch {
              return sum;
            }
          }
          return sum;
        },
        0,
      );
      avgApprovalTime = Math.round(totalDays / approvedRequests.length);
    }

    return {
      currentlyOnLeave,
      pendingRequests,
      upcomingAbsences,
      avgApprovalTime,
    };
  }, [userRequestData]);

  const filteredRequests = leaveRequests.filter((request) => {
    const matchesSearch =
      request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.staffId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSort = sortBy === "all" || request.status === sortBy;

    return matchesSearch && matchesSort;
  });

  const getStatusColor = (status: LeaveRequest["status"]) => {
    switch (status) {
      case "pending":
        return "text-orange-600";
      case "approved":
        return "text-green-600";
      case "denied":
        return "text-red-600";
      case "current":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  const columns: TableColumn<LeaveRequest>[] = [
    {
      key: "name",
      title: "Full Name + Staff ID",
      render: (_, row) => (
        <div className="font-medium">
          {row.name} ({row.staffId}): {row.role}
        </div>
      ),
    },
    {
      key: "leaveType",
      title: "Leave Type",
    },
    {
      key: "dateRange",
      title: "Date Range",
      render: (_, row) => `${row.startDate} - ${row.endDate}`,
    },
    {
      key: "status",
      title: "Status",
      render: (_, row) => (
        <span className={cn("font-medium", getStatusColor(row.status))}>
          {row.statusLabel}
        </span>
      ),
    },
    {
      key: "coverage",
      title: "Coverage",
      render: (_, row) =>
        row.coverageLink ? (
          <button className="text-main-blue underline text-sm hover:text-main-blue/80">
            {row.coverage}
          </button>
        ) : (
          <span className="text-gray-600">{row.coverage}</span>
        ),
    },
    {
      key: "duration",
      title: "Duration",
      render: (_, row) => `${row.duration} Days`,
    },
  ];

  const actions: TableAction<LeaveRequest>[] = [
    {
      type: "dropdown",
      config: {
        items: [
          {
            label: "View Details",
            onClick: (row) => {
              router.push(`/admin/staff-management/leave/${row.id}`);
            },
            icon: <Icon icon={ElearningExchangeIcon} size={16} />,
          },
          {
            label: "Edit Request",
            onClick: () => {},
            icon: <Icon icon={Edit01Icon} size={16} />,
          },
          {
            label: "Print Request",
            onClick: () => {},
            icon: <Icon icon={PrinterIcon} size={16} />,
          },
        ],
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Staff Leave Requests Management
        </h2>
        <p className="text-gray-600 mt-1">
          Manage all pending and approved staff leave requests.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Currently on Leave"
          value={`${metrics.currentlyOnLeave} ${metrics.currentlyOnLeave === 1 ? "Staff" : "Staffs"}`}
          trend={metrics.currentlyOnLeave > 0 ? "up" : undefined}
        />
        <MetricCard
          title="Pending Requests"
          value={`${metrics.pendingRequests} ${metrics.pendingRequests === 1 ? "Request" : "Requests"}`}
          trend={metrics.pendingRequests > 0 ? "up" : undefined}
        />
        <MetricCard
          title="Upcoming Absences"
          value={`${metrics.upcomingAbsences} ${metrics.upcomingAbsences === 1 ? "Staff" : "Staffs"}`}
          trend={metrics.upcomingAbsences > 0 ? "up" : undefined}
        />
        <MetricCard
          title="Avg. Approval Time"
          value={`${metrics.avgApprovalTime} ${metrics.avgApprovalTime === 1 ? "Day" : "Days"}`}
          trend={metrics.avgApprovalTime > 0 ? "up" : undefined}
        />
      </div>

      {/* Create New Leave Policy Button */}
      <Button variant={"outline"} className="h-11 w-full gap-2">
        <Plus className="h-4 w-4" />
        Create New Leave Policy
      </Button>

      {/* Request Table Section */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Table Header with Search and Sort */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                Request Table
              </h3>
              <div className="flex items-center gap-4">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search by staff ID"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ALL</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="denied">Denied</SelectItem>
                    <SelectItem value="current">Current</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* DataTable */}
            <div className="border rounded-lg overflow-hidden">
              <DataTable
                columns={columns}
                data={filteredRequests}
                actions={actions}
                emptyMessage="No leave requests found"
                onRowClick={(row) => {
                  router.push(`/admin/staff-management/leave/${row.id}`);
                }}
              />
            </div>

            {/* Load More Button */}
            <div className="flex justify-center">
              <Button variant="outline">Load More</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
