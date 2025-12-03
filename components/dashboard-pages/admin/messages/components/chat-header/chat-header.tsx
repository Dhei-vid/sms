"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/general/huge-icon";
import { Search01Icon, UserMultiple02Icon } from "@hugeicons/core-free-icons";

import { Card, CardContent } from "@/components/ui/card";

interface ChatHeaderProps {
  title: string;
  subtitle: string;
  onSearch?: () => void;
  onMembers?: () => void;
}

export function ChatHeader({
  title,
  subtitle,
  onSearch,
  onMembers,
}: ChatHeaderProps) {
  return (
    <Card>
      <CardContent className="flex flex-row justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMembers}
            className="h-9 w-9"
          >
            <Icon icon={UserMultiple02Icon} size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onSearch}
            className="h-9 w-9"
          >
            <Icon icon={Search01Icon} size={18} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
