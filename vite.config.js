import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  optimizeDeps: {
    include: ['@supabase/supabase-js', 'tslib']
  },
  build: {
    commonjsOptions: {
      include: [/tslib/]
    }
  }
})