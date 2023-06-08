/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.tsx',
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html', 'lcov'],
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80,
      all: true,
      exclude: [
        '**/*.storybook',
        '**/*.stories.{ts,tsx}',
        '**/*.slice.{ts,tsx}',
        '**/hooks/*.{ts,tsx}',
      ],
    },
  },
});
