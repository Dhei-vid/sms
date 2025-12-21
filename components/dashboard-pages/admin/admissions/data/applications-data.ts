export interface Application {
  id: string;
  name: string;
  classApplyingFor: string;
  dateSubmitted: string;
  timeSubmitted: string;
  status: "new" | "pending" | "accepted" | "rejected" | "enrolled";
  statusLabel: string;
}

export const initialApplications: Application[] = [
  {
    id: "1",
    name: "Chinedu Nwokodi",
    classApplyingFor: "JS 2",
    dateSubmitted: "Oct. 10, 2025",
    timeSubmitted: "08:15 AM",
    status: "new",
    statusLabel: "New Applicant",
  },
  {
    id: "2",
    name: "Adebisi Deborah",
    classApplyingFor: "JS 1",
    dateSubmitted: "Oct. 10, 2025",
    timeSubmitted: "08:15 AM",
    status: "pending",
    statusLabel: "Pending Interview",
  },
  {
    id: "3",
    name: "Dauda Ahfiz",
    classApplyingFor: "SS 1",
    dateSubmitted: "Oct. 10, 2025",
    timeSubmitted: "08:15 AM",
    status: "accepted",
    statusLabel: "Application Accepted",
  },
  {
    id: "4",
    name: "Sarah Collins",
    classApplyingFor: "SS 1",
    dateSubmitted: "Oct. 10, 2025",
    timeSubmitted: "08:15 AM",
    status: "accepted",
    statusLabel: "Application Accepted",
  },
  {
    id: "5",
    name: "John Terjiri",
    classApplyingFor: "JS 3",
    dateSubmitted: "Oct. 10, 2025",
    timeSubmitted: "08:15 AM",
    status: "rejected",
    statusLabel: "Application Rejected",
  },
];
