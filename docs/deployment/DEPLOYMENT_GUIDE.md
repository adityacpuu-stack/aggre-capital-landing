# Deployment Guide - Aggre Capital Landing Page

## Overview

This guide covers deployment to Vercel (recommended) and alternative deployment options.

## Prerequisites

- Node.js 20+ LTS installed
- npm 10+ installed
- Git repository
- PostgreSQL database (cloud-hosted)
- SMTP credentials (GoDaddy/Gmail)
- Vercel account (for Vercel deployment)

---

## Vercel Deployment (Recommended)

### Initial Setup

#### 1. Create Vercel Account
- Go to https://vercel.com
- Sign up with GitHub/GitLab/Bitbucket
- Connect your repository

#### 2. Import Project
```bash
# Using Vercel CLI
npm i -g vercel
vercel login
vercel
```

OR

- Go to Vercel Dashboard
- Click "New Project"
- Import Git Repository
- Select `aggre-capital-landing`

#### 3. Configure Build Settings

**Framework Preset**: Next.js
**Build Command**: `npm run build`
**Output Directory**: `.next` (auto-detected)
**Install Command**: `npm install`
**Development Command**: `npm run dev`

#### 4. Environment Variables

Add these in Vercel Dashboard → Project → Settings → Environment Variables:

**Production Variables**:
```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# Email (Primary - GoDaddy)
EMAIL_USER=support@pfigroup.id
EMAIL_PASSWORD=your-godaddy-password
ADMIN_EMAIL=admin@aggrecapital.com

# Email (Fallback - Gmail)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-gmail-app-password

# Application
NEXT_PUBLIC_DASHBOARD_URL=https://your-domain.vercel.app/dashboard

# Optional
EMAIL_DISABLED=false
NODE_ENV=production
```

**Important**:
- Use "Production" environment for main branch
- Use "Preview" for feature branches
- Never commit `.env` files to git

#### 5. Deploy

```bash
# Automatic deployment (when pushing to main)
git push origin main

# Manual deployment via CLI
vercel --prod
```

**Deployment URL**: `https://your-project.vercel.app`

---

## Custom Domain Setup (Vercel)

#### 1. Add Domain
- Go to Project Settings → Domains
- Add your domain: `aggrecapital.com`
- Add www subdomain: `www.aggrecapital.com`

#### 2. Configure DNS

**For Vercel DNS**:
- Add A record: `@` → `76.76.21.21`
- Add CNAME record: `www` → `cname.vercel-dns.com`

**For External DNS (e.g., GoDaddy)**:
```
Type  | Name | Value
------|------|------
A     | @    | 76.76.21.21
CNAME | www  | cname.vercel-dns.com
```

#### 3. SSL Certificate
- Vercel automatically provisions SSL certificates
- Wait 24-48 hours for DNS propagation
- Force HTTPS in Vercel settings

---

## Database Setup

### PostgreSQL Cloud Options

#### 1. Vercel Postgres (Recommended)
```bash
# Install Vercel Postgres
vercel postgres create

# Get connection string
vercel env pull .env.local
```

#### 2. Supabase
- Create account at https://supabase.com
- Create new project
- Copy connection string
- Update DATABASE_URL environment variable

#### 3. Neon.tech
- Create account at https://neon.tech
- Create new project
- Copy connection string
- Update DATABASE_URL environment variable

#### 4. Railway.app
- Create account at https://railway.app
- Add PostgreSQL service
- Copy connection string
- Update DATABASE_URL environment variable

### Database Initialization

```sql
-- Connect to your database
psql -h your-host -U your-user -d your-db

-- Run schema
-- (Copy from docs/database/DATABASE_SCHEMA.md)

-- Create tables
CREATE TABLE users (...);
CREATE TABLE sessions (...);
CREATE TABLE applications (...);
-- etc...

-- Create indexes
CREATE INDEX idx_applications_status ON applications(status);
-- etc...

-- Insert default admin
INSERT INTO users (email, password_hash, full_name, role)
VALUES ('admin@aggrecapital.com', '$2a$10$...', 'Admin User', 'super_admin');
```

---

## Email Setup

### GoDaddy SMTP (Primary)

**Settings**:
```
Host: smtpout.secureserver.net
Port: 465 (SSL)
Username: support@pfigroup.id
Password: (from GoDaddy)
```

**Setup Steps**:
1. Log into GoDaddy
2. Go to Email & Office → Workspace Email
3. Get SMTP credentials
4. Add to Vercel environment variables

### Gmail SMTP (Fallback)

**Settings**:
```
Host: smtp.gmail.com
Port: 587 (TLS)
Username: your-email@gmail.com
Password: App Password (not your Gmail password!)
```

**Setup Steps**:
1. Enable 2-Factor Authentication on Gmail
2. Go to Google Account → Security → App Passwords
3. Generate new app password
4. Add to Vercel environment variables

### Test Email Configuration

```bash
# After deployment
curl -X POST https://your-domain.vercel.app/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"to":"test@example.com"}'
```

---

## Build Optimization

### Next.js Configuration

**next.config.js**:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['your-domain.com'],
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
}

