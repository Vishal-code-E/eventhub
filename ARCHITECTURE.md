# Event Hub - Complete System Architecture

## 📋 Table of Contents
1. [System Overview](#system-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture Layers](#architecture-layers)
4. [Database Design](#database-design)
5. [Authentication System](#authentication-system)
6. [API Architecture](#api-architecture)
7. [Frontend Architecture](#frontend-architecture)
8. [Role-Based Access Control](#role-based-access-control)
9. [Data Flow Diagrams](#data-flow-diagrams)
10. [Deployment Architecture](#deployment-architecture)

---

## 🎯 System Overview

**Event Hub** is a college-exclusive event management platform that enables students to discover, register for, and manage campus events. The system enforces role-based access control with three distinct user roles: STUDENT, COORDINATOR (Club Lead), and ADMIN.

### Core Features
- 🔐 Google OAuth authentication with email domain validation
- 📅 Event discovery and registration
- 🎭 Club management and event creation
- 🖼️ Event gallery and media management
- 🔔 Real-time notifications
- 📊 Student dashboard with registration tracking
- 👥 Club lead dashboard for event management
- ⚙️ Admin panel for system-wide control

---

## 💻 Technology Stack

### Frontend
```
Next.js 15 (App Router)
├── React 18 (Server & Client Components)
├── TypeScript
├── Tailwind CSS
├── Motion/Framer Motion (Animations)
├── Aceternity UI Components
└── Shadcn/ui Components
```

### Backend
```
Next.js API Routes
├── NextAuth.js (Authentication)
├── Prisma ORM (Database)
└── PostgreSQL (Database)
```

### Infrastructure
```
Deployment
├── Vercel (Hosting)
├── PostgreSQL (Database - Neon/Supabase)
└── Resend (Email Service)
```

---

## 🏗️ Architecture Layers

```
┌─────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                      │
│  ┌────────────┬────────────┬────────────┬────────────┐     │
│  │   Public   │  Student   │ Club Lead  │   Admin    │     │
│  │   Pages    │ Dashboard  │ Dashboard  │   Panel    │     │
│  └────────────┴────────────┴────────────┴────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    MIDDLEWARE LAYER                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  • Authentication Check                              │   │
│  │  • Profile Completion Verification                   │   │
│  │  • Role-Based Route Protection                       │   │
│  │  • Session Management                                │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   APPLICATION LAYER                         │
│  ┌────────────┬────────────┬────────────┬────────────┐     │
│  │   Auth     │   Events   │   Clubs    │  Gallery   │     │
│  │   Logic    │   Logic    │   Logic    │   Logic    │     │
│  └────────────┴────────────┴────────────┴────────────┘     │
│  ┌────────────┬────────────┬────────────┬────────────┐     │
│  │  Profile   │ Registration│Notification│   Email    │     │
│  │  Management│   Logic    │   Logic    │  Service   │     │
│  └────────────┴────────────┴────────────┴────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     DATA ACCESS LAYER                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Prisma ORM Client                       │   │
│  │  • Type-safe database queries                        │   │
│  │  • Migration management                              │   │
│  │  • Connection pooling                                │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE LAYER                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              PostgreSQL Database                     │   │
│  │  • User data                                         │   │
│  │  • Event information                                 │   │
│  │  • Club details                                      │   │
│  │  • Registrations & Notifications                     │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗄️ Database Design

### Entity Relationship Diagram

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│     User     │────┐    │     Club     │────┐    │    Event     │
├──────────────┤    │    ├──────────────┤    │    ├──────────────┤
│ id           │    │    │ id           │    │    │ id           │
│ email        │    └───▶│ coordinators │    └───▶│ club         │
│ firstName    │         │ name         │         │ title        │
│ lastName     │         │ description  │         │ description  │
│ phoneNumber  │         │ logoUrl      │         │ date         │
│ rollNumber   │         │ contact      │         │ location     │
│ role         │         │ socialLinks  │         │ posterUrl    │
│ isProfileComplete     └──────────────┘         └──────────────┘
│ clubId       │                │                        │
│ createdAt    │                │                        │
│ updatedAt    │                │                        │
└──────────────┘                │                        │
       │                        │                        │
       │                        │                        │
       ▼                        ▼                        ▼
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│ Registration │         │EventRegistra-│         │   Gallery    │
├──────────────┤         │    tion      │         ├──────────────┤
│ id           │         ├──────────────┤         │ id           │
│ userId       │────┐    │ id           │         │ imageUrl     │
│ eventId      │    │    │ userId       │         │ eventId      │
└──────────────┘    │    │ eventId      │         └──────────────┘
                    │    │ status       │
                    │    │ checkedInAt  │
                    │    │ createdAt    │
                    │    └──────────────┘
                    │
                    ▼
┌──────────────────────────────────────┐
│         Notification                 │
├──────────────────────────────────────┤
│ id                                   │
│ userId                               │
│ type (EVENT_REMINDER, UPDATE, etc.)  │
│ payload (JSON)                       │
│ read                                 │
│ createdAt                            │
└──────────────────────────────────────┘
```

### Database Schema (Prisma)

```prisma
model User {
  id                 String              @id @default(cuid())
  email              String              @unique
  firstName          String?
  lastName           String?
  name               String?
  phoneNumber        String?
  rollNumber         String?
  image              String?
  role               Role                @default(STUDENT)
  isProfileComplete  Boolean             @default(false)
  clubId             String?
  club               Club?               @relation(fields: [clubId], references: [id])
  registrations      Registration[]
  eventRegistrations EventRegistration[]
  notifications      Notification[]
  createdAt          DateTime            @default(now())
  updatedAt          DateTime            @updatedAt
}

model Club {
  id           String  @id @default(cuid())
  name         String
  description  String
  logoUrl      String?
  contact      String
  socialLinks  Json
  events       Event[]
  coordinators User[]
}

model Event {
  id                 String              @id @default(cuid())
  title              String
  description        String
  date               DateTime
  location           String
  posterUrl          String?
  clubId             String
  club               Club                @relation(fields: [clubId], references: [id])
  registrations      Registration[]
  eventRegistrations EventRegistration[]
  gallery            Gallery[]
}

model EventRegistration {
  id          String             @id @default(cuid())
  userId      String
  eventId     String
  status      RegistrationStatus @default(REGISTERED)
  checkedInAt DateTime?
  createdAt   DateTime           @default(now())
  user        User               @relation(fields: [userId], references: [id])
  event       Event              @relation(fields: [eventId], references: [id])
  @@unique([userId, eventId])
}

model Notification {
  id        String           @id @default(cuid())
  userId    String
  type      NotificationType
  payload   Json
  read      Boolean          @default(false)
  createdAt DateTime         @default(now())
  user      User             @relation(fields: [userId], references: [id])
}

enum Role {
  STUDENT
  COORDINATOR
  ADMIN
}

enum RegistrationStatus {
  REGISTERED
  CANCELLED
  ATTENDED
}

enum NotificationType {
  EVENT_REMINDER
  UPDATE
  ANNOUNCEMENT
}
```

---

## 🔐 Authentication System

### Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION FLOW                      │
└─────────────────────────────────────────────────────────────┘

Step 1: User Visits Protected Route
┌────────────┐
│   User     │──▶ Visits /events or /dashboard
└────────────┘
      │
      ▼
┌────────────────────────────────────────┐
│  Middleware (middleware.ts)            │
│  ✓ Check if authenticated              │
│  ✗ Not authenticated                   │
│  → Redirect to /signup                 │
└────────────────────────────────────────┘

Step 2: Google OAuth Sign-In
┌────────────┐
│   User     │──▶ Click "Sign in with Google"
└────────────┘
      │
      ▼
┌────────────────────────────────────────┐
│  NextAuth (route.ts)                   │
│  1. Redirect to Google OAuth           │
│  2. User authorizes app                │
│  3. Google returns user data           │
└────────────────────────────────────────┘
      │
      ▼
┌────────────────────────────────────────┐
│  Email Domain Validation               │
│  ✓ Check if email ends with            │
│    allowed college domains             │
│  ✗ Reject non-college emails           │
└────────────────────────────────────────┘
      │
      ▼
┌────────────────────────────────────────┐
│  Database User Creation                │
│  • Create user with basic info         │
│  • Set isProfileComplete = false       │
│  • Set default role = STUDENT          │
└────────────────────────────────────────┘

Step 3: Profile Completion
┌────────────┐
│   User     │──▶ Redirected to /signup/complete
└────────────┘
      │
      ▼
┌────────────────────────────────────────┐
│  Profile Completion Form               │
│  • First Name                          │
│  • Last Name                           │
│  • Phone Number                        │
│  • Roll Number                         │
└────────────────────────────────────────┘
      │
      ▼
┌────────────────────────────────────────┐
│  API: /api/profile/complete            │
│  • Validate all fields                 │
│  • Update user in database             │
│  • Set isProfileComplete = true        │
└────────────────────────────────────────┘
      │
      ▼
┌────────────────────────────────────────┐
│  Session Update                        │
│  • Refresh JWT token                   │
│  • Update session state                │
│  • Redirect to appropriate dashboard   │
└────────────────────────────────────────┘
```

### Session Management

```typescript
// JWT Token Structure
{
  id: string;              // User ID
  email: string;           // User email
  isProfileComplete: boolean;
  role: "STUDENT" | "COORDINATOR" | "ADMIN";
  exp: number;             // Expiration timestamp
  iat: number;             // Issued at timestamp
}

// Session Object (Client-side)
{
  user: {
    id: string;
    email: string;
    name: string;
    image: string;
    isProfileComplete: boolean;
    role: Role;
  };
  expires: string;
}
```

---

## 🔌 API Architecture

### API Route Structure

```
/api
├── auth/
│   └── [...nextauth]/
│       └── route.ts          # NextAuth configuration
│
├── profile/
│   └── complete/
│       └── route.ts          # Profile completion
│
├── events/
│   ├── route.ts              # GET all events, POST new event
│   └── [id]/
│       └── register/
│           └── route.ts      # POST register for event
│
├── clubs/
│   └── route.ts              # GET all clubs
│
├── gallery/
│   └── route.ts              # GET gallery images
│
├── notifications/
│   └── route.ts              # GET/POST notifications
│
└── club-lead/
    └── events/
        └── route.ts          # Club lead event management
```

### API Endpoints

#### Authentication
```
POST   /api/auth/signin              # Sign in with Google OAuth
POST   /api/auth/signout             # Sign out
GET    /api/auth/session             # Get current session
POST   /api/profile/complete         # Complete user profile
```

#### Events
```
GET    /api/events                   # List all events
POST   /api/events                   # Create event (COORDINATOR/ADMIN)
GET    /api/events/[id]              # Get event details
PUT    /api/events/[id]              # Update event (COORDINATOR/ADMIN)
DELETE /api/events/[id]              # Delete event (COORDINATOR/ADMIN)
POST   /api/events/[id]/register     # Register for event (STUDENT)
```

#### Clubs
```
GET    /api/clubs                    # List all clubs
POST   /api/clubs                    # Create club (ADMIN)
GET    /api/clubs/[id]               # Get club details
PUT    /api/clubs/[id]               # Update club (COORDINATOR/ADMIN)
```

#### Notifications
```
GET    /api/notifications            # Get user notifications
POST   /api/notifications            # Mark notifications as read
```

---

## 🎨 Frontend Architecture

### Component Hierarchy

```
App Root (layout.tsx)
├── AuthProvider
├── ThemeProvider
│   └── Navbar (Global)
│       ├── StaggeredMenu
│       └── NotificationBell
│
└── Page Routes
    ├── Public Pages
    │   ├── Home (/)
    │   │   ├── Hero (with Sparkles)
    │   │   ├── LogoMarquee
    │   │   ├── AboutSection
    │   │   └── Footer
    │   │
    │   ├── Events (/events)
    │   │   └── EventCard[]
    │   │
    │   ├── Clubs (/clubs)
    │   │   └── ClubCard[]
    │   │
    │   ├── Gallery (/gallery)
    │   │   └── DomeGallery
    │   │
    │   ├── About (/about)
    │   ├── Contact (/contact)
    │   │   └── ContactForm
    │   │
    │   └── Signup (/signup)
    │       └── Complete (/signup/complete)
    │
    ├── Student Pages (Protected: STUDENT role)
    │   └── Dashboard (/student/dashboard)
    │       └── RegistrationCard[]
    │
    ├── Club Lead Pages (Protected: COORDINATOR role)
    │   └── Events (/club-lead/events)
    │       ├── EventsList
    │       └── New Event (/club-lead/events/new)
    │
    └── Admin Pages (Protected: ADMIN role)
        └── Admin Dashboard (/admin/admind)
            ├── Events Management
            ├── Clubs Management
            └── Gallery Management
```

### Component Types

#### Server Components (Default)
```typescript
// Direct database access
// Better performance
// SEO friendly

Examples:
- app/events/page.tsx
- app/clubs/page.tsx
- app/student/dashboard/page.tsx
```

#### Client Components ('use client')
```typescript
// Interactive features
// Client-side state
// Browser APIs

Examples:
- components/Navbar.tsx
- components/NotificationBell.tsx
- components/EventDetailClient.tsx
- components/hero.tsx
```

---

## 🔒 Role-Based Access Control (RBAC)

### Role Hierarchy

```
┌──────────────────────────────────────────┐
│              ADMIN                       │
│  • Full system access                    │
│  • Manage all events                     │
│  • Manage all clubs                      │
│  • Manage all users                      │
│  • Access admin panel                    │
└──────────────────────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────────┐
│         COORDINATOR (Club Lead)          │
│  • Create/manage club events             │
│  • View event registrations              │
│  • Manage club information               │
│  • Upload to gallery                     │
│  • Access club-lead dashboard            │
└──────────────────────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────────┐
│             STUDENT                      │
│  • Browse events                         │
│  • Register for events                   │
│  • View clubs                            │
│  • View gallery                          │
│  • Receive notifications                 │
│  • Access student dashboard              │
└──────────────────────────────────────────┘
```

### Route Protection Matrix

| Route | STUDENT | COORDINATOR | ADMIN | Public |
|-------|---------|-------------|-------|--------|
| `/` | ✅ | ✅ | ✅ | ✅ |
| `/events` | ✅ | ✅ | ✅ | ✅ |
| `/clubs` | ✅ | ✅ | ✅ | ✅ |
| `/gallery` | ✅ | ✅ | ✅ | ✅ |
| `/about` | ✅ | ✅ | ✅ | ✅ |
| `/contact` | ✅ | ✅ | ✅ | ✅ |
| `/signup` | ✅ | ✅ | ✅ | ✅ |
| `/student/dashboard` | ✅ | ❌ | ❌ | ❌ |
| `/club-lead/*` | ❌ | ✅ | ✅ | ❌ |
| `/admin/*` | ❌ | ❌ | ✅ | ❌ |

### Middleware Protection Logic

```typescript
// middleware.ts
const PROTECTED_ROUTES = {
  '/student': ['STUDENT'],
  '/club-lead': ['COORDINATOR'],
  '/admin': ['ADMIN'],
};

// Check authentication
if (!token) redirect('/signup');

// Check profile completion
if (!token.isProfileComplete) redirect('/signup/complete');

// Check role authorization
const requiredRoles = getRequiredRole(pathname);
if (!requiredRoles.includes(userRole)) redirect('/403');
```

---

## 📊 Data Flow Diagrams

### Event Registration Flow

```
User Action                Frontend              API                Database
    │                         │                  │                     │
    │  Click "Register"        │                  │                     │
    ├─────────────────────────▶│                  │                     │
    │                         │                  │                     │
    │                         │  Check auth      │                     │
    │                         │  status          │                     │
    │                         │                  │                     │
    │                         │  POST /api/      │                     │
    │                         │  events/[id]/    │                     │
    │                         │  register        │                     │
    │                         ├─────────────────▶│                     │
    │                         │                  │  Verify user        │
    │                         │                  │  authenticated      │
    │                         │                  │                     │
    │                         │                  │  Check existing     │
    │                         │                  │  registration       │
    │                         │                  ├────────────────────▶│
    │                         │                  │                     │
    │                         │                  │◀────────────────────│
    │                         │                  │                     │
    │                         │                  │  Create             │
    │                         │                  │  EventRegistration  │
    │                         │                  ├────────────────────▶│
    │                         │                  │                     │
    │                         │                  │  Create             │
    │                         │                  │  Notification       │
    │                         │                  ├────────────────────▶│
    │                         │                  │                     │
    │                         │                  │  Send email         │
    │                         │                  │  (optional)         │
    │                         │                  │                     │
    │                         │                  │◀────────────────────│
    │                         │◀─────────────────│                     │
    │  Show success           │                  │                     │
    │  message                │                  │                     │
    │◀─────────────────────────│                  │                     │
    │                         │                  │                     │
    │  Update UI              │                  │                     │
    │  (button → "Registered")│                  │                     │
    │◀─────────────────────────│                  │                     │
```

### Notification System Flow

```
Trigger Event          Backend                 Database              Frontend
    │                     │                       │                      │
    │  Event Created      │                       │                      │
    ├────────────────────▶│                       │                      │
    │                     │  Find all users       │                      │
    │                     │  interested in        │                      │
    │                     │  this club            │                      │
    │                     ├──────────────────────▶│                      │
    │                     │                       │                      │
    │                     │◀──────────────────────│                      │
    │                     │  User list            │                      │
    │                     │                       │                      │
    │                     │  Create               │                      │
    │                     │  notifications        │                      │
    │                     │  for each user        │                      │
    │                     ├──────────────────────▶│                      │
    │                     │                       │                      │
    │                     │                       │                      │
    │                     │                       │  User opens app      │
    │                     │                       │◀─────────────────────│
    │                     │                       │                      │
    │                     │  GET /api/            │                      │
    │                     │  notifications        │                      │
    │                     │◀──────────────────────┼──────────────────────│
    │                     │                       │                      │
    │                     │  Fetch unread         │                      │
    │                     │  notifications        │                      │
    │                     ├──────────────────────▶│                      │
    │                     │                       │                      │
    │                     │◀──────────────────────│                      │
    │                     │                       │                      │
    │                     │  Return               │                      │
    │                     │  notifications +      │                      │
    │                     │  unread count         │                      │
    │                     ├──────────────────────────────────────────────▶│
    │                     │                       │                      │
    │                     │                       │  Display bell        │
    │                     │                       │  with badge          │
```

---

## 🚀 Deployment Architecture

### Production Infrastructure

```
┌─────────────────────────────────────────────────────────────┐
│                         USERS                               │
│                     (Web Browsers)                          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTPS
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    VERCEL EDGE NETWORK                      │
│  • Global CDN                                               │
│  • SSL/TLS termination                                      │
│  • DDoS protection                                          │
│  • Automatic scaling                                        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  NEXT.JS APPLICATION                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Next.js 15 Server                                   │   │
│  │  • Server-Side Rendering (SSR)                       │   │
│  │  • API Routes                                        │   │
│  │  • Middleware                                        │   │
│  │  • Static Generation                                 │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
┌──────────────┐  ┌─────────────┐  ┌──────────────┐
│ PostgreSQL   │  │   Google    │  │   Resend     │
│  Database    │  │   OAuth     │  │    Email     │
│              │  │             │  │   Service    │
│ (Neon/       │  │  Authentication  │            │
│  Supabase)   │  │             │  │              │
└──────────────┘  └─────────────┘  └──────────────┘
```

### Environment Configuration

```bash
# Production Environment Variables
NEXTAUTH_SECRET=xxxxx           # Strong random string
NEXTAUTH_URL=https://domain.com # Production URL
GOOGLE_CLIENT_ID=xxxxx
GOOGLE_CLIENT_SECRET=xxxxx
DATABASE_URL=postgresql://...   # Production database
RESEND_API_KEY=xxxxx           # Optional
EMAIL_FROM=noreply@domain.com  # Optional
```

### Deployment Workflow

```
Developer           GitHub              Vercel              Production
    │                  │                   │                     │
    │  git push        │                   │                     │
    ├─────────────────▶│                   │                     │
    │                  │  Webhook trigger  │                     │
    │                  ├──────────────────▶│                     │
    │                  │                   │                     │
    │                  │                   │  Build & Deploy     │
    │                  │                   │  1. Install deps    │
    │                  │                   │  2. Run build       │
    │                  │                   │  3. Run migrations  │
    │                  │                   │  4. Deploy          │
    │                  │                   │                     │
    │                  │                   │  Deploy completed   │
    │                  │                   ├────────────────────▶│
    │                  │                   │                     │
    │  Deployment      │                   │                     │
    │  notification    │                   │                     │
    │◀─────────────────┼───────────────────│                     │
```

---

## 📈 Performance Optimization

### Caching Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                    CACHING LAYERS                           │
└─────────────────────────────────────────────────────────────┘

1. Edge Caching (Vercel CDN)
   ├── Static assets (images, CSS, JS)
   ├── Public pages (home, about, contact)
   └── Cache duration: 1 year

2. Server-Side Caching
   ├── API responses (events, clubs)
   ├── Database query results
   └── Cache duration: 5-60 minutes

3. Client-Side Caching
   ├── React component state
   ├── Next.js router cache
   └── Browser cache
```

### Database Optimization

```sql
-- Indexes for performance
CREATE INDEX idx_user_email ON User(email);
CREATE INDEX idx_event_date ON Event(date);
CREATE INDEX idx_event_club ON Event(clubId);
CREATE INDEX idx_registration_user ON EventRegistration(userId);
CREATE INDEX idx_registration_event ON EventRegistration(eventId);
CREATE INDEX idx_notification_user ON Notification(userId);
CREATE INDEX idx_notification_read ON Notification(read);
```

---

## 🔐 Security Measures

### Authentication Security
- ✅ OAuth 2.0 with Google
- ✅ Email domain validation
- ✅ JWT token encryption
- ✅ Secure session management
- ✅ HttpOnly cookies
- ✅ CSRF protection

### Authorization Security
- ✅ Role-based access control
- ✅ Middleware route protection
- ✅ API route validation
- ✅ Server-side session checks

### Data Security
- ✅ SQL injection prevention (Prisma)
- ✅ XSS protection (React)
- ✅ HTTPS enforcement
- ✅ Environment variable protection
- ✅ Input validation & sanitization

---

## 📝 Summary

Event Hub is a full-stack, production-ready event management platform built with modern web technologies. The architecture emphasizes:

- **Security**: OAuth authentication, RBAC, and comprehensive validation
- **Scalability**: Edge deployment, efficient caching, and optimized queries
- **User Experience**: Server-side rendering, smooth animations, and responsive design
- **Maintainability**: Type-safe code, clear separation of concerns, and comprehensive documentation

The system successfully handles three distinct user roles with appropriate permissions, ensures college-only access through email validation, and provides a seamless experience from registration to event participation.
