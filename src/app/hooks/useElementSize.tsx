import { useRef, useEffect, useState } from "react";

type ElementSize = {
  width: number;
  height: number;
};

export function useElementSize<T extends HTMLElement = HTMLDivElement>() {
  const elementRef = useRef<T>(null);
  const [elementSize, setElementSize] = useState<ElementSize>({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        setElementSize({
          width: rect.width,
          height: rect.height,
        });
      }
    };

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    if (elementRef.current) {
      resizeObserver.observe(elementRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return { elementRef, elementSize };
}
