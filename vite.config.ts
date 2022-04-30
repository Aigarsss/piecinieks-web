import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const path = require('path');
import svgrPlugin from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa'

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
  plugins: [
    react(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
    VitePWA({
      includeAssets: ['favicon.svg', 'robots.txt', '180-apple-touch.png'],
      manifest: {
        name: '5inieks',
        short_name: '5inieks',
        description: '5inieka quizz',
        theme_color: '#FF3008',
        icons: [
          {
            src: '192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '192_maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '512_maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          }
        ]
      }
    })
  ]
})

// TODO
// https://vite-plugin-pwa.netlify.app/guide/inject-manifest.html
