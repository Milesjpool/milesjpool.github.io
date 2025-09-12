import "./Gallery.css";
import { useGalleryImages } from "./useGalleryImages";
import { useResizeListener } from "app/hooks/useResizeListener";
import { ColumnRegistryProvider } from "./ColumnRegistry";
import { useImageDistributor } from "./useImageDistributor";
import { GalleryColumn } from "./GalleryColumn";
import { useRef, useEffect, useState } from "react";
import { LoadingIndicator } from "./LoadingIndicator";
import { useDebugContext } from "app/components/debug/DebugContext";

export function Gallery() {
  const { images, hasMore, loadMore, loading } = useGalleryImages();
  const [calls, setCalls] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !loading) {
          setCalls(prev => prev + 1);
          loadMore();
        }
      });
    }, {
      root: containerRef.current,
      rootMargin: '0px',
      threshold: 0.8
    })
    const current = sentinelRef.current;
    if (current) {
      observer.observe(current);
      return () => observer.unobserve(current);
    }
  }, [loading, loadMore, hasMore]);


  const { setInfo } = useDebugContext();

  useEffect(() => {
    setInfo({
      Images: images.length, Loading: loading, Calls: calls, HasMore: hasMore
    });
  }, [images.length, loading, calls, hasMore, setInfo]);

  return (
    <div className="gallery-page" ref={containerRef}>
      <ColumnRegistryProvider>
        <GalleryLayout images={images} />
      </ColumnRegistryProvider>
      {
        hasMore && <div ref={sentinelRef} style={{
          height: '50%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {loading && <LoadingIndicator />}
        </div>
      }
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
