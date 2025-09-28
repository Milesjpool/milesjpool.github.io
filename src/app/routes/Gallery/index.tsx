import { useInfiniteScroll } from "app/hooks/useInfiniteScroll";
import { useResizeListener } from "app/hooks/useResizeListener";
import { ColumnRegistryProvider } from "./ColumnRegistry";
import { ImageColumn } from "./components/ImageColumn";
import { LoadingIndicator } from "./components/LoadingIndicator";
import { useImageProvider } from "./useImageProvider";
import { useImageDistributor } from "./useImageDistributor";

import "./index.css";

export function Gallery() {
  const { images, hasMore, loading, loadMore } = useImageProvider();

  const { containerRef, sentinelRef } = useInfiniteScroll(loadMore, {
    threshold: 0.3,
  });

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
      <ImageColumn key={i} />
    ))}
  </div>;
}
