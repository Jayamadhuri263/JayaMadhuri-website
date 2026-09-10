export function calculateReadTime(content) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function trackEvent(name, data = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, data);
  }
  console.info(`[Analytics] ${name}`, data);
}

export function copyToClipboard(text) {
  return navigator.clipboard.writeText(text);
}

export function scrollToSection(sectionId, offset = 80) {
  const element = document.getElementById(sectionId);
  if (!element) return false;

  const top = element.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
  return true;
}
