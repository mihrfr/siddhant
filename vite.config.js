import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  publicDir: false,
  assetsInclude: ['**/*.jpeg', '**/*.jpg', '**/*.png', '**/*.gif', '**/*.webp'],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
  }
})
