import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    const pendingSection =
      location.pathname === '/' &&
      (location.state?.scrollTo || location.hash.replace('#', ''));

    if (pendingSection) return;

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname, location.hash, location.key, location.state?.scrollTo]);

  return null;
}
