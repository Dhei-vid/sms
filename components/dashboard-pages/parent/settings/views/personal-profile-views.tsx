import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function PersonalProfileViews() {
  const personalProfileRows = [
    {
      field: "Display Name",
      //   content: stakeholder?.user?.phone_number || "—",
      content: "Kunle Oluwole",
    },
    {
      field: "Phone Number",
      //   content: stakeholder?.school_email || stakeholder?.user?.email || "—",
      content: "+234 091 234 5678",
    },
    {
      field: "Email Contact",
      //   content: stakeholder?.user?.residential_address || "—",
      content: "kunleoluwole@gmail.com",
    },
    {
      field: "Link Students",
      //   content: stakeholder?.user?.residential_address || "—",
      content: "Tunde [ Go to Profile ], Seyi [ Go to Profile ]",
    },
    {
      field: "Home Address",
      //   content: stakeholder?.user?.residential_address || "—",
      content: "Lagos State, Nigeria.",
    },
  ];
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Personal Profile</h2>
      <div className="flex items-center gap-x-5">
        {/* Profile Picture */}
        {/* uncomment after getting user's image from database */}
        {/* <div className="shrink-0">
          {profilePicture ? (
            <Image
              src={profilePicture}
              alt={name}
              width={120}
              height={120}
              className="rounded-md object-cover object-top w-30 h-30"
            />
          ) : (
            <div className="w-30 h-30 rounded-md bg-gray-200 flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-400">
                {name.charAt(0)}
              </span>
            </div>
          )}
        </div> */}
        <div className="w-30 h-30 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-4xl font-bold text-gray-400">P</span>
        </div>
        <Button className="w-fit h-13" variant={"outline"}>
          Change Profile Image
        </Button>
      </div>
      {/* table data */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-main-blue/5">
              <TableHead className="w-[200px]">Form Field</TableHead>
              <TableHead>Content</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {personalProfileRows.map((row, index) => (
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
      {/* save button */}
      <div className="w-full flex justify-end">
        <Button className="w-fit h-10 px-5 mt-3" variant={"default"}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
