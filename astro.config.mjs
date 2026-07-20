import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const workerOverride = {
  name: 'worker-override',
  hooks: {
    'astro:build:done': ({ dir }) => {
      rmSync(fileURLToPath(new URL('_worker.js', dir)), { recursive: true, force: true });
      writeFileSync(fileURLToPath(new URL('_routes.json', dir)),
        JSON.stringify({ version: 1, include: ['/*'], exclude: [] }));
    }
  }
};

export default defineConfig({
  site: 'https://www.braininjurycalc.com',
  output: 'static',
  integrations: [sitemap(), workerOverride],
  build: { inlineStylesheets: 'auto' },
});
