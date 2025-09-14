import { useRef, useEffect, useMemo } from "react";

type Callback = () => void;

export function useInfiniteScroll(
  callback: Callback,
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
      const isIntersecting = entries.some(entry => entry.isIntersecting);
      if (isIntersecting) {
        callback();
      }
    }, observerOptions);

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [callback, observerOptions]);

  return { containerRef, sentinelRef };
}
