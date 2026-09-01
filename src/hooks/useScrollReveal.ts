import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — Observes elements with `.reveal` class and adds `.revealed`
 * when they enter the viewport. Supports staggered delays via `data-reveal-delay`.
 */
export function useScrollReveal(rootSelector?: string) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const root = rootSelector ? document.querySelector(rootSelector) : null;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.revealDelay || '0';
            el.style.transitionDelay = `${delay}ms`;
            el.classList.add('revealed');
            observerRef.current?.unobserve(el);
          }
        });
      },
      {
        root: root as Element | null,
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [rootSelector]);
}
