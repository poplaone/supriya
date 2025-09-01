import { useEffect } from 'react';

// Simple animation helper
export const useAnimation = (elementRef, delay = 0) => {
  useEffect(() => {
    if (elementRef.current) {
      const timer = setTimeout(() => {
        elementRef.current.style.opacity = '1';
        elementRef.current.style.transform = 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)';
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [elementRef, delay]);
};

// Scroll animation helper
export const useScrollAnimation = (elementRef, threshold = 0.1) => {
  useEffect(() => {
    if (!elementRef.current) return;
    
    const element = elementRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.style.opacity = '1';
          element.style.transform = 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)';
        }
      },
      { threshold }
    );
    
    observer.observe(element);
    
    return () => observer.disconnect();
  }, [elementRef, threshold]);
};