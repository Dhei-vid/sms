"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  UserCog,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  Calendar,
  Megaphone,
  Clock,
  ShoppingCart,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  return (
    <div className="space-y-4">
      {/* Welcome Section */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
        <p className="text-gray-600 mt-1">
          Welcome back. Here is what is happening today.
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Students"
          value="1,900"
          subtitle="+34% Compared to last term"
          icon={Users}
          trend="up"
          trendColor="text-green-600"
        />
        <MetricCard
          title="Total Staffs"
          value="240"
          subtitle="Total active workforce"
          icon={UserCog}
        />
        <MetricCard
          title="Finance"
          value="₦12,187,000"
          subtitle="Total income"
          icon={DollarSign}
        />
        <MetricCard
          title="Attendance"
          value="94%"
          subtitle="Average attendance both staffs & students"
          icon={TrendingUp}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Grade Distribution Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              Grade Distribution
            </CardTitle>
            <select className="text-sm border border-gray-300 rounded-md px-3 py-1.5 bg-white">
              <option>All Classes</option>
            </select>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2">
              {/* Grade Bars */}
              {[
                { label: "A-Grade", value: 70, color: "bg-teal-500" },
                { label: "B-Grade", value: 45, color: "bg-orange-500" },
                { label: "C-Grade", value: 65, color: "bg-purple-500" },
                { label: "D-Grade", value: 25, color: "bg-blue-500" },
                { label: "E-Grade", value: 10, color: "bg-red-500" },
                { label: "F-Grade", value: 2, color: "bg-gray-400" },
              ].map((grade) => (
                <div
                  key={grade.label}
                  className="flex-1 flex flex-col items-center"
                >
                  <div className="w-full flex flex-col items-center justify-end h-full">
                    <div
                      className={cn(
                        "w-full rounded-t transition-all",
                        grade.color
                      )}
                      style={{ height: `${grade.value}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600 mt-2 text-center">
                    {grade.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <a
                href="#"
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                View Student Progress
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Today's Event */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Today's Event
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-purple-600 mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    Extra Curriculum Activities
                  </p>
                  <p className="text-xs text-gray-600">Election Manifestos</p>
                  <p className="text-xs text-gray-500 mt-1">
                    12:00 PM - 1:30 PM
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-600 mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    Session Meeting
                  </p>
                  <p className="text-xs text-gray-600">PTA Meeting</p>
                  <p className="text-xs text-gray-500 mt-1">
                    3:00 PM - 4:45 PM
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today on the Notice Board */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Today on the Notice Board
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-gray-800">
                    Election Manifestos
                  </h4>
                  <span className="text-xs text-gray-500">10:32 AM</span>
                </div>
                <p className="text-sm text-gray-600">
                  Today is the D-Day for every of our aspirants. Time is 12:00
                  PM - 1:30 PM
                </p>
              </div>
              <Button variant="outline" className="w-full">
                View More
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                title: "SS2A - Physics Practical",
                time: "10:00 AM",
                description:
                  "Practical for SS2A science class for simple Pendulum experiment has started",
              },
              {
                title: "JS 3A Class Attendance",
                time: "9:32 AM",
                description:
                  "Total of 39 out of 41 students attended the class",
              },
              {
                title: "Maintenance Required",
                time: "8:15 AM",
                description: "Biology testing equipment in need of maintenance",
              },
            ].map((activity, index) => (
              <div key={index} className="flex gap-3">
                <div className="h-2 w-2 rounded-full bg-gray-400 mt-2" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-800">
                      {activity.title}
                    </p>
                    <span className="text-xs text-gray-500">
                      {activity.time}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Transactions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                title: "Canteen Debit Paid",
                amount: "₦49,499",
                date: "Oct. 20, 3:33 PM",
                description: "Paid off Ms. Adebayo Snacks",
                icon: ShoppingCart,
              },
              {
                title: "Canteen Purchase",
                amount: "₦800",
                date: "Oct. 20, 11:33 AM",
                description: "musam120789 bought meat pie % smoothies",
                icon: ShoppingCart,
              },
              {
                title: "Canteen Purchase",
                amount: "₦800",
                date: "Oct. 20, 11:33 AM",
                description: "museum120789 bought meat pie % smoothies",
                icon: ShoppingCart,
              },
            ].map((transaction, index) => (
              <div key={index} className="flex gap-3">
                <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <transaction.icon className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-800">
                      {transaction.title}
                    </p>
                    <span className="text-sm font-semibold text-gray-800">
                      {transaction.amount}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {transaction.description}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: "up" | "down";
  trendColor?: string;
}

function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendColor,
}: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-800 mb-1">{value}</p>
            <p className={cn("text-xs", trendColor || "text-gray-500")}>
              {subtitle}
            </p>
          </div>
          <div className="relative">
            <div className="h-12 w-12 rounded-lg bg-purple-50 flex items-center justify-center">
              <Icon className="h-6 w-6 text-purple-600" />
            </div>
            {trend && (
              <ArrowUpRight
                className={cn(
                  "absolute -top-1 -right-1 h-4 w-4",
                  trendColor || "text-gray-400"
                )}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
