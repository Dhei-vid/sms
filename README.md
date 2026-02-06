# PH-SMS (Penetralia Hub School Management System)

A comprehensive, modern School Management System built with Next.js 16, React 19, TypeScript, and Redux Toolkit. This application provides role-based dashboards for administrators, teachers, parents, and students, with full-featured modules for admissions, academics, finance, staff management, and more.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [State Management](#state-management)
- [Authentication](#authentication)
- [API Integration](#api-integration)
- [Responsive Design](#responsive-design)
- [Development Setup](#development-setup)
- [Key Patterns & Decisions](#key-patterns--decisions)
- [Contributing](#contributing)

## 🎯 Project Overview

PH-SMS is a full-featured school management system designed to streamline administrative tasks, academic operations, and communication between all stakeholders in an educational institution. The application features:

- **Multi-role Support**: Separate dashboards and functionalities for Admin, Teacher, Parent, and Student roles
- **Comprehensive Modules**: Admissions, Academics, Finance, Staff Management, Learning Management, and more
- **Modern UI/UX**: Built with Shadcn UI components and Tailwind CSS for a professional, responsive interface
- **Real-time Data**: Integrated with RTK Query for efficient API state management and caching
- **Type Safety**: Full TypeScript implementation for robust code quality

## ✨ Features

### Admin Dashboard

- **Admissions Management**: Application tracking, status management, interview scheduling, and applicant details
- **Student Management**: Student profiles, attendance tracking, report generation, and school files
- **Staff Management**: Staff profiles, applicant tracking, leave management, resource logging, and compliance
- **Academic Management**:
  - Assessment grading and final result approval
  - Curriculum management with lesson plan review
  - Timetable creation and exam scheduling
- **Finance Management**:
  - Daily operations and treasury overview with cash flow trends
  - Fee revenue management with bulk invoices and discount policies
  - Reporting and compliance
- **CBT Management**: Test session monitoring, question bank management, and exam creation
- **Learning Management**: Content library, course structure, and teacher activity tracking
- **Settings**: Application configuration and role management

### Teacher Dashboard

- **My Courses**: Course management with student enrollment
- **Question Bank**: Create and manage questions for assessments
- **Grade Entry Portal**: Submit and manage student grades
- **My Class**: Class management and student overview
- **Leave Request Portal**: Submit and track leave requests
- **Calendar**: Schedule management
- **Messages**: Communication with students and parents
- **Notice Board**: View announcements
- **My Wallet**: Financial transactions

### Parent Dashboard

- **Dashboard**: Overview of children's academic progress
- **Grades & Report Card**: View children's academic performance
- **Fee Payment Management**: View invoices, make payments, and track payment history
- **Fee Request Portal**: Request fee-related services
- **Timetable**: View children's class schedules
- **Messages**: Communication with teachers
- **Notice Board**: View school announcements
- **Wallet**: Manage wallet balance and transactions

### Student Dashboard

- **Dashboard**: Personal academic overview
- **My Courses**: Enrolled courses and course details
- **Assignments & Quizzes**: View and submit assignments
- **My Grades**: View academic performance
- **Timetable**: Class schedule
- **Personal Task Manager**: Manage personal tasks
- **Notice Board**: View announcements
- **My Wallet**: Manage wallet balance

### Canteen Module

- **Store**: Browse and purchase items
- **Sales**: Sales management and tracking
- **Inventory**: Product inventory management
- **Notice**: Canteen announcements
- **Settings**: Canteen configuration

## 🛠 Tech Stack

### Core Technologies

- **Framework**: Next.js 16.0.5 (App Router)
- **UI Library**: React 19.2.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **State Management**: Redux Toolkit 2.11.2 with RTK Query

### UI Components

- **Shadcn UI**: Component library built on Radix UI primitives
- **Radix UI**: Accessible component primitives (Dialog, Dropdown, Select, etc.)
- **Lucide React**: Icon library
- **HugeIcons**: Additional icon set (@hugeicons/react)

### Data Visualization

- **Recharts**: Professional charting library for data visualization
- **React Big Calendar**: Calendar component for scheduling

### Utilities

- **date-fns**: Date manipulation and formatting
- **currency.js**: Currency formatting
- **class-variance-authority**: Component variant management
- **clsx & tailwind-merge**: Conditional class name utilities

### Development Tools

- **ESLint**: Code linting
- **TypeScript**: Type checking
- **PostCSS**: CSS processing

## 📁 Project Structure

```
sms-frontend/
├── app/                          # Next.js App Router pages
│   ├── (auth)/                   # Authentication routes
│   │   ├── signin/
│   │   └── forgot-password/
│   ├── (dashboard)/              # Protected dashboard routes
│   │   ├── admin/                # Admin-specific pages
│   │   ├── teacher/              # Teacher-specific pages
│   │   ├── parent/               # Parent-specific pages
│   │   ├── student/              # Student-specific pages
│   │   └── canteen/              # Canteen module pages
│   ├── layout.tsx                # Root layout
│   ├── providers.tsx             # Redux provider
│   └── globals.css               # Global styles
├── components/
│   ├── dashboard/                # Dashboard layout components
│   │   ├── header.tsx            # Dashboard header with search
│   │   └── sidebar.tsx           # Collapsible sidebar navigation
│   ├── dashboard-pages/          # Page-specific components
│   │   ├── admin/                # Admin page components
│   │   ├── teacher/              # Teacher page components
│   │   ├── parent/               # Parent page components
│   │   └── student/              # Student page components
│   ├── ui/                       # Reusable UI components
│   │   ├── data-table.tsx        # Reusable data table component
│   │   ├── activity-item.tsx     # Activity feed item component
│   │   ├── modal-container.tsx   # Modal wrapper component
│   │   ├── date-picker.tsx       # Date picker component
│   │   └── ...                   # Other Shadcn UI components
│   └── general/                  # General utility components
├── store/                        # Redux store configuration
│   ├── index.ts                  # Store setup and configuration
│   ├── errorSlice.ts             # Global error state management
│   ├── slices/
│   │   └── authSlice.ts          # Authentication state management
│   └── hooks.ts                  # Typed Redux hooks
├── services/                     # API service definitions
│   ├── baseApi.ts                # RTK Query base API configuration
│   ├── auth.ts                   # Authentication API endpoints
│   ├── teacherCourses.ts         # Teacher courses API
│   ├── teacherQuestions.ts       # Question bank API
│   └── canteen.ts                # Canteen API
├── hooks/                        # Custom React hooks
│   └── use-pagination.ts         # Pagination hook for tables
├── common/                       # Shared utilities and data
│   ├── menu-items.tsx            # Navigation menu configuration
│   ├── types.ts                  # Shared TypeScript types
│   ├── enum.ts                   # Enumerations
│   └── helper.ts                 # Helper functions
├── lib/                          # Library utilities
│   ├── utils.ts                  # Utility functions (cn, etc.)
│   └── types.ts                  # Type definitions
└── public/                       # Static assets
    ├── logo/                     # Application logos
    └── canteen/                  # Canteen product images
```

## 🧩 Key Components

### DataTable Component

A reusable, feature-rich data table component used throughout the application:

- Column-based configuration
- Sorting and filtering capabilities
- Row selection with checkboxes
- Action column support
- Empty state handling
- Loading states
- Responsive design

**Location**: `components/ui/data-table.tsx`

### Sidebar Component

Collapsible navigation sidebar with:

- Role-based menu filtering
- Collapsible/expandable state (desktop)
- Mobile sheet integration
- Active route highlighting
- Nested menu items with expand/collapse
- Responsive design for mobile and desktop

**Location**: `components/dashboard/sidebar.tsx`

### Header Component

Dashboard header with:

- Dynamic page title and icon
- Global search functionality
- User profile dropdown with logout
- Mobile menu toggle
- Responsive layout with wrapping on mobile

**Location**: `components/dashboard/header.tsx`

### ActivityItem Component

Reusable activity feed item component:

- Icon support with customizable background
- Title and description
- Timestamp display
- Map-based rendering pattern

**Location**: `components/ui/activity-item.tsx`

### ModalContainer Component

Consistent modal wrapper:

- Standardized modal structure
- Header, body, and footer sections
- Consistent styling and behavior

**Location**: `components/ui/modal-container.tsx`

## 🔄 State Management

### Redux Store Structure

The application uses Redux Toolkit with the following slices:

#### Auth Slice (`store/slices/authSlice.ts`)

Manages authentication state:

- `token`: JWT authentication token
- `user`: Current authenticated user information
- `isAuthenticated`: Boolean flag for quick auth checks
- **Persistence**: Auth state is persisted to `localStorage` for session persistence
- **Actions**: `setCredentials`, `logout`, `updateUser`

#### Error Slice (`store/errorSlice.ts`)

Global error state management:

- `lastError`: Most recent application error
- **Actions**: `setError`, `clearError`
- Integrated with API error handling

#### RTK Query API (`services/baseApi.ts`)

Base API configuration with:

- Automatic token attachment to requests
- Global error handling
- Base URL configuration
- Tag-based cache invalidation

### Typed Hooks

Custom typed hooks for Redux interaction:

- `useAppDispatch`: Typed dispatch function
- `useAppSelector`: Typed selector hook

**Location**: `store/hooks.ts`

## 🔐 Authentication

### Authentication Flow

1. **Login** (`app/(auth)/signin/page.tsx`):
   - User submits credentials
   - RTK Query mutation calls login endpoint
   - On success, credentials are stored in Redux (`setCredentials`)
   - Token and user data persisted to `localStorage`
   - User redirected to role-specific dashboard

2. **Route Protection** (`app/(dashboard)/layout.tsx`):
   - Client-side route protection using `useEffect`
   - Checks `isAuthenticated` from Redux state
   - Redirects unauthenticated users to `/signin`

3. **API Integration**:
   - Token automatically attached to all API requests via `prepareHeaders`
   - Token retrieved from Redux state in `baseApi.ts`

4. **Logout**:
   - Dispatches `logout` action to clear Redux state
   - Clears `localStorage` data
   - Redirects to sign-in page

### Authentication Services

**Location**: `services/auth.ts`

- `login`: Login mutation
- `getProfile`: Get user profile query

## 🌐 API Integration

### Base API Configuration

**Location**: `services/baseApi.ts`

Features:

- **Base URL**: Configurable via `NEXT_PUBLIC_API_BASE_URL` environment variable
- **Token Attachment**: Automatically attaches Bearer token from Redux state
- **Error Handling**: Intercepts API errors and dispatches to error slice
- **Success Handling**: Clears errors on successful requests

### API Services

#### Teacher Courses (`services/teacherCourses.ts`)

- `getTeacherCourses`: Fetch teacher's courses
- `getTeacherCourseById`: Fetch specific course details

#### Question Bank (`services/teacherQuestions.ts`)

- `getTeacherQuestions`: Fetch teacher's questions
- `createQuestion`: Create new question
- `updateQuestion`: Update existing question
- `deleteQuestion`: Delete question

#### Canteen (`services/canteen.ts`)

- Canteen product management endpoints

### RTK Query Features

- **Automatic Caching**: Query results are cached automatically
- **Tag-based Invalidation**: Cache invalidation using tags
- **Refetch on Focus**: Automatically refetches data when window regains focus
- **Refetch on Reconnect**: Refetches data when network reconnects

## 📱 Responsive Design

### Mobile-First Approach

The application is fully responsive with mobile-first design principles:

#### Sidebar

- **Desktop**: Collapsible sidebar with toggle button (64px collapsed, 256px expanded)
- **Mobile**: Hidden by default, accessible via Sheet component (Shadcn UI)
- **Menu Button**: Mobile menu button in header opens sidebar sheet

#### Header

- **Desktop**: Fixed grid layout with 6 columns
- **Mobile**: Flexible wrapping layout allowing items to wrap to new lines
- **Search Bar**: Full width on mobile, spans 4 columns on desktop
- **User Info**: Wraps to new line on mobile if needed

#### Tables

- Responsive data tables with horizontal scrolling on mobile
- Pagination with "Load More" functionality for better mobile UX

#### Components

- All UI components are responsive
- Touch-friendly button sizes on mobile
- Adjusted font sizes for mobile (`text-xs` for nested items)

### Breakpoints

- **Mobile**: Default (< 1024px)
- **Desktop**: `lg:` prefix (≥ 1024px)

## 🚀 Development Setup

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm/yarn

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd sms-frontend
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_API_BASE_URL=https://api.example.com/api
   ```

4. **Run the development server**:

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm start`: Start production server
- `pnpm lint`: Run ESLint

## 🎨 Key Patterns & Decisions

### Component Architecture

1. **Reusable Components**: Emphasis on creating reusable UI components (DataTable, ActivityItem, etc.)
2. **Separation of Concerns**: Clear separation between:
   - Layout components (`dashboard/`)
   - Page-specific components (`dashboard-pages/`)
   - Reusable UI components (`ui/`)
3. **Map-based Rendering**: Consistent use of `.map()` for rendering lists (ActivityItem, QuickActionCard)

### State Management Patterns

1. **Redux for Global State**: Authentication and error state managed globally
2. **RTK Query for API**: All API calls use RTK Query for caching and state management
3. **Local State for UI**: Component-specific UI state uses React `useState`
4. **Pagination Hook**: Reusable `usePagination` hook for table pagination

### Type Safety

1. **Full TypeScript**: Entire codebase is typed
2. **Interface Definitions**: Clear interfaces for all data structures
3. **Type Guards**: Used where necessary for runtime type checking
4. **Typed Redux Hooks**: Custom typed hooks for Redux interaction

### Code Organization

1. **Feature-based Structure**: Components organized by feature/role
2. **Shared Utilities**: Common utilities in `common/` and `lib/`
3. **Service Layer**: API services separated from components
4. **Hooks**: Custom hooks in dedicated `hooks/` directory

### Error Handling

1. **Global Error State**: Centralized error management via Redux
2. **API Error Interception**: Automatic error handling in base API
3. **User-friendly Messages**: Error messages displayed to users
4. **Error Clearing**: Errors automatically cleared on successful requests

### Responsive Design Patterns

1. **Mobile-first CSS**: Base styles for mobile, desktop enhancements with `lg:` prefix
2. **Conditional Rendering**: Different components/structures for mobile vs desktop
3. **Flexible Layouts**: Use of flexbox with wrapping for mobile
4. **Touch-friendly**: Appropriate touch target sizes for mobile

## 📊 Data Visualization

### Charts Implementation

The application uses **Recharts** for professional data visualization:

#### Cash Flow Trend Chart

- **Location**: `app/(dashboard)/admin/finance/daily-operations-treasury/page.tsx`
- **Features**:
  - Dual-bar comparison (Income vs Expenses)
  - Grid lines matching Grade Distribution chart
  - Custom tooltips with net calculation
  - Dynamic time range (Weekly, Monthly, Yearly)
  - Currency formatting
  - Responsive design

#### Grade Distribution Chart

- Bar chart with grid lines
- Used in admin dashboard

### Chart Configuration

- **ChartContainer**: Wrapper component from Shadcn UI
- **ChartConfig**: Color configuration for chart elements
- **ResponsiveContainer**: Ensures charts are responsive

## 🔧 Custom Hooks

### usePagination Hook

**Location**: `hooks/use-pagination.ts`

A reusable hook for implementing "Load More" pagination:

```typescript
const { displayedData, hasMore, loadMore, reset, totalItems, displayedCount } =
  usePagination({
    data: allPayments,
    initialItemsPerPage: 3,
    itemsPerPage: 3,
  });
```

**Features**:

- Initial items display
- Load more functionality
- Reset capability
- Total and displayed count tracking

## 🎯 Future Improvements

### Potential Enhancements

1. **Real-time Features**:
   - WebSocket integration for real-time notifications
   - Live chat functionality
   - Real-time attendance tracking

2. **Performance Optimizations**:
   - Code splitting for route-based chunks
   - Image optimization
   - Lazy loading for heavy components

3. **Testing**:
   - Unit tests for components
   - Integration tests for API services
   - E2E tests for critical flows

4. **Accessibility**:
   - Enhanced ARIA labels
   - Keyboard navigation improvements
   - Screen reader optimization

5. **Internationalization**:
   - Multi-language support
   - Locale-based date/number formatting

6. **Advanced Features**:
   - File upload with progress tracking
   - Export functionality (PDF, Excel)
   - Advanced filtering and search
   - Bulk operations

## 🤝 Contributing

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent naming conventions
- Add JSDoc comments for complex functions
- Keep components focused and reusable

### Commit Messages

Use clear, descriptive commit messages following conventional commits format.

### Pull Requests

1. Create a feature branch
2. Make your changes
3. Ensure code passes linting
4. Submit a pull request with a clear description

## 📝 License

[Add your license information here]

## 👥 Authors

[Add author information here]

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Shadcn UI](https://ui.shadcn.com/) - Component library
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [Recharts](https://recharts.org/) - Charting library
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework

---

**Last Updated**: [Current Date]
**Version**: 0.1.0
