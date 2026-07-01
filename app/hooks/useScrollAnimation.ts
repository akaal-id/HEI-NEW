import { useEffect, useRef } from 'react';
import { runAnimeReveal } from '../lib/animeReveal';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  animationDelay?: number;
  staggerDelay?: number;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    animationDelay = 0,
    staggerDelay = 100,
  } = options;

  const sectionRef = useRef<HTMLElement | HTMLDivElement>(null);
  const elementRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            import('animejs').then((animeModule) => {
              runAnimeReveal(animeModule, elementRefs.current, {
                opacity: [0, 1],
                translateY: [30, 0],
                delay: animeModule.stagger(staggerDelay, { start: animationDelay }),
                duration: 800,
                easing: 'easeOutQuad',
              });
            });
            observer.disconnect();
          }
        });
      },
      { threshold, rootMargin }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, animationDelay, staggerDelay]);

  const addElementRef = (ref: HTMLElement | null) => {
    if (ref && !elementRefs.current.includes(ref)) {
      elementRefs.current.push(ref);
    }
  };

  return { sectionRef, addElementRef };
}
