"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { QuickActionCard } from "@/components/dashboard-pages/admin/admissions/components/quick-action-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PayByCheckIcon,
  FileManagementIcon,
  MailSend01Icon,
  ViewIcon,
  PencilEdit01Icon,
  CancelCircleIcon,
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
import { formattedAmount } from "@/common/helper";

const quickActions = [
  {
    icon: PayByCheckIcon,
    title: "Onboard New School",
    description: "Register a new school and set their branding.",
    href: "/superadmin/main/add",
  },
  {
    icon: FileManagementIcon,
    title: "Manage Subscription Plans",
    description: "Edit existing tiers or create new subscription levels.",
    href: "/superadmin/subscriptions/dashboard",
  },
  {
    icon: MailSend01Icon,
    title: "System Broadcast",
    description:
      "Send a system-wide announcement to all school Admins (e.g., 'Scheduled Maintenance at 12:00AM').",
    // href: "/superadmin/broadcast",
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

const FORTY_EIGHT_HOURS_MS = 48 * 60 * 60 * 1000;

function schoolHasCancelledSubscription(school: School): boolean {
  const status =
    (school.subscription as { status?: string } | undefined)?.status ??
    (school.subscription_details as { status?: string } | undefined)?.status;
  return String(status).toLowerCase() === "cancelled";
}

function getSchoolMonthlyRevenue(school: School): number {
  const status =
    (school.subscription_details as { status?: string } | undefined)?.status ??
    (school.subscription as { status?: string } | undefined)?.status;
  if (String(status).toLowerCase() !== "active") return 0;
  const plan = school.subscription_details?.subscription;
  if (plan?.cost == null) return 0;
  const cost = parseFloat(String(plan.cost));
  if (Number.isNaN(cost) || cost < 0) return 0;
  const duration = Math.max(1, Number(plan.duration) || 1);
  return cost / duration;
}

function schoolNeedsFollowUp48h(school: School): boolean {
  const sub = school.subscription_details ?? school.subscription;
  const endDateStr =
    (sub as { end_date?: string } | undefined)?.end_date ??
    (school.subscription as { end_date?: string } | undefined)?.end_date;
  if (!endDateStr || String(endDateStr).trim() === "") return false;
  try {
    const endMs = new Date(String(endDateStr).trim()).getTime();
    if (Number.isNaN(endMs)) return false;
    const nowMs = Date.now();
    return endMs >= nowMs && endMs <= nowMs + FORTY_EIGHT_HOURS_MS;
  } catch {
    return false;
  }
}

export default function SuperAdminDashboardPage() {
  const router = useRouter();
  const { data: schoolsResponse, isLoading } = useGetSchoolsQuery({
    _all: true,
  });
  const schoolList = getSchoolsList(schoolsResponse);
  const schoolsNeedingFollowUp48h = useMemo(
    () => schoolList.filter(schoolNeedsFollowUp48h).length,
    [schoolList],
  );

  const cancellationRate = useMemo(() => {
    const cancelled = schoolList.filter(schoolHasCancelledSubscription).length;
    const total = schoolList.length;
    if (total === 0) return { count: 0, pct: 0 };
    return { count: cancelled, pct: (cancelled / total) * 100 };
  }, [schoolList]);

  const totalMRR = useMemo(
    () =>
      schoolList.reduce(
        (sum, school) => sum + getSchoolMonthlyRevenue(school),
        0,
      ),
    [schoolList],
  );

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
        if (raw == null || String(raw).trim() === "") return "—";
        const s = String(raw).trim();
        try {
          const date = /^\d{4}-\d{2}-\d{2}/.test(s) ? parseISO(s) : new Date(s);
          if (isNaN(date.getTime())) return "—";
          return <span className="text-sm">{format(date, "LLL d, yyyy")}</span>;
        } catch {
          return "—";
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
            icon: <Icon icon={ViewIcon} size={16} />,
            onClick: (row) => router.push(`/superadmin/main/${row.id}`),
          },
          {
            label: "Edit Details",
            icon: <Icon icon={PencilEdit01Icon} size={16} />,
            onClick: (row) => router.push(`/superadmin/main/edit/${row.id}`),
          },
          {
            label: "Deactivate",
            icon: <Icon icon={CancelCircleIcon} size={16} />,
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
            value={schoolList.length === 0 ? "—" : formattedAmount(totalMRR)}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MetricCard
            title="Cancellation rate"
            value={
              schoolList.length === 0
                ? "—"
                : `${cancellationRate.pct.toFixed(1)}%`
            }
            trend="up"
            subtitle={`${cancellationRate.count} of ${schoolList.length} schools with cancelled subscription.`}
          />
          <MetricCard
            title="Follow-up (48h)"
            value={`${schoolsNeedingFollowUp48h} School${schoolsNeedingFollowUp48h !== 1 ? "s" : ""}`}
            trend="up"
            subtitle="Schools that need a sale follow-up in the next 48 hours."
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
                isLoading={isLoading}
                emptyMessage="No schools found."
                tableClassName="border-collapse"
              />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