module.exports = nextConfig
```

### Environment-specific Builds

```json
{
  "scripts": {
    "build": "next build",
    "build:analyze": "ANALYZE=true next build",
    "start": "next start -p $PORT"
  }
}
```

---

## Performance Monitoring

### Vercel Analytics

Enable in Vercel Dashboard:
- Go to Project → Analytics
- Enable Web Analytics
- Enable Speed Insights

### Custom Monitoring

Add to your pages:
```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

---

## CI/CD Pipeline

### Automatic Deployments

**Vercel automatically deploys**:
- `main` branch → Production
- `feature/*` branches → Preview deployments
- Pull requests → Preview deployments

### GitHub Actions (Optional)

**.github/workflows/ci.yml**:
```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20'

    - name: Install dependencies
      run: npm ci

    - name: Lint
      run: npm run lint

    - name: Type check
      run: npx tsc --noEmit

    - name: Build
      run: npm run build
```

---

## Alternative Deployment Options

### 1. Docker Deployment

**Dockerfile**:
```dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

**docker-compose.yml**:
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - EMAIL_USER=${EMAIL_USER}
      - EMAIL_PASSWORD=${EMAIL_PASSWORD}
    depends_on:
      - postgres

  postgres:
    image: postgres:14-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=aggre_capital
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

**Deploy**:
```bash
docker-compose up -d
```

### 2. Self-Hosted (VPS)

**Requirements**:
- Ubuntu 22.04 LTS
- Node.js 20+
- Nginx
- PostgreSQL 14+
- PM2 process manager

**Setup Steps**:

```bash
# 1. Update system
sudo apt update && sudo apt upgrade -y

# 2. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 3. Install PM2
sudo npm install -g pm2

# 4. Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# 5. Clone repository
git clone https://github.com/your-repo/aggre-capital-landing.git
cd aggre-capital-landing

# 6. Install dependencies
npm install

# 7. Build
npm run build

# 8. Start with PM2
pm2 start npm --name "aggre-capital" -- start
pm2 save
pm2 startup
```

**Nginx Configuration** (`/etc/nginx/sites-available/aggre-capital`):
```nginx
server {
    listen 80;
    server_name aggrecapital.com www.aggrecapital.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**SSL with Let's Encrypt**:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d aggrecapital.com -d www.aggrecapital.com
```

---

## Rollback Strategy

### Vercel Rollback

**Via Dashboard**:
1. Go to Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

**Via CLI**:
```bash
vercel rollback
```

### Git Rollback

```bash
# Revert last commit
git revert HEAD
git push origin main

# Revert to specific commit
git revert <commit-hash>
git push origin main
```

---

## Health Checks

### Endpoint Monitoring

**Health Check Endpoint** (`/api/health`):
```typescript
export async function GET() {
  try {
    // Test database
    await query('SELECT 1')

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected'
    })
  } catch (error) {
    return NextResponse.json(
      { status: 'unhealthy', error: 'Database connection failed' },
      { status: 500 }
    )
  }
}
```

**Uptime Monitoring Tools**:
- UptimeRobot (free)
- Pingdom
- Better Uptime
- Vercel built-in monitoring

---

## Troubleshooting

### Common Issues

#### 1. Build Failures

**Error**: `Module not found`
**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### 2. Database Connection Issues

**Error**: `Connection timeout`
**Solution**:
- Check DATABASE_URL environment variable
- Verify database is accessible from Vercel
- Check SSL settings
- Whitelist Vercel IPs in database firewall

#### 3. Email Sending Failures

**Error**: `SMTP connection failed`
**Solution**:
- Verify SMTP credentials
- Check port (465 for SSL, 587 for TLS)
- Test with fallback Gmail SMTP
- Check firewall rules

#### 4. Environment Variables Not Working

**Solution**:
- Redeploy after adding environment variables
- Check variable names (case-sensitive)
- Verify variables are in correct environment (Production/Preview)

---

## Security Checklist

- [ ] Environment variables secured (not in code)
- [ ] DATABASE_URL uses SSL
- [ ] SMTP credentials encrypted
- [ ] HTTPS enabled
- [ ] CORS configured properly
- [ ] Rate limiting enabled (TODO)
- [ ] Session cookies HTTP-only & Secure
- [ ] CSP headers configured
- [ ] No console.logs in production

---

## Monitoring & Logging

### Vercel Logs

```bash
# View real-time logs
vercel logs --follow

# View specific deployment logs
vercel logs [deployment-url]
```

### Custom Logging

Add structured logging:
```typescript
console.log(JSON.stringify({
  level: 'info',
  message: 'Application started',
  timestamp: new Date().toISOString()
}))
```

---

## Backup Strategy

### Database Backups

**Automated** (recommended):
- Enable automatic backups on your database provider
- Retention: 7 days minimum

**Manual**:
```bash
# Export database
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Import database
psql $DATABASE_URL < backup.sql
```

### Code Backups

- Git repository (primary backup)
- GitHub/GitLab (remote backup)
- Regular commits and tags

---

## Post-Deployment Checklist

- [ ] Application accessible at domain
- [ ] Database connected successfully
- [ ] Email notifications working
- [ ] Admin login working
- [ ] SSL certificate active
- [ ] Analytics tracking working
- [ ] All environment variables set
- [ ] Health check endpoint responding
- [ ] Error tracking configured
- [ ] Backup strategy in place

---

**Last Updated**: 2025-01-14
**Deployment Platform**: Vercel
**Estimated Deployment Time**: 5-10 minutes
