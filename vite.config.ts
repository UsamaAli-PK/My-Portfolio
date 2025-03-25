import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['framer-motion', 'lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false
  },
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/blog': {
        target: 'https://your-domain.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
});
