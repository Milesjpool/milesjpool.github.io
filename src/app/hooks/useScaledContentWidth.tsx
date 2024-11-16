import { useRef, useEffect } from "react";

export function useScaledContentWidth(setScale: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLIFrameElement>(null);

  const scaleIframe = () => {
    if (containerRef.current && contentRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const iframeWidth = contentRef.current.offsetWidth;
      const scale = containerWidth / iframeWidth;
      setScale(scale);
    }
  };

  useEffect(() => {
    scaleIframe();
    window.addEventListener('resize', scaleIframe);
    return () => window.removeEventListener('resize', scaleIframe);
  }, []);
  return { containerRef, contentRef };
}
