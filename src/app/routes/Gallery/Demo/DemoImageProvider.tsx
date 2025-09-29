import { ImageProviderContext } from "../useImageProvider";
import { useEventTracking } from 'app/components/debug/useEventTracking';
import { useGuage } from 'app/components/debug/useGuage';
import { useCallback, useMemo, useState } from "react";
import { PlaceholderImage } from "./PlaceholderImage";
import { randomAspectRatio, randomColour } from "./constants";

function fetch({ count, offset }: { count: number, offset: number }) {
  return Array.from({ length: count }, (_, i) => {
    const aspectRatio = randomAspectRatio();
    const color = randomColour();

    return <PlaceholderImage key={i + offset}
      aspectRatio={aspectRatio}
      color={color}>
      {i + offset}
    </PlaceholderImage>;
  });
}

type DemoImageProviderProps = {
  pageSize: number;
  totalImages: number;
  delay: number;
  children: React.ReactNode;
};

export function DemoImageProvider({ pageSize, totalImages, delay, children }: DemoImageProviderProps) {
  const trackEvent = useEventTracking('DemoImageProvider');

  const [images, setImages] = useState<JSX.Element[]>([]);
  useGuage('DemoImageProvider', 'ImageCount', images.length);

  const [loading, setLoading] = useState(false);
  const hasMore = useMemo(() => images.length < totalImages, [images.length, totalImages]);

  const loadMore = useCallback(() => {
    trackEvent('LoadImages', { hasMore, loading });
    if (!loading && hasMore) {
      setLoading(true);

      setTimeout(() => {
        const newImages = fetch({
          count: Math.min(pageSize, (totalImages - images.length)),
          offset: images.length
        });
        setImages(prev => [...prev, ...newImages]);
        setLoading(false);
      }, delay);
    }
  }, [images.length, hasMore, loading, pageSize, totalImages, delay, trackEvent]);

  return <ImageProviderContext.Provider value={{ images, hasMore, loading, loadMore }}>
    {children}
  </ImageProviderContext.Provider>;
}
