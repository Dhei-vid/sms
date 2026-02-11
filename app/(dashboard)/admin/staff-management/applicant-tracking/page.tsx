"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DataTable,
  TableColumn,
  TableAction,
} from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { useGetStakeholdersQuery } from "@/services/stakeholders/stakeholders";
import type { Stakeholders } from "@/services/stakeholders/stakeholder-types";

interface Vacancy {
  id: string;
  jobTitle: string;
  applicationCount: number;
  shortlisted: number;
  interviewScheduled: number;
}

export default function ApplicantTrackingPage() {
  const router = useRouter();
  // Fetch all stakeholders and filter for applicants on frontend
  // Backend will need to support type='applicant' in stakeholders
  const {
    data: stakeholdersData,
    isLoading,
    error,
  } = useGetStakeholdersQuery();

  // Filter applicants and group by position (job title) to create vacancies
  const vacancies: Vacancy[] = useMemo(() => {
    if (!stakeholdersData?.data) return [];

    // Filter for applicants only
    const applicants = stakeholdersData.data.filter(
      (s) => s.type === "applicant",
    );

    // Group applicants by position (job title)
    const vacancyMap = new Map<
      string,
      {
        id: string;
        jobTitle: string;
        applicants: Stakeholders[];
      }
    >();

    applicants.forEach((applicant) => {
      const jobTitle = applicant.position || "Unspecified Position";

      if (!vacancyMap.has(jobTitle)) {
        // Use first applicant's ID as vacancy ID (or generate from job title)
        vacancyMap.set(jobTitle, {
          id: applicant.id, // Using first applicant ID as vacancy identifier
          jobTitle,
          applicants: [],
        });
      }

      vacancyMap.get(jobTitle)!.applicants.push(applicant);
    });

    // Transform to vacancy format with counts
    return Array.from(vacancyMap.values()).map((vacancy) => {
      const applicants = vacancy.applicants;

      // Count by status - assuming status field indicates stage
      // Adjust these based on actual status values used
      const shortlisted = applicants.filter(
        (a) =>
          a.status?.toLowerCase() === "shortlisted" ||
          a.initial_status?.toLowerCase() === "shortlisted",
      ).length;

      const interviewScheduled = applicants.filter(
        (a) =>
          a.status?.toLowerCase() === "interview_scheduled" ||
          a.initial_status?.toLowerCase() === "interview_scheduled" ||
          a.status?.toLowerCase() === "interview scheduled",
      ).length;

      return {
        id: vacancy.id,
        jobTitle: vacancy.jobTitle,
        applicationCount: applicants.length,
        shortlisted,
        interviewScheduled,
      };
    });
  }, [stakeholdersData]);

  // Calculate metrics from API data
  const metrics = useMemo(() => {
    const openVacancies = vacancies.length; // All vacancies shown are "open"
    const totalApplicants = vacancies.reduce(
      (sum, v) => sum + v.applicationCount,
      0,
    );
    // Placeholder for avg time-to-hire (would need backend calculation)
    return {
      openVacancies,
      totalApplicants,
      avgTimeToHire: 35,
    };
  }, [vacancies]);

  const handleViewCandidates = (vacancy: Vacancy) => {
    router.push(`/admin/staff-management/applicant-tracking/${vacancy.id}`);
  };

  const handlePostNewVacancy = () => {
    router.push("/admin/staff-management/post-new-vacancy");
  };

  const columns: TableColumn<Vacancy>[] = [
    {
      key: "jobTitle",
      title: "Job Title",
      render: (_, row) => (
        <div className="font-medium text-gray-800">{row.jobTitle}</div>
      ),
    },
    {
      key: "applicationCount",
      title: "Application Count",
      render: (_, row) => (
        <div className="text-gray-600">{row.applicationCount}</div>
      ),
    },
    {
      key: "shortlisted",
      title: "Shortlisted",
      render: (_, row) => (
        <div className="text-gray-600">{row.shortlisted}</div>
      ),
    },
    {
      key: "interviewScheduled",
      title: "Interview Scheduled",
      render: (_, row) => (
        <div className="text-gray-600">{row.interviewScheduled}</div>
      ),
    },
  ];

  const actions: TableAction<Vacancy>[] = [
    {
      type: "button",
      config: {
        label: "View Candidates",
        onClick: (vacancy) => handleViewCandidates(vacancy),
        variant: "outline",
        className: "w-full",
      },
    },
  ];

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
          value={`${metrics.openVacancies} ${metrics.openVacancies === 1 ? "Position" : "Positions"}`}
          trend={metrics.openVacancies > 0 ? "up" : undefined}
        />
        <MetricCard
          title="Total Applicants"
          value={`${metrics.totalApplicants} ${metrics.totalApplicants === 1 ? "Candidate" : "Candidates"}`}
          trend={metrics.totalApplicants > 0 ? "up" : undefined}
        />
        <MetricCard
          title="Avg. Time-to-Hire"
          value={`${metrics.avgTimeToHire} ${metrics.avgTimeToHire === 1 ? "Day" : "Days"}`}
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
              {isLoading ? (
                <div className="p-8 text-center text-gray-500">
                  Loading vacancies...
                </div>
              ) : error ? (
                <div className="p-8 text-center text-red-500">
                  {error &&
                  "data" in error &&
                  typeof error.data === "object" &&
                  error.data &&
                  "message" in error.data
                    ? (error.data as { message: string }).message
                    : "Failed to load vacancies."}
                </div>
              ) : (
                <DataTable
                  columns={columns}
                  data={vacancies}
                  actions={actions}
                  emptyMessage="No vacancies found"
                  onRowClick={(vacancy) => handleViewCandidates(vacancy)}
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
