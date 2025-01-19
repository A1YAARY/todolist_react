import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://csi-aptitude-portal-client.onrender.com', // Your backend server
        changeOrigin: true, // Ensure the Host header matches the target
      },
    },
  },
});
