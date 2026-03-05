import {
  User03Icon,
  GraduationScrollIcon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";
import type {
  SchoolDetailSectionId,
  SchoolDetailSectionConfig,
} from "./school-detail-types";

export const SCHOOL_DETAIL_SECTIONS: SchoolDetailSectionConfig[] = [
  { id: "school-details", label: "School Details", icon: User03Icon },
  { id: "academic", label: "Academic Information", icon: GraduationScrollIcon },
  {
    id: "subscription",
    label: "Subscription & Settings",
    icon: Settings01Icon,
  },
];

export type { SchoolDetailSectionId };
