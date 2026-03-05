import type { AdmissionRegister, Documents } from "@/services/users/users-type";

export interface ApplicantDetailsState {
  firstName: string;
  lastName: string;
  date: string;
  gender: { male: boolean; female: boolean };
  grade: string;
  parentName: string;
  parentEmail: string;
  phoneNumber: string;
  email: string;
  schoolId: string;
}

export type DocumentUploadState = Record<string, File | null>;

/** Academic history fields (optional) - matches Academic history in admissions record view */
export interface AcademicDetailsState {
  currentPreviousSchool: string;
  lastGradeCompleted: string;
  commonExamScore: string;
  performanceHighlights: string;
  transferReason: string;
}

export interface ApplicationStatusState {
  initialStatus: string;
  adminNotes: string;
  dateSubmitted: string;
}

export interface AdmissionFormState {
  details: ApplicantDetailsState;
  academic: AcademicDetailsState;
  documents: DocumentUploadState;
  status: ApplicationStatusState;
}

export const getInitialAdmissionFormState = (): AdmissionFormState => ({
  details: {
    firstName: "",
    lastName: "",
    date: "",
    gender: { male: false, female: false },
    grade: "",
    parentName: "",
    parentEmail: "",
    phoneNumber: "",
    email: "",
    schoolId: "",
  },
  academic: {
    currentPreviousSchool: "",
    lastGradeCompleted: "",
    commonExamScore: "",
    performanceHighlights: "",
    transferReason: "",
  },
  documents: {},
  status: {
    initialStatus: "",
    adminNotes: "",
    dateSubmitted: "",
  },
});

const GRADE_TO_CLASS: Record<string, string> = {
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

function toScalars(state: AdmissionFormState, schoolId: string | null) {
  const { details, academic, documents: docState, status } = state;
  const gender = details.gender.female
    ? "female"
    : details.gender.male
      ? "male"
      : "";
  const classAssigned = details.grade
    ? (GRADE_TO_CLASS[details.grade] ?? details.grade)
    : null;
  const username =
    details.email.trim() ||
    details.firstName.replace(/\s+/g, ".").toLowerCase();
  // Use schoolId from form details if provided, otherwise fall back to passed schoolId
  const finalSchoolId = details.schoolId || schoolId || "";
  return {
    school_id: finalSchoolId,
    username,
    first_name: details.firstName || "—",
    last_name: details.lastName || "—",
    middle_name: null,
    admission_number: `ADM-${Date.now().toString(36).toUpperCase()}`,
    email: details.email,
    date_of_birth: details.date || "",
    gender,
    class_assigned: classAssigned,
    role: "student",
    parent_name: details.parentName,
    parent_email: details.parentEmail,
    phone_number: details.phoneNumber,
    stage: 2,
    initial_status: status.initialStatus || "Inititated",
    admin_notes: status.adminNotes,
    date_joined: status.dateSubmitted || "",
    // Academic details (optional)
    current_previous_school: academic.currentPreviousSchool.trim() || null,
    last_grade_completed:
      academic.lastGradeCompleted && academic.lastGradeCompleted !== "none"
        ? academic.lastGradeCompleted.trim()
        : null,
    common_exam_score: academic.commonExamScore.trim() || null,
    performance_highlights: academic.performanceHighlights.trim() || null,
    transfer_reason: academic.transferReason.trim() || null,
    docState,
  };
}

export function buildAdmissionFormData(
  state: AdmissionFormState,
  schoolId: string | null,
): FormData {
  const s = toScalars(state, schoolId);
  const fd = new FormData();
  fd.append("school_id", s.school_id);
  fd.append("username", s.username);
  fd.append("first_name", s.first_name);
  fd.append("last_name", s.last_name);
  if (s.middle_name) fd.append("middle_name", s.middle_name);
  fd.append("admission_number", s.admission_number);
  fd.append("email", s.email);
  if (s.date_of_birth) fd.append("date_of_birth", s.date_of_birth);
  fd.append("gender", s.gender);
  if (s.class_assigned) fd.append("class_assigned", s.class_assigned);
  fd.append("role", s.role);
  fd.append("parent_name", s.parent_name);
  if (s.parent_email) fd.append("parent_email", s.parent_email);
  fd.append("phone_number", s.phone_number);
  fd.append("stage", String(s.stage));
  fd.append("initial_status", s.initial_status);
  fd.append("admin_notes", s.admin_notes);
  if (s.date_joined) fd.append("date_joined", s.date_joined);
  // Academic details (optional)
  if (s.current_previous_school)
    fd.append("current_previous_school", s.current_previous_school);
  if (s.last_grade_completed)
    fd.append("last_grade_completed", s.last_grade_completed);
  if (s.common_exam_score) fd.append("common_exam_score", s.common_exam_score);
  if (s.performance_highlights)
    fd.append("performance_highlights", s.performance_highlights);
  if (s.transfer_reason) fd.append("transfer_reason", s.transfer_reason);

  fd.append("permissions", "write");

  let docIndex = 0;
  for (const id of DOCUMENT_IDS) {
    const file = s.docState[id];
    if (file) {
      fd.append(`documents.${docIndex}.name`, file.name);
      fd.append(`documents.${docIndex}.type`, DOCUMENT_TYPE_MAP[id] || id);
      fd.append(`documents.${docIndex}.file`, file);
      docIndex++;
    }
  }
  return fd;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      resolve((reader.result as string).split(",")[1] ?? "");
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function buildAdmissionRegister(
  state: AdmissionFormState,
  schoolId: string | null,
): Promise<AdmissionRegister> {
  const s = toScalars(state, schoolId);
  const docs: Documents[] = [];
  for (const id of DOCUMENT_IDS) {
    const file = state.documents[id];
    if (file) {
      docs.push({ name: file.name, type: id, file: await fileToBase64(file) });
    }
  }
  const { docState: _, ...rest } = s;
  return {
    ...rest,
    date_of_birth: s.date_of_birth || null,
    date_joined: s.date_joined || null,
    initial_status: s.initial_status as AdmissionRegister["initial_status"],
    documents: docs,
  } as AdmissionRegister;
}
