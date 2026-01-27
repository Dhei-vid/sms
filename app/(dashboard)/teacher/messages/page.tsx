"use client";

import { useState } from "react";
import {
  MessageThreadsList,
  ChatConversation,
} from "@/components/dashboard-pages/admin/messages/components";
import { Icon } from "@/components/general/huge-icon";
import {
  MessageCancel01Icon,
  SharedDriveIcon,
} from "@hugeicons/core-free-icons";
import { ChatHeader } from "@/components/dashboard-pages/admin/messages/components";
import { MessageInput } from "@/components/dashboard-pages/admin/messages/components";

interface MessageThread {
  id: string;
  name: string;
  description: string;
  lastMessage?: string;
  timestamp?: string;
  unreadCount?: number;
  avatar?: string;
  icon?: any;
  type: "general" | "group" | "individual";
}

interface Message {
  id: string;
  senderName: string;
  senderEmail: string;
  message: string;
  timestamp: string;
  avatar?: string;
  isOwnMessage?: boolean;
}

export default function MessagesPage() {
  const [selectedThreadId, setSelectedThreadId] = useState<string>("general");

  // Sample threads data
  const threads: MessageThread[] = [
    {
      id: "general",
      name: "General Conversation",
      description: "Conversation with every staff of Penetrallahub School.",
      icon: SharedDriveIcon,
      type: "general",
    },
    {
      id: "academic",
      name: "Academic Staffs",
      description: "Conversation with Academic staffs of Penetralihub S.",
      icon: SharedDriveIcon,
      type: "group",
    },
    {
      id: "patrick",
      name: "Mr. Patrick",
      description: "",
      lastMessage: "Reminder: Major IT system maintenance...",
      timestamp: "4:00 PM",
      unreadCount: 2,
      avatar:
        "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg",
      type: "individual",
    },
    {
      id: "tina",
      name: "Ms. Tina G.",
      description: "",
      lastMessage: "Following up on th$53 graduation fees,...",
      timestamp: "4:00 PM",
      unreadCount: 1,
      avatar:
        "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg",
      type: "individual",
    },
    {
      id: "reed",
      name: "Mr. Reed",
      description: "",
      lastMessage: "Review the updated security protocols effectiv...",
      timestamp: "1d",
      avatar:
        "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg",
      type: "individual",
    },
  ];

  // Sample messages for selected thread
  const getMessagesForThread = (threadId: string): Message[] => {
    if (threadId === "general") {
      return [
        {
          id: "1",
          senderName: "Mrs. Adebayo",
          senderEmail: "sec.adebayo@penetrallahub.edu",
          message:
            "Good morning everyone! Please remember to update your calendars. The school board meeting has been rescheduled to November 4th, 2025 at 10:00 AM.",
          timestamp: "8/15/2025, 3:30:00 PM",
        },
        {
          id: "2",
          senderName: "Ms. Sarah",
          senderEmail: "admin@penetraliahub.edu",
          message:
            "Thanks for the heads-up, Mrs. Adebayo. I will get on with the agenda for the meeting. Everyone is expected to be available, it is crucial.",
          timestamp: "8/15/2025, 3:30:00 PM",
          isOwnMessage: true,
        },
        {
          id: "3",
          senderName: "Robert Johnson",
          senderEmail: "johnsonum1222@penetrallahub.edu",
          message:
            "Maintenance update: The gyms air conditioning system is back online and ready to go. Gym classes can now resume again",
          timestamp: "8/15/2025, 3:30:00 PM",
        },
        {
          id: "4",
          senderName: "Ms. Tina",
          senderEmail: "hr.tina@penetrallahub.edu",
          message:
            "All staff performance reviews are due by the end of the month. Please submit your reports to HR as soon as possible. Thank you!",
          timestamp: "8/15/2025, 3:30:00 PM",
        },
      ];
    }
    return [];
  };

  const selectedThread = threads.find((t) => t.id === selectedThreadId);
  const messages = getMessagesForThread(selectedThreadId);

  const handleSendMessage = (message: string) => {
    console.log("Sending message:", message);
    // Handle message sending
  };

  const handleNewMessage = () => {
    console.log("New message clicked");
    // Handle new message creation
  };

  return (
    <div className="space-y-4">
      {/* Messages Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">Messages</h2>
        <p className="text-gray-600 mt-1">
          Facilitate critical, sensitive, and high-priority internal
          communication between key personnel.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Message Threads List */}
        <MessageThreadsList
          threads={threads}
          selectedThreadId={selectedThreadId}
          onThreadSelect={setSelectedThreadId}
          onNewMessage={handleNewMessage}
        />

        {/* Chat Conversation */}
        <div className="lg:col-span-2 flex flex-col">
          {selectedThread ? (
            <div className="flex flex-col gap-4">
              {/* Header */}
              <ChatHeader
                title={`${selectedThread.name}.`}
                subtitle={selectedThread.description}
                type={selectedThread.type}
              />

              <ChatConversation
                messages={messages}
                onSendMessage={handleSendMessage}
                onLoadPrevious={() => console.log("Load previous")}
              />

              {/* Input */}
              <MessageInput onSend={handleSendMessage} />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-white">
              <div className="text-center">
                <Icon
                  icon={MessageCancel01Icon}
                  size={48}
                  className="mx-auto text-gray-400 mb-4"
                />
                <p className="text-gray-600 text-sm">
                  Select a conversation to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
