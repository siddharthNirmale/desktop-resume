import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three') || id.includes('node_modules/@react-three') || id.includes('node_modules/maath')) {
            return 'vendor-three';
          }
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/motion') || id.includes('node_modules/gsap')) {
            return 'vendor-motion';
          }
          if (id.includes('node_modules/lottie-web') || id.includes('node_modules/lottie-react')) {
            return 'vendor-lottie';
          }
        },
      },
    },
  },
})
