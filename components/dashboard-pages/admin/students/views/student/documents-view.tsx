"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Document {
  type: string;
  fileName: string;
  status: "verified" | "pending" | "missing";
}

const documents: Document[] = [
  {
    type: "Birth Certificate",
    fileName: "Chinedu_Nwokodi_Birth.pdf",
    status: "verified",
  },
  {
    type: "Primary 6 Final Report Card",
    fileName: "Chinedu_Nwokodi_Report.pdf",
    status: "verified",
  },
  {
    type: "Common Entrance Result Slip",
    fileName: "Chinedu_Nwokodi_Entrance.pdf",
    status: "verified",
  },
  {
    type: "Immunization Record",
    fileName: "Chinedu_Nwokodi_Immune_Rec.pdf",
    status: "verified",
  },
  {
    type: "Passport Photo",
    fileName: "Chinedu_Nwokodi_passport.jpg",
    status: "verified",
  },
];

export function DocumentsView() {
  const getStatusIcon = (status: Document["status"]) => {
    switch (status) {
      case "verified":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "pending":
        return null;
      case "missing":
        return null;
    }
  };

  const getStatusText = (status: Document["status"]) => {
    switch (status) {
      case "verified":
        return "Verified";
      case "pending":
        return "Pending";
      case "missing":
        return "Missing";
    }
  };

  const getStatusColor = (status: Document["status"]) => {
    switch (status) {
      case "verified":
        return "text-green-600";
      case "pending":
        return "text-orange-600";
      case "missing":
        return "text-red-600";
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Documents</h2>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-main-blue/5">
              <TableHead>Document Type</TableHead>
              <TableHead>File Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-gray-700">
                  {doc.type}
                </TableCell>
                <TableCell className="text-gray-600">{doc.fileName}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(doc.status)}
                    <span
                      className={cn(
                        "text-xs font-medium",
                        getStatusColor(doc.status),
                      )}
                    >
                      {getStatusText(doc.status)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="h-8 text-xs">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
