# KeyYatri Deployment Guide (Without Docker)

## Prerequisites
- Node.js 18+ installed
- Your Supabase project URL and anon key

## Quick Start

### 1. Set up environment variables
Create a `.env` file in the project root:
```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 2. Install dependencies
```bash
npm install
```

### 3. Build and serve the app
```bash
# Option 1: Build and serve in one command
npm start

# Option 2: Build and serve separately
npm run build
npm run serve
```

The app will be available at `http://localhost:3000`

## Production Deployment Options

### Option 1: Using PM2 (Recommended for VPS/Server)
```bash
# Install PM2 globally
npm install -g pm2

# Build the app
npm run build

# Start with PM2
pm2 start serve.js --name "keyyatri"

# Save PM2 configuration
pm2 save
pm2 startup
```

### Option 2: Using nginx (Recommended for production)
1. Build the app: `npm run build`
2. Copy the `dist` folder to your web server
3. Configure nginx to serve the static files:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Option 3: Using Apache
1. Build the app: `npm run build`
2. Copy the `dist` folder to your web server
3. Create a `.htaccess` file in the `dist` folder:

```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### Option 4: Deploy to Vercel/Netlify
1. Connect your GitHub repository
2. Set environment variables in the platform dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Build command: `npm run build`
4. Publish directory: `dist`

## Environment Variables
Make sure these are set in your deployment environment:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `PORT`: Server port (default: 3000)

## Troubleshooting
- If you see "Your web app is running and waiting for your content", make sure you're running the built version, not the dev server
- Check that environment variables are properly set
- Ensure the `dist` folder exists after running `npm run build`
