import { Card, CardContent } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent>
          <h2 className="text-2xl font-bold text-gray-800">System Settings</h2>
          <p className="text-gray-600 mt-1">
            This screen manages the teacher's digital identity
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-2 border"></div>
        <div className="col-span-4 border"></div>
      </div>
    </div>
  );
}
