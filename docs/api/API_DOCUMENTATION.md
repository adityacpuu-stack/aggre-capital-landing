# API Documentation - Aggre Capital Landing Page

## Base URL

**Development**: `http://localhost:3000/api`
**Production**: `https://your-domain.vercel.app/api`

## Authentication

### Session-Based Authentication

All protected endpoints require a valid session cookie or session token.

**Session Cookie**: `session_id` (HttpOnly, Secure in production)
**Session Header**: `Authorization: Session <session_id>`

**Session Expiry**: 24 hours

---

## API Endpoints

### Authentication

#### POST /api/auth/login
Login admin user and create session.

**Request**:
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response** (Success - 200):
```json
{
  "success": true,
  "session": {
    "sessionId": "uuid-v4-string",
    "userId": 1,
    "userEmail": "admin@example.com",
    "expiresAt": "2025-01-15T10:00:00.000Z"
  },
  "user": {
    "id": 1,
    "email": "admin@example.com",
    "fullName": "Admin User"
  }
}
```

**Response** (Error - 401):
```json
{
  "error": "Invalid credentials"
}
```

**Cookies Set**:
- `session_id`: Session ID (HttpOnly, Secure)

---

#### GET /api/auth/verify
Verify current session validity.

**Headers**:
```
Cookie: session_id=<session-id>
```

**Response** (Success - 200):
```json
{
  "valid": true,
  "session": {
    "userId": 1,
    "userEmail": "admin@example.com",
    "expiresAt": "2025-01-15T10:00:00.000Z"
  }
}
```

**Response** (Error - 401):
```json
{
  "valid": false,
  "error": "Invalid or expired session"
}
```

---

#### POST /api/auth/logout
Logout user and destroy session.

**Headers**:
```
Cookie: session_id=<session-id>
```

**Response** (Success - 200):
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### Applications

#### GET /api/applications
Get all loan applications with pagination.

**Authentication**: Required

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `status` (optional): Filter by status
- `search` (optional): Search by name or email

**Example**:
```
GET /api/applications?page=1&limit=10&status=pending
```

**Response** (Success - 200):
```json
{
  "success": true,
  "data": [
    {
      "id": "APP001",
      "customerName": "John Doe",
      "customerEmail": "john@example.com",
      "customerPhone": "081234567890",
      "amount": 50000000,
      "purpose": "Business expansion",
      "status": "pending",
      "submittedAt": "2025-01-14T10:00:00.000Z",
      "occupation": "Entrepreneur",
      "workplace": "PT Example",
      "address": "Jakarta",
      "collateralType": "Property",
      "collateralAddress": "Jakarta Selatan"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

---

#### POST /api/applications
Create new loan application.

**Authentication**: Not required (public endpoint)

**Request**:
```json
{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "081234567890",
  "amount": 50000000,
  "purpose": "Business expansion",
  "occupation": "Entrepreneur",
  "workplace": "PT Example",
  "address": "Jakarta",
  "collateralType": "Property",
  "collateralAddress": "Jakarta Selatan"
}
```

**Validation Rules**:
- `customerName`: 3-100 characters
- `customerEmail`: Valid email format
- `customerPhone`: Indonesian phone format (08xxx or +62xxx)
- `amount`: Minimum 1,000,000
- `purpose`: Required string
- Other fields: Optional

**Response** (Success - 201):
```json
{
  "success": true,
  "data": {
    "id": "APP001",
    "customerName": "John Doe",
    "status": "pending",
    "submittedAt": "2025-01-14T10:00:00.000Z"
  },
  "notifications": {
    "admin": {
      "success": true,
      "messageId": "email-message-id"
    },
    "customer": {
      "success": true,
      "messageId": "email-message-id"
    }
  }
}
```

**Response** (Error - 400):
```json
{
  "error": "Validation failed",
  "details": {
    "customerEmail": "Invalid email format",
    "amount": "Amount must be at least 1,000,000"
  }
}
```

---

#### GET /api/applications/[id]
Get single application by ID.

**Authentication**: Required

**Response** (Success - 200):
```json
{
  "success": true,
  "data": {
    "id": "APP001",
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "customerPhone": "081234567890",
    "amount": 50000000,
    "purpose": "Business expansion",
    "status": "pending",
    "submittedAt": "2025-01-14T10:00:00.000Z",
    "updatedAt": "2025-01-14T11:00:00.000Z"
  }
}
```

**Response** (Error - 404):
```json
{
  "error": "Application not found"
}
```

---

#### PATCH /api/applications/update-status
Update application status.

**Authentication**: Required

**Request**:
```json
{
  "id": "APP001",
  "status": "approved",
  "notes": "Application approved after review"
}
```

**Status Options**:
- `pending` - Initial status
- `in-review` - Under review
- `approved` - Approved
- `rejected` - Rejected
- `completed` - Completed

**Response** (Success - 200):
```json
{
  "success": true,
  "data": {
    "id": "APP001",
    "status": "approved",
    "updatedAt": "2025-01-14T12:00:00.000Z"
  }
}
```

---

#### DELETE /api/applications/[id]
Delete application.

**Authentication**: Required

**Response** (Success - 200):
```json
{
  "success": true,
  "message": "Application deleted successfully"
}
```

---

### News

#### GET /api/news
Get all news articles with pagination.

**Authentication**: Required

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `status` (optional): `published` or `draft`

**Response** (Success - 200):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "New Financing Program Launched",
      "slug": "new-financing-program-launched",
      "excerpt": "Short description...",
      "content": "Full content...",
      "imageUrl": "/uploads/news-image.jpg",
      "author": "Admin",
      "publishedAt": "2025-01-14T10:00:00.000Z",
      "status": "published",
      "views": 150,
      "category": "announcement"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

---

#### GET /api/news/public
Get published news articles (public endpoint).

**Authentication**: Not required

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 6)

**Response**: Same as `/api/news` but only returns published articles

---

#### POST /api/news
Create new news article.

**Authentication**: Required

**Request**:
```json
{
  "title": "New Financing Program Launched",
  "slug": "new-financing-program-launched",
  "excerpt": "Short description...",
  "content": "Full content...",
  "imageUrl": "/uploads/news-image.jpg",
  "author": "Admin",
  "status": "published",
  "category": "announcement"
}
```

**Response** (Success - 201):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "New Financing Program Launched",
    "slug": "new-financing-program-launched",
    "publishedAt": "2025-01-14T10:00:00.000Z"
  }
}
```

