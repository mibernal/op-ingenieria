// shared/hooks/useIntersectionObserver.ts - CORREGIR HOOK
import { useEffect, useRef, useState, useCallback, useMemo } from "react";

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  onIntersect?: () => void;
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useIntersectionObserver = ({
  onIntersect,
  threshold = 0.1,
  root = null,
  rootMargin = "0px",
  triggerOnce = false,
}: UseIntersectionObserverOptions = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<Element>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      const intersecting = entry.isIntersecting;
      
      if (intersecting) {
        setIsIntersecting(true);
        setHasIntersected(true);
        onIntersect?.();
      } else if (!triggerOnce) {
        setIsIntersecting(false);
      }
    },
    [onIntersect, triggerOnce]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold,
      root,
      rootMargin,
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [handleIntersect, threshold, root, rootMargin]);

  return { ref, isIntersecting, hasIntersected };
};

// Hook específico para lazy loading de imágenes
export const useLazyImage = (src?: string) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, isIntersecting } = useIntersectionObserver({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (!src || !isIntersecting) return;

    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => {
      console.error(`Failed to load image: ${src}`);
      setIsLoaded(false);
    };
  }, [src, isIntersecting]);

  return { ref, isLoaded, isIntersecting };
};