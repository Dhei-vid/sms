"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DataTable,
  TableColumn,
  TableAction,
} from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectField } from "@/components/ui/input-field";
import { SelectItem } from "@/components/ui/select";
import { Search } from "lucide-react";
import { Icon } from "@/components/general/huge-icon";
import { Mail01Icon, MailSend01Icon } from "@hugeicons/core-free-icons";

interface Alumni {
  id: string;
  fullName: string;
  schoolId: string;
  graduationYear: string;
  address: string;
  phoneDetails: string;
  finalTermGrade: string;
}

const alumniData: Alumni[] = [
  {
    id: "1",
    fullName: "Chinedu Nwokodi",
    schoolId: "nwokadi.m178023",
    graduationYear: "2010",
    address: "4 Sapele Cresent, Garki 2",
    phoneDetails: "+2349012345789",
    finalTermGrade: "A+",
  },
  {
    id: "2",
    fullName: "Adebisi Deborah",
    schoolId: "adebisi.m178024",
    graduationYear: "2010",
    address: "4 Sapele Cresent, Garki 2",
    phoneDetails: "+2349012345789",
    finalTermGrade: "B+",
  },
  {
    id: "3",
    fullName: "Dauda Ahfiz",
    schoolId: "ahfiz.m178025",
    graduationYear: "2010",
    address: "4 Sapele Cresent, Garki 2",
    phoneDetails: "+2349012345789",
    finalTermGrade: "C+",
  },
  {
    id: "4",
    fullName: "Sarah Collins",
    schoolId: "collins.m178026",
    graduationYear: "2010",
    address: "4 Sapele Cresent, Garki 2",
    phoneDetails: "+2349012345789",
    finalTermGrade: "D",
  },
  {
    id: "5",
    fullName: "John Terjiri",
    schoolId: "terjiri.m178027",
    graduationYear: "2010",
    address: "4 Sapele Cresent, Garki 2",
    phoneDetails: "+2349012345789",
    finalTermGrade: "E",
  },
  {
    id: "6",
    fullName: "Chinedu Nwokodi",
    schoolId: "nwokadi.m178023",
    graduationYear: "2010",
    address: "4 Sapele Cresent, Garki 2",
    phoneDetails: "+2349012345789",
    finalTermGrade: "F",
  },
];

const graduationYearOptions = [
  { value: "all", label: "All Years" },
  { value: "2010", label: "2010" },
  { value: "2011", label: "2011" },
  { value: "2012", label: "2012" },
  { value: "2013", label: "2013" },
  { value: "2014", label: "2014" },
  { value: "2015", label: "2015" },
];

export default function AlumniManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [graduationYear, setGraduationYear] = useState("all");

  const filteredAlumni = alumniData.filter((alumni) => {
    const matchesSearch =
      searchQuery === "" ||
      alumni.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.schoolId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesYear =
      graduationYear === "all" || alumni.graduationYear === graduationYear;
    return matchesSearch && matchesYear;
  });

  const columns: TableColumn<Alumni>[] = [
    {
      key: "fullName",
      title: "Full Name + School ID",
      render: (value, row) => (
        <div>
          <p className="text-sm font-medium">{value}</p>
          <p className="text-xs text-gray-500">({row.schoolId})</p>
        </div>
      ),
    },
    {
      key: "graduationYear",
      title: "Graduation Year",
      render: (value) => <span className="text-sm">{value}</span>,
    },
    {
      key: "address",
      title: "Address",
      render: (value) => <span className="text-sm">{value}</span>,
    },
    {
      key: "phoneDetails",
      title: "Phone Details",
      render: (value) => <span className="text-sm">{value}</span>,
    },
    {
      key: "finalTermGrade",
      title: "Final Term Grade",
      render: (value) => <span className="text-sm font-medium">{value}</span>,
    },
  ];

  const actions: TableAction<Alumni>[] = [
    {
      type: "dropdown",
      config: {
        items: [
          {
            label: "View Profile",
            onClick: (row) => {
              console.log("View profile for", row.fullName);
            },
          },
          {
            label: "Edit Details",
            onClick: (row) => {
              console.log("Edit details for", row.fullName);
            },
          },
        ],
      },
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Alumni Management Dashboard
        </h2>
        <p className="text-gray-600 mt-1">
          This screen is the administrative hub for managing the school's alumni
          database and engagement campaigns.
        </p>
      </div>

      {/* Total Alumni Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Alumni</p>
              <p className="text-3xl font-bold text-gray-800">3,500 Members</p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-main-blue/10 flex items-center justify-center">
              <Icon icon={Mail01Icon} size={24} className="text-main-blue" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Send Newsletter Button */}
      <div>
        <Button
          variant={"outline"}
          className="h-11 w-full flex items-center gap-2"
        >
          <Icon icon={MailSend01Icon} size={18} />
          Send Newsletter/Bulk Email
        </Button>
      </div>

      {/* Directory Listing Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Directory Listing Table
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Table Controls */}
          <div className="flex gap-4 items-center mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <Input
                type="search"
                placeholder="Search students name/ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-9"
              />
            </div>
            <div className="w-[180px]">
              <SelectField
                label=""
                value={graduationYear}
                onValueChange={setGraduationYear}
                placeholder="Graduation Year"
              >
                {graduationYearOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectField>
            </div>
          </div>

          {/* Table */}
          <div className="border rounded-lg overflow-hidden">
            <DataTable
              columns={columns}
              data={filteredAlumni}
              actions={actions}
              emptyMessage="No alumni found."
              tableClassName="border-collapse"
            />
          </div>

          {/* Load More Button */}
          <div className="flex justify-center mt-4">
            <Button variant="outline">Load More</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
