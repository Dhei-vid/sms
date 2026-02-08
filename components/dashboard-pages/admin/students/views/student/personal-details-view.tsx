"use client";

import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Stakeholders } from "@/services/stakeholders/stakeholder-types";

interface PersonalDetailsViewProps {
  stakeholder: Stakeholders;
}

export function PersonalDetailsView({ stakeholder }: PersonalDetailsViewProps) {
  const dob = stakeholder.user.date_of_birth
    ? format(new Date(stakeholder.user.date_of_birth), "MMMM d, yyyy")
    : "—";
  const age = stakeholder.age ? `(Age: ${stakeholder.age})` : "";
  const primaryContact = stakeholder.primary_contact
    ? `${stakeholder.primary_contact.user.first_name} ${stakeholder.primary_contact.user.last_name}`
    : stakeholder.parent_name || "—";
  const primaryEmail =
    stakeholder.primary_contact?.user.email || stakeholder.user.email || "—";
  const primaryPhone =
    stakeholder.primary_contact?.user.phone || stakeholder.user.phone || "—";
  const emergencyContact = stakeholder.emergency_contact
    ? `${stakeholder.emergency_contact.user.first_name} ${stakeholder.emergency_contact.user.last_name}${stakeholder.emergency_contact_and_phone ? ` - ${stakeholder.emergency_contact_and_phone}` : ""}`
    : stakeholder.emergency_contact_and_phone || "—";
  const address = stakeholder.user.address || "—";

  const personalDetailsRows = [
    {
      field: "Date of Birth",
      content: dob ? `${dob} ${age}`.trim() : "—",
    },
    {
      field: "Gender",
      content: stakeholder.user.gender || "—",
    },
    {
      field: "Residential Address",
      content: address,
    },
    {
      field: "Primary Contact",
      content: primaryContact,
    },
    {
      field: "Primary Email",
      content: primaryEmail,
    },
    {
      field: "Primary Phone Number",
      content: primaryPhone,
    },
    {
      field: "Emergency Contact",
      content: emergencyContact,
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Personal Details</h2>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-main-blue/5">
              <TableHead className="w-[200px]">Form Field</TableHead>
              <TableHead>Content</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {personalDetailsRows.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-gray-700">
                  {row.field}
                </TableCell>
                <TableCell className="text-gray-600">{row.content}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
