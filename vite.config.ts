import { defineConfig } from 'vite';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react-swc';

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: 'prompt',
  includeAssets: ['main-logo.ico', 'favicon.ico'],
  manifest: {
    name: 'Programming Memory Game',
    short_name: 'Programming Memory Game',
    description: 'A fun memory game for programming enthusiasts',
    icons: [
      {
        src: 'main-logo.ico',
        sizes: '64x64 32x32 24x24 16x16',
        type: 'image/x-icon',
      },
      {
        src: 'main-logo192.png',
        type: 'image/png',
        sizes: '192x192',
      },
      {
        src: 'main-logo512.png',
        type: 'image/png',
        sizes: '512x512',
      },
      {
        src: 'main-logo192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    start_url: '.',
    display: 'standalone',
    theme_color: '#000000',
    background_color: '#ffffff',
    orientation: 'portrait',
    scope: '/',
    lang: 'en',
    categories: ['games'],
    prefer_related_applications: false,
    related_applications: [],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
});