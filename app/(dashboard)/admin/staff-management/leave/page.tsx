"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowUpRight,
  Calendar,
  Clock,
  Users,
  Search,
  MoreVertical,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/general/huge-icon";
import {
  Edit01Icon,
  ElearningExchangeIcon,
  PrinterIcon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("all");

  const leaveRequests: LeaveRequest[] = [
    {
      id: "1",
      name: "Mr. Chinedu Okafor",
      staffId: "okafor.T178023",
      role: "HOD Science JS 2",
      leaveType: "Annual Leave",
      startDate: "2025/11/15",
      endDate: "2025/11/20",
      status: "pending",
      statusLabel: "Pending Request",
      coverage: "Assign Coverage",
      coverageLink: true,
      duration: 5,
    },
    {
      id: "2",
      name: "Mrs. Helen Davies",
      staffId: "davies.T178024",
      role: "P5 Teacher",
      leaveType: "Sick Leave",
      startDate: "2025/10/27",
      endDate: "2025/11/3",
      status: "current",
      statusLabel: "Current Leave",
      coverage: "Ms. Shane, P4 Teacher",
      duration: 5,
    },
    {
      id: "3",
      name: "Ms. Tolu Adebayo",
      staffId: "adebayo.T178025",
      role: "Bursar",
      leaveType: "Personal Leave",
      startDate: "2025/11/3",
      endDate: "2025/11/7",
      status: "approved",
      statusLabel: "Approved Request",
      coverage: "Mr. Sola, HR Admin",
      duration: 8,
    },
    {
      id: "4",
      name: "Mr. Biodun Eke",
      staffId: "eke.T178026",
      role: "Security Guard",
      leaveType: "Maternity Leave",
      startDate: "2025/11/15",
      endDate: "2025/11/20",
      status: "pending",
      statusLabel: "Pending Request",
      coverage: "Assign Coverage",
      coverageLink: true,
      duration: 8,
    },
    {
      id: "5",
      name: "Mrs. Uche Nwachukwu",
      staffId: "nwachukwu.T178027",
      role: "JS 3 Teacher",
      leaveType: "Personal Leave",
      startDate: "2025/11/15",
      endDate: "2025/11/20",
      status: "pending",
      statusLabel: "Pending Request",
      coverage: "Assign Coverage",
      coverageLink: true,
      duration: 8,
    },
    {
      id: "6",
      name: "Mr. Sola Adeniyi",
      staffId: "adeniyi.m.T178023",
      role: "HR Admin",
      leaveType: "Personal Leave",
      startDate: "2025/11/15",
      endDate: "2025/11/20",
      status: "denied",
      statusLabel: "Denied Request",
      coverage: "Nil",
      duration: 8,
    },
  ];

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
          value="2 Staffs"
          icon={Users}
          trend="up"
        />
        <MetricCard
          title="Pending Requests"
          value="7 Requests"
          icon={Calendar}
          trend="up"
        />
        <MetricCard
          title="Upcoming Absences"
          value="3 Staffs"
          icon={Clock}
          trend="up"
        />
        <MetricCard
          title="Avg. Approval Time"
          value="5 Days"
          icon={Clock}
          trend="up"
        />
      </div>

      {/* Create New Leave Policy Button */}
      <div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create New Leave Policy
        </Button>
      </div>

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

            {/* Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-main-blue/5">
                    <TableHead>Full Name + Staff ID</TableHead>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Date Range</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Coverage</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">
                        {request.name} ({request.staffId}): {request.role}
                      </TableCell>
                      <TableCell>{request.leaveType}</TableCell>
                      <TableCell>
                        {request.startDate} - {request.endDate}
                      </TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "font-medium",
                            getStatusColor(request.status)
                          )}
                        >
                          {request.statusLabel}
                        </span>
                      </TableCell>
                      <TableCell>
                        {request.coverageLink ? (
                          <button className="text-main-blue underline text-sm hover:text-main-blue/80">
                            {request.coverage}
                          </button>
                        ) : (
                          <span className="text-gray-600">
                            {request.coverage}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{request.duration} Days</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <Link
                              href={`/admin/staff-management/leave/${request.id}`}
                            >
                              <DropdownMenuItem className="flex flex-row gap-3 items-center">
                                <Icon icon={ElearningExchangeIcon} size={16} />
                                <p>View Details</p>
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem className="flex flex-row gap-3 items-center">
                              <Icon icon={Edit01Icon} size={16} />
                              <p>Edit Request</p>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex flex-row gap-3 items-center">
                              <Icon icon={PrinterIcon} size={16} />
                              <p>Print Request</p>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: "up" | "down";
}

function MetricCard({ title, value, icon: Icon, trend }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
          </div>
          <div className="relative">
            <div className="h-12 w-12 rounded-lg bg-main-blue/10 flex items-center justify-center">
              <Icon className="h-6 w-6 text-main-blue" />
            </div>
            {trend && (
              <ArrowUpRight className="absolute -top-1 -right-1 h-4 w-4 text-gray-400" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
