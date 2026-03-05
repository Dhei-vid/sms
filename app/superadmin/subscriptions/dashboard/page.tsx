"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { QuickActionCard } from "@/components/dashboard-pages/admin/admissions/components/quick-action-card";
import { DataTable, TableColumn } from "@/components/ui/data-table";
import { PencilEdit01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

import { Subscriptions } from "@/services/subscriptions/subscription-types";
import { useGetSubscriptionsQuery } from "@/services/subscriptions/subscriptions";

const SUBSCRIBER_METRICS = [
  { title: "Basic Subscribers", value: "12", ytd: "+12% YTD" },
  { title: "Pro Subscribers", value: "18", ytd: "+2% YTD" },
  { title: "Custom Subscribers", value: "4", ytd: "+12% YTD" },
];

export default function SubscriptionDashboardPage() {
  const router = useRouter();

  const { data: subscriptionsData, isLoading: isSubscriptionsLoading } =
    useGetSubscriptionsQuery();

  const columns: TableColumn<Subscriptions>[] = [
    {
      key: "plan",
      title: "Plan Name",
      render: (_, row) => (
        <span className="text-sm font-medium">{row.plan || "—"}</span>
      ),
    },
    {
      key: "cost",
      title: "Cost",
      render: (_, row) => <span className="text-sm">{row.cost}</span>,
    },
    {
      key: "description",
      title: "Description",
      render: (_, row) => <span className="text-sm">{row.description}</span>,
    },
    {
      key: "features",
      title: "Features",
      render: (_, row) => (
        <div>
          {row.features.length > 0 ? (
            <div className="flex flex-col gap-1">
              {row.features.map((items, index) => (
                <span className="text-sm text-muted-foreground" key={index}>
                  {items}
                </span>
              ))}
            </div>
          ) : (
            <span>No features added yet.</span>
          )}
        </div>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (_, row) => (
        <span
          className={cn(
            "text-sm font-medium capitalize",
            row.status === "available" ? "text-main-blue" : "text-gray-500",
          )}
        >
          {row.status === "available" ? "Available" : "Not Available"}
        </span>
      ),
    },
    {
      key: "action",
      title: "Action",
      render: (_, row) => (
        <div className="flex items-center gap-3 text-sm">
          {row.status === "available" ? (
            <>
              <Link
                href={`/superadmin/subscriptions/manage/${row.id}`}
                className="text-main-blue hover:underline"
              >
                Edit Plan
              </Link>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  // TODO: archive plan
                }}
                className="text-muted-foreground hover:underline"
              >
                Archive
              </Link>
            </>
          ) : (
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                // TODO: unarchive plan
              }}
              className="text-muted-foreground hover:underline"
            >
              Unarchive
            </Link>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Subscription Dashboard
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SUBSCRIBER_METRICS.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            trend="up"
            subtitle={metric.ytd}
            trendColor="text-green-600"
          />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Primary Management Action
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <QuickActionCard
            title="Create New Plan"
            description="Launch a fresh tier"
            icon={PencilEdit01Icon}
            onClick={() => router.push("/superadmin/subscriptions/manage/new")}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            The Plan Management Table
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            This is the central registry of every subscription tier you&apos;ve
            created.
          </p>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <DataTable
              columns={columns}
              data={subscriptionsData?.data ?? []}
              isLoading={isSubscriptionsLoading}
              emptyMessage="No plans yet."
              showActionsColumn={false}
              tableClassName="border-collapse"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
