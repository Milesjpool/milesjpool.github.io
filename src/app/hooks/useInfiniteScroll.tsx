import { useRef, useEffect } from "react";

export function useInfiniteScroll(callback: () => void, options: IntersectionObserverInit = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback();
        }
      });
    }, {
      root: containerRef.current,
      ...options
    });
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }
    return () => observer.disconnect();
  }, [callback, options]);
  return { containerRef, sentinelRef };
}
