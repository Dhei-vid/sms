export interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  next_page_url?: null | string;
  previous_page_url?: null | string;
}

export type Currency = "NGN" | string;

export interface ResponseStatus {
  status: boolean;
  status_code: number;
  message: "Successful" | string;
  pagination: Pagination;
}

export type Gender = "female" | "male" | "others";

export type Grades = "A" | "B" | "C" | "D" | "E" | "F" | "P" | "I";
