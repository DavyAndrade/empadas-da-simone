// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  site: 'https://empadas-da-simone.vercel.app',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
});
