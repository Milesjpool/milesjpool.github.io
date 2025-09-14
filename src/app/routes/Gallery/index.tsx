import { useDebugContext } from "app/components/debug/DebugContext";
import { useInfiniteScroll } from "app/hooks/useInfiniteScroll";
import { useResizeListener } from "app/hooks/useResizeListener";
import { useCallback, useEffect, useState } from "react";
import { ColumnRegistryProvider } from "./ColumnRegistry";
import { GalleryColumn } from "./GalleryColumn";
import { LoadingIndicator } from "./LoadingIndicator";
import { useGalleryImages } from "./useGalleryImages";
import { useImageDistributor } from "./useImageDistributor";

import "./index.css";

export function Gallery() {
  const { images, hasMore, loading, loadMore } = useGalleryImages();

  const [calls, setCalls] = useState(0);

  const callback = useCallback(() => {
    setCalls(prev => prev + 1);
    loadMore();
  }, [loadMore]);

  const { containerRef, sentinelRef } = useInfiniteScroll(callback, {
    threshold: 0.3,
  });

  const { setInfo } = useDebugContext();

  useEffect(() => {
    setInfo({
      Images: images.length,
      Loading: loading,
      Calls: calls,
      HasMore: hasMore,
    });
  }, [images.length, loading, calls, hasMore, setInfo]);

  return (
    <div className="gallery-page" ref={containerRef}>
      <ColumnRegistryProvider>
        <GalleryLayout images={images} />
      </ColumnRegistryProvider>
      {hasMore && <div ref={sentinelRef} className="gallery-sentinel">
        {loading && <LoadingIndicator />}
      </div>}
    </div >
  );
}

type GalleryLayoutProps = {
  images: JSX.Element[];
};

function GalleryLayout({ images }: GalleryLayoutProps) {
  const { width } = useResizeListener();
  const numberOfColumns = Math.floor(width / 350)

  useImageDistributor(images);

  return <div className="gallery-layout">
    {[...Array(numberOfColumns)].map((_, i) => (
      <GalleryColumn key={i} />
    ))}
  </div>;
}
