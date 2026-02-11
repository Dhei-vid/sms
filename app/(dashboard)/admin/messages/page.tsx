"use client";

import { useState, useMemo, useEffect } from "react";
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
  useLazyGetChatByIdQuery,
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

const MESSAGE_PAGE_SIZE = 20;

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
  const [staticThreadMessages, setStaticThreadMessages] = useState<
    Record<"general" | "academic", ChatMessages[]>
  >({ general: [], academic: [] });
  const [individualThreadMessages, setIndividualThreadMessages] = useState<
    Record<string, ChatMessages[]>
  >({});
  const [accumulatedMessages, setAccumulatedMessages] = useState<
    Record<string, { messages: ChatMessages[]; hasMore: boolean }>
  >({});

  const { data: chatsData } = useGetChatsQuery({ limit: 50 });

  const isTeacherThread = teacherThreads.some((t) => t.id === selectedThreadId);

  const chatIdToFetch = useMemo(() => {
    if (!selectedThreadId || !chatsData?.data) return undefined;
    if (selectedThreadId === "general") {
      return chatsData.data.find((c: Chat) => c.type === "general")?.id;
    }
    if (selectedThreadId === "academic") {
      return chatsData.data.find((c: Chat) => c.type === "staff")?.id;
    }
    if (isTeacherThread) {
      const oneToOne = chatsData.data.find(
        (c: Chat) =>
          c.participants?.length === 2 &&
          c.participants.some(
            (p: ChatParticipants) => p.id === selectedThreadId,
          ),
      );
      return oneToOne?.id;
    }
    return selectedThreadId;
  }, [selectedThreadId, isTeacherThread, chatsData?.data]);

  const { data: selectedChatData } = useGetChatByIdQuery(
    chatIdToFetch
      ? { id: chatIdToFetch, message_limit: MESSAGE_PAGE_SIZE }
      : { id: "" },
    { skip: !chatIdToFetch },
  );
  const [fetchMoreMessages] = useLazyGetChatByIdQuery();

  useEffect(() => {
    if (!chatIdToFetch || !selectedChatData?.data?.id) return;
    if (selectedChatData.data.id !== chatIdToFetch) return;
    const { messages: msgs, has_more_messages: hasMore } =
      selectedChatData.data;
    setAccumulatedMessages((prev) => {
      const existing = prev[chatIdToFetch];
      if (existing && existing.messages.length > 0) return prev;
      return {
        ...prev,
        [chatIdToFetch]: {
          messages: msgs ?? [],
          hasMore: hasMore ?? false,
        },
      };
    });
  }, [
    chatIdToFetch,
    selectedChatData?.data?.id,
    selectedChatData?.data?.messages,
    selectedChatData?.data?.has_more_messages,
  ]);

  const { data: teachersData } = useGetUsersQuery({
    role: "teacher",
    limit: 100,
  });
  const [sendChat] = useSendChatMutation();

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

  // Thread list is only static (General, Academic) + per-user (teacher/individual). Not by chat id.
  const threads: MessageThread[] = useMemo(() => {
    return [...staticThreads, ...teacherThreads];
  }, [teacherThreads]);

  const handleTeacherSelect = (teacherId: string) => {
    const teacher = teachersData?.data?.find((t) => t.id === teacherId);
    if (!teacher) return;

    const existingThread = teacherThreads.find((t) => t.id === teacherId);
    if (existingThread) {
      setSelectedThreadId(teacherId);
      return;
    }

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

  const rawMessagesForThread = useMemo(() => {
    if (selectedThreadId === "general") {
      if (
        chatIdToFetch &&
        accumulatedMessages[chatIdToFetch]?.messages?.length
      ) {
        return accumulatedMessages[chatIdToFetch].messages;
      }
      if (
        chatIdToFetch &&
        selectedChatData?.data?.id === chatIdToFetch &&
        selectedChatData?.data?.messages?.length
      ) {
        return selectedChatData.data.messages;
      }
      return staticThreadMessages.general;
    }
    if (selectedThreadId === "academic") {
      if (
        chatIdToFetch &&
        accumulatedMessages[chatIdToFetch]?.messages?.length
      ) {
        return accumulatedMessages[chatIdToFetch].messages;
      }
      if (
        chatIdToFetch &&
        selectedChatData?.data?.id === chatIdToFetch &&
        selectedChatData?.data?.messages?.length
      ) {
        return selectedChatData.data.messages;
      }
      return staticThreadMessages.academic;
    }
    if (isTeacherThread && selectedThreadId) {
      if (
        chatIdToFetch &&
        accumulatedMessages[chatIdToFetch]?.messages?.length
      ) {
        return accumulatedMessages[chatIdToFetch].messages;
      }
      if (
        chatIdToFetch &&
        selectedChatData?.data?.id === chatIdToFetch &&
        selectedChatData?.data?.messages?.length
      ) {
        return selectedChatData.data.messages;
      }
      return individualThreadMessages[selectedThreadId] ?? [];
    }
    if (chatIdToFetch && accumulatedMessages[chatIdToFetch]) {
      return accumulatedMessages[chatIdToFetch].messages;
    }
    return selectedChatData?.data?.messages ?? [];
  }, [
    chatIdToFetch,
    accumulatedMessages,
    selectedThreadId,
    staticThreadMessages,
    individualThreadMessages,
    isTeacherThread,
    selectedChatData?.data?.id,
    selectedChatData?.data?.messages,
  ]);

  const hasMoreFromApi =
    selectedChatData?.data?.id === chatIdToFetch &&
    (selectedChatData?.data?.has_more_messages ?? false);
  const hasMoreMessages =
    !!chatIdToFetch &&
    (accumulatedMessages[chatIdToFetch]?.hasMore ?? hasMoreFromApi);

  const messages: Message[] = useMemo(() => {
    return rawMessagesForThread.map((msg: ChatMessages) => {
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
  }, [rawMessagesForThread, user]);

  const selectedThread = threads.find((t) => t.id === selectedThreadId);

  const handleSendMessage = async (message: string) => {
    if (!selectedThreadId || !message.trim()) return;

    const isGeneralOrAcademic =
      selectedThreadId === "general" || selectedThreadId === "academic";
    const chatType: "general" | "staff" | undefined =
      selectedThreadId === "general"
        ? "general"
        : selectedThreadId === "academic"
          ? "staff"
          : undefined;

    const sourceMessages = rawMessagesForThread;
    const history = sourceMessages.map((msg: ChatMessages) => ({
      role: msg.role,
      message: msg.content,
      model_type: msg.model_type,
    }));

    try {
      const payload: SendChatPayload = {
        message: message.trim(),
        history,
        content_type: "text/plain",
        save_chat: true,
      };
      if (chatType) {
        payload.type = chatType;
        if (user?.school_id) payload.school_id = user.school_id;
      }
      // 1:1: backend finds/creates chat by recipient so previous messages are in same thread
      if (isTeacherThread && selectedThreadId) {
        payload.recipient_id = String(selectedThreadId);
      }
      // Send chat id when we already have it (e.g. after first message, list refetched)
      if (!isGeneralOrAcademic && chatIdToFetch) {
        payload.id = chatIdToFetch;
      } else if (!isGeneralOrAcademic && !isTeacherThread && selectedThreadId) {
        payload.id = selectedThreadId;
      }
      const lastMessage = sourceMessages[sourceMessages.length - 1];
      if (lastMessage?.model_type) {
        payload.model_type = lastMessage.model_type;
      }

      const result = await sendChat(payload).unwrap();
      if (chatIdToFetch && result?.data?.messages) {
        setAccumulatedMessages((prev) => ({
          ...prev,
          [chatIdToFetch]: {
            messages: result.data.messages ?? [],
            hasMore: prev[chatIdToFetch]?.hasMore ?? false,
          },
        }));
      }
      if (isGeneralOrAcademic && result?.data?.messages && !chatIdToFetch) {
        const key = selectedThreadId as "general" | "academic";
        setStaticThreadMessages((prev) => ({
          ...prev,
          [key]: result.data.messages ?? [],
        }));
      }
      if (isTeacherThread && selectedThreadId && result?.data?.messages) {
        const messages = result.data.messages ?? [];
        setIndividualThreadMessages((prev) => ({
          ...prev,
          [selectedThreadId]: messages,
        }));
        // Store by returned chat id so when list refetches and chatIdToFetch updates we have messages
        if (result.data.id) {
          setAccumulatedMessages((prev) => ({
            ...prev,
            [result.data.id]: {
              messages,
              hasMore: result.data.has_more_messages ?? false,
            },
          }));
        }
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleLoadPrevious = async () => {
    if (!chatIdToFetch || !hasMoreMessages) return;
    const current = accumulatedMessages[chatIdToFetch];
    const oldestId =
      current?.messages[0]?.id ??
      (selectedChatData?.data?.id === chatIdToFetch
        ? selectedChatData?.data?.messages?.[0]?.id
        : undefined);
    if (!oldestId) return;
    try {
      const result = await fetchMoreMessages({
        id: chatIdToFetch,
        message_limit: MESSAGE_PAGE_SIZE,
        message_before: oldestId,
      }).unwrap();
      const older = result?.data?.messages ?? [];
      const hasMore = result?.data?.has_more_messages ?? false;
      if (older.length > 0) {
        setAccumulatedMessages((prev) => ({
          ...prev,
          [chatIdToFetch]: {
            messages: [...older, ...(prev[chatIdToFetch]?.messages ?? [])],
            hasMore,
          },
        }));
      } else {
        setAccumulatedMessages((prev) => ({
          ...prev,
          [chatIdToFetch]: {
            ...prev[chatIdToFetch]!,
            hasMore: false,
          },
        }));
      }
    } catch (e) {
      console.error("Load previous messages failed:", e);
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
                onLoadPrevious={
                  hasMoreMessages ? handleLoadPrevious : undefined
                }
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
