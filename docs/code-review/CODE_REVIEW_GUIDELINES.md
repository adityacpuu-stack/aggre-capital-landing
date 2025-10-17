# Code Review Guidelines - Aggre Capital Landing Page

## Overview

Dokumen ini berisi panduan code review untuk memastikan kualitas kode, keamanan, dan best practices dalam development Aggre Capital Landing Page.

## Review Checklist

### ✅ General Code Quality

- [ ] Kode mudah dibaca dan dipahami
- [ ] Naming conventions konsisten dan deskriptif
- [ ] Tidak ada hardcoded values (gunakan environment variables)
- [ ] Tidak ada commented-out code yang tidak perlu
- [ ] File size reasonable (<500 lines)
- [ ] Proper code organization and structure

### ✅ TypeScript & Type Safety

- [ ] Strict mode enabled (`tsconfig.json`)
- [ ] No `any` types (kecuali benar-benar diperlukan)
- [ ] Proper interface/type definitions
- [ ] Return types explicitly defined for functions
- [ ] Proper type guards where needed
- [ ] No type assertions (`as`) without justification

**Example - Good**:
```typescript
interface ApplicationData {
  name: string
  email: string
  amount: number
}

async function createApplication(data: ApplicationData): Promise<{ success: boolean; id: string }> {
  // Implementation
}
```

**Example - Bad**:
```typescript
async function createApplication(data: any) {  // ❌ Using 'any'
  // Implementation
}
```

### ✅ React & Next.js Best Practices

- [ ] Server Components by default (client only when needed)
- [ ] Proper use of `'use client'` directive
- [ ] No unnecessary re-renders
- [ ] Proper key props in lists
- [ ] Avoid prop drilling (use context if needed)
- [ ] Proper error boundaries
- [ ] Loading states implemented
- [ ] Proper SEO metadata

**Server vs Client Components**:

```typescript
// ✅ Good - Server Component (default)
async function NewsPage() {
  const news = await fetch('...')
  return <div>...</div>
}

// ✅ Good - Client Component (when needed)
'use client'
function InteractiveForm() {
  const [state, setState] = useState()
  return <form>...</form>
}
```

### ✅ Security

#### 1. Authentication & Authorization

- [ ] All admin routes protected with authentication
- [ ] Session validation on every protected API call
- [ ] No sensitive data in client-side code
- [ ] Proper session expiry handling
- [ ] Logout functionality properly destroys sessions

**Example - Protected API Route**:
```typescript
import { withAuth } from '@/lib/auth-middleware'

export const GET = withAuth(async (request, context, session) => {
  // Session validated, safe to proceed
  return NextResponse.json({ data: 'protected data' })
})
```

#### 2. Input Validation

- [ ] All user inputs validated (frontend & backend)
- [ ] Zod schemas for form validation
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (React handles this, but be careful with dangerouslySetInnerHTML)
- [ ] File upload validation (type, size, content)

**Example - Input Validation**:
```typescript
import { z } from 'zod'

const applicationSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email(),
  amount: z.number().min(1000000).max(1000000000),
  phone: z.string().regex(/^(\+62|62|0)[0-9]{9,12}$/)
})

// Validate before processing
const result = applicationSchema.safeParse(data)
if (!result.success) {
  return NextResponse.json({ error: result.error }, { status: 400 })
}
```

#### 3. Database Security

