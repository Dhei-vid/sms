"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpRight, Briefcase, Users, Clock, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface Vacancy {
  id: string;
  jobTitle: string;
  applicationCount: number;
  shortlisted: number;
  interviewScheduled: number;
}

export default function ApplicantTrackingPage() {
  const router = useRouter();

  const vacancies: Vacancy[] = [
    {
      id: "1",
      jobTitle: "JSS Science Teacher",
      applicationCount: 45,
      shortlisted: 12,
      interviewScheduled: 7,
    },
    {
      id: "2",
      jobTitle: "Primary Art Teacher",
      applicationCount: 30,
      shortlisted: 8,
      interviewScheduled: 3,
    },
    {
      id: "3",
      jobTitle: "Admin Assistant",
      applicationCount: 70,
      shortlisted: 20,
      interviewScheduled: 8,
    },
  ];

  const handleViewCandidates = (vacancyId: string) => {
    // Navigate to candidates page for this vacancy
    // For now, navigate to a sample applicant detail page
    router.push(`/admin/staff-management/applicant-tracking/1`);
  };

  const handlePostNewVacancy = () => {
    router.push("/admin/staff-management/post-new-vacancy");
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">Applicant Tracking</h2>
        <p className="text-gray-600 mt-1">
          Manage the flow of applicants for all open vacancies.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Open Vacancies"
          value="3 Positions"
          icon={Briefcase}
          trend="up"
        />
        <MetricCard
          title="Total Applicants"
          value="145 Candidates"
          icon={Users}
          trend="up"
        />
        <MetricCard
          title="Avg. Time-to-Hire"
          value="35 Days"
          icon={Clock}
          trend="up"
        />
      </div>

      {/* Post New Vacancy Button */}
      <div>
        <Button
          variant={"outline"}
          onClick={handlePostNewVacancy}
          className="h-11 w-full gap-2"
        >
          <Plus className="h-4 w-4" />
          Post New Vacancy
        </Button>
      </div>

      {/* Vacancy Summary Table */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Vacancy Summary
            </h3>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-main-blue/5">
                    <TableHead>Job Title</TableHead>
                    <TableHead>Application Count</TableHead>
                    <TableHead>Shortlisted</TableHead>
                    <TableHead>Interview Scheduled</TableHead>
                    <TableHead className="w-[150px]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vacancies.map((vacancy) => (
                    <TableRow key={vacancy.id}>
                      <TableCell className="font-medium text-gray-800">
                        {vacancy.jobTitle}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {vacancy.applicationCount}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {vacancy.shortlisted}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {vacancy.interviewScheduled}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewCandidates(vacancy.id)}
                          className="w-full"
                        >
                          View Candidates
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: "up" | "down";
}

function MetricCard({ title, value, icon: Icon, trend }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
          </div>
          <div className="relative">
            <div className="h-12 w-12 rounded-lg bg-main-blue/10 flex items-center justify-center">
              <Icon className="h-6 w-6 text-main-blue" />
            </div>
            {trend && (
              <ArrowUpRight className="absolute -top-1 -right-1 h-4 w-4 text-gray-400" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
