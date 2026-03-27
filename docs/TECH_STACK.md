# Tech Stack Documentation - Aggre Capital Landing Page

## Overview

Dokumen ini menjelaskan secara detail semua teknologi, library, dan tools yang digunakan dalam project Aggre Capital Landing Page.

## Core Technologies

### Frontend Framework

#### Next.js 15.2.4
- **Website**: https://nextjs.org
- **Purpose**: React framework dengan App Router
- **Key Features**:
  - Server Components & Client Components
  - File-based routing
  - API Routes (Route Handlers)
  - Built-in image optimization
  - Font optimization
  - Automatic code splitting

**Why Next.js?**
- SEO-friendly (Server-side rendering)
- Excellent performance out of the box
- Great developer experience
- Built-in optimizations
- Deployed easily on Vercel

#### React 19
- **Website**: https://react.dev
- **Purpose**: UI library
- **Key Features**:
  - Component-based architecture
  - Virtual DOM
  - Hooks
  - Server Components support

#### TypeScript 5
- **Website**: https://www.typescriptlang.org
- **Purpose**: Type-safe JavaScript
- **Benefits**:
  - Catch errors at compile time
  - Better IDE support
  - Self-documenting code
  - Refactoring confidence

**Configuration** (tsconfig.json):
```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "preserve",
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "noEmit": true,
    "incremental": true
  }
}
```

## UI & Styling

### Tailwind CSS 3.4.17
- **Website**: https://tailwindcss.com
- **Purpose**: Utility-first CSS framework
- **Benefits**:
  - Rapid UI development
  - Consistent design system
  - Small bundle size (purged)
  - Responsive design made easy

**Configuration** (tailwind.config.ts):
- Custom color palette (teal theme)
- Dark mode support
- Custom animations
- Extended spacing & sizing

### Radix UI Components
- **Website**: https://www.radix-ui.com
- **Purpose**: Headless UI components
- **Components Used**:
  - Accordion
  - Alert Dialog
  - Avatar
  - Checkbox
  - Dialog
  - Dropdown Menu
  - Form elements
  - Navigation Menu
  - Popover
  - Select
  - Slider
  - Switch
  - Tabs
  - Toast (Sonner)
  - Tooltip

**Why Radix UI?**
- Unstyled (full control over styling)
- Accessible by default (WCAG compliant)
- Keyboard navigation built-in
- Focus management
- Screen reader support

### shadcn/ui
- **Website**: https://ui.shadcn.com
- **Purpose**: Pre-styled Radix UI components
- **Installed via**: `components.json`
- **Benefits**:
  - Copy-paste components
  - Customizable
  - Built on Radix UI
  - Tailwind CSS styled

### Additional UI Libraries

#### Geist Font 1.3.1
- **Purpose**: Vercel's font family
- **Features**:
  - Modern sans-serif font
  - Optimized for screens
  - Automatically optimized by Next.js

#### Lucide React 0.454.0
- **Website**: https://lucide.dev
- **Purpose**: Icon library
- **Features**:
  - 1000+ icons
  - Tree-shakeable
  - Consistent design
  - Customizable

## Backend & API

### Node.js Runtime
- **Version**: v20+ (LTS)
- **Purpose**: JavaScript runtime
- **Used for**: API routes, server components

### Database

#### PostgreSQL (pg 8.16.3)
- **Website**: https://www.postgresql.org
- **Purpose**: Relational database
- **Driver**: node-postgres (pg)
- **Features**:
  - ACID compliance
  - JSON support
  - Full-text search
  - Robust indexing

**Connection Configuration**:
```typescript
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
})
```

**Tables**:
1. `users` - Admin authentication
2. `applications` - Loan applications
3. `news` - News articles
4. `partners_strategic` - Strategic partners
5. `partners_ecosystem` - Ecosystem partners
6. `testimonials` - Customer testimonials
7. `sessions` - User sessions
8. `smtp_settings` - Email configuration

## Authentication & Security

### bcryptjs 3.0.2
- **Purpose**: Password hashing
- **Algorithm**: bcrypt
- **Salt Rounds**: 10
- **Usage**:
  ```typescript
  const hash = await bcrypt.hash(password, 10)
  const isValid = await bcrypt.compare(password, hash)
  ```

