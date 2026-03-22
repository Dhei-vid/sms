import type {
  Result,
  ResultMetrics,
  GradeDistributionItem,
} from "./result-types";

const GRADE_LABELS: Record<string, { label: string; grade: string }> = {
  A: { label: "A-Grade", grade: "A" },
  "A+": { label: "A-Grade", grade: "A" },
  "A-": { label: "A-Grade", grade: "A" },
  B: { label: "B-Grade", grade: "B" },
  "B+": { label: "B-Grade", grade: "B" },
  "B-": { label: "B-Grade", grade: "B" },
  C: { label: "C-Grade", grade: "C" },
  "C+": { label: "C-Grade", grade: "C" },
  "C-": { label: "C-Grade", grade: "C" },
  D: { label: "D-Grade", grade: "D" },
  "D+": { label: "D-Grade", grade: "D" },
  "D-": { label: "D-Grade", grade: "D" },
  E: { label: "E-Grade", grade: "E" },
  "E+": { label: "E-Grade", grade: "E" },
  "E-": { label: "E-Grade", grade: "E" },
  F: { label: "F-Grade", grade: "F" },
};

const ORDERED_BUCKETS: GradeDistributionItem[] = [
  { label: "A-Grade", grade: "A", value: 0, percentage: 0 },
  { label: "B-Grade", grade: "B", value: 0, percentage: 0 },
  { label: "C-Grade", grade: "C", value: 0, percentage: 0 },
  { label: "D-Grade", grade: "D", value: 0, percentage: 0 },
  { label: "E-Grade", grade: "E", value: 0, percentage: 0 },
  { label: "F-Grade", grade: "F", value: 0, percentage: 0 },
];

export function scoreToLetterGrade(score: number): string {
  if (score >= 70) return "A";
  if (score >= 60) return "B";
  if (score >= 50) return "C";
  if (score >= 45) return "D";
  if (score >= 40) return "E";
  return "F";
}

function getAverageScoreForResult(result: Result): number | null {
  const subjects = result.subject_results;
  if (!subjects?.length) return null;

  const sum = subjects.reduce((acc, s) => acc + (s.total_score ?? 0), 0);
  return sum / subjects.length;
}

function normalizeGradeToBucket(rawGrade: string): string | null {
  const trimmed = String(rawGrade ?? "")
    .trim()
    .toUpperCase();
  if (!trimmed) return null;
  return (
    GRADE_LABELS[trimmed]?.grade ?? (trimmed.length === 1 ? trimmed : null)
  );
}

export function computeResultMetrics(results: Result[]): ResultMetrics {
  const normalized = Array.isArray(results) ? results : [];
  const totalStudents = normalized.length;

  if (totalStudents === 0) {
    return {
      average_score: 0,
      average_grade_letter: "F",
      grade_distribution: ORDERED_BUCKETS.map((b) => ({ ...b })),
      total_students: 0,
    };
  }

  const bucketCounts: Record<string, number> = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
  };

  let totalScore = 0;
  let scoredCount = 0;

  for (const result of normalized) {
    const avgScore = getAverageScoreForResult(result);
    if (avgScore != null) {
      totalScore += avgScore;
      scoredCount++;
    }

    const grade = result.grade ? normalizeGradeToBucket(result.grade) : null;
    const bucket =
      grade && bucketCounts[grade] !== undefined
        ? grade
        : scoreToLetterGrade(avgScore ?? 0);
    if (bucketCounts[bucket] !== undefined) {
      bucketCounts[bucket]++;
    }
  }

  const averageScore = scoredCount > 0 ? totalScore / scoredCount : 0;
  const averageGradeLetter = scoreToLetterGrade(averageScore);

  const gradeDistribution: GradeDistributionItem[] = ORDERED_BUCKETS.map(
    (bucket) => {
      const value = bucketCounts[bucket.grade] ?? 0;
      const percentage =
        totalStudents > 0 ? Math.round((value / totalStudents) * 1000) / 10 : 0;
      return { ...bucket, value, percentage };
    },
  );

  return {
    average_score: Math.round(averageScore * 10) / 10,
    average_grade_letter: averageGradeLetter,
    grade_distribution: gradeDistribution,
    total_students: totalStudents,
  };
}
