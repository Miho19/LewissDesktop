/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    test: { globals: true, testTimeout: 10000, env: env },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src/renderer/src'),
        '@main': resolve(__dirname, 'src/main'),
        '@renderer': resolve(__dirname, 'src/renderer/src'),
        '@shared': resolve(__dirname, './src/shared')
      }
    }
  }
})
