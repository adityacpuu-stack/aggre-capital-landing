# Database Schema Documentation - Aggre Capital Landing Page

## Overview

Database: **PostgreSQL**
Connection: Pool-based (max 20 connections)
SSL: Enabled (rejectUnauthorized: false for development)

## Tables

### 1. users

Admin user table for authentication.

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  role VARCHAR(50) DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

**Columns**:
- `id`: Auto-increment primary key
- `email`: Unique email address
- `password_hash`: bcrypt hashed password
- `full_name`: User's full name
- `role`: User role (`admin`, `super_admin`)
- `is_active`: Account status
- `created_at`: Registration timestamp
- `updated_at`: Last update timestamp
- `last_login_at`: Last login timestamp

**Constraints**:
- Email must be unique
- Password hash required
- Default role: `admin`

---

### 2. sessions

Session management table for authentication.

```sql
CREATE TABLE sessions (
  id VARCHAR(255) PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  user_email VARCHAR(255) NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,
  last_activity_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_expires_at ON sessions(expires_at);
CREATE INDEX idx_sessions_user_email ON sessions(user_email);
```

**Columns**:
- `id`: UUID session identifier
- `user_id`: Foreign key to users table
- `user_email`: Cached email for quick lookups
- `ip_address`: Client IP address
- `user_agent`: Browser/client information
- `created_at`: Session creation time
- `expires_at`: Session expiry time (24h)
- `last_activity_at`: Last activity timestamp

**Cleanup**: Expired sessions should be cleaned periodically

```sql
-- Cleanup expired sessions
DELETE FROM sessions WHERE expires_at < NOW();
```

---

### 3. applications

Loan application submissions.

```sql
CREATE TABLE applications (
  id VARCHAR(50) PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  amount BIGINT NOT NULL CHECK (amount >= 1000000),
  purpose TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  occupation VARCHAR(100),
  workplace VARCHAR(100),
  address TEXT,
  collateral_type VARCHAR(50),
  collateral_address TEXT,
  notes TEXT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewed_by INTEGER REFERENCES users(id),
  reviewed_at TIMESTAMP
);

CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_customer_email ON applications(customer_email);
CREATE INDEX idx_applications_submitted_at ON applications(submitted_at DESC);
CREATE INDEX idx_applications_amount ON applications(amount);
```

**Columns**:
- `id`: Application ID (format: APP001, APP002, etc.)
- `customer_name`: Customer full name
- `customer_email`: Contact email
- `customer_phone`: Contact phone (Indonesian format)
- `amount`: Loan amount in IDR
- `purpose`: Loan purpose/reason
- `status`: Application status
- `occupation`: Customer occupation
- `workplace`: Place of work
- `address`: Residential address
- `collateral_type`: Type of collateral
- `collateral_address`: Collateral location
- `notes`: Admin notes
- `submitted_at`: Submission timestamp
- `updated_at`: Last update timestamp
- `reviewed_by`: Admin who reviewed
- `reviewed_at`: Review timestamp

**Status Values**:
- `pending`: Initial status
- `in-review`: Under review
- `approved`: Loan approved
- `rejected`: Application rejected
- `completed`: Process completed

**Validation**:
- Amount minimum: 1,000,000 IDR
- Email must be valid format
- Phone must be Indonesian format

---

### 4. news

News articles and blog posts.

```sql
CREATE TABLE news (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  image_url VARCHAR(500),
  author VARCHAR(100),
  status VARCHAR(20) DEFAULT 'draft',
  category VARCHAR(50),
  views INTEGER DEFAULT 0,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER REFERENCES users(id),
  updated_by INTEGER REFERENCES users(id)
);

CREATE INDEX idx_news_slug ON news(slug);
CREATE INDEX idx_news_status ON news(status);
CREATE INDEX idx_news_published_at ON news(published_at DESC);
CREATE INDEX idx_news_category ON news(category);
CREATE UNIQUE INDEX idx_news_slug_unique ON news(slug);
```

**Columns**:
- `id`: Auto-increment primary key
- `title`: Article title
- `slug`: URL-friendly identifier
- `excerpt`: Short description
- `content`: Full article content (HTML)
- `image_url`: Featured image URL
- `author`: Author name
- `status`: Publication status
- `category`: Article category
- `views`: View count
- `published_at`: Publication timestamp
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp
- `created_by`: Author user ID
- `updated_by`: Last editor user ID

