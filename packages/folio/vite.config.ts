import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// /api and /data/media come from the orman-dead-api backend (:8735) — same
// origin in dev, preview, and production alike. /design/assets ships in this
// repo's public/ so the built app is self-contained.
const staticProxy = {
  '/api': process.env.VITE_API_PROXY_TARGET ?? 'http://127.0.0.1:8735',
  '/data/media': process.env.VITE_API_PROXY_TARGET ?? 'http://127.0.0.1:8735',
};

export default defineConfig({
  plugins: [react()],
  // @orman/design is a link: dependency (the orman-dead-theme repo checkout);
  // dedupe keeps its JSX on THIS app's React instance, not the theme repo's.
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  server: {
    host: '0.0.0.0',
    port: 8761,
    strictPort: true,
    proxy: staticProxy,
  },
  preview: {
    host: '0.0.0.0',
    proxy: staticProxy,
  },
});
