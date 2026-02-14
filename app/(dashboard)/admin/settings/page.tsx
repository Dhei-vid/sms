"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { QuickActionCard } from "@/components/dashboard-pages/admin/admissions/components/quick-action-card";
import {
  DataTable,
  TableColumn,
  TableAction,
} from "@/components/ui/data-table";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  ManagerIcon,
  CustomizeIcon,
  PayByCheckIcon,
} from "@hugeicons/core-free-icons";
import { AddNewAdminModal } from "@/components/dashboard-pages/admin/settings/add-new-admin-modal";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slices/authSlice";
import { useGetSchoolSettingsDashboardQuery } from "@/services/schools/schools";
import type { ApiResponse } from "@/services/shared-types";
import type { SchoolSettingsDashboard, SettingsDashboardAdminRole } from "@/services/schools/schools-type";

export default function UserManagementPage() {
  const router = useRouter();
  const [addAdminModalOpen, setAddAdminModalOpen] = useState(false);
  const user = useAppSelector(selectUser);
  const schoolId = user?.school_id ?? "";
  const { data: dashboardResponse, isLoading: dashboardLoading } =
    useGetSchoolSettingsDashboardQuery(schoolId, { skip: !schoolId });

  const dashboard = useMemo(() => {
    const res = dashboardResponse as ApiResponse<SchoolSettingsDashboard> | undefined;
    return res?.data;
  }, [dashboardResponse]);

  type AdminRosterRow = Omit<SettingsDashboardAdminRole, "lastPermissionUpdate"> & {
    lastPermissionUpdate: Date | null;
  };
  const adminRoster: AdminRosterRow[] = useMemo(() => {
    const list = dashboard?.adminRoster ?? [];
    return list.map((row) => ({
      ...row,
      lastPermissionUpdate: row.lastPermissionUpdate
        ? new Date(row.lastPermissionUpdate)
        : null,
    }));
  }, [dashboard?.adminRoster]);

  const columns: TableColumn<AdminRosterRow>[] = [
    {
      key: "primaryRole",
      title: "Primary Role",
      className: "font-medium",
    },
    {
      key: "assignedTo",
      title: "Assigned to",
      render: (value) => <span className="text-sm">{value}</span>,
    },
    {
      key: "coreModulesAccessible",
      title: "Core Modules Accessible",
      render: (value) => <span className="text-sm">{value}</span>,
    },
    {
      key: "lastPermissionUpdate",
      title: "Last Permission Update",
      render: (value) => (
        <span className="text-sm">
          {value ? format(value, "MMM. d, yyyy; h:mma") : "—"}
        </span>
      ),
    },
  ];

  const actions: TableAction<AdminRosterRow>[] = [
    {
      type: "button",
      config: {
        label: "Edit Role & Permissions",
        onClick: (row) => {
          router.push(`/admin/settings/edit-role?userId=${row.id}`);
        },
        variant: "link",
        className: "text-main-blue underline underline-offset-3 h-auto",
      },
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          System Settings & User Management Dashboard
        </h2>
        <p className="text-gray-600 mt-1">
          This is the administrative control panel for configuring the entire
          system, managing user access, and defining security protocols.
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Active Admins"
          value={
            dashboardLoading
              ? "—"
              : `${dashboard?.activeAdminsCount ?? 0} Staff Member${(dashboard?.activeAdminsCount ?? 0) !== 1 ? "s" : ""}`
          }
          subtitle="Number of active administrative staff"
          trend="up"
        />
        <MetricCard
          title="System Uptime"
          value={dashboardLoading ? "—" : (dashboard?.systemUptime ?? "—")}
          subtitle="System availability and reliability"
          trend="up"
        />
        <MetricCard
          title="Last Security Audit"
          value={
            dashboardLoading
              ? "—"
              : dashboard?.lastSecurityAudit
                ? format(new Date(dashboard.lastSecurityAudit), "MMM. d, yyyy")
                : "—"
          }
          subtitle="Date of last security audit"
          trend="up"
        />
      </div>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            System Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <QuickActionCard
            title="Edit Role Templates"
            description="View/Edit pre-defined roles like HOD, Teacher, Exam Officer, etc., to standardize access rights."
            icon={PayByCheckIcon}
            onClick={() => router.push("/admin/settings/edit-role")}
            className="border-b"
          />
          <QuickActionCard
            title="Add New Admin"
            description="Links to select an existing staff member and assign them an administrative role."
            icon={ManagerIcon}
            onClick={() => setAddAdminModalOpen(true)}
            className="border-b"
          />
          <QuickActionCard
            title="Application Configuration (Customization)"
            description="Allow to customize the system's behavior to match the school's specific rules and academic calendar."
            icon={CustomizeIcon}
            onClick={() => router.push("/admin/settings/application-config")}
          />
        </CardContent>
      </Card>

      {/* Current Admin Roster & Permissions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Current Admin Roster & Permissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            {dashboardLoading ? (
              <div className="py-8 text-center text-muted-foreground text-sm">
                Loading admin roster…
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={adminRoster}
                actions={actions}
                emptyMessage="No admin roles found."
                tableClassName="border-collapse"
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add New Admin Modal */}
      <AddNewAdminModal
        open={addAdminModalOpen}
        onOpenChange={setAddAdminModalOpen}
        onConfirm={(data) => {
          // TODO: wire to create user / assign admin role API when available
        }}
      />
    </div>
  );
}
