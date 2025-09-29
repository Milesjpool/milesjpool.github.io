import { useInfiniteScroll } from "app/hooks/useInfiniteScroll";
import { useResizeListener } from "app/hooks/useResizeListener";
import { ColumnRegistryProvider } from "./ColumnRegistry";
import { ImageColumn } from "./components/ImageColumn";
import { LoadingIndicator } from "./components/LoadingIndicator";
import { useImageProvider } from "./useImageProvider";
import { useImageDistributor } from "./useImageDistributor";
import { useCallback, useEffect, useState } from "react";
import { noop } from "ts/noop";
import clsx from "clsx";

import "./index.css";

type GalleryProps = {
  scrollContainer?: React.RefObject<HTMLDivElement>;
}

export function Gallery({ scrollContainer }: GalleryProps) {
  const { images, hasMore, loading, loadMore: loadMoreImages } = useImageProvider();
  const [rendering, setRendering] = useState(false);

  const loadMore = useCallback(() => {
    if (rendering) return noop();
    else loadMoreImages();
  }, [loadMoreImages, rendering]);

  const { containerRef, sentinelRef } = useInfiniteScroll(loadMore, {
    root: scrollContainer?.current,
    threshold: 0.3,
  });

  return (
    <div className={clsx("gallery", { scrollable: !scrollContainer })} ref={containerRef}>
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
