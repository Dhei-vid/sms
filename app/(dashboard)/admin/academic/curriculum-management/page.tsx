"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FinancialMetricCard } from "@/components/dashboard-pages/admin/finance/finance-metrics";
import { QuickActionCard } from "@/components/dashboard-pages/admin/admissions/components/quick-action-card";
import {
  PencilEdit02Icon,
  Calendar03Icon,
  Link01Icon,
} from "@hugeicons/core-free-icons";
import { useRouter } from "next/navigation";

interface CoverageStatus {
  id: string;
  section: string;
  plannedCoverage: number;
  actualCoverage: number;
  color: string;
}

const coverageData: CoverageStatus[] = [
  {
    id: "1",
    section: "Senior School (SS)",
    plannedCoverage: 80,
    actualCoverage: 75,
    color: "bg-orange-500",
  },
  {
    id: "2",
    section: "Junior School (JSS)",
    plannedCoverage: 75,
    actualCoverage: 85,
    color: "bg-green-500",
  },
  {
    id: "3",
    section: "Primary School",
    plannedCoverage: 70,
    actualCoverage: 70,
    color: "bg-blue-500",
  },
];

const quickActions = [
  {
    icon: PencilEdit02Icon,
    title: "Add/Edit Subject Outline",
    description: "Leads to the Subject Setup form",
  },
  {
    icon: Calendar03Icon,
    title: "Review Lesson Plans",
    description: "Links to the submission approval workflow",
  },
  {
    icon: Link01Icon,
    title: "Map Standard to Subject",
    description:
      "Linking subjects to national/international educational standards",
  },
];

export default function CurriculumManagementPage() {
  const router = useRouter();

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Curriculum Management
        </h2>
        <p className="text-gray-600 mt-1">
          Defines and manages all subjects, learning objectives, and content
          pacing.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FinancialMetricCard
          title="Curriculum Coverage"
          value="75% Complete"
          subtitle="Status of lesson plans"
          trend="up"
        />
        <FinancialMetricCard
          title="Learning Objectives Mapped"
          value="98%"
          subtitle="Completeness of subject outlines"
          trend="up"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Coverage Status by Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Coverage Status by Section
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              A concise chart showing the progress of lesson plan completion
            </p>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-main-blue/5">
                    <TableHead className="px-4 py-3">Section</TableHead>
                    <TableHead className="px-4 py-3">
                      Planned Coverage
                    </TableHead>
                    <TableHead className="px-4 py-3 min-w-[300px]">
                      Actual Coverage
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coverageData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="px-4 py-3 text-sm font-medium text-gray-700">
                        {item.section}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-sm text-gray-800">
                        {item.plannedCoverage}%
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <div className="flex items-center gap-4">
                          <div className="flex-1 relative h-8 bg-gray-100 overflow-hidden rounded">
                            <div
                              className={`h-full flex items-center transition-all duration-300 ${item.color}`}
                              style={{ width: `${item.actualCoverage}%` }}
                            >
                              {item.actualCoverage > 10 && (
                                <span className="text-white text-xs font-medium pl-3">
                                  {item.actualCoverage}%
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {quickActions.map((action, index) => (
              <QuickActionCard
                key={index}
                title={action.title}
                icon={action.icon}
                description={action.description}
                onClick={() => {
                  if (action.title === "Add/Edit Subject Outline") {
                    router.push(
                      "curriculum-management/add-edit-subject-outline",
                    );
                  }

                  if (action.title === "Map Standard to Subject") {
                    router.push("curriculum-management/map-standard-subject");
                  }

                  if (action.title === "Review Lesson Plans") {
                    router.push("curriculum-management/lesson-plan-review");
                  }
                }}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
