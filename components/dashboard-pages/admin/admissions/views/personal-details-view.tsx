"use client";

import { InfoTable } from "../components/info-table";

const personalDetailsRows = [
  {
    field: "Date of Birth",
    content: "January 12, 2013 (Age 12)",
    status: "verified" as const,
  },
  {
    field: "Gender",
    content: "Male",
    status: "verified" as const,
  },
  {
    field: "Residential Address",
    content: "45 Unity Crescent, Garki, Abuja",
    status: "verified" as const,
  },
  {
    field: "Primary Contact (Mother)",
    content: "Mrs. Fola Nwokodi",
    status: "verified" as const,
  },
  {
    field: "Email",
    content: "fola.nwokodil@example.com",
    status: "verified" as const,
  },
  {
    field: "Phone Number",
    content: "+234 803 123 4567",
    status: "verified" as const,
  },
  {
    field: "Emergency Contact",
    content: "Mr. Kennedy Nwokodi (Father) - +234 809 765 4321",
  },
];

export function PersonalDetailsView() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Personal Details</h2>
      <InfoTable rows={personalDetailsRows} />
    </div>
  );
}
