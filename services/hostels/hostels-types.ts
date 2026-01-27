import { ResponseStatus, Gender } from "@/common/types";

export type HostelsListResponse = { data: [] } & ResponseStatus;

export interface CreateHostelsPayload {
  school_id: string;
  name: string;
  gender: Gender;
  fees: 20000;
}

export interface UpdateHostelsPayload {
  school_id: string;
  warden_id: string;
  name: string;
  gender: Gender;
  fees: string;
  rooms: string[];
  assignees: {
    stakeholder_id: string;
    room: string;
  }[];
  status: "inactive" | "active";
}

export interface AssignHostelPayload {
  stakeholder_id: string;
  hostel_id: string;
  room: string;
  // "payer_id": "01jzr9xft7zaxsh7mbgr3hnzv5",
  // "amount": 2000,
}
