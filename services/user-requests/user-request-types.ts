import { ResponseStatus } from "@/common/types";
import { User } from "../users/users-type";
import { School } from "../schools/schools-type";

export type UserRequestListResponse = { data: [] } & ResponseStatus;

export interface CreateUserRequests {
  school_id: string;
  title: string;
  description: string;
  type: "assignment" | "allocation" | "leave" | "others";
}

export interface UpdateuserRequests {
  school_id: string;
  supervisor_id: string;
  staff_member_id: string;
  coverage_staff_id: string;
  leave_policy_id: string;
  title: string;
  type: "assignment" | "allocation" | "leave" | "others";
  assignment_type: string;
  duty_role_name: string;
  coverage_required: string;
  leave_type: "Annual";
  resource_category: string;
  item_name_model: string;
  asset_tag_serial_no: string;
  description: string;
  start_date: string;
  end_date: string;
  issued_date: string;
  returned_date: string;
  condition_upon_issue: string;
  status: "active";
}

export interface UserRequest {
  id: string;
  creator_id: string;
  updated_by_id: string;
  school_id: string;
  supervisor_id: string;
  staff_member_id: string;
  coverage_staff_id: string;
  leave_policy_id: string;
  title: string;
  type: "allocation";
  assignment_type: "Test Assignment Type";
  duty_role_name: string;
  coverage_required: string;
  leave_type: "Annual";
  resource_category: string;
  item_name_model: string;
  asset_tag_serial_no: string;
  description: string;
  start_date: string;
  end_date: string;
  issued_date: string;
  returned_date: string;
  condition_upon_issue: string;
  status: "active";
  is_deleted: false;
  creator: User;
  updated_by: User;
  school: School;
  supervisor: {
    id: "01kady0w3qbc1yw44n0yrmedh6";
    user_id: "01kady0vvypj9a5ztr191ad6mh";
    creator_id: "01kady0hdh5kp5r94y0d9w89q1";
    updated_by_id: null;
    school_id: "01kady0vz0zvwfnrk72pyvbfdb";
    primary_contact_id: null;
    emergency_contact_id: null;
    type: "staff";
    status: "active";
    position: "Hostel Warden";
    admission_number: null;
    school_fees: {};
    hostel: {};
    hostel_details: null;
    transport: {};
    transport_details: null;
    subjects: [];
    class_assigned: null;
    assigned_classes: [];
    qualification: null;
    salary: "45000.00";
    business: null;
    services: [];
    contracts: [];
    grade: null;
    age: null;
    performance: {};
    bank: {};
    children: [];
    children_details: [];
    relationship_to_student: null;
    occupation: null;
    stage: 1;
    stage_text: "Inquires/Interest";
    notifications: [];
    performance_highlights: null;
    common_exam_score: null;
    last_grade_completed: null;
    current_previous_school: null;
    transfer_reason: null;
    admin_notes: null;
    emergency_contact_and_phone: null;
    employment_type: null;
    contract_start_date: null;
    contract_end_date: null;
    annual_leave_entitlement: null;
    school_email: null;
    initial_status: null;
    parent_name: null;
    date_joined: "2025-11-19T11:29:28.695045Z";
    is_deleted: false;
    user: {
      id: "01kady0vvypj9a5ztr191ad6mh";
      creator_id: "01kady0hdh5kp5r94y0d9w89q1";
      updated_by_id: null;
      school_id: null;
      username: "emilystaff";
      first_name: "Emily";
      last_name: "Warden";
      middle_name: null;
      email: "emilystaff@test.com";
      date_of_birth: null;
      gender: "female";
      status: "active";
      is_active: true;
      is_staff: false;
      is_superuser: false;
      role: "staff";
      phone_number: null;
      residential_address: null;
      profile_image_url: null;
      profile_image_public_id: null;
      language_preference: "en";
      theme: "light";
      api_usage: 0;
      model_preferences: [];
      training_data: [];
      personalization_settings: {};
      two_factor_enabled: false;
      data_sharing_consent: true;
      groups: [];
      user_permissions: [];
      ip_address: null;
      last_login_ip: null;
      permissions: [];
      is_deleted: false;
      creator: User;
      updated_by: null;
      school?: null;
      date_joined: "2025-11-19T11:29:28.446537Z";
      updated_at: "2025-11-19T11:29:28.446537Z";
      deleted_at: null;
    };
    creator: User;
    updated_by?: User | null;
    school: {
      id: "01kady0vz0zvwfnrk72pyvbfdb";
      creator_id: "01kady0hdh5kp5r94y0d9w89q1";
      updated_by_id: null;
      name: "Delight Universal School";
      address: "123 Education Street, City, Country";
      motto: "Knowledge is Wealth";
      type: "secondary";
      phone: "+2348168766556";
      email: "info@delightsch.com";
      website: "https://delightsch.com";
      term: {
        name: "first-term";
        session: "2022/2023";
        end_date: "2024-04-30";
        start_date: "2024-01-08";
      };
      bank: {};
      score: {
        ca: 30;
        exam: 70;
        total: 100;
      };
      discount: null;
      established_date: "2022-01-14";
      accreditation_number: "ACC423488";
      license_number: "LIC789012";
      student_capacity: 1000;
      current_enrollment: 750;
      subscription: {
        status: "active";
        end_date: "2026-03-19";
        start_date: "2025-11-19T12:29:28.542327";
        subscription_id: "01kady0vy96eq4rdx8d080xp79";
      };
      subscription_details: {
        subscription_id: "01kady0vy96eq4rdx8d080xp79";
        start_date: "2025-11-19T12:29:28.542327";
        end_date: "2026-03-19";
        status: "active";
        subscription: {
          id: "01kady0vy96eq4rdx8d080xp79";
          creator: "01kady0hdh5kp5r94y0d9w89q1";
          updated_by: null;
          plan: "Premium Max";
          cost: "1800000.00";
          total_students: 1000;
          total_teachers: 100;
          total_users: 1500;
          duration: 12;
          features: [
            "Unlimited students",
            "Advanced features",
            "Premium support",
          ];
          description: "Up to 1000 students, 50 teachers";
          discount: "20000.00";
          status: "available";
          created_at: "2025-11-19T11:29:28.521047Z";
          updated_at: "2025-11-19T11:29:28.521047Z";
        };
      };
      color: {
        accent: "#ff4081";
        primary: "#1a237e";
        tertiary: "#2196f3";
        secondary: "#0d47a1";
      };
      logo: {
        svg: '<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="80" rx="16" fill="#1a237e"/><path d="M20 15H60C62 15 64 17 64 19V31C64 33 62 35 60 35H20V15Z" fill="#2196f3"/><path d="M20 35H60L40 50L20 35Z" fill="#ff4081"/><path d="M25 55H55C57 55 59 57 59 59V61C59 63 57 65 55 65H25C23 65 21 63 21 61V59C21 57 23 55 25 55Z" fill="#2196f3"/><text x="40" y="28" fill="white" fontSize="12" textAnchor="middle" fontFamily="Arial">DUS</text><path d="M36 42H44" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>';
        image_url: null;
        image_public_id: null;
      };
      facebook_url: "https://facebook.com/delightsch";
      twitter_url: "https://twitter.com/delightsch";
      instagram_url: "https://instagram.com/delightsch";
      linkedin_url: "https://linkedin.com/company/delightsch";
      is_active: true;
      classes: [
        "JSS 1",
        "JSS 2",
        "JSS 3",
        "SSS 1",
        "SSS 1 Science",
        "SSS 1 Arts/Commercial",
        "SSS 2",
        "SSS 2 Science",
        "SSS 2 Arts/Commercial",
        "SSS 3",
        "SSS 3 Science",
        "SSS 3 Arts/Commercial",
      ];
      subjects: [];
      status: "active";
      creator: {
        id: "01kady0hdh5kp5r94y0d9w89q1";
        creator_id: null;
        updated_by_id: null;
        school_id: null;
        username: "admin";
        first_name: "Admin";
        last_name: "User";
        middle_name: null;
        email: "admin@example.com";
        date_of_birth: null;
        gender: "other";
        status: "active";
        is_active: true;
        is_staff: true;
        is_superuser: true;
        role: "admin";
        phone_number: null;
        residential_address: null;
        profile_image_url: null;
        profile_image_public_id: null;
        language_preference: "en";
        theme: "light";
        api_usage: 0;
        model_preferences: [];
        training_data: [];
        personalization_settings: {};
        two_factor_enabled: false;
        data_sharing_consent: true;
        groups: [];
        user_permissions: [];
        ip_address: null;
        last_login_ip: null;
        permissions: [];
        date_joined: "2025-11-19T11:29:17.745470Z";
        updated_at: "2025-11-19T11:29:17.745470Z";
      };
      updated_by: null;
      created_at: "2025-11-19T11:29:28.544987Z";
      updated_at: "2025-11-19T11:29:28.546024Z";
    };
    primary_contact: null;
    emergency_contact: null;
    attachments: [];
    notes: [
      {
        id: "01kaeez41n1margatdrnctkfgd";
        creator_id: "01kady0hdh5kp5r94y0d9w89q1";
        updated_by_id: "01kady0hdh5kp5r94y0d9w89q1";
        school_id: "01kady0vz0zvwfnrk72pyvbfdb";
        user_id: "01kady0vvypj9a5ztr191ad6mh";
        title: "Test Note Title Updated";
        description: "Test Note Content Updated";
        type: "custom";
        users_favorite: null;
        status: "inactive";
        is_deleted: false;
        creator: {
          id: "01kady0hdh5kp5r94y0d9w89q1";
          creator_id: null;
          updated_by_id: null;
          school_id: null;
          username: "admin";
          first_name: "Admin";
          last_name: "User";
          middle_name: null;
          email: "admin@example.com";
          date_of_birth: null;
          gender: "other";
          status: "active";
          is_active: true;
          is_staff: true;
          is_superuser: true;
          role: "admin";
          phone_number: null;
          residential_address: null;
          profile_image_url: null;
          profile_image_public_id: null;
          language_preference: "en";
          theme: "light";
          api_usage: 0;
          model_preferences: [];
          training_data: [];
          personalization_settings: {};
          two_factor_enabled: false;
          data_sharing_consent: true;
          groups: [];
          user_permissions: [];
          ip_address: null;
          last_login_ip: null;
          permissions: [];
          date_joined: "2025-11-19T11:29:17.745470Z";
          updated_at: "2025-11-19T11:29:17.745470Z";
        };
        updated_by: {
          id: "01kady0hdh5kp5r94y0d9w89q1";
          creator_id: null;
          updated_by_id: null;
          school_id: null;
          username: "admin";
          first_name: "Admin";
          last_name: "User";
          middle_name: null;
          email: "admin@example.com";
          date_of_birth: null;
          gender: "other";
          status: "active";
          is_active: true;
          is_staff: true;
          is_superuser: true;
          role: "admin";
          phone_number: null;
          residential_address: null;
          profile_image_url: null;
          profile_image_public_id: null;
          language_preference: "en";
          theme: "light";
          api_usage: 0;
          model_preferences: [];
          training_data: [];
          personalization_settings: {};
          two_factor_enabled: false;
          data_sharing_consent: true;
          groups: [];
          user_permissions: [];
          ip_address: null;
          last_login_ip: null;
          permissions: [];
          date_joined: "2025-11-19T11:29:17.745470Z";
          updated_at: "2025-11-19T11:29:17.745470Z";
        };
        school: {
          id: "01kady0vz0zvwfnrk72pyvbfdb";
          creator_id: "01kady0hdh5kp5r94y0d9w89q1";
          updated_by_id: null;
          name: "Delight Universal School";
          address: "123 Education Street, City, Country";
          motto: "Knowledge is Wealth";
          type: "secondary";
          phone: "+2348168766556";
          email: "info@delightsch.com";
          website: "https://delightsch.com";
          term: {
            name: "first-term";
            session: "2022/2023";
            end_date: "2024-04-30";
            start_date: "2024-01-08";
          };
          bank: {};
          score: {
            ca: 30;
            exam: 70;
            total: 100;
          };
          discount: null;
          established_date: "2022-01-14";
          accreditation_number: "ACC423488";
          license_number: "LIC789012";
          student_capacity: 1000;
          current_enrollment: 750;
          subscription: {
            status: "active";
            end_date: "2026-03-19";
            start_date: "2025-11-19T12:29:28.542327";
            subscription_id: "01kady0vy96eq4rdx8d080xp79";
          };
          color: {
            accent: "#ff4081";
            primary: "#1a237e";
            tertiary: "#2196f3";
            secondary: "#0d47a1";
          };
          logo: {
            svg: '<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="80" rx="16" fill="#1a237e"/><path d="M20 15H60C62 15 64 17 64 19V31C64 33 62 35 60 35H20V15Z" fill="#2196f3"/><path d="M20 35H60L40 50L20 35Z" fill="#ff4081"/><path d="M25 55H55C57 55 59 57 59 59V61C59 63 57 65 55 65H25C23 65 21 63 21 61V59C21 57 23 55 25 55Z" fill="#2196f3"/><text x="40" y="28" fill="white" fontSize="12" textAnchor="middle" fontFamily="Arial">DUS</text><path d="M36 42H44" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>';
            image_url: null;
            image_public_id: null;
          };
          facebook_url: "https://facebook.com/delightsch";
          twitter_url: "https://twitter.com/delightsch";
          instagram_url: "https://instagram.com/delightsch";
          linkedin_url: "https://linkedin.com/company/delightsch";
          is_active: true;
          classes: [
            "JSS 1",
            "JSS 2",
            "JSS 3",
            "SSS 1",
            "SSS 1 Science",
            "SSS 1 Arts/Commercial",
            "SSS 2",
            "SSS 2 Science",
            "SSS 2 Arts/Commercial",
            "SSS 3",
            "SSS 3 Science",
            "SSS 3 Arts/Commercial",
          ];
          subjects: [];
          status: "active";
          created_at: "2025-11-19T11:29:28.544987Z";
          updated_at: "2025-11-19T11:29:28.546024Z";
        };
        user: {
          id: "01kady0vvypj9a5ztr191ad6mh";
          creator_id: "01kady0hdh5kp5r94y0d9w89q1";
          updated_by_id: null;
          school_id: null;
          username: "emilystaff";
          first_name: "Emily";
          last_name: "Warden";
          middle_name: null;
          email: "emilystaff@test.com";
          date_of_birth: null;
          gender: "female";
          status: "active";
          is_active: true;
          is_staff: false;
          is_superuser: false;
          role: "staff";
          phone_number: null;
          residential_address: null;
          profile_image_url: null;
          profile_image_public_id: null;
          language_preference: "en";
          theme: "light";
          api_usage: 0;
          model_preferences: [];
          training_data: [];
          personalization_settings: {};
          two_factor_enabled: false;
          data_sharing_consent: true;
          groups: [];
          user_permissions: [];
          ip_address: null;
          last_login_ip: null;
          permissions: [];
          date_joined: "2025-11-19T11:29:28.446537Z";
          updated_at: "2025-11-19T11:29:28.446537Z";
        };
        users_favorite_details: [];
        created_at: "2025-11-19T16:25:37.077574Z";
        updated_at: "2025-11-19T17:40:29.432468Z";
        deleted_at: null;
      },
    ];
    created_at: "2025-11-19T11:29:28.695045Z";
    updated_at: "2025-11-19T11:29:28.695045Z";
    deleted_at: null;
  };
  staff_member: {
    id: "01kady0w3qbc1yw44n0yrmedh6";
    user_id: "01kady0vvypj9a5ztr191ad6mh";
    creator_id: "01kady0hdh5kp5r94y0d9w89q1";
    updated_by_id: null;
    school_id: "01kady0vz0zvwfnrk72pyvbfdb";
    primary_contact_id: null;
    emergency_contact_id: null;
    type: "staff";
    status: "active";
    position: "Hostel Warden";
    admission_number: null;
    school_fees: {};
    hostel: {};
    hostel_details: null;
    transport: {};
    transport_details: null;
    subjects: [];
    class_assigned: null;
    assigned_classes: [];
    qualification: null;
    salary: "45000.00";
    business: null;
    services: [];
    contracts: [];
    grade: null;
    age: null;
    performance: {};
    bank: {};
    children: [];
    children_details: [];
    relationship_to_student: null;
    occupation: null;
    stage: 1;
    stage_text: "Inquires/Interest";
    notifications: [];
    performance_highlights: null;
    common_exam_score: null;
    last_grade_completed: null;
    current_previous_school: null;
    transfer_reason: null;
    admin_notes: null;
    emergency_contact_and_phone: null;
    employment_type: null;
    contract_start_date: null;
    contract_end_date: null;
    annual_leave_entitlement: null;
    school_email: null;
    initial_status: null;
    parent_name: null;
    date_joined: "2025-11-19T11:29:28.695045Z";
    is_deleted: false;
    user: {
      id: "01kady0vvypj9a5ztr191ad6mh";
      creator_id: "01kady0hdh5kp5r94y0d9w89q1";
      updated_by_id: null;
      school_id: null;
      username: "emilystaff";
      first_name: "Emily";
      last_name: "Warden";
      middle_name: null;
      email: "emilystaff@test.com";
      date_of_birth: null;
      gender: "female";
      status: "active";
      is_active: true;
      is_staff: false;
      is_superuser: false;
      role: "staff";
      phone_number: null;
      residential_address: null;
      profile_image_url: null;
      profile_image_public_id: null;
      language_preference: "en";
      theme: "light";
      api_usage: 0;
      model_preferences: [];
      training_data: [];
      personalization_settings: {};
      two_factor_enabled: false;
      data_sharing_consent: true;
      groups: [];
      user_permissions: [];
      ip_address: null;
      last_login_ip: null;
      permissions: [];
      is_deleted: false;
      creator: {
        id: "01kady0hdh5kp5r94y0d9w89q1";
        creator_id: null;
        updated_by_id: null;
        school_id: null;
        username: "admin";
        first_name: "Admin";
        last_name: "User";
        middle_name: null;
        email: "admin@example.com";
        date_of_birth: null;
        gender: "other";
        status: "active";
        is_active: true;
        is_staff: true;
        is_superuser: true;
        role: "admin";
        phone_number: null;
        residential_address: null;
        profile_image_url: null;
        profile_image_public_id: null;
        language_preference: "en";
        theme: "light";
        api_usage: 0;
        model_preferences: [];
        training_data: [];
        personalization_settings: {};
        two_factor_enabled: false;
        data_sharing_consent: true;
        groups: [];
        user_permissions: [];
        ip_address: null;
        last_login_ip: null;
        permissions: [];
        date_joined: "2025-11-19T11:29:17.745470Z";
        updated_at: "2025-11-19T11:29:17.745470Z";
      };
      updated_by: null;
      school: null;
      date_joined: "2025-11-19T11:29:28.446537Z";
      updated_at: "2025-11-19T11:29:28.446537Z";
      deleted_at: null;
    };
    creator: {
      id: "01kady0hdh5kp5r94y0d9w89q1";
      creator_id: null;
      updated_by_id: null;
      school_id: null;
      username: "admin";
      first_name: "Admin";
      last_name: "User";
      middle_name: null;
      email: "admin@example.com";
      date_of_birth: null;
      gender: "other";
      status: "active";
      is_active: true;
      is_staff: true;
      is_superuser: true;
      role: "admin";
      phone_number: null;
      residential_address: null;
      profile_image_url: null;
      profile_image_public_id: null;
      language_preference: "en";
      theme: "light";
      api_usage: 0;
      model_preferences: [];
      training_data: [];
      personalization_settings: {};
      two_factor_enabled: false;
      data_sharing_consent: true;
      groups: [];
      user_permissions: [];
      ip_address: null;
      last_login_ip: null;
      permissions: [];
      is_deleted: false;
      creator: null;
      updated_by: null;
      school: null;
      date_joined: "2025-11-19T11:29:17.745470Z";
      updated_at: "2025-11-19T11:29:17.745470Z";
      deleted_at: null;
    };
    updated_by: null;
    school: {
      id: "01kady0vz0zvwfnrk72pyvbfdb";
      creator_id: "01kady0hdh5kp5r94y0d9w89q1";
      updated_by_id: null;
      name: "Delight Universal School";
      address: "123 Education Street, City, Country";
      motto: "Knowledge is Wealth";
      type: "secondary";
      phone: "+2348168766556";
      email: "info@delightsch.com";
      website: "https://delightsch.com";
      term: {
        name: "first-term";
        session: "2022/2023";
        end_date: "2024-04-30";
        start_date: "2024-01-08";
      };
      bank: {};
      score: {
        ca: 30;
        exam: 70;
        total: 100;
      };
      discount: null;
      established_date: "2022-01-14";
      accreditation_number: "ACC423488";
      license_number: "LIC789012";
      student_capacity: 1000;
      current_enrollment: 750;
      subscription: {
        status: "active";
        end_date: "2026-03-19";
        start_date: "2025-11-19T12:29:28.542327";
        subscription_id: "01kady0vy96eq4rdx8d080xp79";
      };
      subscription_details: {
        subscription_id: "01kady0vy96eq4rdx8d080xp79";
        start_date: "2025-11-19T12:29:28.542327";
        end_date: "2026-03-19";
        status: "active";
        subscription: {
          id: "01kady0vy96eq4rdx8d080xp79";
          creator: "01kady0hdh5kp5r94y0d9w89q1";
          updated_by: null;
          plan: "Premium Max";
          cost: "1800000.00";
          total_students: 1000;
          total_teachers: 100;
          total_users: 1500;
          duration: 12;
          features: [
            "Unlimited students",
            "Advanced features",
            "Premium support",
          ];
          description: "Up to 1000 students, 50 teachers";
          discount: "20000.00";
          status: "available";
          created_at: "2025-11-19T11:29:28.521047Z";
          updated_at: "2025-11-19T11:29:28.521047Z";
        };
      };
      color: {
        accent: "#ff4081";
        primary: "#1a237e";
        tertiary: "#2196f3";
        secondary: "#0d47a1";
      };
      logo: {
        svg: '<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="80" rx="16" fill="#1a237e"/><path d="M20 15H60C62 15 64 17 64 19V31C64 33 62 35 60 35H20V15Z" fill="#2196f3"/><path d="M20 35H60L40 50L20 35Z" fill="#ff4081"/><path d="M25 55H55C57 55 59 57 59 59V61C59 63 57 65 55 65H25C23 65 21 63 21 61V59C21 57 23 55 25 55Z" fill="#2196f3"/><text x="40" y="28" fill="white" fontSize="12" textAnchor="middle" fontFamily="Arial">DUS</text><path d="M36 42H44" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>';
        image_url: null;
        image_public_id: null;
      };
      facebook_url: "https://facebook.com/delightsch";
      twitter_url: "https://twitter.com/delightsch";
      instagram_url: "https://instagram.com/delightsch";
      linkedin_url: "https://linkedin.com/company/delightsch";
      is_active: true;
      classes: [
        "JSS 1",
        "JSS 2",
        "JSS 3",
        "SSS 1",
        "SSS 1 Science",
        "SSS 1 Arts/Commercial",
        "SSS 2",
        "SSS 2 Science",
        "SSS 2 Arts/Commercial",
        "SSS 3",
        "SSS 3 Science",
        "SSS 3 Arts/Commercial",
      ];
      subjects: [];
      status: "active";
      creator: {
        id: "01kady0hdh5kp5r94y0d9w89q1";
        creator_id: null;
        updated_by_id: null;
        school_id: null;
        username: "admin";
        first_name: "Admin";
        last_name: "User";
        middle_name: null;
        email: "admin@example.com";
        date_of_birth: null;
        gender: "other";
        status: "active";
        is_active: true;
        is_staff: true;
        is_superuser: true;
        role: "admin";
        phone_number: null;
        residential_address: null;
        profile_image_url: null;
        profile_image_public_id: null;
        language_preference: "en";
        theme: "light";
        api_usage: 0;
        model_preferences: [];
        training_data: [];
        personalization_settings: {};
        two_factor_enabled: false;
        data_sharing_consent: true;
        groups: [];
        user_permissions: [];
        ip_address: null;
        last_login_ip: null;
        permissions: [];
        date_joined: "2025-11-19T11:29:17.745470Z";
        updated_at: "2025-11-19T11:29:17.745470Z";
      };
      updated_by: null;
      created_at: "2025-11-19T11:29:28.544987Z";
      updated_at: "2025-11-19T11:29:28.546024Z";
    };
    primary_contact: null;
    emergency_contact: null;
    attachments: [];
    notes: [
      {
        id: "01kaeez41n1margatdrnctkfgd";
        creator_id: "01kady0hdh5kp5r94y0d9w89q1";
        updated_by_id: "01kady0hdh5kp5r94y0d9w89q1";
        school_id: "01kady0vz0zvwfnrk72pyvbfdb";
        user_id: "01kady0vvypj9a5ztr191ad6mh";
        title: "Test Note Title Updated";
        description: "Test Note Content Updated";
        type: "custom";
        users_favorite: null;
        status: "inactive";
        is_deleted: false;
        creator: {
          id: "01kady0hdh5kp5r94y0d9w89q1";
          creator_id: null;
          updated_by_id: null;
          school_id: null;
          username: "admin";
          first_name: "Admin";
          last_name: "User";
          middle_name: null;
          email: "admin@example.com";
          date_of_birth: null;
          gender: "other";
          status: "active";
          is_active: true;
          is_staff: true;
          is_superuser: true;
          role: "admin";
          phone_number: null;
          residential_address: null;
          profile_image_url: null;
          profile_image_public_id: null;
          language_preference: "en";
          theme: "light";
          api_usage: 0;
          model_preferences: [];
          training_data: [];
          personalization_settings: {};
          two_factor_enabled: false;
          data_sharing_consent: true;
          groups: [];
          user_permissions: [];
          ip_address: null;
          last_login_ip: null;
          permissions: [];
          date_joined: "2025-11-19T11:29:17.745470Z";
          updated_at: "2025-11-19T11:29:17.745470Z";
        };
        updated_by: {
          id: "01kady0hdh5kp5r94y0d9w89q1";
          creator_id: null;
          updated_by_id: null;
          school_id: null;
          username: "admin";
          first_name: "Admin";
          last_name: "User";
          middle_name: null;
          email: "admin@example.com";
          date_of_birth: null;
          gender: "other";
          status: "active";
          is_active: true;
          is_staff: true;
          is_superuser: true;
          role: "admin";
          phone_number: null;
          residential_address: null;
          profile_image_url: null;
          profile_image_public_id: null;
          language_preference: "en";
          theme: "light";
          api_usage: 0;
          model_preferences: [];
          training_data: [];
          personalization_settings: {};
          two_factor_enabled: false;
          data_sharing_consent: true;
          groups: [];
          user_permissions: [];
          ip_address: null;
          last_login_ip: null;
          permissions: [];
          date_joined: "2025-11-19T11:29:17.745470Z";
          updated_at: "2025-11-19T11:29:17.745470Z";
        };
        school: {
          id: "01kady0vz0zvwfnrk72pyvbfdb";
          creator_id: "01kady0hdh5kp5r94y0d9w89q1";
          updated_by_id: null;
          name: "Delight Universal School";
          address: "123 Education Street, City, Country";
          motto: "Knowledge is Wealth";
          type: "secondary";
          phone: "+2348168766556";
          email: "info@delightsch.com";
          website: "https://delightsch.com";
          term: {
            name: "first-term";
            session: "2022/2023";
            end_date: "2024-04-30";
            start_date: "2024-01-08";
          };
          bank: {};
          score: {
            ca: 30;
            exam: 70;
            total: 100;
          };
          discount: null;
          established_date: "2022-01-14";
          accreditation_number: "ACC423488";
          license_number: "LIC789012";
          student_capacity: 1000;
          current_enrollment: 750;
          subscription: {
            status: "active";
            end_date: "2026-03-19";
            start_date: "2025-11-19T12:29:28.542327";
            subscription_id: "01kady0vy96eq4rdx8d080xp79";
          };
          color: {
            accent: "#ff4081";
            primary: "#1a237e";
            tertiary: "#2196f3";
            secondary: "#0d47a1";
          };
          logo: {
            svg: '<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="80" rx="16" fill="#1a237e"/><path d="M20 15H60C62 15 64 17 64 19V31C64 33 62 35 60 35H20V15Z" fill="#2196f3"/><path d="M20 35H60L40 50L20 35Z" fill="#ff4081"/><path d="M25 55H55C57 55 59 57 59 59V61C59 63 57 65 55 65H25C23 65 21 63 21 61V59C21 57 23 55 25 55Z" fill="#2196f3"/><text x="40" y="28" fill="white" fontSize="12" textAnchor="middle" fontFamily="Arial">DUS</text><path d="M36 42H44" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>';
            image_url: null;
            image_public_id: null;
          };
          facebook_url: "https://facebook.com/delightsch";
          twitter_url: "https://twitter.com/delightsch";
          instagram_url: "https://instagram.com/delightsch";
          linkedin_url: "https://linkedin.com/company/delightsch";
          is_active: true;
          classes: [
            "JSS 1",
            "JSS 2",
            "JSS 3",
            "SSS 1",
            "SSS 1 Science",
            "SSS 1 Arts/Commercial",
            "SSS 2",
            "SSS 2 Science",
            "SSS 2 Arts/Commercial",
            "SSS 3",
            "SSS 3 Science",
            "SSS 3 Arts/Commercial",
          ];
          subjects: [];
          status: "active";
          created_at: "2025-11-19T11:29:28.544987Z";
          updated_at: "2025-11-19T11:29:28.546024Z";
        };
        user: {
          id: "01kady0vvypj9a5ztr191ad6mh";
          creator_id: "01kady0hdh5kp5r94y0d9w89q1";
          updated_by_id: null;
          school_id: null;
          username: "emilystaff";
          first_name: "Emily";
          last_name: "Warden";
          middle_name: null;
          email: "emilystaff@test.com";
          date_of_birth: null;
          gender: "female";
          status: "active";
          is_active: true;
          is_staff: false;
          is_superuser: false;
          role: "staff";
          phone_number: null;
          residential_address: null;
          profile_image_url: null;
          profile_image_public_id: null;
          language_preference: "en";
          theme: "light";
          api_usage: 0;
          model_preferences: [];
          training_data: [];
          personalization_settings: {};
          two_factor_enabled: false;
          data_sharing_consent: true;
          groups: [];
          user_permissions: [];
          ip_address: null;
          last_login_ip: null;
          permissions: [];
          date_joined: "2025-11-19T11:29:28.446537Z";
          updated_at: "2025-11-19T11:29:28.446537Z";
        };
        users_favorite_details: [];
        created_at: "2025-11-19T16:25:37.077574Z";
        updated_at: "2025-11-19T17:40:29.432468Z";
        deleted_at: null;
      },
    ];
    created_at: "2025-11-19T11:29:28.695045Z";
    updated_at: "2025-11-19T11:29:28.695045Z";
    deleted_at: null;
  };
  coverage_staff: {
    id: "01kady0w3qbc1yw44n0yrmedh6";
    user_id: "01kady0vvypj9a5ztr191ad6mh";
    creator_id: "01kady0hdh5kp5r94y0d9w89q1";
    updated_by_id: null;
    school_id: "01kady0vz0zvwfnrk72pyvbfdb";
    primary_contact_id: null;
    emergency_contact_id: null;
    type: "staff";
    status: "active";
    position: "Hostel Warden";
    admission_number: null;
    school_fees: {};
    hostel: {};
    hostel_details: null;
    transport: {};
    transport_details: null;
    subjects: [];
    class_assigned: null;
    assigned_classes: [];
    qualification: null;
    salary: "45000.00";
    business: null;
    services: [];
    contracts: [];
    grade: null;
    age: null;
    performance: {};
    bank: {};
    children: [];
    children_details: [];
    relationship_to_student: null;
    occupation: null;
    stage: 1;
    stage_text: "Inquires/Interest";
    notifications: [];
    performance_highlights: null;
    common_exam_score: null;
    last_grade_completed: null;
    current_previous_school: null;
    transfer_reason: null;
    admin_notes: null;
    emergency_contact_and_phone: null;
    employment_type: null;
    contract_start_date: null;
    contract_end_date: null;
    annual_leave_entitlement: null;
    school_email: null;
    initial_status: null;
    parent_name: null;
    date_joined: "2025-11-19T11:29:28.695045Z";
    is_deleted: false;
    user: {
      id: "01kady0vvypj9a5ztr191ad6mh";
      creator_id: "01kady0hdh5kp5r94y0d9w89q1";
      updated_by_id: null;
      school_id: null;
      username: "emilystaff";
      first_name: "Emily";
      last_name: "Warden";
      middle_name: null;
      email: "emilystaff@test.com";
      date_of_birth: null;
      gender: "female";
      status: "active";
      is_active: true;
      is_staff: false;
      is_superuser: false;
      role: "staff";
      phone_number: null;
      residential_address: null;
      profile_image_url: null;
      profile_image_public_id: null;
      language_preference: "en";
      theme: "light";
      api_usage: 0;
      model_preferences: [];
      training_data: [];
      personalization_settings: {};
      two_factor_enabled: false;
      data_sharing_consent: true;
      groups: [];
      user_permissions: [];
      ip_address: null;
      last_login_ip: null;
      permissions: [];
      is_deleted: false;
      creator: {
        id: "01kady0hdh5kp5r94y0d9w89q1";
        creator_id: null;
        updated_by_id: null;
        school_id: null;
        username: "admin";
        first_name: "Admin";
        last_name: "User";
        middle_name: null;
        email: "admin@example.com";
        date_of_birth: null;
        gender: "other";
        status: "active";
        is_active: true;
        is_staff: true;
        is_superuser: true;
        role: "admin";
        phone_number: null;
        residential_address: null;
        profile_image_url: null;
        profile_image_public_id: null;
        language_preference: "en";
        theme: "light";
        api_usage: 0;
        model_preferences: [];
        training_data: [];
        personalization_settings: {};
        two_factor_enabled: false;
        data_sharing_consent: true;
        groups: [];
        user_permissions: [];
        ip_address: null;
        last_login_ip: null;
        permissions: [];
        date_joined: "2025-11-19T11:29:17.745470Z";
        updated_at: "2025-11-19T11:29:17.745470Z";
      };
      updated_by: null;
      school: null;
      date_joined: "2025-11-19T11:29:28.446537Z";
      updated_at: "2025-11-19T11:29:28.446537Z";
      deleted_at: null;
    };
    creator: {
      id: "01kady0hdh5kp5r94y0d9w89q1";
      creator_id: null;
      updated_by_id: null;
      school_id: null;
      username: "admin";
      first_name: "Admin";
      last_name: "User";
      middle_name: null;
      email: "admin@example.com";
      date_of_birth: null;
      gender: "other";
      status: "active";
      is_active: true;
      is_staff: true;
      is_superuser: true;
      role: "admin";
      phone_number: null;
      residential_address: null;
      profile_image_url: null;
      profile_image_public_id: null;
      language_preference: "en";
      theme: "light";
      api_usage: 0;
      model_preferences: [];
      training_data: [];
      personalization_settings: {};
      two_factor_enabled: false;
      data_sharing_consent: true;
      groups: [];
      user_permissions: [];
      ip_address: null;
      last_login_ip: null;
      permissions: [];
      is_deleted: false;
      creator: null;
      updated_by: null;
      school: null;
      date_joined: "2025-11-19T11:29:17.745470Z";
      updated_at: "2025-11-19T11:29:17.745470Z";
      deleted_at: null;
    };
    updated_by: null;
    school: {
      id: "01kady0vz0zvwfnrk72pyvbfdb";
      creator_id: "01kady0hdh5kp5r94y0d9w89q1";
      updated_by_id: null;
      name: "Delight Universal School";
      address: "123 Education Street, City, Country";
      motto: "Knowledge is Wealth";
      type: "secondary";
      phone: "+2348168766556";
      email: "info@delightsch.com";
      website: "https://delightsch.com";
      term: {
        name: "first-term";
        session: "2022/2023";
        end_date: "2024-04-30";
        start_date: "2024-01-08";
      };
      bank: {};
      score: {
        ca: 30;
        exam: 70;
        total: 100;
      };
      discount: null;
      established_date: "2022-01-14";
      accreditation_number: "ACC423488";
      license_number: "LIC789012";
      student_capacity: 1000;
      current_enrollment: 750;
      subscription: {
        status: "active";
        end_date: "2026-03-19";
        start_date: "2025-11-19T12:29:28.542327";
        subscription_id: "01kady0vy96eq4rdx8d080xp79";
      };
      subscription_details: {
        subscription_id: "01kady0vy96eq4rdx8d080xp79";
        start_date: "2025-11-19T12:29:28.542327";
        end_date: "2026-03-19";
        status: "active";
        subscription: {
          id: "01kady0vy96eq4rdx8d080xp79";
          creator: "01kady0hdh5kp5r94y0d9w89q1";
          updated_by: null;
          plan: "Premium Max";
          cost: "1800000.00";
          total_students: 1000;
          total_teachers: 100;
          total_users: 1500;
          duration: 12;
          features: [
            "Unlimited students",
            "Advanced features",
            "Premium support",
          ];
          description: "Up to 1000 students, 50 teachers";
          discount: "20000.00";
          status: "available";
          created_at: "2025-11-19T11:29:28.521047Z";
          updated_at: "2025-11-19T11:29:28.521047Z";
        };
      };
      color: {
        accent: "#ff4081";
        primary: "#1a237e";
        tertiary: "#2196f3";
        secondary: "#0d47a1";
      };
      logo: {
        svg: '<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="80" rx="16" fill="#1a237e"/><path d="M20 15H60C62 15 64 17 64 19V31C64 33 62 35 60 35H20V15Z" fill="#2196f3"/><path d="M20 35H60L40 50L20 35Z" fill="#ff4081"/><path d="M25 55H55C57 55 59 57 59 59V61C59 63 57 65 55 65H25C23 65 21 63 21 61V59C21 57 23 55 25 55Z" fill="#2196f3"/><text x="40" y="28" fill="white" fontSize="12" textAnchor="middle" fontFamily="Arial">DUS</text><path d="M36 42H44" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>';
        image_url: null;
        image_public_id: null;
      };
      facebook_url: "https://facebook.com/delightsch";
      twitter_url: "https://twitter.com/delightsch";
      instagram_url: "https://instagram.com/delightsch";
      linkedin_url: "https://linkedin.com/company/delightsch";
      is_active: true;
      classes: [
        "JSS 1",
        "JSS 2",
        "JSS 3",
        "SSS 1",
        "SSS 1 Science",
        "SSS 1 Arts/Commercial",
        "SSS 2",
        "SSS 2 Science",
        "SSS 2 Arts/Commercial",
        "SSS 3",
        "SSS 3 Science",
        "SSS 3 Arts/Commercial",
      ];
      subjects: [];
      status: "active";
      creator: {
        id: "01kady0hdh5kp5r94y0d9w89q1";
        creator_id: null;
        updated_by_id: null;
        school_id: null;
        username: "admin";
        first_name: "Admin";
        last_name: "User";
        middle_name: null;
        email: "admin@example.com";
        date_of_birth: null;
        gender: "other";
        status: "active";
        is_active: true;
        is_staff: true;
        is_superuser: true;
        role: "admin";
        phone_number: null;
        residential_address: null;
        profile_image_url: null;
        profile_image_public_id: null;
        language_preference: "en";
        theme: "light";
        api_usage: 0;
        model_preferences: [];
        training_data: [];
        personalization_settings: {};
        two_factor_enabled: false;
        data_sharing_consent: true;
        groups: [];
        user_permissions: [];
        ip_address: null;
        last_login_ip: null;
        permissions: [];
        date_joined: "2025-11-19T11:29:17.745470Z";
        updated_at: "2025-11-19T11:29:17.745470Z";
      };
      updated_by: null;
      created_at: "2025-11-19T11:29:28.544987Z";
      updated_at: "2025-11-19T11:29:28.546024Z";
    };
    primary_contact: null;
    emergency_contact: null;
    attachments: [];
    notes: [
      {
        id: "01kaeez41n1margatdrnctkfgd";
        creator_id: "01kady0hdh5kp5r94y0d9w89q1";
        updated_by_id: "01kady0hdh5kp5r94y0d9w89q1";
        school_id: "01kady0vz0zvwfnrk72pyvbfdb";
        user_id: "01kady0vvypj9a5ztr191ad6mh";
        title: "Test Note Title Updated";
        description: "Test Note Content Updated";
        type: "custom";
        users_favorite: null;
        status: "inactive";
        is_deleted: false;
        creator: {
          id: "01kady0hdh5kp5r94y0d9w89q1";
          creator_id: null;
          updated_by_id: null;
          school_id: null;
          username: "admin";
          first_name: "Admin";
          last_name: "User";
          middle_name: null;
          email: "admin@example.com";
          date_of_birth: null;
          gender: "other";
          status: "active";
          is_active: true;
          is_staff: true;
          is_superuser: true;
          role: "admin";
          phone_number: null;
          residential_address: null;
          profile_image_url: null;
          profile_image_public_id: null;
          language_preference: "en";
          theme: "light";
          api_usage: 0;
          model_preferences: [];
          training_data: [];
          personalization_settings: {};
          two_factor_enabled: false;
          data_sharing_consent: true;
          groups: [];
          user_permissions: [];
          ip_address: null;
          last_login_ip: null;
          permissions: [];
          date_joined: "2025-11-19T11:29:17.745470Z";
          updated_at: "2025-11-19T11:29:17.745470Z";
        };
        updated_by: {
          id: "01kady0hdh5kp5r94y0d9w89q1";
          creator_id: null;
          updated_by_id: null;
          school_id: null;
          username: "admin";
          first_name: "Admin";
          last_name: "User";
          middle_name: null;
          email: "admin@example.com";
          date_of_birth: null;
          gender: "other";
          status: "active";
          is_active: true;
          is_staff: true;
          is_superuser: true;
          role: "admin";
          phone_number: null;
          residential_address: null;
          profile_image_url: null;
          profile_image_public_id: null;
          language_preference: "en";
          theme: "light";
          api_usage: 0;
          model_preferences: [];
          training_data: [];
          personalization_settings: {};
          two_factor_enabled: false;
          data_sharing_consent: true;
          groups: [];
          user_permissions: [];
          ip_address: null;
          last_login_ip: null;
          permissions: [];
          date_joined: "2025-11-19T11:29:17.745470Z";
          updated_at: "2025-11-19T11:29:17.745470Z";
        };
        school: {
          id: "01kady0vz0zvwfnrk72pyvbfdb";
          creator_id: "01kady0hdh5kp5r94y0d9w89q1";
          updated_by_id: null;
          name: "Delight Universal School";
          address: "123 Education Street, City, Country";
          motto: "Knowledge is Wealth";
          type: "secondary";
          phone: "+2348168766556";
          email: "info@delightsch.com";
          website: "https://delightsch.com";
          term: {
            name: "first-term";
            session: "2022/2023";
            end_date: "2024-04-30";
            start_date: "2024-01-08";
          };
          bank: {};
          score: {
            ca: 30;
            exam: 70;
            total: 100;
          };
          discount: null;
          established_date: "2022-01-14";
          accreditation_number: "ACC423488";
          license_number: "LIC789012";
          student_capacity: 1000;
          current_enrollment: 750;
          subscription: {
            status: "active";
            end_date: "2026-03-19";
            start_date: "2025-11-19T12:29:28.542327";
            subscription_id: "01kady0vy96eq4rdx8d080xp79";
          };
          color: {
            accent: "#ff4081";
            primary: "#1a237e";
            tertiary: "#2196f3";
            secondary: "#0d47a1";
          };
          logo: {
            svg: '<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="80" rx="16" fill="#1a237e"/><path d="M20 15H60C62 15 64 17 64 19V31C64 33 62 35 60 35H20V15Z" fill="#2196f3"/><path d="M20 35H60L40 50L20 35Z" fill="#ff4081"/><path d="M25 55H55C57 55 59 57 59 59V61C59 63 57 65 55 65H25C23 65 21 63 21 61V59C21 57 23 55 25 55Z" fill="#2196f3"/><text x="40" y="28" fill="white" fontSize="12" textAnchor="middle" fontFamily="Arial">DUS</text><path d="M36 42H44" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>';
            image_url: null;
            image_public_id: null;
          };
          facebook_url: "https://facebook.com/delightsch";
          twitter_url: "https://twitter.com/delightsch";
          instagram_url: "https://instagram.com/delightsch";
          linkedin_url: "https://linkedin.com/company/delightsch";
          is_active: true;
          classes: [
            "JSS 1",
            "JSS 2",
            "JSS 3",
            "SSS 1",
            "SSS 1 Science",
            "SSS 1 Arts/Commercial",
            "SSS 2",
            "SSS 2 Science",
            "SSS 2 Arts/Commercial",
            "SSS 3",
            "SSS 3 Science",
            "SSS 3 Arts/Commercial",
          ];
          subjects: [];
          status: "active";
          created_at: "2025-11-19T11:29:28.544987Z";
          updated_at: "2025-11-19T11:29:28.546024Z";
        };
        user: {
          id: "01kady0vvypj9a5ztr191ad6mh";
          creator_id: "01kady0hdh5kp5r94y0d9w89q1";
          updated_by_id: null;
          school_id: null;
          username: "emilystaff";
          first_name: "Emily";
          last_name: "Warden";
          middle_name: null;
          email: "emilystaff@test.com";
          date_of_birth: null;
          gender: "female";
          status: "active";
          is_active: true;
          is_staff: false;
          is_superuser: false;
          role: "staff";
          phone_number: null;
          residential_address: null;
          profile_image_url: null;
          profile_image_public_id: null;
          language_preference: "en";
          theme: "light";
          api_usage: 0;
          model_preferences: [];
          training_data: [];
          personalization_settings: {};
          two_factor_enabled: false;
          data_sharing_consent: true;
          groups: [];
          user_permissions: [];
          ip_address: null;
          last_login_ip: null;
          permissions: [];
          date_joined: "2025-11-19T11:29:28.446537Z";
          updated_at: "2025-11-19T11:29:28.446537Z";
        };
        users_favorite_details: [];
        created_at: "2025-11-19T16:25:37.077574Z";
        updated_at: "2025-11-19T17:40:29.432468Z";
        deleted_at: null;
      },
    ];
    created_at: "2025-11-19T11:29:28.695045Z";
    updated_at: "2025-11-19T11:29:28.695045Z";
    deleted_at: null;
  };
  leave_policy: {
    id: "01kbckzgym3atws0cfxj1n6w9n";
    creator_id: "01kady0hdh5kp5r94y0d9w89q1";
    updated_by_id: "01kady0hdh5kp5r94y0d9w89q1";
    school_id: "01kady0vz0zvwfnrk72pyvbfdb";
    name: "Test Name Updated";
    applicable_staff: "Test Applicable Staff Updated";
    applicable_staffs: ["01kaphp565xbxb5vtdrm2js2ps"];
    max_days: 11;
    accrual_period: "Test Accrual Period Updated";
    minimum_notice: 6;
    effective_date: "2025-12-02";
    status: "assignment";
    created_at: "2025-12-01T09:30:26.132152Z";
    updated_at: "2025-12-01T09:31:43.106417Z";
  };
  attachments: [];
  created_at: "2025-11-23T22:34:45.062563Z";
  updated_at: "2025-12-01T09:36:36.332444Z";
  deleted_at: null;
}

export interface Supervisor {}
