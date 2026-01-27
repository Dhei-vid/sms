import { Grades } from "@/common/types";

export interface CreateResultsPayload {
  student_id: string;
  exam_id: string;
  term: "First Term";
  session: string;
  class_name: string;
  grade: Grades;
  subject_results: SubjectResults[];
  total_score: number;
  average_score: number;
  position: number;
  teacher_remarks: string;
  principal_remarks: string;
}

export interface SubjectResults {
  subject: string;
  teacher_id: string;
  class_score: number;
  exam_score: number;
  total_score: number;
  grade: Grades;
  remarks: string;
}

export interface RecordResultsPayload {
  results: {
    student_id: string;
    exam_id: string;
    term: "First Term";
    session: string;
    class_name: string;
    grade: Grades;
    subject_results: SubjectResults[];
    total_score: 190;
    average_score: 95;
    position: 1;
    teacher_remarks: string;
    principal_remarks: string;
  }[];
}

export interface UpdateResultsPayload {
  student_id: string;
  principal_remarks: string;
  // "exam_id": "exam123 updated",
  // "term": "First Term",
  // "session": "2023/2024",
  // "class_name": "Grade 10",
  // "grade": "A updated",
  // "subject_results": [
  //     {
  //          "id": "01jz8nq33ab63rrreaygj2eckn",
  //         "subject": "Mathematics Again",
  //         "teacher_id": "01jz1e20rq6f2yv8jbb7qhej9s",
  //         "class_score": 50,
  //         "exam_score": 70,
  //         "total_score": 120,
  //         "grade": "C",
  //         "remarks": "Excellent performance Updated"
  //     },
  //     {
  //         "id": "01jz8nq33ezk8czfvppdcjpv82",
  //         "subject": "English Again",
  //         "teacher_id": "01jz1dbcz1ytc2n06w6kdq2fqe",
  //         "class_score": 40,
  //         "exam_score": 50,
  //         "total_score": 95,
  //         "grade": "B",
  //         "remarks": "Very good Updated"
  //     }
  // ],
  // "total_score": 290,
  // "average_score": 195,
  // "position": 3,
  // "teacher_remarks": "Keep up the good work updated",
}
