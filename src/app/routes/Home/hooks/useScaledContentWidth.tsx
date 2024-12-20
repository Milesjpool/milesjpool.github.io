import { useRef, useEffect, useCallback } from "react";

export function useScaledContentWidth(setScale: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLIFrameElement>(null);

  const scaleIframe = useCallback(() => {
    if (containerRef.current && contentRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const iframeWidth = contentRef.current.offsetWidth;
      const scale = containerWidth / iframeWidth;
      setScale(scale);
    }
  }, [setScale, containerRef, contentRef]);

  useEffect(() => {
    scaleIframe();
    window.addEventListener('resize', scaleIframe);
    return () => window.removeEventListener('resize', scaleIframe);
  }, [scaleIframe]);

  return { containerRef, contentRef };
}
