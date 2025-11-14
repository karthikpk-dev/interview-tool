import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/jdoodle': {
        target: 'https://api.jdoodle.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/jdoodle/, '/v1/execute'),
        secure: true,
      },
    },
  },
})