**Status Values**:
- `draft`: Not published
- `published`: Live article

**Categories** (suggested):
- `announcement`
- `news`
- `tips`
- `updates`

---

### 5. partners_strategic

Strategic business partners.

```sql
CREATE TABLE partners_strategic (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  logo VARCHAR(500),
  description TEXT,
  website VARCHAR(255),
  category VARCHAR(50),
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_partners_strategic_order ON partners_strategic(order_index);
CREATE INDEX idx_partners_strategic_active ON partners_strategic(is_active);
```

**Columns**:
- `id`: Auto-increment primary key
- `name`: Partner company name
- `logo`: Logo image URL
- `description`: Partner description
- `website`: Partner website URL
- `category`: Partner category
- `order_index`: Display order
- `is_active`: Active status
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

---

### 6. partners_ecosystem

Ecosystem partners (similar to strategic partners).

```sql
CREATE TABLE partners_ecosystem (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  logo VARCHAR(500),
  description TEXT,
  website VARCHAR(255),
  category VARCHAR(50),
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_partners_ecosystem_order ON partners_ecosystem(order_index);
CREATE INDEX idx_partners_ecosystem_active ON partners_ecosystem(is_active);
```

**Columns**: Same as partners_strategic

---

### 7. testimonials

Customer testimonials.

```sql
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  customer_company VARCHAR(100),
  position VARCHAR(100),
  testimonial TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  image_url VARCHAR(500),
  is_published BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_testimonials_published ON testimonials(is_published);
CREATE INDEX idx_testimonials_rating ON testimonials(rating DESC);
CREATE INDEX idx_testimonials_order ON testimonials(order_index);
```

**Columns**:
- `id`: Auto-increment primary key
- `customer_name`: Customer full name
- `customer_company`: Company name
- `position`: Job position/title
- `testimonial`: Testimonial text
- `rating`: Star rating (1-5)
- `image_url`: Customer photo URL
- `is_published`: Published status
- `order_index`: Display order
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

**Validation**:
- Rating must be between 1 and 5

---

### 8. smtp_settings

Email SMTP configuration.

```sql
CREATE TABLE smtp_settings (
  id SERIAL PRIMARY KEY,
  smtp_host VARCHAR(255) NOT NULL,
  smtp_port INTEGER NOT NULL,
  smtp_user VARCHAR(255) NOT NULL,
  smtp_password VARCHAR(255) NOT NULL,
  smtp_secure BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  is_primary BOOLEAN DEFAULT false,
  name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_smtp_settings_active ON smtp_settings(is_active);
CREATE INDEX idx_smtp_settings_primary ON smtp_settings(is_primary);
```

**Columns**:
- `id`: Auto-increment primary key
- `smtp_host`: SMTP server host
- `smtp_port`: SMTP port (465 for SSL, 587 for TLS)
- `smtp_user`: SMTP username
- `smtp_password`: SMTP password (encrypted)
- `smtp_secure`: Use SSL/TLS
- `is_active`: Active status
- `is_primary`: Primary SMTP server
- `name`: Configuration name
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

---

## Relationships

```
users (1) ----< (many) sessions
users (1) ----< (many) applications.reviewed_by
users (1) ----< (many) news.created_by
users (1) ----< (many) news.updated_by
```

## Database Functions

### Auto-update timestamp trigger

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Repeat for other tables...
```

### Application ID Generator

```sql
CREATE OR REPLACE FUNCTION generate_application_id()
RETURNS TEXT AS $$
DECLARE
  next_id INTEGER;
  app_id TEXT;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(id FROM 4) AS INTEGER)), 0) + 1
  INTO next_id
  FROM applications;

  app_id := 'APP' || LPAD(next_id::TEXT, 6, '0');
  RETURN app_id;
END;
$$ LANGUAGE plpgsql;
```

---

## Queries

### Common Queries

#### Get pending applications
```sql
SELECT * FROM applications
WHERE status = 'pending'
ORDER BY submitted_at DESC
LIMIT 10;
```

#### Get published news with pagination
```sql
SELECT id, title, slug, excerpt, image_url, published_at
FROM news
WHERE status = 'published'
ORDER BY published_at DESC
LIMIT 6 OFFSET 0;
```

#### Get dashboard statistics
```sql
SELECT
  (SELECT COUNT(*) FROM applications) AS total_applications,
  (SELECT COUNT(*) FROM applications WHERE status = 'pending') AS pending_applications,
  (SELECT COUNT(*) FROM applications WHERE status = 'approved') AS approved_applications,
  (SELECT COUNT(*) FROM news WHERE status = 'published') AS published_news,
  (SELECT COUNT(*) FROM testimonials WHERE is_published = true) AS published_testimonials;
