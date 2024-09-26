import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Output directory for the build
    rollupOptions: {
      input: 'index.html',  // Ensure the entry point is the root index.html
    },
      // Ensures all paths are relative to the current folder, not the root
    /** If you set esmExternals to true, this plugin assumes that 
      all external dependencies are ES modules */
    commonjsOptions: {
      esmExternals: true,
    },
  },
  base: '/',
})
