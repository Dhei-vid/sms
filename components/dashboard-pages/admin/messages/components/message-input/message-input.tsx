"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/general/huge-icon";
import {
  AttachmentSquareIcon,
  // Image01Icon,
  Camera01Icon,
  SentIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface MessageInputProps {
  onSend?: (message: string) => void;
  placeholder?: string;
}

export function MessageInput({
  onSend,
  placeholder = "Write message",
}: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && onSend) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="">
      <CardHeader>Write message</CardHeader>
      <CardContent className="flex items-center gap-2">
        <InputGroup className="flex flex-row">
          <InputGroupTextarea
            placeholder={placeholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              variant="ghost"
              className="rounded-md"
              size="icon-xs"
            >
              <Icon icon={AttachmentSquareIcon} size={18} />
            </InputGroupButton>

            <InputGroupButton
              variant="ghost"
              className="rounded-md"
              size="icon-xs"
            >
              <Icon icon={Camera01Icon} size={18} />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>

        {/* <Input
          type="text"
          placeholder={placeholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        /> */}
        <div className="flex items-center gap-1">
          {/* <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            aria-label="Attach file"
          >
            <Icon icon={AttachmentSquareIcon} size={18} />
          </Button> */}
          {/* <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            aria-label="Take photo"
          >
            <Icon icon={Camera01Icon} size={18} />
          </Button> */}
          <Button
            onClick={handleSend}
            variant={"outline"}
            disabled={!message.trim()}
            className={cn(
              "h-9 w-9 border border-main-blue group hover:bg-main-blue/90",
              !message.trim() &&
                "opacity-50 cursor-not-allowed transition-colors duration-200"
            )}
            aria-label="Send message"
          >
            <Icon
              icon={SentIcon}
              size={18}
              className="text-main-blue group-hover:text-white"
            />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
