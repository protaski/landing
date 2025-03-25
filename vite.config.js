import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: 'public',
  server: {
    fs: {
      allow: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'public')]
    }
  },
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'public/index.html'),
        feedback: path.resolve(__dirname, 'public/feedback.html'),
        privacy: path.resolve(__dirname, 'public/privacy.html'),
        terms: path.resolve(__dirname, 'public/terms.html'),
        error: path.resolve(__dirname, 'public/404.html')
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
});