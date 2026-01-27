import type { ApiListResponse } from "../shared-types";

export interface Stakeholders {
  id: string;
  user_id?: string;
  school_id?: string;
  type?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateStakeholdersRequest {
  user_id: string;
  school_id: string;

  type: "student" | "teacher" | "parent" | "vendor" | string;
  status: "active" | "inactive" | "suspended";

  phone: string;

  // Academic / staff
  position?: string;
  subjects?: string[];
  class_assigned?: string;
  qualification?: string;
  salary?: number;

  // Business / vendor
  business?: string;
  services?: string[];
  contracts?: Contract[];

  // Student
  grade?: string;
  age?: number;
  performance?: Performance;
  admission_number?: string;
  school_fees?: SchoolFees;

  // Parent
  children?: string[];
  relationship_to_student?: string;
  occupation?: string;

  // Common
  address?: string;
  date_joined: string;
}

export interface Contract {
  id: string;
  title: string;
  value: number;
  start_date: string;
  end_date: string;
  status: "active" | "inactive" | "completed";
}

export interface Performance {
  gpa: number;
  attendance: number; // percentage
}

export interface SchoolFees {
  paid: number;
  total: number;
  last_payment: string;
}

export type StakeholdersListResponse = ApiListResponse<Stakeholders>;

export interface AssignDutyStakeholder {
  stakeholder_id: "01kaphp565xbxb5vtdrm2js2ps";
  type: "teaching" | "non teaching"; // teaching, non teaching
  date: string;
  // Teaching
  class_grade: "SSS 3";
  subject: string;
  period: string;
  classroom: "Test Classroom";
  // Non Teaching
  duty_type: string;
  start_time: string;
  end_time: string;
}

export interface UpdateStakeholdersRequest {
  user_id: string;
  school_id: string;
  // "type": "student",
  // "phone": "+2348012345678",
  // "status": "active",
  // "position": "Senior Mathematics Teacher",
  // "subjects": ["Mathematics", "Physics", "Further Mathematics"],
  // "class_assigned": "12A",
  // "qualification": "M.Sc. Mathematics Education",
  // "salary": 75000.00,
  // "business": "TechEdu Solutions Ltd",
  // "services": ["Computer Hardware", "Software Licenses", "IT Training"],
  // "contracts": [
  //     {
  //         "id": "cnt-001",
  //         "title": "Annual IT Equipment Supply",
  //         "value": 250000.00,
  //         "start_date": "2024-01-01",
  //         "end_date": "2024-12-31",
  //         "status": "active"
  //     }
  // ],
  // "grade": "10B",
  // "age": 15,
  guardian_id: string;
  // "performance": {
  //     "gpa": 3.85,
  //     "attendance": 98.5
  // },
  // "children": [
  //     "01jx22yx1zptx0cdpxb1vkkwhg"
  // ]
  // "relationship_to_student": "Father",
  // "occupation": "Software Engineer",
  // "address": "123 Lagos Street, Victoria Island, Lagos",
  // "date_joined": "2024-01-01",
  admission_number: string;
  school_fees: {
    paid: number;
    total: number;
    last_payment: string;
  };
}
