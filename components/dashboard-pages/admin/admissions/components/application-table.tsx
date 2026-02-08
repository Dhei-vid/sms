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
import type { AdmissionApplication } from "@/services/shared-types";
import { getStakeholderStageLabel } from "@/services/stakeholders/stakeholders-reducer";

interface ApplicationTableProps {
  applications: AdmissionApplication[];
  onApplicationsChange: (applications: AdmissionApplication[]) => void;
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
    newStage: number,
    statusLabel: string,
  ) => {
    const updatedApplications = applications.map((app) =>
      app.id === applicationId ? { ...app, stage: newStage, statusLabel } : app,
    );
    onApplicationsChange(updatedApplications);
  };

  const filteredApplications = applications.filter(
    (app) =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.admission_number
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ??
        false),
  );

  const getStatusFromStage = (
    stage: number,
  ): "new" | "pending" | "accepted" | "enrolled" => {
    if (stage === 1) return "new";
    if (stage >= 2 && stage <= 4) return "pending";
    if (stage === 5) return "accepted";
    if (stage === 6) return "enrolled";
    return "new";
  };

  const columns: TableColumn<AdmissionApplication>[] = [
    {
      key: "name",
      title: "Applicant Name",
      render: (_, row) => <span className="font-medium">{row.name}</span>,
      className: "border-r",
    },
    {
      key: "classApplyingFor",
      title: "Class Applying For",
      render: (_, row) => <span>{row.classApplyingFor || "—"}</span>,
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
        <StatusBadge
          status={getStatusFromStage(row.stage)}
          label={row.statusLabel}
        />
      ),
      className: "border-r",
    },
  ];

  const actions: TableAction<AdmissionApplication>[] = [
    {
      type: "dropdown",
      config: {
        items: [
          {
            label: "View details",
            onClick: (row) =>
              router.push(`/admin/admissions/${row.stakeholder_id}`),
            icon: <Icon icon={ViewIcon} size={16} />,
          },
          {
            label: "Change status",
            icon: <Icon icon={ElearningExchangeIcon} size={16} />,
            subItems: [
              {
                label: "Inquires/Interest",
                onClick: (row) =>
                  handleStatusChange(row.id, 1, getStakeholderStageLabel(1)),
              },
              {
                label: "Application Started",
                onClick: (row) =>
                  handleStatusChange(row.id, 2, getStakeholderStageLabel(2)),
              },
              {
                label: "Submitted Forms",
                onClick: (row) =>
                  handleStatusChange(row.id, 3, getStakeholderStageLabel(3)),
              },
              {
                label: "Under Review",
                onClick: (row) =>
                  handleStatusChange(row.id, 4, getStakeholderStageLabel(4)),
              },
              {
                label: "Accepted Offers",
                onClick: (row) =>
                  handleStatusChange(row.id, 5, getStakeholderStageLabel(5)),
              },
              {
                label: "Enrolled/Confirmed",
                onClick: (row) =>
                  handleStatusChange(row.id, 6, getStakeholderStageLabel(6)),
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
