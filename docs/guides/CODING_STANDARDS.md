# Coding Standards - Aggre Capital Landing Page

## Overview

Dokumen ini mendefinisikan standar coding untuk menjaga konsistensi dan kualitas kode dalam project Aggre Capital Landing Page.

---

## General Principles

### 1. Code Quality
- **Readability > Cleverness**: Tulis kode yang mudah dipahami
- **DRY (Don't Repeat Yourself)**: Hindari duplikasi kode
- **KISS (Keep It Simple, Stupid)**: Solusi sederhana lebih baik
- **YAGNI (You Aren't Gonna Need It)**: Jangan membuat fitur yang belum diperlukan
- **SOLID Principles**: Ikuti prinsip object-oriented design

### 2. Code Documentation
- Comment menjelaskan "mengapa", bukan "apa"
- Dokumentasi API harus lengkap
- README untuk setiap modul kompleks
- Type definitions sebagai dokumentasi

---

## TypeScript Standards

### 1. Type Safety

**Always use strict mode**:
```typescript
// ✅ Good
const userId: number = 123
const userName: string = "John"

// ❌ Bad
const userId: any = 123  // Avoid 'any'
```

**Define interfaces for data structures**:
```typescript
// ✅ Good
interface User {
  id: number
  email: string
  fullName: string
  role: 'admin' | 'user'
}

function getUser(id: number): Promise<User> {
  // ...
}

// ❌ Bad
function getUser(id: any): Promise<any> {
  // ...
}
```

**Use type inference when obvious**:
```typescript
// ✅ Good
const count = 10  // Type inferred as number
const name = "John"  // Type inferred as string

// ❌ Bad (unnecessary)
const count: number = 10
const name: string = "John"
```

### 2. Enums vs Union Types

**Prefer union types**:
```typescript
// ✅ Good
type Status = 'pending' | 'approved' | 'rejected'

// ❌ Less preferred
enum Status {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected'
}
```

### 3. Function Return Types

**Always define return types for public functions**:
```typescript
// ✅ Good
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0)
}

// ❌ Bad
function calculateTotal(items: Item[]) {
  return items.reduce((sum, item) => sum + item.price, 0)
}
```

---

## React & Next.js Standards

### 1. Component Structure

**Server Components by default**:
```typescript
// ✅ Good - Server Component
async function NewsPage() {
  const news = await fetchNews()
  return <div>{news.map(...)}</div>
}

// Only use 'use client' when needed
'use client'
function InteractiveButton() {
  const [clicked, setClicked] = useState(false)
  return <button onClick={() => setClicked(true)}>Click</button>
}
```

**Component Organization**:
```typescript
// 1. Imports
import { useState } from 'react'
import type { User } from '@/types'

// 2. Types/Interfaces
interface Props {
  user: User
  onUpdate: (user: User) => void
}

// 3. Component
export function UserCard({ user, onUpdate }: Props) {
  // 3a. Hooks
  const [editing, setEditing] = useState(false)

  // 3b. Event handlers
  const handleSave = () => {
    // ...
  }

  // 3c. Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

### 2. Props

**Always define prop types**:
```typescript
// ✅ Good
interface ButtonProps {
  variant: 'primary' | 'secondary'
  onClick: () => void
  children: React.ReactNode
  disabled?: boolean
}

export function Button({ variant, onClick, children, disabled = false }: ButtonProps) {
  // ...
}

// ❌ Bad
export function Button(props: any) {
  // ...
}
```

**Use destructuring**:
```typescript
// ✅ Good
function UserCard({ name, email, avatar }: UserCardProps) {
  return <div>{name}</div>
}

// ❌ Bad
function UserCard(props: UserCardProps) {
  return <div>{props.name}</div>
}
```

### 3. Hooks

**Follow hooks rules**:
```typescript
// ✅ Good
function Component() {
  const [state, setState] = useState(0)

  useEffect(() => {
    // Effect logic
    return () => {
      // Cleanup
    }
  }, [dependencies])

  return <div />
}

// ❌ Bad - Conditional hook
function Component() {
  if (condition) {
    useEffect(() => {})  // Don't use hooks conditionally
  }
}
```

**Custom hooks naming**:
```typescript
// ✅ Good
function useUser(id: number) {
  const [user, setUser] = useState<User | null>(null)
  // ...
  return user
}

// ❌ Bad
function getUserHook(id: number) {  // Must start with 'use'
  // ...
}
```

### 4. File Naming

**Components**: PascalCase
```
UserCard.tsx
ApplicationForm.tsx
NewsArticle.tsx
```

**Utilities**: camelCase
```
formatDate.ts
validateEmail.ts
apiClient.ts
```

**API Routes**: kebab-case
```
app/api/auth/login/route.ts
app/api/applications/update-status/route.ts
```

---

## Naming Conventions

### 1. Variables

**camelCase for variables and functions**:
```typescript
const userName = "John"
const userAge = 25
function getUserData() {}
```

**PascalCase for types, interfaces, classes**:
```typescript
interface UserData {}
type ApplicationStatus = 'pending' | 'approved'
class UserService {}
```

**UPPER_CASE for constants**:
```typescript
const MAX_FILE_SIZE = 5 * 1024 * 1024  // 5MB
const API_BASE_URL = 'https://api.example.com'
```

### 2. Meaningful Names

**Be descriptive**:
```typescript
// ✅ Good
const isUserAuthenticated = true
const totalApplicationsCount = 150

// ❌ Bad
const flag = true
const n = 150
```

**Use verb prefixes for functions**:
```typescript
// ✅ Good
function getUserById(id: number) {}
function updateApplicationStatus(id: string, status: string) {}
function validateEmail(email: string): boolean {}

// ❌ Bad
function user(id: number) {}
function application(id: string, status: string) {}
function email(email: string): boolean {}
```

### 3. Boolean Names

**Use is/has/can prefix**:
```typescript
// ✅ Good
const isLoading = true
const hasError = false
const canEdit = true

// ❌ Bad
const loading = true
const error = false
const edit = true
```

---

## Code Organization

### 1. File Structure

```
src/
├── app/                    # Next.js app directory
│   ├── (public)/          # Public routes
│   ├── dashboard/         # Protected routes
│   ├── api/              # API routes
│   └── layout.tsx
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── dashboard/        # Dashboard-specific
│   └── common/           # Shared components
├── lib/                   # Utilities & services
│   ├── database.ts       # Database utilities
│   ├── email-service.ts  # Email service
│   └── utils.ts          # General utilities
├── types/                 # TypeScript types
│   ├── models.ts         # Data models
│   └── api.ts            # API types
└── styles/                # Global styles
```

### 2. Import Organization

**Order**:
1. External libraries
2. Internal modules
3. Components
4. Types
5. Styles

```typescript
// 1. External
import { useState, useEffect } from 'react'
import { z } from 'zod'

// 2. Internal
import { query } from '@/lib/database'
import { sendEmail } from '@/lib/email-service'

// 3. Components
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// 4. Types
import type { Application, User } from '@/types'

// 5. Styles (if any)
import './styles.css'
```

### 3. Module Exports

**Use named exports**:
```typescript
// ✅ Good
export function getUserById(id: number) {}
export function updateUser(id: number, data: User) {}

// ❌ Bad (avoid default exports)
export default function getUserById(id: number) {}
```

---

## Error Handling

### 1. Try-Catch

**Always handle errors**:
```typescript
// ✅ Good
async function fetchUser(id: number): Promise<User | null> {
  try {
    const result = await query('SELECT * FROM users WHERE id = $1', [id])
    return result.rows[0] || null
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}

// ❌ Bad
async function fetchUser(id: number) {
  const result = await query('SELECT * FROM users WHERE id = $1', [id])
  return result.rows[0]  // What if it fails?
}
```

### 2. API Error Responses

**Consistent error format**:
```typescript
// ✅ Good
return NextResponse.json(
  {
    error: 'User not found',
    code: 'USER_NOT_FOUND',
    details: { userId: id }
  },
  { status: 404 }
)

// ❌ Bad
return NextResponse.json({ message: 'error' }, { status: 500 })
```

### 3. User-Friendly Messages

```typescript
// ✅ Good
catch (error) {
  console.error('Database error:', error)  // For developers
  return { error: 'Unable to save data. Please try again.' }  // For users
}

// ❌ Bad
catch (error) {
  return { error: error.stack }  // Exposes internals
}
```

---

## Database Queries

### 1. Parameterized Queries

**Always use parameterized queries**:
```typescript
// ✅ Good
await query(
  'SELECT * FROM applications WHERE email = $1 AND status = $2',
  [email, status]
)

// ❌ Bad - SQL injection risk
await query(
  `SELECT * FROM applications WHERE email = '${email}' AND status = '${status}'`
)
```

### 2. Query Organization

**Separate query logic**:
```typescript
// lib/queries/applications.ts
export async function getApplicationById(id: string): Promise<Application | null> {
  const result = await query(
    'SELECT * FROM applications WHERE id = $1',
    [id]
  )
  return result.rows[0] || null
}

export async function updateApplicationStatus(
  id: string,
  status: string
): Promise<void> {
  await query(
    'UPDATE applications SET status = $1, updated_at = NOW() WHERE id = $2',
    [status, id]
  )
}
```

---

## Testing (Future Implementation)

### 1. Unit Tests

```typescript
// utils.test.ts
import { formatCurrency } from './utils'

describe('formatCurrency', () => {
  it('should format IDR currency', () => {
    expect(formatCurrency(1000000)).toBe('Rp 1.000.000')
  })

  it('should handle zero', () => {
    expect(formatCurrency(0)).toBe('Rp 0')
  })
})
```

### 2. API Tests

```typescript
// api/applications.test.ts
describe('POST /api/applications', () => {
  it('should create application', async () => {
    const response = await fetch('/api/applications', {
      method: 'POST',
      body: JSON.stringify({ /* data */ })
    })

    expect(response.status).toBe(201)
    const data = await response.json()
    expect(data.success).toBe(true)
  })
})
```

---

## Performance Best Practices

### 1. Minimize Re-renders

```typescript
// ✅ Good
const handleClick = useCallback(() => {
  doSomething()
}, [dependencies])

const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data)
}, [data])

