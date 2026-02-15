/** Re-exports shared API hooks (same baseApi cache across dashboards). */

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

export {
  useGetGradesQuery,
  useGetGradeByIdQuery,
  useCreateGradeMutation,
  useUpdateGradeMutation,
  useDeleteGradeMutation,
} from "./grades/grades";

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

export { useGetNoticesQuery, useGetNoticeByIdQuery } from "./notices/notices";
export type {
  Notice,
  NoticesListResponse,
  NoticesQueryParams,
} from "./notices/notice-types";

// Calendar Events - Used in: Admin, Teacher, Parent, Student dashboards
export {
  useGetCalendarEventsQuery,
  useGetCalendarEventByIdQuery,
} from "./calendar/calendar";
export type {
  CalendarEvent,
  CalendarEventsListResponse,
  CalendarEventsQueryParams,
} from "./calendar/calendar-type";

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

export {
  useGetNotificationsQuery,
  useGetNotificationByIdQuery,
  useCreateNotificationMutation,
  useUpdateNotificationMutation,
  useDeleteNotificationMutation,
  useMarkNotificationReadMutation,
} from "./notifications/notification";

export type {
  Notifications,
  NotificationsListResponse,
  CreateNotifications,
  UpdateNotifications,
} from "./notifications/notification-types";

// Canteen - Products & Orders (used by canteen dashboard)
export {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "./products/products";

export type { Product, ProductsQueryParams } from "./products/products-type";

export {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} from "./orders/orders";

export type {
  Order,
  CreateOrderRequest,
  OrderItems,
  OrdersQueryParams,
} from "./orders/orders-type";
