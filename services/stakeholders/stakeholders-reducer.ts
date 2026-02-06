import { StakeholderMetrics, Stakeholders } from "./stakeholder-types";

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
