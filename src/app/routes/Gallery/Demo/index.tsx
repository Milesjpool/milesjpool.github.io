import { useEffect, useRef } from "react";
import { Gallery } from "../index";
import { DemoImageProvider } from "./DemoImageProvider";
import { PlaceholderImage } from "./PlaceholderImage";
import { randomColour } from "./constants";

import "./index.css";

const PAGE_SIZE = 15;
const TOTAL_DEMO_IMAGES = 100;
const DELAY = 1500;

export function GalleryDemo() {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const headerColour = randomColour()

  return <div className="gallery-demo" ref={scrollContainer}>
    <div className="gallery-demo-header">
      <PlaceholderImage color={headerColour}>
        <h1>Masonry Gallery Demo</h1>
      </PlaceholderImage>
    </div>
    <DemoImageProvider pageSize={PAGE_SIZE} totalImages={TOTAL_DEMO_IMAGES} delay={DELAY}>
      <Gallery scrollContainer={scrollContainer} />
    </DemoImageProvider>
  </div>
} 