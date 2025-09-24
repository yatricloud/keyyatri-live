# Azure App Service Deployment Guide

## Current Issue: Application Error

The app is showing "Application Error" which typically means:
1. Missing environment variables
2. Wrong startup command
3. Build/runtime issues

## Quick Fix Steps:

### 1. Set Environment Variables in Azure Portal
Go to **Configuration** → **Application settings** and add:
```
VITE_SUPABASE_URL = https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY = your-anon-key-here
```

### 2. Set Startup Command
Go to **Configuration** → **General settings**:
- **Startup Command**: Leave empty (uses package.json start script)
- **Node Version**: 18 LTS

### 3. Check Logs
Go to **Monitoring** → **Log stream** to see real-time logs

## Alternative: Use Azure Static Web Apps (Recommended)

For React apps, Azure Static Web Apps is better:

1. **Create new Azure Static Web App**:
   - Go to Azure Portal
   - Create new resource → Static Web App
   - Connect your GitHub repository

2. **Configure build**:
   - App location: `/`
   - Build command: `npm run build`
   - Output location: `dist`

3. **Set environment variables** in the Static Web App configuration

## Manual Deployment (If needed)

If Azure App Service continues to fail:

1. **Build locally**:
   ```bash
   npm run build
   ```

2. **Upload dist folder** to Azure App Service using FTP or Azure CLI

3. **Set environment variables** in Azure Portal

## Troubleshooting

- Check **Log stream** for specific error messages
- Verify environment variables are set correctly
- Ensure the `dist` folder exists after build
- Try the Static Web Apps approach for better React support