// ❌ Bad
const handleClick = () => {
  doSomething()  // New function every render
}

const expensiveValue = computeExpensiveValue(data)  // Computed every render
```

### 2. Lazy Loading

```typescript
// ✅ Good
const HeavyComponent = lazy(() => import('./HeavyComponent'))

function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  )
}
```

### 3. Image Optimization

```typescript
// ✅ Good
import Image from 'next/image'

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  loading="lazy"
  quality={85}
/>

// ❌ Bad
<img src="/image.jpg" />
```

---

## Security Best Practices

### 1. Input Validation

```typescript
// ✅ Good
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  amount: z.number().min(1000000)
})

const result = schema.safeParse(input)
if (!result.success) {
  return { error: result.error }
}
```

### 2. Authentication

```typescript
// ✅ Good
import { withAuth } from '@/lib/auth-middleware'

export const GET = withAuth(async (request, context, session) => {
  // Session validated
  return NextResponse.json({ data: 'protected' })
})

// ❌ Bad
export async function GET(request: NextRequest) {
  // No authentication check
  return NextResponse.json({ data: 'protected' })
}
```

### 3. Environment Variables

```typescript
// ✅ Good
const dbUrl = process.env.DATABASE_URL  // Server-side only
const publicUrl = process.env.NEXT_PUBLIC_API_URL  // OK for client

