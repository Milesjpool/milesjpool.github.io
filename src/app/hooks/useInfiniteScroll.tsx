import { useRef, useEffect, useMemo } from "react";

export function useInfiniteScroll(
  callback: () => void,
  options: IntersectionObserverInit = {}
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const observerOptions = useMemo(() => ({
    root: options.root ?? containerRef.current,
    threshold: options.threshold,
    rootMargin: options.rootMargin,
  }), [options.root, options.threshold, options.rootMargin]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback();
        }
      });
    }, observerOptions);

    if (sentinelRef.current) {
      console.log("observing sentinel");
      observer.observe(sentinelRef.current);
    }
    return () => observer.disconnect();
  }, [callback, observerOptions]);

  return { containerRef, sentinelRef };
}
