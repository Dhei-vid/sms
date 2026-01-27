import { ResponseStatus } from "@/common/types";
import { User } from "../users/users-type";
import { LeaveRequest } from "../leave-requests/leave-requests-type";

export type AttachmentListResponse = { data: Attachment[] } & ResponseStatus;

export interface Attachment {
  id: string;
  creator_id: string;
  updated_by_id: string;
  user_id: string;
  leave_request_id: string;
  file: string;
  name: string;
  type: "others" | string;
  status: "uploaded";
  is_deleted: boolean;
  creator: User;
  user: User;
  leave_request: {
    id: "01kasdnwy6gsft0rtqx956exbh";
    creator_id: "01kady0hdh5kp5r94y0d9w89q1";
    updated_by_id: "01kady0hdh5kp5r94y0d9w89q1";
    school_id: "01kady0vz0zvwfnrk72pyvbfdb";
    supervisor_id: "01kady0w3qbc1yw44n0yrmedh6";
    staff_member_id: "01kady0w3qbc1yw44n0yrmedh6";
    coverage_staff_id: "01kady0w3qbc1yw44n0yrmedh6";
    leave_policy_id: "01kbckzgym3atws0cfxj1n6w9n";
    title: "Test Request Title Updated";
    type: "allocation";
    assignment_type: "Test Assignment Type";
    duty_role_name: "Test Duty Role";
    coverage_required: "Test Coverage Required";
    leave_type: "Annual";
    resource_category: "Test Resource Category";
    item_name_model: "Test Name Model";
    asset_tag_serial_no: "Test Serial No / Asset Tag";
    description: "Test Request Content Updated";
    start_date: "2024-10-20";
    end_date: "2025-10-20";
    issued_date: "2025-11-10";
    returned_date: "2025-11-30";
    condition_upon_issue: "Test Condition Upon Issue";
    status: "active";
    created_at: "2025-11-23T22:34:45.062563Z";
    updated_at: "2025-12-01T09:36:36.332444Z";
  };
  created_at: string;
  updated_at: string;
  deleted_at?: null | string;
}
