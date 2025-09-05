import { useGalleryImages } from "./useGalleryImages";
import "./Gallery.css";

type ImageCardProps = {
  children: React.ReactNode;
};

function ImageCard({ children }: ImageCardProps) {
  return <div className="gallery-item">
    {children}
  </div>;
}

export function Gallery() {
  const imageElements = useGalleryImages();

  return (
    <div className="gallery">
      <div className="gallery-container">
        {imageElements.map((img, i) => (
          <ImageCard key={i} >
            {img}
          </ImageCard>
        ))}
      </div>
    </div>
  );
}


