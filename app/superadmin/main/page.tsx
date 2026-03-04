"use client";

import { useRouter } from "next/navigation";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { QuickActionCard } from "@/components/dashboard-pages/admin/admissions/components/quick-action-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PayByCheckIcon,
  FileManagementIcon,
  MailSend01Icon,
  ViewIcon, PencilEdit01Icon, CancelCircleIcon
} from "@hugeicons/core-free-icons";
import {
  DataTable,
  TableColumn,
  TableAction,
} from "@/components/ui/data-table";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { School } from "@/services/schools/schools-type";
import { useGetSchoolsQuery } from "@/services/schools/schools";
import { Icon } from "@/components/general/huge-icon";

const quickActions = [
  {
    icon: PayByCheckIcon,
    title: "Onboard New School",
    description: "Register a new school and set their branding.",
    href: "/superadmin/schools/new",
  },
  {
    icon: FileManagementIcon,
    title: "Manage Subscription Plans",
    description: "Edit existing tiers or create new subscription levels.",
    href: "/superadmin/subscriptions",
  },
  {
    icon: MailSend01Icon,
    title: "System Broadcast",
    description:
      "Send a system-wide announcement to all school Admins (e.g., 'Scheduled Maintenance at 12:00AM').",
    href: "/superadmin/broadcast",
  },
];

function getStatusColor(status: string | undefined) {
  if (!status) return "text-gray-600";
  switch (status.toLowerCase()) {
    case "active":
      return "text-green-600";
    case "inactive":
      return "text-orange-600";
    case "pending":
      return "text-main-blue";
    default:
      return "text-gray-600";
  }
}

function getSchoolsList(data: unknown): School[] {
  if (!data || typeof data !== "object") return [];
  const d = data as { data?: School[] };
  if (Array.isArray(d.data)) return d.data;
  return [];
}

export default function SuperAdminDashboardPage() {
  const router = useRouter();
  const { data: schoolsResponse, isLoading } = useGetSchoolsQuery({
    _all: true,
  });
  const schoolList = getSchoolsList(schoolsResponse);

  const columns: TableColumn<School>[] = [
    {
      key: "name",
      title: "School Name & Email",
      render: (_, row) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium">{row.name || "-"}</span>
          <span className="text-xs text-gray-500">{row.email || "—"}</span>
        </div>
      ),
    },
    {
      key: "subscription",
      title: "Subscription",
      render: (_, row) => {
        const sub = row.subscription_details?.subscription;
        const plan = sub?.plan ?? row.subscription?.status ?? "—";
        const status = row.subscription?.status ?? "—";
        return (
          <div className="flex flex-col">
            <span className="text-sm">{plan}</span>
            <span className={cn("text-xs", getStatusColor(status))}>
              {status}
            </span>
          </div>
        );
      },
    },
    {
      key: "current_enrollment",
      title: "Active Users",
      render: (_, row) => (
        <span className="text-sm">
          {typeof row.current_enrollment === "number"
            ? row.current_enrollment
            : "—"}
        </span>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (_, row) => (
        <span
          className={cn(
            "text-sm font-medium capitalize",
            getStatusColor(row.status),
          )}
        >
          {row.status ?? "—"}
        </span>
      ),
    },
    {
      key: "established_date",
      title: "Established",
      render: (_, row) => {
        const raw = row.established_date;
        if (!raw) return "—";
        try {
          const date = typeof raw === "string" ? parseISO(raw) : new Date(raw);
          return <span className="text-sm">{format(date, "LLL d, yyyy")}</span>;
        } catch {
          return String(raw);
        }
      },
    },
  ];

  const tableActions: TableAction<School>[] = [
    {
      type: "dropdown",
      config: {
        align: "end",
        items: [
          {
            label: "View Details",
            icon: <Icon icon={ViewIcon} size={16}/>,
            onClick: (row) => router.push(`/superadmin/schools/${row.id}`),
          },
          {
            label: "Edit Details",
            icon: <Icon icon={PencilEdit01Icon} size={16}/>,
            onClick: (row) =>
                router.push(`/superadmin/schools/${row.id}/edit`),
        },
        {
            label: "Deactivate",
            icon: <Icon icon={CancelCircleIcon} size={16}/>,
            variant: "destructive",
            onClick: (row) => {
              // TODO: confirm and call deactivate API
              console.log("Deactivate school:", row.id);
            },
          },
        ],
      },
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <section className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard
            title="Total MRR"
            value="120"
            trend="up"
            subtitle="Monthly Recurring Revenue across all plans."
          />
          <MetricCard
            title="Active Schools"
            value={`${schoolList.length} Institutions`}
            trend="up"
            subtitle="Number of active schools using the platform."
          />
          <MetricCard
            title="Total Platform Users"
            value={String(
              schoolList.reduce(
                (acc, s) => acc + (s.current_enrollment ?? 0),
                0,
              ),
            )}
            trend="up"
            subtitle="Total number of users on the platform."
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Quick Actions
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Onboard schools, manage plans, or send system-wide announcements.
            </p>
          </CardHeader>
          <CardContent className="p-0">
            {quickActions.map((action, index) => (
              <QuickActionCard
                key={index}
                title={action.title}
                icon={action.icon}
                description={action.description}
                onClick={() => action.href && router.push(action.href)}
              />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">
              School Registry
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              View and manage all schools on the platform.
            </p>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <DataTable
                columns={columns}
                data={schoolList}
                actions={tableActions}
                emptyMessage={
                  isLoading ? "Loading schools…" : "No schools found."
                }
                tableClassName="border-collapse"
              />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
