# Aggre Capital Landing Page - System Architecture

## Overview

Aggre Capital Landing Page adalah aplikasi full-stack Next.js 15 yang digunakan untuk mengelola pengajuan pinjaman dan konten landing page perusahaan pembiayaan.

## Tech Stack

### Frontend
- **Framework**: Next.js 15.2.4 (App Router)
- **Runtime**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.17 + Tailwind Animate
- **UI Components**: Radix UI (Headless Components)
- **State Management**: React Hooks + Server Components
- **Forms**: React Hook Form 7.63.0 + Zod 4.1.11
- **PDF Generation**: jsPDF 3.0.3 + html2canvas 1.4.1

### Backend
- **API Routes**: Next.js Route Handlers (App Router)
- **Database**: PostgreSQL (pg 8.16.3)
- **Authentication**: Session-based (Custom implementation)
- **Email Service**: Nodemailer 6.9.15
- **Security**: bcryptjs 2.4.6, JWT 9.0.2

### Infrastructure
- **Hosting**: Vercel
- **Database**: PostgreSQL (Cloud)
- **Email SMTP**: GoDaddy (Primary), Gmail (Fallback)
- **SSL**: Let's Encrypt (via Vercel)

## Architecture Patterns

### 1. App Router Architecture

```
app/
├── (public-pages)/          # Public routes
│   ├── page.tsx            # Home page
│   ├── pengajuan/          # Application submission
│   ├── news/               # News & articles
│   ├── partners/           # Partners showcase
│   └── testimoni/          # Testimonials
│
├── dashboard/              # Admin dashboard (protected)
│   ├── page.tsx           # Overview
│   └── news/              # News management
│
├── login/                  # Authentication
│
└── api/                    # API Routes
    ├── auth/              # Authentication endpoints
    ├── applications/      # Application CRUD
    ├── news/              # News CRUD
    ├── partners/          # Partners CRUD
    ├── testimonials/      # Testimonials CRUD
    ├── settings/          # Settings & configuration
    └── notifications/     # Email notifications
```

### 2. Component Architecture

```
components/
├── ui/                     # Radix UI components (shadcn/ui)
├── dashboard/              # Dashboard-specific components
│   ├── ApplicationsTab.tsx
│   ├── NewsTab.tsx
│   ├── PartnersTab.tsx
│   └── TestimonialsTab.tsx
├── news/                   # News components
├── pdf/                    # PDF export components
├── SEO.tsx                 # SEO component
├── ImageUpload.tsx         # File upload
└── RichTextEditor.tsx      # Content editor
```

### 3. Data Layer Architecture

```
lib/
├── database.ts             # PostgreSQL connection pool
├── auth-middleware.ts      # Authentication middleware
├── session.ts              # Session management
├── email-service.ts        # Email notification service
├── api-client.ts           # API client utilities
├── analytics.ts            # Analytics tracking
└── utils.ts                # Utility functions
```

## System Components

### 1. Authentication System

**Type**: Session-based authentication with PostgreSQL storage

**Flow**:
```
User Login
    ↓
Validate Credentials (bcrypt)
    ↓
Create Session Record in DB
    ↓
Return Session ID as Cookie
    ↓
Validate on Each Request
    ↓
Check Session Expiry (24h)
```

**Security Features**:
- Password hashing with bcryptjs
- Session expiry (24 hours)
- IP address tracking
- Session invalidation on logout
- CSRF protection via SameSite cookies

### 2. Database Schema

**Tables**:
1. `users` - Admin users
2. `applications` - Loan applications
3. `news` - News articles
4. `partners_strategic` - Strategic partners
5. `partners_ecosystem` - Ecosystem partners
6. `testimonials` - Customer testimonials
7. `sessions` - User sessions
8. `smtp_settings` - Email configuration

**Connection Pool Configuration**:
```typescript
max: 20 connections
idleTimeoutMillis: 30000 (30s)
connectionTimeoutMillis: 10000 (10s)
ssl: rejectUnauthorized: false
```

### 3. Email Notification System

**Architecture**: Primary + Fallback SMTP

**Primary SMTP**: GoDaddy (smtpout.secureserver.net:465)
**Fallback SMTP**: Gmail (smtp.gmail.com:587)

**Features**:
- Automatic failover
- Connection pooling
- Retry mechanism
- Beautiful HTML email templates
- Admin & customer notifications

**Email Types**:
1. Application submission (to admin)
2. Customer confirmation
3. Status update notifications
4. Test emails

### 4. File Upload System

**Storage**: Vercel Blob Storage / Local Public Directory
**Supported Formats**: Images (jpg, png, webp, svg)
**Max Size**: 5MB per file
**Features**:
- Image optimization
- Preview generation
- Validation
- Error handling

### 5. API Architecture

**Pattern**: RESTful API with Next.js Route Handlers

**Authentication**: Session-based middleware

