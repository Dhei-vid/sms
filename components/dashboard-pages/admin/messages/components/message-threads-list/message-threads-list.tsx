"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/general/huge-icon";
import { Add01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { MessageThreadItem } from "../message-thread-item/message-thread-item";

import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";

interface MessageThread {
  id: string;
  name: string;
  description: string;
  lastMessage?: string;
  timestamp?: string;
  unreadCount?: number;
  avatar?: string;
  icon?: any;
}

interface MessageThreadsListProps {
  threads: MessageThread[];
  selectedThreadId?: string;
  onThreadSelect?: (threadId: string) => void;
  onNewMessage?: () => void;
}

export function MessageThreadsList({
  threads,
  selectedThreadId,
  onThreadSelect,
  onNewMessage,
}: MessageThreadsListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredThreads = threads.filter(
    (thread) =>
      thread.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="flex flex-col h-full bg-white border-r border-gray-200">
      <CardContent className="space-y-4">
        {/* Search and New Message */}
        <div>
          <div className="flex gap-2 h-fit">
            <div className="relative flex-1">
              <Icon
                icon={Search01Icon}
                size={23}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
            <Button
              onClick={onNewMessage}
              variant={"outline"}
              className="h-11 w-11"
            >
              <Icon icon={Add01Icon} size={23} />
            </Button>
          </div>
        </div>

        {/* Threads List */}
        <div className="space-y-2 overflow-y-auto">
          {filteredThreads.map((thread) => (
            <MessageThreadItem
              key={thread.id}
              {...thread}
              isSelected={thread.id === selectedThreadId}
              onClick={() => onThreadSelect?.(thread.id)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
