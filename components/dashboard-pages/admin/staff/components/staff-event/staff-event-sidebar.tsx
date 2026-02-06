"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface EventContent {
  title: string;
  description: string;
}

interface IStaffEventSidebar {
  header: string;
  content: EventContent[];
}

const bordercolorClasses = [
  "border-main-blue",
  "border-orange-500",
  "border-red-500",
  "border-purple-500",
];

export function StaffEventSidebar({ header, content }: IStaffEventSidebar) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{header}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.map((item, index) => (
            <div
              key={index}
              className={cn(
                bordercolorClasses[index],
                "space-y-2 border-t p-2 rounded-md",
              )}
            >
              <p className="text-sm text-muted-foreground mb-1">
                {item.title}:
              </p>
              <p className="font-medium">{item.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
