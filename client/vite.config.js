import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':"http://10.30.28.71:5000"
    }
  },
  plugins: [react()],
})
