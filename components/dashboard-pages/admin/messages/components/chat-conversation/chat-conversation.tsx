"use client";

import { Button } from "@/components/ui/button";
import { MessageBubble } from "../message-bubble/message-bubble";
import { ArrowUp } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface Message {
  id: string;
  senderName: string;
  senderEmail: string;
  message: string;
  timestamp: string;
  avatar?: string;
  isOwnMessage?: boolean;
}

interface ChatConversationProps {
  messages: Message[];
  onSendMessage?: (message: string) => void;
  onLoadPrevious?: () => void;
}

export function ChatConversation({
  messages,
  onSendMessage,
  onLoadPrevious,
}: ChatConversationProps) {
  return (
    <Card>
      <div className="flex flex-col h-full bg-white w-full">
        {/* Previous Chat Button */}
        {onLoadPrevious && (
          <div className="mx-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={onLoadPrevious}
              className="text-sm text-gray-600"
            >
              <ArrowUp className="mr-2 h-4 w-4" />
              Previous chat
            </Button>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4 divide-y divide-gray-100">
            {messages.map((message) => (
              <MessageBubble key={message.id} {...message} />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
