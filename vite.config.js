import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import 'react-router-dom';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
