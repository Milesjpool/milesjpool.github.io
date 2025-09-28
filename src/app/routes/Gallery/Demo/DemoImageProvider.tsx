import { ImageProviderContext } from "../useImageProvider";
import { useEventTracking } from 'app/components/debug/useEventTracking';
import { useGuage } from 'app/components/debug/useGuage';
import { useCallback, useState } from "react";
import { PlaceholderImage } from "./PlaceholderImage";

const aspectRatios = [
  1,        // Square
  4 / 3,    // Landscape
  3 / 4,    // Portrait
  3 / 2,    // Standard landscape
  2 / 3,    // Standard portrait
  16 / 9,   // Wide landscape
  9 / 16,   // Tall portrait
  5 / 4,    // Slightly tall
  4 / 5,    // Slightly wide
] as const;

const colors = [
  "#ff6b6b", "#4ecdc4", "#45b7d1", "#ff9ff3", "#54a0ff",
  "#96ceb4", "#feca57", "#5f27cd", "#00d2d3", "#ff9f43",
  "#a55eea", "#26de81", "#fd79a8", "#fdcb6e", "#6c5ce7"
];

function fetchImages(count: number, offset: number = 0) {
  return Array.from({ length: count }, (_, i) => {
    const aspectRatio = aspectRatios[Math.floor(Math.random() * aspectRatios.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];

    return <PlaceholderImage key={i + offset}
      aspectRatio={aspectRatio}
      color={color}>
      {i + offset}
    </PlaceholderImage>
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
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useGuage('DemoImageProvider', 'ImageCount', images.length);

  const loadMore = useCallback(() => {
    trackEvent('LoadImages', { hasMore, loading });
    const remainingImages = totalImages - images.length;
    const imagesToFetch = Math.min(pageSize, remainingImages);
    const newHasMore = imagesToFetch < remainingImages;

    if (!loading && hasMore) {
      setLoading(true);

      setTimeout(() => {
        setImages(prev => [...prev, ...fetchImages(imagesToFetch, prev.length)]);
        setHasMore(newHasMore);
        setLoading(false);
      }, delay);
    }
  }, [delay, hasMore, images, loading, pageSize, totalImages, trackEvent]);

  return <ImageProviderContext.Provider value={{ images, hasMore, loading, loadMore }}>
    {children}
  </ImageProviderContext.Provider>;
}