### jsonwebtoken 9.0.2
- **Purpose**: JWT token generation (legacy support)
- **Current**: Session-based auth preferred
- **Usage**: Backup authentication method

### Session Management
- **Storage**: PostgreSQL sessions table
- **Expiry**: 24 hours
- **Security**:
  - HTTP-only cookies
  - Secure flag in production
  - SameSite: Lax

## Forms & Validation

### React Hook Form 7.63.0
- **Website**: https://react-hook-form.com
- **Purpose**: Form state management
- **Benefits**:
  - Minimal re-renders
  - TypeScript support
  - Built-in validation
  - Easy integration with Zod

### Zod 4.1.11
- **Website**: https://zod.dev
- **Purpose**: Schema validation
- **Benefits**:
  - TypeScript-first
  - Composable schemas
  - Detailed error messages
  - Type inference

**Example Usage**:
```typescript
import { z } from 'zod'

const applicationSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email(),
  amount: z.number().min(1000000),
  phone: z.string().regex(/^(\+62|62|0)[0-9]{9,12}$/)
})

type Application = z.infer<typeof applicationSchema>
```

### @hookform/resolvers 5.2.2
- **Purpose**: Integrate Zod with React Hook Form
- **Usage**:
  ```typescript
  const form = useForm<Application>({
    resolver: zodResolver(applicationSchema)
  })
  ```

## Email Service

### Nodemailer 6.9.15
- **Website**: https://nodemailer.com
- **Purpose**: Email sending
- **Configuration**:
  - Primary: GoDaddy SMTP (smtpout.secureserver.net:465)
  - Fallback: Gmail SMTP (smtp.gmail.com:587)

**Features**:
- Connection pooling
- Automatic failover
- HTML email templates
- Attachment support

**Email Types**:
1. Admin notifications (new applications)
2. Customer confirmations
3. Status updates
4. Test emails

## File Handling

### File Upload
- **Storage**: Local public directory / Vercel Blob (future)
- **Allowed Types**: image/jpeg, image/png, image/webp, image/svg+xml
- **Max Size**: 5MB
- **Validation**: File type, size, content validation

### Image Processing

#### html2canvas 1.4.1
- **Purpose**: Screenshot/render DOM to canvas
- **Usage**: PDF preview generation

#### jsPDF 3.0.3
- **Purpose**: PDF generation
- **Usage**: Export application details to PDF
- **Features**:
  - Custom fonts
  - Images
  - Tables
  - Formatting

## Utilities

### clsx 2.1.1
- **Purpose**: Conditional className joining
- **Usage**:
  ```typescript
  clsx('base-class', {
    'active': isActive,
    'disabled': isDisabled
  })
  ```

### tailwind-merge 2.5.5
- **Purpose**: Merge Tailwind classes intelligently
- **Usage**: Prevent conflicting Tailwind classes

### class-variance-authority 0.7.1
- **Purpose**: Component variants
- **Usage**: Create reusable styled components
  ```typescript
  const button = cva('base-styles', {
    variants: {
      variant: {
        primary: 'bg-teal-600',
        secondary: 'bg-gray-600'
      }
    }
  })
  ```

### date-fns 4.1.0
- **Purpose**: Date manipulation
- **Usage**: Format dates, calculate differences
- **Benefits**:
  - Lightweight
  - Immutable
  - Tree-shakeable

## UI Enhancement

### cmdk 1.1.1
- **Purpose**: Command menu component
- **Usage**: Future command palette implementation

### embla-carousel-react 8.6.0
- **Purpose**: Carousel/slider component
- **Usage**: Image galleries, testimonial sliders

### react-day-picker 9.11.0
- **Purpose**: Date picker component
- **Usage**: Date selection in forms

### recharts 3.2.1
- **Purpose**: Chart library
- **Usage**: Dashboard analytics charts

### sonner 2.0.7
- **Purpose**: Toast notifications
- **Usage**: Success/error messages
- **Benefits**:
  - Beautiful animations
  - Queue support
  - Promise-based API

### vaul 1.1.2
- **Purpose**: Drawer component
- **Usage**: Mobile-friendly drawers

### react-resizable-panels 3.0.6
- **Purpose**: Resizable panel layouts
- **Usage**: Dashboard layout customization

