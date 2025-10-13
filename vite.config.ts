import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import * as path from 'path';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      // This tells Vite that '@/...' means the absolute path to the './src' directory.
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
