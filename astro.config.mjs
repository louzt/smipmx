// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  output: 'static', // Static site generation for headless WordPress
  integrations: [
    tailwind(),
    react(), // Add React support for client-side interactivity
  ],
  site: 'https://smipmx.com',
});
