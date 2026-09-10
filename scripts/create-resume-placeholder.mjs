import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '../public/resume');
const outFile = path.join(outDir, 'jaya-madhuri-resume.pdf');

const pdf = `%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj
3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>endobj
4 0 obj<</Length 130>>stream
BT /F1 16 Tf 72 720 Td (Jaya Madhuri) Tj 0 -22 Td /F1 11 Tf (Replace this file with your real resume PDF.) Tj ET
endstream
endobj
5 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000267 00000 n 
0000000447 00000 n 
trailer<</Size 6/Root 1 0 R>>
startxref
527
%%EOF`;

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, pdf, 'utf8');
console.log('Created', outFile, pdf.length, 'bytes');
