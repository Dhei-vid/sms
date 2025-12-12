"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { QuickActionCard } from "@/components/dashboard-pages/admin/admissions/components/quick-action-card";
import {
  DataTable,
  TableColumn,
  TableAction,
} from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import {
  ManagerIcon,
  CustomizeIcon,
  PayByCheckIcon,
} from "@hugeicons/core-free-icons";
import { AddNewAdminModal } from "@/components/dashboard-pages/admin/settings/add-new-admin-modal";

interface AdminRole {
  id: string;
  primaryRole: string;
  assignedTo: string;
  coreModulesAccessible: string;
  lastPermissionUpdate: Date;
}

const adminRoles: AdminRole[] = [
  {
    id: "1",
    primaryRole: "Super Admin",
    assignedTo: "Principal A. Okoro",
    coreModulesAccessible: "ALL Modules (Full Access)",
    lastPermissionUpdate: new Date(2025, 9, 15, 11, 15),
  },
  {
    id: "2",
    primaryRole: "Academic Dean",
    assignedTo: "Mr. Femi T.",
    coreModulesAccessible: "Curriculum, Assessment, LMS",
    lastPermissionUpdate: new Date(2025, 9, 15, 11, 15),
  },
  {
    id: "3",
    primaryRole: "IT/System Admin",
    assignedTo: "Ms. Zara A.",
    coreModulesAccessible: "System Settings, User Management",
    lastPermissionUpdate: new Date(2025, 9, 15, 11, 15),
  },
  {
    id: "4",
    primaryRole: "Finance Admin",
    assignedTo: "Mr. Peter E.",
    coreModulesAccessible: "Finance",
    lastPermissionUpdate: new Date(2025, 9, 15, 11, 15),
  },
  {
    id: "5",
    primaryRole: "HOD (Admin)",
    assignedTo: "Mrs. B. Kalu",
    coreModulesAccessible: "LMS, Assessment (Read-Only)",
    lastPermissionUpdate: new Date(2025, 9, 15, 11, 15),
  },
];

export default function UserManagementPage() {
  const router = useRouter();
  const [addAdminModalOpen, setAddAdminModalOpen] = useState(false);

  const columns: TableColumn<AdminRole>[] = [
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
        <span className="text-sm">{format(value, "MMM. d, yyyy; h:mma")}</span>
      ),
    },
  ];

  const actions: TableAction<AdminRole>[] = [
    {
      type: "button",
      config: {
        label: "Edit Role & Permissions",
        onClick: (row) => {
          console.log("Edit role & permissions for", row.primaryRole);
          // Handle edit role & permissions action
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
          value="5 Staff Members"
          subtitle="Number of active administrative staff"
          trend="up"
        />
        <MetricCard
          title="System Uptime"
          value="99.98% (Last 30 Days)"
          subtitle="System availability and reliability"
          trend="up"
        />
        <MetricCard
          title="Last Security Audit"
          value="Oct. 15, 2025"
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
            <DataTable
              columns={columns}
              data={adminRoles}
              actions={actions}
              emptyMessage="No admin roles found."
              tableClassName="border-collapse"
            />
          </div>
          <div className="flex justify-center mt-4">
            <Button variant="outline">Load More</Button>
          </div>
        </CardContent>
      </Card>

      {/* Add New Admin Modal */}
      <AddNewAdminModal
        open={addAdminModalOpen}
        onOpenChange={setAddAdminModalOpen}
        onConfirm={(data) => {
          console.log("Add new admin:", data);
          // Handle add admin logic
        }}
      />
    </div>
  );
}
