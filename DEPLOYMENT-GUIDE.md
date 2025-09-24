# 🚀 KeyYatri Deployment Guide

## ❌ Current Issue: Azure App Service
Azure App Service is designed for server-side applications, but KeyYatri is a React app that should be deployed as static files. This is why you're getting "Couldn't detect a version for the platform 'nodejs'" errors.

## ✅ Recommended Solution: Azure Static Web Apps

### Step 1: Create Azure Static Web App
1. Go to [Azure Portal](https://portal.azure.com)
2. Click **Create a resource**
3. Search for **Static Web Apps**
4. Click **Create**

### Step 2: Configure the Static Web App
1. **Subscription**: Choose your subscription
2. **Resource Group**: Create new or use existing
3. **Name**: `keyyatri-app` (or your preferred name)
4. **Plan type**: Free (perfect for React apps)
5. **Region**: Choose closest to your users
6. **Source**: GitHub
7. **GitHub account**: Sign in and select your account
8. **Organization**: Select `yatricloud`
9. **Repository**: Select `keyyatri-live`
10. **Branch**: `main`

### Step 3: Build Configuration
- **App location**: `/` (root directory)
- **API location**: Leave empty
- **Output location**: `dist`

### Step 4: Set Environment Variables
After creating the Static Web App:
1. Go to **Configuration** → **Application settings**
2. Add these variables:
   ```
   VITE_SUPABASE_URL = https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY = your-anon-key-here
   ```

### Step 5: Deploy
1. Click **Review + Create**
2. Click **Create**
3. Azure will automatically:
   - Create a GitHub Action workflow
   - Deploy your app
   - Provide you with a URL

## 🎯 Alternative: Other Hosting Platforms

### Vercel (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy automatically

### Netlify
1. Go to [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Set environment variables
5. Deploy

### GitHub Pages
1. Go to repository **Settings** → **Pages**
2. Source: **GitHub Actions**
3. The workflow will be created automatically
4. Set environment variables in repository secrets

## 🔧 Why Static Web Apps is Better

✅ **Designed for React apps** - No server configuration needed
✅ **Automatic deployments** - Deploys on every push to main
✅ **Built-in CDN** - Fast loading worldwide
✅ **Free tier** - Perfect for personal projects
✅ **Custom domains** - Easy to add your own domain
✅ **No Node.js detection issues** - Just serves static files

## 🚨 Current Azure App Service Issues

The current deployment fails because:
- Azure App Service expects a Node.js server application
- Your React app is a client-side application
- The build process is trying to run a server instead of serving static files
- Environment variables need to be available at build time, not runtime

## 📝 Next Steps

1. **Create Azure Static Web App** (recommended)
2. **Or switch to Vercel/Netlify** for easier deployment
3. **Delete the current Azure App Service** to avoid confusion
4. **Set environment variables** in the new platform
5. **Enjoy automatic deployments** on every code push!

The GitHub Actions workflow I created will handle everything automatically once you set up the Static Web App.
