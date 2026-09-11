/**
 * Build locally, then upload ONLY the dist/ folder to Vercel (drag & drop).
 * dist/vercel.json has rewrites only — no build step on Vercel.
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, 'dist');

execSync('npm run build', { cwd: root, stdio: 'inherit' });

const distVercel = {
  rewrites: [{ source: '/((?!assets/).*)', destination: '/index.html' }],
};

fs.writeFileSync(path.join(dist, 'vercel.json'), JSON.stringify(distVercel, null, 2));
console.log('\nReady to upload: drag everything inside dist/ to Vercel (not the whole repo).\n');
