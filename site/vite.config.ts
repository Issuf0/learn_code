import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { SITE_URL, ROUTES } from './src/config/site';

/**
 * Injecta a URL de produção no index.html (%SITE_URL%) e gera robots.txt e
 * sitemap.xml a partir da mesma constante, para não existirem URLs duplicadas.
 */
const seoFiles = (): Plugin => {
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
  const today = new Date().toISOString().slice(0, 10);
  const sitemap =
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    Object.values(ROUTES)
      .map((r) => `  <url>\n    <loc>${SITE_URL}${r.path}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
      .join('\n') +
    `\n</urlset>\n`;

  return {
    name: 'learncode-seo-files',
    transformIndexHtml: (html) => html.replace(/%SITE_URL%/g, SITE_URL),
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots });
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap });
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/robots.txt') {
          res.setHeader('Content-Type', 'text/plain');
          res.end(robots);
        } else if (req.url === '/sitemap.xml') {
          res.setHeader('Content-Type', 'application/xml');
          res.end(sitemap);
        } else {
          next();
        }
      });
    },
  };
};

export default defineConfig({
  plugins: [react(), tailwindcss(), seoFiles()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
});
