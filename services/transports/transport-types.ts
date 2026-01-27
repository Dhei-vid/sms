import { ResponseStatus } from "@/common/types";

export type TransportListResponse = { data: [] } & ResponseStatus;

export interface CreateTransportPayload {
  school_id: string;
  number: string;
}

export interface UpdateTransportPayload {
  school_id: string;
  driver_id: string;
  number: string;
  route: string;
  seats: string[];
  assignees: {
    stakeholder_id: string;
    seat: string;
  }[];
  status: "active";
}

export interface AssignBus {
  stakeholder_id: string;
  transport_id: string;
  // "payer_id": "01jzr9xft7zaxsh7mbgr3hnzv5",
  // "amount": 2000,
  seat: string;
}
