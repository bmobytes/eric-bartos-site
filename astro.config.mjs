// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: process.env.ASTRO_SITE || 'https://bartos.cloud',
  base: process.env.ASTRO_BASE || '/',
  output: 'static',
});
