"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DocumentValidationIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/general/huge-icon";
import { StudentNavigation } from "@/components/dashboard-pages/admin/academic/assessment-grading/final-result-approval-queue/student-navigation";
import { ResultsTable } from "@/components/dashboard-pages/admin/academic/assessment-grading/final-result-approval-queue/results-table";
import { PrincipalsRemarkModal } from "@/components/dashboard-pages/admin/academic/assessment-grading/final-result-approval-queue/principals-remark-modal";

interface SubjectResult {
  subject: string;
  finalTermScore: number;
  teacherRemarks: string;
}

interface StudentData {
  id: string;
  name: string;
  email: string;
  results: SubjectResult[];
}

// Mock data - in a real app, this would be fetched based on the class ID
const mockStudents: StudentData[] = [
  {
    id: "1",
    name: "Oluwole, Tunde",
    email: "oluwole.m170842@penetraliahub.edu.ng",
    results: [
      {
        subject: "Arts & Crafts",
        finalTermScore: 98.5,
        teacherRemarks:
          "The teacher's original comment from the Grade Entry Portal.",
      },
      {
        subject: "Computer Science",
        finalTermScore: 98.5,
        teacherRemarks:
          "The teacher's original comment from the Grade Entry Portal.",
      },
      {
        subject: "English Language",
        finalTermScore: 72.1,
        teacherRemarks:
          "The teacher's original comment from the Grade Entry Portal.",
      },
      {
        subject: "Information Technology",
        finalTermScore: 72.1,
        teacherRemarks:
          "The teacher's original comment from the Grade Entry Portal.",
      },
      {
        subject: "Integrated Science",
        finalTermScore: 98.5,
        teacherRemarks:
          "The teacher's original comment from the Grade Entry Portal.",
      },
      {
        subject: "Mathematics",
        finalTermScore: 98.5,
        teacherRemarks:
          "The teacher's original comment from the Grade Entry Portal.",
      },
      {
        subject: "Physical Education",
        finalTermScore: 72.1,
        teacherRemarks:
          "The teacher's original comment from the Grade Entry Portal.",
      },
      {
        subject: "Yoruba Language",
        finalTermScore: 72.1,
        teacherRemarks:
          "The teacher's original comment from the Grade Entry Portal.",
      },
    ],
  },
  {
    id: "2",
    name: "Olatunji, Priscilia",
    email: "olatunji.p170843@penetraliahub.edu.ng",
    results: [
      {
        subject: "Arts & Crafts",
        finalTermScore: 95.0,
        teacherRemarks:
          "The teacher's original comment from the Grade Entry Portal.",
      },
      {
        subject: "Computer Science",
        finalTermScore: 92.5,
        teacherRemarks:
          "The teacher's original comment from the Grade Entry Portal.",
      },
    ],
  },
  {
    id: "3",
    name: "Omaye, Babaremu",
    email: "omaye.b170844@penetraliahub.edu.ng",
    results: [
      {
        subject: "English Language",
        finalTermScore: 88.0,
        teacherRemarks:
          "The teacher's original comment from the Grade Entry Portal.",
      },
      {
        subject: "Mathematics",
        finalTermScore: 90.5,
        teacherRemarks:
          "The teacher's original comment from the Grade Entry Portal.",
      },
    ],
  },
];

// Mock function to get class details
const getClassDetails = (classId: string) => {
  // In a real app, this would fetch from an API
  return {
    id: classId,
    name: "JSS 2 First Term 2025/2026",
    description: "This provides the necessary data for the final decision.",
  };
};

export default function ReviewResultsPage({
  params,
}: {
  params: { class: string };
}) {
  const router = useRouter();
  const classId = params.class;
  const classDetails = getClassDetails(classId);

  // For demo purposes, start with the first student
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const [displayedResults, setDisplayedResults] = useState(8); // Show first 8 results
  const [hasMore, setHasMore] = useState(true);
  const [remarkModalOpen, setRemarkModalOpen] = useState(false);

  const currentStudent = mockStudents[currentStudentIndex];
  const previousStudent =
    currentStudentIndex > 0
      ? {
          id: mockStudents[currentStudentIndex - 1].id,
          name: mockStudents[currentStudentIndex - 1].name,
        }
      : undefined;
  const nextStudent =
    currentStudentIndex < mockStudents.length - 1
      ? {
          id: mockStudents[currentStudentIndex + 1].id,
          name: mockStudents[currentStudentIndex + 1].name,
        }
      : undefined;

  const handlePrevious = () => {
    if (currentStudentIndex > 0) {
      setCurrentStudentIndex(currentStudentIndex - 1);
      setDisplayedResults(8); // Reset displayed results
      setHasMore(mockStudents[currentStudentIndex - 1].results.length > 8);
    }
  };

  const handleNext = () => {
    if (currentStudentIndex < mockStudents.length - 1) {
      setCurrentStudentIndex(currentStudentIndex + 1);
      setDisplayedResults(8); // Reset displayed results
      setHasMore(mockStudents[currentStudentIndex + 1].results.length > 8);
    }
  };

  const handleLoadMore = () => {
    const remaining = currentStudent.results.length - displayedResults;
    if (remaining > 0) {
      setDisplayedResults(
        Math.min(displayedResults + 8, currentStudent.results.length)
      );
      setHasMore(displayedResults + 8 < currentStudent.results.length);
    }
  };

  const handleRemarkAndPublish = () => {
    setRemarkModalOpen(true);
  };

  const handleSaveAndPublish = (remark: string) => {
    console.log("Save and publish result for", currentStudent.name, "with remark:", remark);
    // Handle save and publish action with remark
    // In a real app, this would make an API call to save the remark and publish the result
  };

  const visibleResults = currentStudent.results.slice(0, displayedResults);
  const shouldShowLoadMore =
    hasMore && currentStudent.results.length > displayedResults;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Review {classDetails.name} Results
        </h2>
        <p className="text-gray-600 mt-1">{classDetails.description}</p>
      </div>

      {/* Button */}
      <Button
        variant={"outline"}
        onClick={handleRemarkAndPublish}
        className="w-full h-11"
      >
        <Icon icon={DocumentValidationIcon} size={16} className="mr-2" />
        Remark and Publish result
      </Button>

      {/* Student Navigation */}
      <Card>
        <CardContent className="p-6">
          <StudentNavigation
            previousStudent={previousStudent}
            currentStudent={{
              id: currentStudent.id,
              name: currentStudent.name,
              email: currentStudent.email,
            }}
            nextStudent={nextStudent}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card>
        <CardContent className="p-6">
          <ResultsTable
            results={visibleResults}
            onLoadMore={shouldShowLoadMore ? handleLoadMore : undefined}
            hasMore={shouldShowLoadMore}
          />
        </CardContent>
      </Card>

      {/* Principal's Remark Modal */}
      <PrincipalsRemarkModal
        open={remarkModalOpen}
        onOpenChange={setRemarkModalOpen}
        onSaveAndPublish={handleSaveAndPublish}
        studentName={currentStudent.name}
      />
    </div>
  );
}
