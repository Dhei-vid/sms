"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface MessageBubbleProps {
  id: string;
  senderName: string;
  senderEmail: string;
  message: string;
  timestamp: string;
  avatar?: string;
  isOwnMessage?: boolean;
}

export function MessageBubble({
  id,
  senderName,
  senderEmail,
  message,
  timestamp,
  avatar,
  isOwnMessage = false,
}: MessageBubbleProps) {
  return (
    <div
      className={cn("flex gap-3 mb-4 py-4", isOwnMessage && "flex-row-reverse")}
    >
      {/* Avatar */}
      <div className="shrink-0">
        {avatar ? (
          <div className="relative h-10 w-10 rounded-full overflow-hidden">
            <Image
              src={avatar}
              alt={senderName}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
        ) : (
          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
            <span className="text-purple-600 font-semibold text-sm">
              {senderName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Message Content */}
      <div
        className={cn(
          "flex-1",
          isOwnMessage && "flex flex-col gap-2 items-end"
        )}
      >
        <div className="mb-1">
          <span className="text-sm font-semibold text-gray-800">
            {senderName}
          </span>
          <span className="border rounded-md px-2 py-1 text-xs text-muted-foreground bg-gray-100 ml-2">
            {senderEmail}
          </span>
        </div>
        <div className={cn("inline-block rounded-lg py-2 max-w-[80%]")}>
          <p className="text-sm text-wrap whitespace-pre-wrap">{message}</p>
        </div>
        <span className="text-xs text-gray-500 mt-1 block">{timestamp}</span>
      </div>
    </div>
  );
}
