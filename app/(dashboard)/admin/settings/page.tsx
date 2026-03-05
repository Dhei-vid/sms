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
import type {
  SchoolSettingsDashboard,
  SettingsDashboardAdminRole,
} from "@/services/schools/schools-type";

const STATIC_DASHBOARD: SchoolSettingsDashboard = {
  activeAdminsCount: 2,
  lastSecurityAudit: "2025-01-15T00:00:00Z",
  systemUptime: "99.9%",
  adminRoster: [
    {
      id: "1",
      primaryRole: "Super Admin",
      assignedTo: "Admin User",
      coreModulesAccessible: "All",
      lastPermissionUpdate: "2025-01-10T14:30:00Z",
    },
    {
      id: "2",
      primaryRole: "HOD",
      assignedTo: "Department Head",
      coreModulesAccessible: "Academic, Reports",
      lastPermissionUpdate: "2025-01-08T09:00:00Z",
    },
  ],
};

type AdminRosterRow = Omit<
  SettingsDashboardAdminRole,
  "lastPermissionUpdate"
> & {
  lastPermissionUpdate: Date | null;
};

function toRosterRows(dashboard: SchoolSettingsDashboard): AdminRosterRow[] {
  return dashboard.adminRoster.map((row) => ({
    ...row,
    lastPermissionUpdate: row.lastPermissionUpdate
      ? new Date(row.lastPermissionUpdate)
      : null,
  }));
}

export default function UserManagementPage() {
  const router = useRouter();
  const [addAdminModalOpen, setAddAdminModalOpen] = useState(false);
  const adminRoster = useMemo(
    () => toRosterRows(STATIC_DASHBOARD),
    [],
  );

  const columns: TableColumn<AdminRosterRow>[] = [
    { key: "primaryRole", title: "Primary Role", className: "font-medium" },
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
        onClick: (row) =>
          router.push(`/admin/settings/edit-role?userId=${row.id}`),
        variant: "link",
        className: "text-main-blue underline underline-offset-3 h-auto",
      },
    },
  ];

  const dashboard = STATIC_DASHBOARD;
  const activeCount = dashboard.activeAdminsCount;
  const lastAudit = dashboard.lastSecurityAudit;

  return (
    <div className="space-y-4">
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          System Settings & User Management Dashboard
        </h2>
        <p className="text-gray-600 mt-1">
          This is the administrative control panel for configuring the entire
          system, managing user access, and defining security protocols.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Active Admins"
          value={`${activeCount} Staff Member${activeCount !== 1 ? "s" : ""}`}
          subtitle="Number of active administrative staff"
          trend="up"
        />
        <MetricCard
          title="System Uptime"
          value={dashboard.systemUptime ?? "—"}
          subtitle="System availability and reliability"
          trend="up"
        />
        <MetricCard
          title="Last Security Audit"
          value={
            lastAudit ? format(new Date(lastAudit), "MMM. d, yyyy") : "—"
          }
          subtitle="Date of last security audit"
          trend="up"
        />
      </div>

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

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Current Admin Roster & Permissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <DataTable
              columns={columns}
              data={adminRoster}
              actions={actions}
              emptyMessage="No admin roles found."
              tableClassName="border-collapse"
            />
          </div>
        </CardContent>
      </Card>

      <AddNewAdminModal
        open={addAdminModalOpen}
        onOpenChange={setAddAdminModalOpen}
        onConfirm={() => {}}
      />
    </div>
  );
}
