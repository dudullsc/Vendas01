import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { minify } from 'html-minifier-terser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

async function build() {
  const sourceHtmlPath = path.join(rootDir, 'index.html');
  const outputHtmlPath = path.join(distDir, 'index.html');
  const sourceImagesDir = path.join(rootDir, 'imagens');
  const outputImagesDir = path.join(distDir, 'imagens');
  const sourceHtaccessPath = path.join(rootDir, '.htaccess');
  const outputHtaccessPath = path.join(distDir, '.htaccess');

  await rm(distDir, { recursive: true, force: true });
  await mkdir(distDir, { recursive: true });

  const html = await readFile(sourceHtmlPath, 'utf8');
  const minifiedHtml = await minify(html, {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
    useShortDoctype: true,
    keepClosingSlash: true,
    caseSensitive: true
  });

  await writeFile(outputHtmlPath, minifiedHtml, 'utf8');
  await cp(sourceImagesDir, outputImagesDir, { recursive: true });
  await cp(sourceHtaccessPath, outputHtaccessPath);

  console.log('Build concluido com sucesso em dist/.');
}

build().catch((error) => {
  console.error('Falha no build:', error);
  process.exitCode = 1;
});
