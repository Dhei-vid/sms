import {
  StakeholderMetrics,
  Stakeholders,
  StudentMetrics,
  StudentStakeholderMetrics,
} from "./stakeholder-types";

/**
 * Maps stage numbers to readable labels (Equivalent to your Python helper)
 */
export const getStakeholderStageLabel = (value: number): string => {
  const stageMap: Record<number, string> = {
    2: "Application Started",
    3: "Submitted Forms",
    4: "Under Review",
    5: "Accepted Offers",
    6: "Enrolled/Confirmed",
  };
  return stageMap[value] || "Inquires/Interest";
};

/**
 * Aggregates stakeholder data into metrics based on stages
 */
export const calculateStakeholderMetrics = (
  data: Stakeholders[],
): StakeholderMetrics => {
  const initialMetrics: StakeholderMetrics = {
    total: data.length,
    inquiries: 0,
    applicationStarted: 0,
    submittedForms: 0,
    underReview: 0,
    acceptedOffers: 0,
    enrolled: 0,
  };

  return data.reduce((acc, item) => {
    switch (item.stage) {
      case 2:
        acc.applicationStarted++;
        break;
      case 3:
        acc.submittedForms++;
        break;
      case 4:
        acc.underReview++;
        break;
      case 5:
        acc.acceptedOffers++;
        break;
      case 6:
        acc.enrolled++;
        break;
      default:
        acc.inquiries++;
        break;
    }
    return acc;
  }, initialMetrics);
};

export const calculateStudentStakeholderMetrics = (
  data: Stakeholders[],
): StudentStakeholderMetrics => {
  const students = data.filter((s) => s.type === "student");
  const enrolled = students.filter((s) => s.stage === 6).length;
  const totalMale = students.filter((s) => s.user.gender === "male").length;
  const totalFemale = students.filter((s) => s.user.gender === "female").length;

  return {
    total: students.length,
    enrolled,
    totalStudents: students.length,
    genderRatio: {
      totalMale,
      totalFemale,
    },
  };
};

export const getAllStudents = (data: Stakeholders[]): Stakeholders[] => {
  return data.filter((s) => s.type === "student");
};

export interface StaffUtilizationBreakdown {
  label: string;
  value: number;
  color: string;
}

/**
 * Computes staff utilization breakdown from stakeholders.
 * Uses teaching_duty and non_teaching_duty to categorize staff into Teaching Time, Admin/Duty, Free Periods.
 */
export const calculateStaffUtilization = (
  data: Stakeholders[],
): StaffUtilizationBreakdown[] => {
  const staff = data.filter((s) => s.type === "staff" || s.type === "teacher");
  const total = staff.length;

  if (total === 0) {
    return [
      { label: "Teaching Time", value: 0, color: "bg-blue-600" },
      { label: "Admin/Duty", value: 0, color: "bg-blue-300" },
      { label: "Free Periods", value: 0, color: "bg-orange-500" },
    ];
  }

  let teachingCount = 0;
  let adminCount = 0;

  for (const s of staff) {
    const hasTeaching =
      s.teaching_duty &&
      typeof s.teaching_duty === "object" &&
      (s.teaching_duty.class_grade || s.teaching_duty.subject);
    const hasNonTeaching =
      s.non_teaching_duty &&
      typeof s.non_teaching_duty === "object" &&
      s.non_teaching_duty.duty_type;

    if (hasTeaching) {
      teachingCount++;
    } else if (hasNonTeaching) {
      adminCount++;
    }
  }

  const freeCount = total - teachingCount - adminCount;
  const teachingPct = Math.round((teachingCount / total) * 100);
  const adminPct = Math.round((adminCount / total) * 100);
  const freePct = 100 - teachingPct - adminPct;

  return [
    { label: "Teaching Time", value: teachingPct, color: "bg-blue-600" },
    { label: "Admin/Duty", value: adminPct, color: "bg-blue-300" },
    { label: "Free Periods", value: freePct, color: "bg-orange-500" },
  ];
};

export const calculateStudentMetrics = (
  data: Stakeholders[],
): StudentMetrics => {
  const students = data.filter((s) => s.type === "student");
  const enrolled = students.filter((s) => s.stage === 6);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const male = students.filter((s) => s.user?.gender === "male").length;
  const female = students.filter((s) => s.user?.gender === "female").length;

  const classSet = new Set(
    students
      .map((s) => s.class_assigned)
      .filter((c): c is string => !!c && c.trim() !== ""),
  );
  const classCount = classSet.size || 1;
  const studentToClassAverage =
    classCount > 0 ? enrolled.length / classCount : 0;

  let studentsWithUnpaid = 0;
  let totalUnpaid = 0;
  let totalFees = 0;
  for (const s of students) {
    const sf = s.school_fees;
    if (sf && typeof sf === "object" && "total" in sf && "paid" in sf) {
      const total = Number(sf.total) || 0;
      const paid = Number(sf.paid) || 0;
      if (total > 0) totalFees += total;
      if (total > paid) {
        studentsWithUnpaid++;
        totalUnpaid += total - paid;
      }
    }
  }
  const unpaidPercentage = totalFees > 0 ? (totalUnpaid / totalFees) * 100 : 0;

  const newEnrollment = students.filter((s) => {
    const dj = s.date_joined;
    if (!dj) return false;
    const d = new Date(dj);
    return !isNaN(d.getTime()) && d >= thirtyDaysAgo;
  }).length;

  return {
    total_enrollment: enrolled.length,
    new_enrollment: newEnrollment,
    gender_ratio: { male, female, total: students.length },
    student_to_class_average: Math.round(studentToClassAverage * 10) / 10,
    absences: { students_with_absences: 0, period_days: 30 },
    academic_at_risk: { count: 0, threshold: 50, session: "" },
    unpaid_fees: {
      students_count: studentsWithUnpaid,
      total_amount: totalUnpaid,
      percentage: Math.round(unpaidPercentage * 10) / 10,
    },
  };
};