// ❌ Bad
// Exposing server-side env var to client component
```

---

## Git Commit Messages

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

### Examples

```
feat(applications): Add PDF export functionality

Implemented PDF generation using jsPDF for application details export.

Closes #123
```

```
fix(auth): Resolve session expiry issue

Fixed bug where sessions were not properly expired after 24 hours.
Updated session validation logic to check expiry timestamp.

Fixes #456
```

---

## Code Review Checklist

Before submitting PR:

- [ ] Code compiles without errors
- [ ] No TypeScript errors
- [ ] ESLint passes
- [ ] All tests pass (when implemented)
- [ ] Code follows naming conventions
- [ ] Functions are small and focused
- [ ] No hardcoded values
- [ ] Errors handled properly
- [ ] Security best practices followed
- [ ] Performance optimized
- [ ] Documentation updated
- [ ] Commit messages clear

---

## Tools & Extensions

### Recommended VS Code Extensions

- ESLint
- Prettier
- TypeScript
- Tailwind CSS IntelliSense
- GitLens
- Error Lens
- Auto Rename Tag
- Bracket Pair Colorizer

### Recommended Settings

**.vscode/settings.json**:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

---

**Last Updated**: 2025-01-14
**Version**: 1.0.0
**Language**: TypeScript 5, React 19, Next.js 15
