import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: '0.0.0.0', // Allow external access
    port: 5173,       // Ensure it's running on the correct port
    strictPort: true, // Prevent Vite from changing ports
  },
});
