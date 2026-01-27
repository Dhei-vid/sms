/**
 * Shared Data Exports
 * 
 * This file re-exports commonly used API hooks that are shared across multiple dashboards.
 * Since all services use the same baseApi, data fetched in one dashboard is automatically
 * cached and available in other dashboards without refetching.
 * 
 * Shared Data Strategy:
 * - All services inject endpoints into the same baseApi instance
 * - RTK Query automatically caches responses across the entire app
 * - When data is fetched in admin dashboard, it's immediately available in parent/teacher dashboards
 * - Tag-based invalidation ensures cache stays fresh when mutations occur
 * 
 * Usage Example:
 * ```tsx
 * // In admin dashboard
 * const { data: students } = useGetStudentsQuery();
 * 
 * // In parent dashboard (same query params)
 * const { data: students } = useGetStudentsQuery(); // Uses cached data, no refetch
 * 
 * // Student viewing their own data
 * const { data: student } = useGetStudentByIdQuery(studentId);
 * 
 * // Admin viewing the same student
 * const { data: student } = useGetStudentByIdQuery(studentId); // Uses cached data, no refetch
 * ```
 * 
 * Important: When a student views their dashboard, their student data is fetched via
 * `useGetStudentByIdQuery`. This data is then cached and available across all dashboards.
 * When admin/parent/teacher views that same student's profile, they get the cached data
 * without making another API call.
 * 
 * Note: Students, parents, and teachers are all variations of the users endpoint.
 * Students use: /users?_all&role[eq]=student
 * Parents use: /users?_all&role[eq]=parent  
 * Teachers use: /users?_all&role[eq]=teacher
 */

// Students - Used in: Admin, Parent, Teacher dashboards
// Uses /users endpoint with role[eq]=student filter
export {
  useGetStudentsQuery,
  useGetStudentByIdQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} from "./students/students";

export type {
  Student,
  StudentsListResponse,
  StudentsQueryParams,
  CreateStudentRequest,
  UpdateStudentRequest,
} from "./students/students-type";

// Classes - Used in: Admin, Teacher, Parent dashboards
export {
  useGetClassesQuery,
  useGetClassByIdQuery,
  useCreateClassMutation,
  useUpdateClassMutation,
  useDeleteClassMutation,
} from "./classes/classes";

export type {
  Class,
  ClassesListResponse,
  ClassesQueryParams,
  CreateClassRequest,
  UpdateClassRequest,
} from "./classes/classes-type";

// Courses - Used in: Admin, Teacher, Student, Parent dashboards
export {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} from "./courses/courses";

export type {
  Course,
  // CoursesListResponse,
  // CoursesQueryParams,
  CreateCourseRequest,
  UpdateCourseRequest,
} from "./courses/courses-type";

// Attendance - Used in: Admin, Teacher, Parent dashboards
// export {
//   useGetAttendanceQuery,
//   useGetAttendanceByIdQuery,
//   useCreateAttendanceMutation,
//   useBulkCreateAttendanceMutation,
//   useUpdateAttendanceMutation,
//   useDeleteAttendanceMutation,
// } from "./attendance/attendance";

// export type {
//   Attendance,
//   AttendanceListResponse,
//   AttendanceQueryParams,
//   CreateAttendanceRequest,
//   BulkAttendanceRequest,
// } from "./attendance/attendance-type";

// Grades - Used in: Admin, Teacher, Student, Parent dashboards
export {
  useGetGradesQuery,
  useGetGradeByIdQuery,
  useCreateGradeMutation,
  useUpdateGradeMutation,
  useDeleteGradeMutation,
} from "./grades/grades";

// export type {
//   Grade,
//   GradesListResponse,
//   GradesQueryParams,
//   CreateGradeRequest,
//   UpdateGradeRequest,
// } from "./grades/grades-type";

// Assignments - Used in: Teacher, Student, Parent dashboards
export {
  useGetAssignmentsQuery,
  useGetAssignmentByIdQuery,
  useCreateAssignmentMutation,
  useUpdateAssignmentMutation,
  useDeleteAssignmentMutation,
} from "./assignments/assignments";

export type {
  Assignment,
  // AssignmentsListResponse,
  // AssignmentsQueryParams,
  CreateAssignmentRequest,
  UpdateAssignmentRequest,
} from "./assignments/assignments-type";

// Calendar Events - Used in: Admin, Teacher, Parent dashboards
// export {
//   useGetCalendarEventsQuery,
//   useGetCalendarEventByIdQuery,
//   useCreateCalendarEventMutation,
//   useUpdateCalendarEventMutation,
//   useDeleteCalendarEventMutation,
// } from "./calendar/calendar";

// export type {
//   CalendarEvent,
//   // CalendarEventsListResponse,
//   // CalendarEventsQueryParams,
//   CreateCalendarEventRequest,
//   UpdateCalendarEventRequest,
// } from "./calendar/calendar-type";

// Messages - Used in: Admin, Teacher, Parent, Student dashboards
export {
  useGetMessagesQuery,
  useGetMessageByIdQuery,
  useCreateMessageMutation,
  useMarkAsReadMutation,
  useDeleteMessageMutation,
} from "./messages/messages";

export type {
  Message,
  // MessagesListResponse,
  // MessagesQueryParams,
  CreateMessageRequest,
} from "./messages/messages-type";

// Notifications - Used in: Admin, Teacher, Parent, Student dashboards
export {
  useGetNotificationsQuery,
  useGetNotificationByIdQuery,
  useCreateNotificationMutation,
  useUpdateNotificationMutation,
  useDeleteNotificationMutation,
} from "./notifications/notification";

export type {
  Notifications,
  NotificationsListResponse,
  CreateNotifications,
  UpdateNotifications,
} from "./notifications/notification-types";

// Timetable - Used in: Admin, Teacher, Student, Parent dashboards
// export {
//   useGetTimetableQuery,
//   useGetTimetableByIdQuery,
//   useCreateTimetableEntryMutation,
//   useUpdateTimetableEntryMutation,
//   useDeleteTimetableEntryMutation,
// } from "./timetable/timetable";

// export type {
//   TimetableEntry,
//   TimetableListResponse,
//   TimetableQueryParams,
//   CreateTimetableEntryRequest,
//   UpdateTimetableEntryRequest,
// } from "./timetable/timetable-type";


