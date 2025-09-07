import "./Gallery.css";
import { useGalleryImages } from "./useGalleryImages";
import { useResizeListener } from "app/hooks/useResizeListener";
import { ColumnRegistryProvider } from "./ColumnRegistry";
import { useImageDistributor } from "./useImageDistributor";
import { GalleryColumn } from "./GalleryColumn";
import { useRef } from "react";
import { LoadingIndicator } from "./LoadingIndicator";

export function Gallery() {
  const { images, hasMore, loadMore, loading } = useGalleryImages();

  const sentinelRef = useRef<HTMLDivElement>(null);

  return (
    <div className="gallery-page">
      <ColumnRegistryProvider>
        <GalleryLayout images={images} />
      </ColumnRegistryProvider>
      <div ref={sentinelRef} style={{
        height: '20px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {loading && <LoadingIndicator />}
      </div>
    </div >
  );
}

type GalleryLayoutProps = {
  images: JSX.Element[];
};
function GalleryLayout({ images }: GalleryLayoutProps) {
  const { width } = useResizeListener();
  const numberOfColumns = Math.floor(width / 250);

  useImageDistributor(images);

  return <div className="gallery-layout">
    {[...Array(numberOfColumns)].map((_, i) => (
      <GalleryColumn key={i} />
    ))}
  </div>;
}
