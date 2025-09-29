import { useInfiniteScroll } from "app/hooks/useInfiniteScroll";
import { useResizeListener } from "app/hooks/useResizeListener";
import { ColumnRegistryProvider } from "./ColumnRegistry";
import { ImageColumn } from "./components/ImageColumn";
import { LoadingIndicator } from "./components/LoadingIndicator";
import { useImageProvider } from "./useImageProvider";
import { useImageDistributor } from "./useImageDistributor";
import { useCallback, useEffect, useState } from "react";
import { noop } from "ts/noop";

import "./index.css";
import clsx from "clsx";

export function Gallery() {
  const { images, hasMore, loading, loadMore: loadMoreImages } = useImageProvider();
  const [rendering, setRendering] = useState(false);

  const loadMore = useCallback(() => {
    if (rendering) return noop();
    else loadMoreImages();
  }, [loadMoreImages, rendering]);

  const { containerRef, sentinelRef } = useInfiniteScroll(loadMore, {
    threshold: 0.3,
  });

  return (
    <div className="gallery-page" ref={containerRef}>
      <ColumnRegistryProvider>
        <GalleryLayout images={images} onRendering={setRendering} />
      </ColumnRegistryProvider>
      {hasMore && <div ref={sentinelRef} className={clsx("gallery-sentinel", { compact: images.length })}>
        {loading && <LoadingIndicator />}
      </div>}
    </div >
  );
}

type GalleryLayoutProps = {
  images: JSX.Element[];
  onRendering: (value: boolean) => void;
};

function GalleryLayout({ images, onRendering }: GalleryLayoutProps) {
  const { width } = useResizeListener();
  const numberOfColumns = Math.floor(width / 350)

  const { isDistributing } = useImageDistributor(images);

  useEffect(() => {
    onRendering(isDistributing);
  }, [isDistributing, onRendering]);

  return <div className="gallery-layout">
    {[...Array(numberOfColumns)].map((_, i) => (
      <ImageColumn key={i} />
    ))}
  </div>;
}
