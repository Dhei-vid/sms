import type { CreateStakeholdersRequest } from "@/services/stakeholders/stakeholder-types";

export interface PersonalInformationState {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: { male: boolean; female: boolean };
  residentialAddress: string;
  phoneNumber: string;
  email: string;
  emergencyContact: string;
  schoolId: string;
}

export interface ContractDetailsState {
  staffId: string;
  staffType: string; // "teacher" or "staff"
  jobTitle: string;
  department: string;
  employmentType: string;
  contractStartDate: string;
  contractEndDate: string;
  annualLeaveEntitlement: string;
}

export type DocumentUploadState = Record<string, File | null>;

export interface AccessDocumentationState {
  schoolEmail: string;
  systemRole: string;
}

export interface StaffFormState {
  personal: PersonalInformationState;
  contract: ContractDetailsState;
  documents: DocumentUploadState;
  access: AccessDocumentationState;
}

export const getInitialStaffFormState = (): StaffFormState => ({
  personal: {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: { male: false, female: false },
    residentialAddress: "",
    phoneNumber: "",
    email: "",
    emergencyContact: "",
    schoolId: "",
  },
  contract: {
    staffId: "",
    staffType: "",
    jobTitle: "",
    department: "",
    employmentType: "",
    contractStartDate: "",
    contractEndDate: "",
    annualLeaveEntitlement: "",
  },
  documents: {},
  access: {
    schoolEmail: "",
    systemRole: "",
  },
});

function formatDate(date: Date | undefined): string {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDateFromString(dateStr: string): string {
  if (!dateStr) return "";
  // If it's already in YYYY-MM-DD format, return as is
  if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) return dateStr;
  // Otherwise try to parse and format
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  return formatDate(date);
}

// Document type mapping for staff documents
const STAFF_DOCUMENT_TYPE_MAP: Record<string, string> = {
  medicalReport: "medical report",
  passportPhoto: "passport photo",
};

const STAFF_DOCUMENT_IDS = ["medicalReport", "passportPhoto"] as const;

export function buildStaffFormData(
  state: StaffFormState,
  schoolId: string | null,
): FormData {
  const { personal, contract, documents, access } = state;

  const gender = personal.gender.female
    ? "female"
    : personal.gender.male
      ? "male"
      : "";

  // Use schoolId from form state if provided, otherwise fall back to passed schoolId
  const finalSchoolId = personal.schoolId || schoolId || "";

  // Generate username from email or first name
  const username =
    personal.email.trim() ||
    personal.firstName.replace(/\s+/g, ".").toLowerCase();

  // Format dates
  const dateOfBirth = formatDateFromString(personal.dateOfBirth);
  const contractStartDate = formatDateFromString(contract.contractStartDate);
  const contractEndDate = formatDateFromString(contract.contractEndDate);
  const dateJoined =
    contractStartDate || new Date().toISOString().split("T")[0];

  // Build FormData for stakeholder creation
  // Include user fields so backend can create user first, then stakeholder
  const fd = new FormData();

  // User fields (will be used to create user first, then stakeholder)
  fd.append("username", username);
  fd.append("email", personal.email);
  fd.append("first_name", personal.firstName);
  fd.append("last_name", personal.lastName);
  fd.append("gender", gender);
  fd.append("phone_number", personal.phoneNumber);
  // Omit password - backend uses USER_PASSWORD from settings (e.g. password123)
  fd.append("role", contract.staffType === "teacher" ? "teacher" : "staff");
  if (dateOfBirth) fd.append("date_of_birth", dateOfBirth);
  if (personal.residentialAddress)
    fd.append("residential_address", personal.residentialAddress);
  fd.append("school_id", finalSchoolId);

  // Stakeholder fields
  fd.append("type", contract.staffType || "staff");
  fd.append("status", "active");
  if (contract.jobTitle) fd.append("position", contract.jobTitle);
  if (contract.employmentType)
    fd.append("employment_type", contract.employmentType);
  // Only include contract dates if employment type is Contract
  if (contract.employmentType === "Contract") {
    if (contractStartDate) fd.append("contract_start_date", contractStartDate);
    if (contractEndDate) fd.append("contract_end_date", contractEndDate);
  }
  if (contract.annualLeaveEntitlement)
    fd.append("annual_leave_entitlement", contract.annualLeaveEntitlement);
  if (personal.emergencyContact)
    fd.append("emergency_contact_and_phone", personal.emergencyContact);
  fd.append("date_joined", dateJoined);
  if (access.schoolEmail) fd.append("school_email", access.schoolEmail);

  // Add documents
  let docIndex = 0;
  for (const id of STAFF_DOCUMENT_IDS) {
    const file = documents[id];
    if (file) {
      fd.append(`documents.${docIndex}.name`, file.name);
      fd.append(
        `documents.${docIndex}.type`,
        STAFF_DOCUMENT_TYPE_MAP[id] || id,
      );
      fd.append(`documents.${docIndex}.file`, file);
      docIndex++;
    }
  }

  return fd;
}