## Development Tools

### ESLint
- **Configuration**: next/core-web-vitals
- **Purpose**: Code linting
- **Rules**: TypeScript strict, Next.js best practices

### Prettier (Recommended)
- **Purpose**: Code formatting
- **Configuration**:
  ```json
  {
    "semi": false,
    "singleQuote": true,
    "tabWidth": 2,
    "trailingComma": "es5"
  }
  ```

### PostCSS 8.5
- **Purpose**: CSS processing
- **Plugins**: Tailwind CSS, Autoprefixer

### Autoprefixer 10.4.20
- **Purpose**: Add vendor prefixes
- **Benefits**: Cross-browser compatibility

### Turbopack
- **Purpose**: Fast bundler (beta)
- **Usage**: `next dev --turbopack`
- **Benefits**: Faster builds than Webpack

## SEO & Analytics

### next-seo 6.8.0
- **Purpose**: SEO component library
- **Features**:
  - Meta tags
  - Open Graph
  - Twitter Cards
  - JSON-LD (structured data)

### next-themes 0.4.6
- **Purpose**: Dark mode implementation
- **Features**:
  - System preference detection
  - Persistent theme
  - No flash on load

## Build & Deployment

### Vercel Platform
- **Purpose**: Hosting & deployment
- **Features**:
  - Automatic deployments
  - Preview deployments
  - Edge network (CDN)
  - Serverless functions
  - Environment variables
  - Analytics

**Deployment Process**:
1. Push to main branch
2. Vercel auto-detects changes
3. Build & deploy
4. Live in <30 seconds

### Build Scripts

```json
{
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "dev:clean": "node scripts/clear-cache.js && next dev"
}
```

## Environment Variables

### Required
```env
DATABASE_URL=postgresql://user:pass@host:5432/db
EMAIL_USER=support@domain.com
EMAIL_PASSWORD=xxxxxx
ADMIN_EMAIL=admin@domain.com
```

### Optional
```env
EMAIL_DISABLED=false
GMAIL_USER=backup@gmail.com
GMAIL_APP_PASSWORD=xxxxxx
NEXT_PUBLIC_DASHBOARD_URL=https://domain.com/dashboard
```

## Type Definitions

### Custom Types (@types/)
- `@types/node` - Node.js types
- `@types/react` - React types
- `@types/react-dom` - React DOM types
- `@types/bcryptjs` - bcrypt types
- `@types/jsonwebtoken` - JWT types
- `@types/pg` - PostgreSQL types
- `@types/nodemailer` - Nodemailer types

## Package Management

### npm
- **Version**: 10+
- **Lock File**: package-lock.json
- **Scripts**: Development, build, deployment

### Dependencies Summary

**Total Dependencies**: 75 packages
- **Production**: 70 packages
- **Development**: 5 packages

**Bundle Size** (estimated):
- Client Bundle: ~250KB (gzipped)
- Server Bundle: ~500KB

## Performance Optimizations

### Automatic Optimizations (Next.js)
- Image optimization with next/image
- Font optimization with next/font
- Code splitting
- Tree shaking
- Minification
- Compression

### Manual Optimizations
- Lazy loading components
- Route prefetching
- Database connection pooling
- Email connection pooling
- Caching strategies

## Browser Support

### Supported Browsers
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

### Mobile Support
- iOS Safari 12+
- Chrome Android 90+

## Monitoring & Logging

### Built-in Logging
- Database query duration
- Email delivery status
- Authentication events
- Error tracking

### Recommended Tools (Future)
- Sentry for error tracking
- LogRocket for user sessions
- Vercel Analytics for performance

## Future Enhancements

### Planned Additions
1. Redis for caching & sessions
2. Rate limiting (express-rate-limit)
3. Testing (Jest, React Testing Library, Playwright)
4. Monitoring (Sentry, LogRocket)
5. Message queue (Bull/BullMQ)
6. Full-text search (PostgreSQL FTS or Algolia)
7. WebSocket support (Socket.io)

### Performance Targets
- Lighthouse Score: >90
- Time to Interactive: <3s
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s

---

**Last Updated**: 2025-01-14
**Node Version**: 20+ LTS
**npm Version**: 10+
**Next.js Version**: 15.2.4
