/** Served from /public/resume/ — must be a real PDF (not SPA index.html). */
export const RESUME_PDF_PATH = '/resume/jaya-madhuri-resume.pdf';
export const RESUME_DOWNLOAD_NAME = 'Jayamadhuri_Resume.pdf';

export async function downloadResume() {
  const response = await fetch(RESUME_PDF_PATH, { method: 'GET', cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Resume file not found on the server.');
  }

  const contentType = response.headers.get('content-type') || '';
  const blob = await response.blob();
  const header = await blob.slice(0, 5).text();

  if (contentType.includes('text/html') || header.startsWith('<!DOC') || header.startsWith('<html')) {
    throw new Error(
      'The resume link returned a web page instead of a PDF. Add your file to public/resume/jaya-madhuri-resume.pdf and redeploy.'
    );
  }

  if (!header.startsWith('%PDF-')) {
    throw new Error('Downloaded file is not a valid PDF.');
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = RESUME_DOWNLOAD_NAME;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
