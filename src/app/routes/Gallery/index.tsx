import { useGalleryImages } from "./useGalleryImages";
import "./Gallery.css";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useResizeListener } from "app/hooks/useResizeListener";
import { ImageCard } from "./ImageCard";
import { GalleryColumnProvider, useGalleryColumnContext } from "./GalleryColumnProvider";

export function Gallery() {
  const { width } = useResizeListener();
  const images = useGalleryImages();
  const numberOfColumns = Math.floor(width / 250);

  return (
    <div className="gallery">
      <div className="gallery-container">
        <GalleryColumnProvider images={images}>
          {[...Array(numberOfColumns)].map((_, i) => (
            <GalleryColumn key={i} />
          ))}
        </GalleryColumnProvider>
      </div>
    </div >
  );
}


function GalleryColumn() {
  const { ref, images } = useGalleryColumnContext();

  return <div className="gallery-column" ref={ref}>
    {images.map((img, i) => (
      <ImageCard key={i}>
        {img}
      </ImageCard>
    ))}
  </div>;
}

