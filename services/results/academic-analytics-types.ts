export interface GradeDistributionItem {
  label: string;
  grade: string;
  value: number;
}

export interface AcademicAnalytics {
  average_score: number;
  grade_distribution: GradeDistributionItem[];
  session: string;
  term: string;
  class_filter: string;
}
