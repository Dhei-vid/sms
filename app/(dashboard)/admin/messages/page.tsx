"use client";

import { useState, useMemo } from "react";
import {
  MessageThreadsList,
  ChatConversation,
} from "@/components/dashboard-pages/admin/messages/components";
import { Icon } from "@/components/general/huge-icon";
import {
  SharedDriveIcon,
  MessageCancel01Icon,
} from "@hugeicons/core-free-icons";
import { ChatHeader } from "@/components/dashboard-pages/admin/messages/components";
import { MessageInput } from "@/components/dashboard-pages/admin/messages/components";
import {
  useGetChatsQuery,
  useGetChatByIdQuery,
  useSendChatMutation,
} from "@/services/chats/chats";
import { useGetUsersQuery } from "@/services/users/users";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slices/authSlice";
import { format } from "date-fns";
import type {
  Chat,
  ChatMessages,
  ChatParticipants,
  SendChatPayload,
} from "@/services/chats/chat-types";

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
  const user = useAppSelector(selectUser);
  const [selectedThreadId, setSelectedThreadId] = useState<string>("");
  const [teacherThreads, setTeacherThreads] = useState<MessageThread[]>([]);

  const { data: chatsData } = useGetChatsQuery({ limit: 50 });
  const { data: selectedChatData } = useGetChatByIdQuery(selectedThreadId, {
    skip: !selectedThreadId,
  });
  const { data: teachersData } = useGetUsersQuery({
    role: "teacher",
    limit: 100,
  });
  const [sendChat] = useSendChatMutation();

  console.log("User :", user);

  // Static threads (General Conversation and Academic Staffs)
  const staticThreads: MessageThread[] = [
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
  ];

  // Map Chat[] to MessageThread[] using participants and messages structure
  const apiThreads: MessageThread[] = useMemo(() => {
    if (!chatsData?.data) return [];

    return chatsData.data.map((chat: Chat) => {
      const lastMessage = chat.messages?.[chat.messages.length - 1];
      const participantsNames =
        chat.participants
          ?.map((p: ChatParticipants) => `${p.first_name} ${p.last_name}`)
          .join(", ") || "";

      return {
        id: chat.id,
        name: chat.title,
        description: participantsNames,
        lastMessage: lastMessage?.content,
        timestamp: lastMessage?.created_at
          ? format(new Date(lastMessage.created_at), "h:mm a")
          : undefined,
        icon: SharedDriveIcon,
        type: chat.type === "general" ? "general" : "group",
      };
    });
  }, [chatsData]);

  // Combine static threads, teacher threads, and API-loaded threads
  const threads: MessageThread[] = useMemo(() => {
    return [...staticThreads, ...teacherThreads, ...apiThreads];
  }, [teacherThreads, apiThreads]);

  // Handle teacher selection - add teacher thread to list
  const handleTeacherSelect = (teacherId: string) => {
    const teacher = teachersData?.data?.find((t) => t.id === teacherId);
    if (!teacher) return;

    // Check if thread already exists
    const existingThread = teacherThreads.find((t) => t.id === teacherId);
    if (existingThread) {
      setSelectedThreadId(teacherId);
      return;
    }

    // Create new thread from teacher data
    const newThread: MessageThread = {
      id: teacher.id,
      name: `${teacher.first_name} ${teacher.last_name}`,
      description: teacher.email || "",
      avatar: teacher.profile_image_url || undefined,
      type: "individual",
    };

    setTeacherThreads((prev) => [...prev, newThread]);
    setSelectedThreadId(teacherId);
  };

  // Map ChatMessages[] to Message[] using sender structure
  const messages: Message[] = useMemo(() => {
    if (!selectedChatData?.data?.messages) return [];

    return selectedChatData.data.messages.map((msg: ChatMessages) => {
      const isOwnMessage = msg.sender?.id === user?.id;
      return {
        id: msg.id,
        senderName: msg.sender
          ? `${msg.sender.first_name} ${msg.sender.last_name}`
          : "Unknown",
        senderEmail: msg.sender?.username || "",
        message: msg.content,
        timestamp: msg.created_at
          ? format(new Date(msg.created_at), "M/d/yyyy, h:mm:ss a")
          : "",
        isOwnMessage,
      };
    });
  }, [selectedChatData, user]);

  const selectedThread = threads.find((t) => t.id === selectedThreadId);

  const handleSendMessage = async (message: string) => {
    if (!selectedThreadId || !message.trim()) return;

    try {
      // Build history from existing messages - use actual data from API
      const history =
        selectedChatData?.data?.messages?.map((msg: ChatMessages) => ({
          role: msg.role,
          message: msg.content,
          model_type: msg.model_type,
        })) || [];

      const chatIdsFromApi = chatsData?.data?.map((c: Chat) => c.id) ?? [];
      const isExistingChat = chatIdsFromApi.includes(selectedThreadId);

      const payload: SendChatPayload = {
        message: message.trim(),
        history,
        content_type: "text/plain",
        save_chat: true,
        type: "general",
      };
      if (isExistingChat) {
        payload.id = selectedThreadId;
      }
      const lastMessage =
        selectedChatData?.data?.messages?.[
          selectedChatData.data.messages.length - 1
        ];
      if (lastMessage?.model_type) {
        payload.model_type = lastMessage.model_type;
      }

      await sendChat(payload).unwrap();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleNewMessage = () => {
    // No-op - dropdown handles teacher selection
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
          teachers={teachersData?.data || []}
          onTeacherSelect={handleTeacherSelect}
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
                onSendMessage={() => {}}
                onLoadPrevious={() => console.log("Load previous")}
              />

              {/* Input */}
              <MessageInput onSend={handleSendMessage} />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-white rounded-md">
              <div className="text-center p-6">
                <Icon
                  icon={MessageCancel01Icon}
                  size={48}
                  className="mx-auto text-gray-400 mb-4"
                />
                <p className="text-base text-gray-600">
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
