import { useGalleryColumnContext } from "./GalleryColumnProvider";
import { ImageCard } from "./ImageCard";

export function GalleryColumn() {
  const { ref, images } = useGalleryColumnContext();

  return <div className="gallery-column" ref={ref}>
    {images.map((img, i) => (
      <ImageCard key={i}>
        {img}
      </ImageCard>
    ))}
  </div>;
}
