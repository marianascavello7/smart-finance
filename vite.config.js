import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/smart-finance/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
