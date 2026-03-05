import type {
  CreateSchoolRequest,
  SchoolColor,
  SchoolLogo,
  Term,
} from "@/services/schools/schools-type";

export interface IdentityState {
  schoolName: string;
  address: string;
  primaryEmail: string;
  countryCode: string;
  contactPhone: string;
  schoolType: string;
  establishedDate: string;
  accreditationNumber: string;
  licenseNumber: string;
  websiteDomain: string;
  defaultTerms: string;
  academicSession: string;
}

export interface BrandingState {
  primaryLogoFile: File | null;
  secondaryLogoFile: File | null;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  loginBackgroundFile: File | null;
  eSignatureFile: File | null;
}

export interface SubscriptionState {
  plan: string;
  modules: Record<string, boolean>;
  studentLimit: string;
  staffLimit: string;
  storageLimit: string;
  paymentGateway: string;
}

export interface AddSchoolFormState {
  identity: IdentityState;
  branding: BrandingState;
  subscription: SubscriptionState;
}

export const MODULE_IDS = [
  "academic_management",
  "cbt_management",
  "timetabling",
  "learning_management",
  "assessment",
  "wallet",
] as const;

export const getInitialIdentityState = (): IdentityState => ({
  schoolName: "",
  address: "",
  primaryEmail: "",
  countryCode: "+234",
  contactPhone: "",
  schoolType: "",
  establishedDate: "",
  accreditationNumber: "",
  licenseNumber: "",
  websiteDomain: "",
  defaultTerms: "3",
  academicSession: "",
});

export const getInitialBrandingState = (): BrandingState => ({
  primaryLogoFile: null,
  secondaryLogoFile: null,
  primaryColor: "#6366f1",
  secondaryColor: "#8b5cf6",
  tertiaryColor: "#a855f7",
  loginBackgroundFile: null,
  eSignatureFile: null,
});

export const getInitialSubscriptionState = (): SubscriptionState => ({
  plan: "",
  modules: MODULE_IDS.reduce(
    (acc, id) => ({ ...acc, [id]: false }),
    {} as Record<string, boolean>,
  ),
  studentLimit: "",
  staffLimit: "",
  storageLimit: "",
  paymentGateway: "",
});

export function getInitialAddSchoolFormState(): AddSchoolFormState {
  return {
    identity: getInitialIdentityState(),
    branding: getInitialBrandingState(),
    subscription: getInitialSubscriptionState(),
  };
}

function defaultTerm(session: string, termsCount: string): Term {
  const [startYear] = session.split("/").map((s) => s.trim());
  const y = startYear ? parseInt(startYear, 10) : new Date().getFullYear();
  const numTerms = Math.max(1, parseInt(termsCount, 10) || 3);
  const start = new Date(y, 0, 1);
  const end = new Date(y + 1, 5, 30);
  return {
    name: `${numTerms} Terms`,
    session: session || `${y}/${y + 1}`,
    start_date: start.toISOString().slice(0, 10),
    end_date: end.toISOString().slice(0, 10),
  };
}

export function buildCreateSchoolPayload(
  state: AddSchoolFormState,
  primaryLogoUrl: string | null,
  primaryLogoPublicId: string | null,
): CreateSchoolRequest {
  const { identity, branding, subscription } = state;
  const phone =
    identity.countryCode && identity.contactPhone
      ? `${identity.countryCode}${identity.contactPhone.replace(/\D/g, "")}`
      : undefined;
  const color: SchoolColor = {
    primary: branding.primaryColor || "#6366f1",
    secondary: branding.secondaryColor || "#8b5cf6",
    tertiary: branding.tertiaryColor || "#a855f7",
    accent: branding.primaryColor || "#6366f1",
  };
  const logo: SchoolLogo = {
    svg: "",
    image_url: primaryLogoUrl,
    image_public_id: primaryLogoPublicId,
  };
  const term = defaultTerm(identity.academicSession, identity.defaultTerms);
  const now = new Date().toISOString().slice(0, 10);
  return {
    name: identity.schoolName,
    address: identity.address || undefined,
    email: identity.primaryEmail || undefined,
    phone,
    website: identity.websiteDomain || undefined,
    motto: "",
    type: identity.schoolType || "secondary",
    status: "active",
    established_date: identity.establishedDate || now,
    accreditation_number: identity.accreditationNumber || "",
    license_number: identity.licenseNumber || "",
    student_capacity: parseInt(subscription.studentLimit, 10) || 1000,
    current_enrollment: 0,
    color,
    logo,
    subscription: {
      plan: subscription.plan || "standard",
      start_date: now,
      end_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10),
      status: "active",
    },
    facebook_url: "",
    twitter_url: "",
    instagram_url: "",
    linkedin_url: "",
    is_active: true,
    term,
  };
}
