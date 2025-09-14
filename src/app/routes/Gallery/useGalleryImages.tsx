import { PropsWithChildren, useCallback, useRef, useState } from "react";

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

type PlaceholderImageProps = {
  aspectRatio: number;
  color: string;
}
function PlaceholderImage({ aspectRatio, color, children }: PropsWithChildren<PlaceholderImageProps>) {
  return (
    <div
      style={{
        backgroundColor: color,
        width: "100%",
        aspectRatio: aspectRatio,
        border: "10px dashed black",
        boxSizing: "border-box",
        color: "white",
        fontSize: "2em",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        textShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
      }}>
      {children}
    </div>
  );
}


const PAGE_SIZE = 15;

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

export function useGalleryImages() {
  const [images, setImages] = useState<JSX.Element[]>([]);
  const loading = useRef(false);
  const hasMore = useRef(true);

  const loadMore = useCallback(() => {
    if (!loading.current && hasMore.current) {
      loading.current = true;

      setTimeout(() => {
        setImages(prev => [...prev, ...fetchImages(PAGE_SIZE, prev.length)])
        loading.current = false;
        hasMore.current = images.length < PAGE_SIZE * 3;
      }, 1500);
    }
  }, [images.length, setImages, loading]);

  return { images, hasMore: hasMore.current, loading: loading.current, loadMore };
}