```

#### Clean expired sessions
```sql
DELETE FROM sessions
WHERE expires_at < NOW();
```

#### Get active session
```sql
SELECT s.*, u.full_name, u.role
FROM sessions s
JOIN users u ON s.user_id = u.id
WHERE s.id = $1
AND s.expires_at > NOW();
```

---

## Indexes Summary

**Performance-critical indexes**:
- `applications.status` - Fast status filtering
- `applications.submitted_at` - Date range queries
- `news.slug` - URL lookups
- `news.published_at` - Recent articles
- `sessions.expires_at` - Cleanup queries
- `users.email` - Login lookups

---

## Backup Strategy

### Recommended Backup Schedule

**Daily**: Full database backup
**Hourly**: Incremental backup (for high-traffic)
**Weekly**: Archive backup

### Backup Command

```bash
# Full backup
pg_dump -h host -U user -d database > backup_$(date +%Y%m%d).sql

# Compressed backup
pg_dump -h host -U user -d database | gzip > backup_$(date +%Y%m%d).sql.gz

# Restore
psql -h host -U user -d database < backup.sql
```

---

## Maintenance

### Regular Maintenance Tasks

#### 1. Vacuum (weekly)
```sql
VACUUM ANALYZE;
```

#### 2. Update statistics
```sql
ANALYZE;
```

#### 3. Clean old sessions (daily)
```sql
DELETE FROM sessions WHERE expires_at < NOW() - INTERVAL '7 days';
```

#### 4. Archive old applications (monthly)
```sql
-- Archive applications older than 2 years
CREATE TABLE applications_archive AS
SELECT * FROM applications
WHERE submitted_at < NOW() - INTERVAL '2 years';

DELETE FROM applications
WHERE submitted_at < NOW() - INTERVAL '2 years';
```

---

## Security

### Password Storage
- **Method**: bcrypt
- **Rounds**: 10
- **Never** store plain text passwords

### Session Security
- **Expiry**: 24 hours
- **IP tracking**: Enabled
- **User agent**: Logged

### Database Access
- **Production**: Read-only user for reports
- **Application**: Limited permissions
- **Admin**: Full access (restricted IPs)

---

## Migration Scripts

### Initial Setup

```sql
-- Create database
CREATE DATABASE aggre_capital;

-- Create tables in order
-- (see table definitions above)

-- Create indexes
-- (see index definitions above)

-- Create triggers
-- (see trigger definitions above)

-- Insert default admin user
INSERT INTO users (email, password_hash, full_name, role)
VALUES (
  'admin@aggrecapital.com',
  '$2a$10$...',  -- bcrypt hash of password
  'Admin User',
  'super_admin'
);
```

---

## Performance Optimization

### Query Optimization Tips

1. **Always use indexes** for WHERE clauses
2. **Limit results** with LIMIT/OFFSET
3. **Use prepared statements** (parameterized queries)
4. **Avoid N+1 queries** (use JOINs)
5. **Cache frequent queries** (Redis recommended)

### Connection Pooling

Current configuration:
```typescript
{
  max: 20,              // Maximum connections
  idleTimeoutMillis: 30000,  // 30s idle timeout
  connectionTimeoutMillis: 10000  // 10s connection timeout
}
```

---

## Monitoring

### Key Metrics to Monitor

- Active connections
- Slow queries (>100ms)
- Deadlocks
- Table bloat
- Index usage
- Cache hit ratio

### Monitoring Queries

```sql
-- Active connections
SELECT count(*) FROM pg_stat_activity;

-- Slow queries
SELECT query, calls, total_time, mean_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;

-- Table sizes
SELECT
  table_name,
  pg_size_pretty(pg_total_relation_size(table_name::regclass)) AS size
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY pg_total_relation_size(table_name::regclass) DESC;
```

---

**Last Updated**: 2025-01-14
**Database Version**: PostgreSQL 14+
**Schema Version**: 1.0.0
