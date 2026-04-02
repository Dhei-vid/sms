import type { Stakeholders } from "@/services/stakeholders/stakeholder-types";

export interface StudentPersonalState {
  firstName: string;
  lastName: string;
  date: string;
  gender: { male: boolean; female: boolean };
  grade: string;
  parentName: string;
  parentEmail: string;
  phoneNumber: string;
  email: string;
}

export type StudentDocumentsState = Record<string, File | null>;

export interface StudentAcademicState {
  currentPreviousSchool: string;
  lastGradeCompleted: string;
  commonExamScore: string;
  performanceHighlights: string;
  transferReason: string;
}

export interface StudentStatusState {
  initialStatus: string;
  adminNotes: string;
}

export interface StudentEditFormState {
  details: StudentPersonalState;
  academic: StudentAcademicState;
  documents: StudentDocumentsState;
  status: StudentStatusState;
}

const CLASS_TO_GRADE_KEY: Record<string, string> = {
  "JS 1": "js1",
  "JS 2": "js2",
  "JS 3": "js3",
  "SS 1": "ss1",
  "SS 2": "ss2",
  "SS 3": "ss3",
};

const GRADE_KEY_TO_CLASS: Record<string, string> = {
  js1: "JS 1",
  js2: "JS 2",
  js3: "JS 3",
  ss1: "SS 1",
  ss2: "SS 2",
  ss3: "SS 3",
};

const DOCUMENT_IDS = [
  "birthCertificate",
  "reportCard",
  "degreeCertificate",
  "medicalReport",
  "passportPhoto",
] as const;

const DOCUMENT_TYPE_MAP: Record<string, string> = {
  birthCertificate: "birth certificate",
  reportCard: "previous grade final report",
  degreeCertificate: "degree certificate",
  medicalReport: "medical report",
  passportPhoto: "passport photo",
};

export function getInitialStudentEditState(
  student: Stakeholders,
): StudentEditFormState {
  const user = student.user;
  const genderStr = String(user.gender ?? "").toLowerCase();
  const gradeKey = CLASS_TO_GRADE_KEY[student.class_assigned ?? ""] ?? "";
  const s = student as any;

  return {
    details: {
      firstName: user.first_name ?? "",
      lastName: user.last_name ?? "",
      date: user.date_of_birth ?? "",
      gender: {
        male: genderStr === "male",
        female: genderStr === "female",
      },
      grade: gradeKey,
      parentName: student.parent_name ?? "",
      parentEmail: s.parent_email ?? "",
      phoneNumber: user.phone_number ?? (user as any).phone ?? "",
      email: user.email ?? "",
    },
    academic: {
      currentPreviousSchool: String(student.current_previous_school ?? ""),
      lastGradeCompleted: String(student.last_grade_completed ?? ""),
      commonExamScore: String(student.common_exam_score ?? ""),
      performanceHighlights: String(student.performance_highlights ?? ""),
      transferReason: String(student.transfer_reason ?? ""),
    },
    documents: {},
    status: {
      initialStatus: student.initial_status ?? student.status ?? "",
      adminNotes: student.admin_notes ?? "",
    },
  };
}

export function buildUserUpdatePayload(
  state: StudentEditFormState,
  student: Stakeholders,
): Record<string, any> {
  const { details } = state;
  const gender = details.gender.female
    ? "female"
    : details.gender.male
      ? "male"
      : (student.user.gender ?? "");

  return {
    school_id: student.school_id,
    username: student.user.username,
    first_name: details.firstName || student.user.first_name,
    last_name: details.lastName || student.user.last_name,
    email: details.email || student.user.email,
    gender,
    date_of_birth: details.date || student.user.date_of_birth || null,
    phone_number: details.phoneNumber || student.user.phone_number || null,
    role: student.user.role,
    status: student.user.status,
    is_active: student.user.is_active,
    is_staff: student.user.is_staff,
    is_superuser: student.user.is_superuser,
    theme: student.user.theme ?? "light",
    api_usage: student.user.api_usage ?? 0,
    model_preferences: student.user.model_preferences ?? [],
    training_data: student.user.training_data ?? [],
    personalization_settings: (student.user
      .personalization_settings as any) ?? { height: "" },
    permissions: ["write"],
  };
}

export function buildStakeholderUpdatePayload(
  state: StudentEditFormState,
  student: Stakeholders,
): Record<string, any> {
  const { details, academic, status } = state;
  const classAssigned = details.grade
    ? (GRADE_KEY_TO_CLASS[details.grade] ?? details.grade)
    : (student.class_assigned ?? null);

  return {
    class_assigned: classAssigned,
    parent_name: details.parentName || student.parent_name || null,
    parent_email: details.parentEmail || null,
    phone_number: details.phoneNumber || null,
    admin_notes: status.adminNotes,
    initial_status: status.initialStatus || null,
    current_previous_school: academic.currentPreviousSchool.trim() || null,
    last_grade_completed:
      academic.lastGradeCompleted && academic.lastGradeCompleted !== "none"
        ? academic.lastGradeCompleted
        : null,
    common_exam_score: academic.commonExamScore.trim() || null,
    performance_highlights: academic.performanceHighlights.trim() || null,
    transfer_reason: academic.transferReason.trim() || null,
  };
}

export function getNewDocuments(
  state: StudentEditFormState,
): { file: File; name: string; type: string }[] {
  return DOCUMENT_IDS.filter((id) => state.documents[id]).map((id) => ({
    file: state.documents[id] as File,
    name: (state.documents[id] as File).name,
    type: DOCUMENT_TYPE_MAP[id],
  }));
}