**Endpoints Structure**:
```
GET    /api/applications          - List all applications
POST   /api/applications          - Create application
GET    /api/applications/[id]     - Get single application
PATCH  /api/applications/[id]     - Update application
DELETE /api/applications/[id]     - Delete application

GET    /api/news                  - List news (with pagination)
POST   /api/news                  - Create news article
GET    /api/news/[id]             - Get single article
PATCH  /api/news/[id]             - Update article
DELETE /api/news/[id]             - Delete article

GET    /api/auth/verify           - Verify session
POST   /api/auth/login            - Login
POST   /api/auth/logout           - Logout

POST   /api/notifications/email   - Send email
POST   /api/upload                - Upload file
```

## Data Flow

### Application Submission Flow

```
1. User fills form on /pengajuan
   ↓
2. Frontend validation (Zod schema)
   ↓
3. POST /api/applications
   ↓
4. Insert to database
   ↓
5. Send admin notification email
   ↓
6. Send customer confirmation email
   ↓
7. Return success response
   ↓
8. Show success message + PDF option
```

### Dashboard Management Flow

```
1. Admin login (/login)
   ↓
2. Create session
   ↓
3. Access /dashboard
   ↓
4. Load data via API calls
   ↓
5. Perform CRUD operations
   ↓
6. Real-time updates
   ↓
7. Logout (destroy session)
```

## Performance Optimizations

### 1. Next.js Optimizations
- Server Components for data fetching
- Client Components only when needed
- Image optimization with next/image
- Font optimization with next/font (Geist)
- Route prefetching
- Turbopack for dev builds

### 2. Database Optimizations
- Connection pooling
- Prepared statements
- Indexed columns
- Query logging with duration
- Error handling & retry

### 3. Caching Strategy
- Static generation for public pages
- ISR (Incremental Static Regeneration) for news
- API response caching
- CDN caching via Vercel

### 4. Bundle Optimization
- Code splitting
- Tree shaking
- Dynamic imports for heavy components
- Lazy loading images

## Security Measures

### 1. Authentication & Authorization
- Session-based auth (more secure than JWT for web apps)
- Password hashing with bcryptjs
- Session expiry enforcement
- Role-based access control (RBAC ready)

### 2. Input Validation
- Zod schema validation on frontend
- Server-side validation on API routes
- SQL injection prevention (parameterized queries)
- XSS prevention (React escaping)

### 3. HTTPS & SSL
- Enforced HTTPS via Vercel
- SSL certificate auto-renewal
- Secure cookies (httpOnly, secure, sameSite)

### 4. Rate Limiting
- API rate limiting (TODO: implement)
- Email rate limiting (built-in to SMTP)

### 5. Error Handling
- Never expose sensitive errors to client
- Structured error logging
- Error boundaries in React

## Deployment Architecture

### Production (Vercel)

```
User Request
    ↓
Vercel Edge Network (CDN)
    ↓
Next.js Server (Serverless Functions)
    ↓
PostgreSQL Database (Cloud)
    ↓
SMTP Server (GoDaddy/Gmail)
```

### Environment Variables (Production)

**Required**:
- `DATABASE_URL` - PostgreSQL connection string
- `EMAIL_USER` - SMTP username
- `EMAIL_PASSWORD` - SMTP password
- `ADMIN_EMAIL` - Admin notification email
- `NEXT_PUBLIC_DASHBOARD_URL` - Dashboard URL

**Optional**:
- `EMAIL_DISABLED` - Disable emails for testing
- `GMAIL_USER` - Fallback Gmail
- `GMAIL_APP_PASSWORD` - Gmail app password

## Monitoring & Logging

### Application Logs
- Database query duration
- Email delivery status
- Authentication events
- API request/response logs

### Performance Monitoring
- Core Web Vitals via Vercel Analytics
- API response times
- Database query performance
- Email delivery times

### Error Tracking
- Console error logs
- Database connection errors
- Email delivery failures
- Authentication failures

## Scalability Considerations

### Current Capacity
- Database: 20 concurrent connections
- Email: 100 messages per connection
- API: Serverless auto-scaling on Vercel

### Future Improvements
1. Implement Redis for session storage
2. Add rate limiting with Redis
3. Implement queue system for emails (Bull/BullMQ)
4. Add database read replicas
5. Implement full-text search (PostgreSQL FTS or Algolia)
6. Add CDN for uploaded images
7. Implement webhook system for status updates

## Development Workflow

### Local Development
```bash
npm run dev              # Start dev server (Turbopack)
npm run build           # Production build
npm run start           # Start production server
npm run lint            # ESLint
npm run dev:clean       # Clear cache + start dev
```

### Git Workflow
```
main (production) ← Deploy to Vercel
```

### Deployment Process
1. Push to main branch
2. Vercel auto-deploy
3. Run build checks
4. Deploy to production
5. Monitor logs

## API Response Standards

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

### Error Response
```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": { ... }
}
```

## Best Practices

### Code Organization
1. Keep components small and focused
2. Use TypeScript strictly
3. Implement proper error boundaries
4. Use server components by default
5. Client components only when needed

### Database
1. Always use parameterized queries
2. Log slow queries
3. Implement proper connection pooling
4. Handle connection errors gracefully

### Security
1. Never expose sensitive data in client
2. Validate all inputs server-side
3. Use environment variables for secrets
4. Implement proper CORS policies
5. Keep dependencies updated

---

**Last Updated**: 2025-01-14
**Version**: 1.0.0
**Maintainer**: Development Team