---

#### GET /api/news/[id]
Get single news article.

**Authentication**: Required

**Response** (Success - 200):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "New Financing Program Launched",
    "slug": "new-financing-program-launched",
    "content": "Full content...",
    "publishedAt": "2025-01-14T10:00:00.000Z"
  }
}
```

---

#### PATCH /api/news/[id]
Update news article.

**Authentication**: Required

**Request**: Same as POST, partial updates allowed

**Response** (Success - 200):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Updated Title",
    "updatedAt": "2025-01-14T12:00:00.000Z"
  }
}
```

---

#### DELETE /api/news/[id]
Delete news article.

**Authentication**: Required

**Response** (Success - 200):
```json
{
  "success": true,
  "message": "News article deleted successfully"
}
```

---

### Partners

#### GET /api/partners/strategic
Get strategic partners.

**Authentication**: Required

**Response** (Success - 200):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "PT Partner Company",
      "logo": "/uploads/partner-logo.png",
      "description": "Partner description...",
      "website": "https://partner.com",
      "category": "strategic",
      "order": 1
    }
  ]
}
```

---

#### POST /api/partners/strategic
Create strategic partner.

**Authentication**: Required

**Request**:
```json
{
  "name": "PT Partner Company",
  "logo": "/uploads/partner-logo.png",
  "description": "Partner description...",
  "website": "https://partner.com",
  "order": 1
}
```

**Response** (Success - 201):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "PT Partner Company"
  }
}
```

---

#### GET /api/partners/ecosystem
Get ecosystem partners.

**Authentication**: Required

**Response**: Same structure as strategic partners

---

#### POST /api/partners/ecosystem
Create ecosystem partner.

**Authentication**: Required

**Request**: Same structure as strategic partners

---

### Testimonials

#### GET /api/testimonials
Get all testimonials.

**Authentication**: Required

