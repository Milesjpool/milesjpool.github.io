import "./Gallery.css";
import { useGalleryImages } from "./useGalleryImages";
import { useResizeListener } from "app/hooks/useResizeListener";
import { ColumnRegistryProvider } from "./ColumnRegistry";
import { useImageDistributor } from "./useImageDistributor";
import { GalleryColumn } from "./GalleryColumn";

export function Gallery() {
  const { images, loadMore } = useGalleryImages();

  return (
    <div className="gallery-page">
      <ColumnRegistryProvider>
        <GalleryLayout images={images} />
      </ColumnRegistryProvider>
      <button onClick={() => loadMore()}>
        Load more
      </button>
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
