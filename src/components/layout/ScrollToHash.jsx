import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '../../utils/helpers';

export default function ScrollToHash() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== '/') return;

    const sectionId = location.state?.scrollTo || location.hash.replace('#', '');
    if (!sectionId) return;

    const timer = setTimeout(() => {
      scrollToSection(sectionId);

      if (location.state?.scrollTo) {
        navigate({ pathname: '/', hash: sectionId }, { replace: true, state: null });
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [location.pathname, location.hash, location.state, navigate]);

  return null;
}
