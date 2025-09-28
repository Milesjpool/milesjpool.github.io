import { useGalleryColumnContext } from "../useGalleryColumnContext";

import "./ImageColumn.css";

export function ImageColumn() {
  const { ref, images } = useGalleryColumnContext();

  return <div className="image-column" ref={ref}>
    {images.map((img, i) => (
      <div key={i} className="image-item">
        {img}
      </div>
    ))}
  </div>;
}

