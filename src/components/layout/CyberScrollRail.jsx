import { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function CyberScrollRail() {
  const { isDark } = useTheme();
  const trackRef = useRef(null);
  const dragRef = useRef({ active: false, offsetY: 0 });

  const [state, setState] = useState({
    progress: 0,
    thumbRatio: 1,
    show: false,
  });

  const measure = useCallback(() => {
    const doc = document.documentElement;
    const viewH = window.innerHeight;
    const scrollH = doc.scrollHeight;
    const maxScroll = scrollH - viewH;
    const show = maxScroll > 24;
    const thumbRatio = show ? Math.min(1, Math.max(0.07, viewH / scrollH)) : 1;
    const progress = show && maxScroll > 0 ? window.scrollY / maxScroll : 0;
    setState({ progress, thumbRatio, show });
  }, []);

  const scrollToProgress = useCallback((progress) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const clamped = Math.min(1, Math.max(0, progress));
    window.scrollTo({ top: clamped * maxScroll, behavior: 'auto' });
  }, []);

  const progressFromClientY = useCallback((clientY) => {
    const track = trackRef.current;
    if (!track) return 0;
    const rect = track.getBoundingClientRect();
    const travel = rect.height * (1 - state.thumbRatio);
    if (travel <= 0) return 0;
    const y = clientY - rect.top - (rect.height * state.thumbRatio) / 2;
    return y / travel;
  }, [state.thumbRatio]);

  useEffect(() => {
    measure();
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    const ro = new ResizeObserver(measure);
    ro.observe(document.documentElement);
    if (document.body) ro.observe(document.body);

    const onPointerMove = (e) => {
      if (!dragRef.current.active) return;
      scrollToProgress(progressFromClientY(e.clientY) - dragRef.current.offsetY);
    };
    const onPointerUp = () => {
      dragRef.current.active = false;
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    return () => {
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
  }, [measure, progressFromClientY, scrollToProgress]);

  const onTrackPointerDown = (e) => {
    if (e.button !== 0) return;
    scrollToProgress(progressFromClientY(e.clientY));
  };

  const onThumbPointerDown = (e) => {
    e.stopPropagation();
    if (e.button !== 0) return;
    const p = progressFromClientY(e.clientY);
    dragRef.current = {
      active: true,
      offsetY: p - state.progress,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  if (!state.show) return null;

  const thumbHeightPct = state.thumbRatio * 100;
  const thumbTopPct = state.progress * (100 - thumbHeightPct);
  const progressLinePct = (state.progress + state.thumbRatio / 2) * 100;

  return (
    <div
      className={`cyber-scroll-rail pointer-events-none hidden lg:block ${
        isDark ? 'cyber-scroll-rail--dark' : 'cyber-scroll-rail--light'
      }`}
      aria-hidden
    >
      <div className="cyber-scroll-rail__halo" />
      <div className="cyber-scroll-rail__ticks" />
      <div
        ref={trackRef}
        className="cyber-scroll-rail__track pointer-events-auto"
        onPointerDown={onTrackPointerDown}
        role="presentation"
      >
        <div className="cyber-scroll-rail__beam" style={{ height: `${progressLinePct}%` }} />
        <div
          className="cyber-scroll-rail__thumb"
          style={{ height: `${thumbHeightPct}%`, top: `${thumbTopPct}%` }}
          onPointerDown={onThumbPointerDown}
        >
          <span className="cyber-scroll-rail__thumb-glow" />
          <span className="cyber-scroll-rail__thumb-core" />
        </div>
      </div>
    </div>
  );
}