**Response** (Success - 200):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "customerName": "Jane Doe",
      "customerCompany": "PT Example",
      "testimonial": "Great service!",
      "rating": 5,
      "imageUrl": "/uploads/customer.jpg",
      "position": "CEO",
      "isPublished": true,
      "createdAt": "2025-01-14T10:00:00.000Z"
    }
  ]
}
```

---

#### GET /api/testimonials/public
Get published testimonials (public endpoint).

**Authentication**: Not required

**Response**: Same as `/api/testimonials` but only published ones

---

#### POST /api/testimonials
Create testimonial.

**Authentication**: Required

**Request**:
```json
{
  "customerName": "Jane Doe",
  "customerCompany": "PT Example",
  "testimonial": "Great service!",
  "rating": 5,
  "imageUrl": "/uploads/customer.jpg",
  "position": "CEO",
  "isPublished": true
}
```

**Response** (Success - 201):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "customerName": "Jane Doe",
    "createdAt": "2025-01-14T10:00:00.000Z"
  }
}
```

---

### Utilities

#### POST /api/upload
Upload file (image).

**Authentication**: Required

**Request**: `multipart/form-data`
```
file: <binary data>
```

**Max Size**: 5MB

**Allowed Types**:
- image/jpeg
- image/png
- image/webp
- image/svg+xml

**Response** (Success - 200):
```json
{
  "success": true,
  "url": "/uploads/filename-12345.jpg",
  "filename": "filename-12345.jpg"
}
```

**Response** (Error - 400):
```json
{
  "error": "File type not allowed"
}
```

---

#### POST /api/notifications/email
Send email notification.

**Authentication**: Required

**Request**:
```json
{
  "to": "recipient@example.com",
  "subject": "Test Email",
  "html": "<h1>Hello!</h1><p>This is a test email.</p>"
}
```

**Response** (Success - 200):
```json
{
  "success": true,
  "messageId": "email-message-id"
}
```

---

#### GET /api/dashboard/stats
Get dashboard statistics.

**Authentication**: Required

**Response** (Success - 200):
```json
{
  "success": true,
  "stats": {
    "applications": {
      "total": 150,
      "pending": 20,
      "inReview": 15,
      "approved": 100,
      "rejected": 15
    },
    "news": {
      "total": 25,
      "published": 20,
      "draft": 5
    },
    "partners": {
      "strategic": 10,
      "ecosystem": 15
    },
    "testimonials": {
      "total": 30,
      "published": 25
    }
  }
}
```

---

#### POST /api/settings/smtp/test
Test SMTP configuration.

**Authentication**: Required

**Request**:
```json
{
  "to": "test@example.com",
  "smtpHost": "smtp.example.com",
  "smtpPort": 465,
  "smtpUser": "user@example.com",
  "smtpPassword": "password"
}
```

**Response** (Success - 200):
```json
{
  "success": true,
  "message": "Test email sent successfully"
}
```

---

## Error Responses

### Standard Error Format

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {
    "field": "Specific error details"
  }
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

### Common Error Codes

- `VALIDATION_ERROR` - Input validation failed
- `AUTHENTICATION_REQUIRED` - No session provided
- `INVALID_SESSION` - Session expired or invalid
- `NOT_FOUND` - Resource not found
- `DATABASE_ERROR` - Database operation failed
- `EMAIL_ERROR` - Email sending failed

---

## Rate Limiting

**Current**: Not implemented
**Planned**: 100 requests per minute per IP

---

## Webhooks (Future)

Planned webhook support for:
- Application status changes
- New application submissions
- Email delivery notifications

---

## Testing

### Test Endpoints

#### GET /api/test-db
Test database connection (development only).

**Response**:
```json
{
  "success": true,
  "message": "Database connected",
  "timestamp": "2025-01-14T10:00:00.000Z"
}
```

#### POST /api/test-email
Send test email (development only).

**Request**:
```json
{
  "to": "test@example.com"
}
```

---

## Best Practices

### Request Headers

Always include:
```
Content-Type: application/json
Accept: application/json
```

For authenticated requests:
```
Cookie: session_id=<session-id>
```

### Error Handling

Always check `success` field:
```typescript
const response = await fetch('/api/endpoint')
const data = await response.json()

if (!data.success) {
  console.error(data.error)
  // Handle error
}
```

### Pagination

For paginated endpoints:
```typescript
const page = 1
const limit = 10
const response = await fetch(`/api/endpoint?page=${page}&limit=${limit}`)
```

---

**Last Updated**: 2025-01-14
**API Version**: 1.0.0
**Base Framework**: Next.js 15 Route Handlers
