# Deployment Guide - Aggre Capital Landing

## Prerequisites
- Node.js 18+ 
- npm atau pnpm
- PostgreSQL database (sudah dikonfigurasi)

## Setup di VPS

### 1. Upload dan Extract
```bash
# Upload file zip ke VPS
# Extract file
unzip aggre-capital-landing-production.zip
cd aggre-capital-landing-production
```

### 2. Install Dependencies
```bash
# Install dependencies
npm install
# atau
pnpm install
```

### 3. Environment Configuration
```bash
# Copy environment file
cp .env.production .env.local

# Edit environment variables sesuai VPS
nano .env.local
```

**Update URL di .env.local:**
- `NEXT_PUBLIC_DASHBOARD_URL=https://yourdomain.com/dashboard`
- `FRONTEND_URL=https://yourdomain.com`
- `CORS_ORIGIN=https://yourdomain.com`

### 4. Build Application
```bash
# Build untuk production
npm run build
```

### 5. Start Application
```bash
# Start production server
npm start
```

### 6. Setup PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start npm --name "aggre-capital" -- start

# Save PM2 configuration
pm2 save
pm2 startup
```

## Nginx Configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## SSL Setup (Let's Encrypt)
```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com
```

## File Structure
```
├── app/                 # Next.js app directory
├── components/          # React components
├── lib/                # Utility libraries
├── public/             # Static files
├── scripts/            # Database scripts
├── .env.production     # Production environment
├── package.json        # Dependencies
└── next.config.mjs     # Next.js configuration
```

## Database
Database sudah dikonfigurasi dan siap digunakan. Pastikan koneksi database berfungsi dengan baik.

## Troubleshooting

### Clear Cache
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Check Logs
```bash
# PM2 logs
pm2 logs aggre-capital

# Check status
pm2 status
```

### Restart Application
```bash
pm2 restart aggre-capital
```

## Features
- ✅ Responsive design
- ✅ Database integration
- ✅ File upload
- ✅ Email notifications
- ✅ Admin dashboard
- ✅ SEO optimized
- ✅ Production ready
