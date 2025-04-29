
import { useEffect, useRef } from 'react';

interface UseIntersectionVisibilityProps {
  threshold?: number;
  rootMargin?: string;
}

const useIntersectionVisibility = <T extends HTMLElement>({ 
  threshold = 0.1, 
  rootMargin = "0px" 
}: UseIntersectionVisibilityProps = {}) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin]);

  return ref;
};

export default useIntersectionVisibility;
