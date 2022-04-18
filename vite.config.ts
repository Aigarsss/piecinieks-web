import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/scss/global.scss";`
      }
    }
  },
  plugins: [react()]
})
