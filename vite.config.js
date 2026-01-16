import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  // Optimizaciones de build
  build: {
    // Generar sourcemaps solo en desarrollo
    sourcemap: false,
    
    // Optimizar chunks
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar vendors grandes
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer-motion': ['framer-motion'],
          'axios': ['axios'],
        }
      }
    },
    
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    
    // Minificar
    minify: 'esbuild',
    
    // Target moderno
    target: 'esnext'
  },
  
  // Preview server config
  preview: {
    port: 4173,
    strictPort: true,
  },
  
  // Server config (desarrollo)
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    open: true
  }
})

