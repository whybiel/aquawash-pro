import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { componentTagger } from 'lovable-tagger'
import { sentryVitePlugin } from '@sentry/vite-plugin'

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    sentryVitePlugin({
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT
    }),
    mode === 'development' && componentTagger()
  ].filter(Boolean),

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  server: {
    host: '::',
    port: 8080
  },

  build: {
    sourcemap: true
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['src/test/', 'src/**/*.d.ts']
    }
  }
}))
