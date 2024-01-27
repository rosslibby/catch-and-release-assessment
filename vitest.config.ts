import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'
 
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  define: {
    global: 'globalThis'
  },
  test: {
    globals: true,
    environment: 'jsdom',
    // setupFiles: './setupTest.js',
  },
})
