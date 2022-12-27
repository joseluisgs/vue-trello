import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import removeConsole from 'vite-plugin-remove-console'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), removeConsole()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
