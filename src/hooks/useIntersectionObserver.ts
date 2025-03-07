
import { useEffect, useRef, RefObject } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  rootMargin?: string;
  onIntersect?: (entry: IntersectionObserverEntry) => void;
}

/**
 * Custom hook for handling intersection observer functionality
 * @param options Configuration options for the intersection observer
 * @returns A ref to attach to the target element
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = '0px',
  onIntersect = (entry) => {
    if (entry.isIntersecting && entry.target.classList.contains('fade-in-section')) {
      entry.target.classList.add('is-visible');
    }
  },
}: UseIntersectionObserverProps = {}): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          onIntersect(entry);
        });
      },
      { threshold, rootMargin }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, onIntersect]);

  return ref;
}
