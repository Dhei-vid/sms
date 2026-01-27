import type { ApiListResponse } from "../shared-types";
import type { Roles, User } from "../users/users-type";
import type { School } from "../schools/schools-type";

export type ChatResponse = ApiListResponse<Chat>;

export interface Chat {
  id: string;
  creator_id: string;
  updated_by_id?: null;
  school_id: string;
  title: string;
  participants: Array<ChatParticipants>;
  messages: Array<ChatMessages>;
  type: "general";
  is_deleted: boolean;
  creator: User;
  updated_by?: null;
  school: School;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface ChatParticipants {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  role: string;
}

export interface ChatMessages {
  id: string;
  content: string;
  content_type: ContentType;
  role: Roles;
  model_type: string;
  sender: ChatSender;
  created_at: string;
}

export interface ChatSender {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  role: Roles;
}

export interface SendChatPayload {
  message: string;
  id?: string;
  attachments?: []; // optional
  content_type?: string;
  model_type?: string;
  save_chat?: true; // optional,
  type?: "general" | string; // optional,
  history: Array<ChatHistory>;
  // "title": "Test Title", // optional
  // "school_id": "01kady0vz0zvwfnrk72pyvbfdb", // optional
  // "model_type"?: "gemini-1.5-flash", // optional,
  // "use_embedded_data"?: true, // optional,
}

export interface ChatHistory {
  role: Roles;
  message: string;
  model_type: string;
}

export interface UpdateChatPayload {
  title: string;
}

type ContentType = "text/plain" | "text/markdown" | "text/html";