- [ ] Always use parameterized queries
- [ ] Never concatenate SQL strings
- [ ] Proper error handling (don't expose DB errors to client)
- [ ] Connection pooling configured properly
- [ ] Sensitive data encrypted in DB

**Example - Safe Database Query**:
```typescript
// ✅ Good - Parameterized query
const result = await query(
  'SELECT * FROM applications WHERE email = $1',
  [email]
)

// ❌ Bad - SQL injection risk
const result = await query(
  `SELECT * FROM applications WHERE email = '${email}'`  // NEVER DO THIS
)
```

### ✅ Error Handling

- [ ] Try-catch blocks for async operations
- [ ] Proper error messages (user-friendly)
- [ ] Error logging for debugging
- [ ] No sensitive information in error messages
- [ ] Proper HTTP status codes
- [ ] Error boundaries in React components

**Example - Proper Error Handling**:
```typescript
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validation
    const validated = schema.safeParse(body)
    if (!validated.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validated.error },
        { status: 400 }
      )
    }

    // Process
    const result = await processData(validated.data)
    return NextResponse.json({ success: true, data: result })

  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },  // Don't expose error details
      { status: 500 }
    )
  }
}
```

### ✅ Performance

- [ ] Minimize bundle size
- [ ] Lazy load heavy components
- [ ] Optimize images (use next/image)
- [ ] Implement proper caching
- [ ] Database queries optimized
- [ ] Avoid N+1 queries
- [ ] Proper pagination for large datasets

**Example - Image Optimization**:
```typescript
import Image from 'next/image'

// ✅ Good
<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  loading="lazy"
  quality={85}
/>

// ❌ Bad
<img src="/image.jpg" />  // No optimization
```

### ✅ Accessibility (A11Y)

- [ ] Proper semantic HTML
- [ ] Alt text for images
- [ ] Keyboard navigation works
- [ ] ARIA labels where needed
- [ ] Color contrast meets WCAG standards
- [ ] Form labels properly associated
- [ ] Focus states visible

**Example - Accessible Form**:
```typescript
<form>
  <label htmlFor="name">Full Name</label>
  <input
    id="name"
    type="text"
    aria-required="true"
    aria-describedby="name-error"
  />
  <span id="name-error" role="alert">
    {errors.name?.message}
  </span>
</form>
```

### ✅ Testing (Future Implementation)

- [ ] Unit tests for utilities
- [ ] Integration tests for API routes
- [ ] E2E tests for critical flows
- [ ] Test coverage > 80%
- [ ] Edge cases tested

## Common Issues & Solutions

### Issue 1: Memory Leaks in React

**Problem**: useEffect without cleanup
```typescript
// ❌ Bad
useEffect(() => {
  const interval = setInterval(() => {}, 1000)
  // No cleanup
}, [])
```

**Solution**:
```typescript
// ✅ Good
useEffect(() => {
  const interval = setInterval(() => {}, 1000)
  return () => clearInterval(interval)  // Cleanup
}, [])
```

### Issue 2: Unhandled Promise Rejections

**Problem**: Async functions without error handling
```typescript
// ❌ Bad
async function fetchData() {
  const response = await fetch('/api/data')
  return response.json()  // What if this fails?
}
```

**Solution**:
```typescript
// ✅ Good
async function fetchData() {
  try {
    const response = await fetch('/api/data')
    if (!response.ok) {
      throw new Error('Failed to fetch')
    }
    return await response.json()
  } catch (error) {
    console.error('Fetch error:', error)
    throw error  // Re-throw or handle appropriately
  }
}
```

### Issue 3: Sensitive Data Exposure

**Problem**: Environment variables exposed to client
```typescript
// ❌ Bad - In client component
const dbUrl = process.env.DATABASE_URL  // Exposed to browser!
```

**Solution**:
```typescript
// ✅ Good - Only in server components or API routes
// Client-side: use NEXT_PUBLIC_ prefix for safe variables
const publicUrl = process.env.NEXT_PUBLIC_API_URL  // OK for client
```

### Issue 4: SQL Injection

**Problem**: String concatenation in queries
```typescript
// ❌ Bad
await query(`DELETE FROM users WHERE id = ${userId}`)
```

**Solution**:
```typescript
// ✅ Good
await query('DELETE FROM users WHERE id = $1', [userId])
```

## Code Review Process

### 1. Self-Review Checklist

Sebelum submit PR, pastikan:
- [ ] Code berjalan tanpa error
- [ ] Tested locally
- [ ] No console.log left (kecuali untuk logging)
- [ ] ESLint passed
- [ ] TypeScript compilation successful
- [ ] Commit messages clear and descriptive

### 2. Peer Review Focus Areas

**Priority 1 - Security & Data Integrity**:
- Authentication & authorization
- Input validation
- SQL injection prevention
- XSS prevention
- Error handling

**Priority 2 - Functionality**:
- Business logic correctness
- Edge cases handled
- Error states handled
- Loading states implemented

**Priority 3 - Code Quality**:
- Code readability
- Proper naming
- No duplication
- Proper abstraction

**Priority 4 - Performance**:
- Database query optimization
- Bundle size impact
- Image optimization
- Caching strategy

### 3. Providing Feedback

**Good Feedback**:
```
❌ Issue: SQL injection vulnerability
📍 Location: app/api/users/[id]/route.ts:23
💡 Suggestion: Use parameterized query instead
📝 Example:
   - await query(`SELECT * FROM users WHERE id = ${id}`)
   + await query('SELECT * FROM users WHERE id = $1', [id])
```

**Bad Feedback**:
```
This code is bad. Fix it.  // ❌ Not helpful
```

## Automated Checks

### ESLint Rules (Recommended)

```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "no-console": ["warn", { "allow": ["error", "warn"] }]
  }
}
```

### Pre-commit Hooks (Recommended)

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint && npm run type-check"
    }
  }
}
```

## Security Audit Checklist

### Environment Variables

- [ ] No hardcoded secrets in code
- [ ] All secrets in environment variables
- [ ] `.env` in `.gitignore`
- [ ] Environment variables documented
- [ ] Production secrets different from development

### Authentication

- [ ] Session-based authentication implemented
- [ ] Session expiry enforced (24h)
- [ ] Logout functionality works
- [ ] Password hashing with bcrypt
- [ ] No passwords in logs

### API Security

- [ ] All admin endpoints protected
- [ ] Rate limiting implemented (TODO)
- [ ] CORS configured properly
- [ ] Input validation on all endpoints
- [ ] Proper error responses (no sensitive info)

### Database

- [ ] Parameterized queries everywhere
- [ ] Connection pooling configured
- [ ] SSL enabled for production
- [ ] Backup strategy in place
- [ ] No direct DB access from client

## Performance Audit Checklist

### Frontend

- [ ] Core Web Vitals optimized (LCP, FID, CLS)
- [ ] Images optimized with next/image
- [ ] Fonts optimized with next/font
- [ ] Bundle size reasonable (<300KB)
- [ ] Code splitting implemented
- [ ] Lazy loading for heavy components

### Backend

- [ ] Database queries optimized
- [ ] Connection pooling configured
- [ ] Proper indexing on database
- [ ] Caching strategy implemented
- [ ] API response times <200ms

### Monitoring

- [ ] Error tracking setup
- [ ] Performance monitoring
- [ ] Database query logging
- [ ] Email delivery logging

## Critical Security Rules

### 🚨 NEVER DO THIS:

1. **Don't expose secrets**:
   ```typescript
   // ❌ NEVER
   const apiKey = 'sk_live_xxxxx'  // Hardcoded secret
   ```

2. **Don't use string concatenation in SQL**:
   ```typescript
   // ❌ NEVER
   query(`SELECT * FROM users WHERE id = ${id}`)
   ```

3. **Don't trust client input**:
   ```typescript
   // ❌ NEVER
   const { isAdmin } = req.body  // Trusting client
   if (isAdmin) { /* grant admin access */ }
   ```

4. **Don't expose error details to client**:
   ```typescript
   // ❌ NEVER
   catch (error) {
     return res.json({ error: error.stack })  // Exposes internals
   }
   ```

5. **Don't disable SSL verification in production**:
   ```typescript
   // ❌ NEVER in production
   rejectUnauthorized: false  // Only for development
   ```

## References

- [Next.js Best Practices](https://nextjs.org/docs/app/building-your-application)
- [React Security](https://react.dev/reference/react)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

---

**Last Updated**: 2025-01-14
**Version**: 1.0.0
**Review Frequency**: Every PR and monthly security audits
