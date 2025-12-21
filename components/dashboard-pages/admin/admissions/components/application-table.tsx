"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DataTable,
  TableColumn,
  TableAction,
} from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./status-badge";
import { Search, Filter, MoreVertical } from "lucide-react";
import { Icon } from "@/components/general/huge-icon";

import {
  ElearningExchangeIcon,
  ViewIcon,
  PrinterIcon,
} from "@hugeicons/core-free-icons";
import type { Application } from "../data/applications-data";

interface ApplicationTableProps {
  applications: Application[];
  onApplicationsChange: (applications: Application[]) => void;
}

export function ApplicationTable({
  applications,
  onApplicationsChange,
}: ApplicationTableProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleStatusChange = (
    applicationId: string,
    newStatus: "new" | "pending" | "accepted" | "enrolled" | "rejected",
    statusLabel: string
  ) => {
    const updatedApplications = applications.map((app) =>
      app.id === applicationId
        ? { ...app, status: newStatus, statusLabel }
        : app
    );
    onApplicationsChange(updatedApplications);
  };

  const filteredApplications = applications.filter(
    (app) =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: TableColumn<Application>[] = [
    {
      key: "name",
      title: "Applicant Name",
      render: (_, row) => <span className="font-medium">{row.name}</span>,
      className: "border-r",
    },
    {
      key: "classApplyingFor",
      title: "Class Applying For:",
      className: "border-r",
    },
    {
      key: "dateSubmitted",
      title: "Date/Time Submitted",
      render: (_, row) => (
        <span>
          {row.dateSubmitted}, {row.timeSubmitted}
        </span>
      ),
      className: "border-r",
    },
    {
      key: "status",
      title: "Status",
      render: (_, row) => (
        <StatusBadge status={row.status} label={row.statusLabel} />
      ),
      className: "border-r",
    },
  ];

  const actions: TableAction<Application>[] = [
    {
      type: "dropdown",
      config: {
        items: [
          {
            label: "View details",
            onClick: (row) => router.push(`/admin/admissions/${row.id}`),
            icon: <Icon icon={ViewIcon} size={16} />,
          },
          {
            label: "Change status",
            icon: <Icon icon={ElearningExchangeIcon} size={16} />,
            subItems: [
              {
                label: "New Applicant",
                onClick: (row) =>
                  handleStatusChange(row.id, "new", "New Applicant"),
              },
              {
                label: "Pending Interview",
                onClick: (row) =>
                  handleStatusChange(row.id, "pending", "Pending Interview"),
              },
              {
                label: "Application Accepted",
                onClick: (row) =>
                  handleStatusChange(
                    row.id,
                    "accepted",
                    "Application Accepted"
                  ),
              },
              {
                label: "Enrolled",
                onClick: (row) =>
                  handleStatusChange(row.id, "enrolled", "Enrolled"),
              },
              {
                label: "Application Rejected",
                onClick: (row) =>
                  handleStatusChange(
                    row.id,
                    "rejected",
                    "Application Rejected"
                  ),
              },
            ],
            separator: true,
          },
          {
            label: "Print document",
            onClick: () => {},
            icon: <Icon icon={PrinterIcon} size={16} />,
            separator: true,
          },
        ],
        trigger: (
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        ),
        align: "end",
      },
    },
  ];

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative w0full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search by applicant name, Application ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter by:
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredApplications}
          actions={actions}
          enableRowSelection={true}
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          getRowId={(row) => row.id}
          headerClassName="bg-main-blue/5"
          showActionsColumn={true}
          actionsColumnTitle=""
          actionsColumnClassName="w-12"
        />
      </div>

      {/* Load More */}
      <div className="flex justify-center">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  );
}
