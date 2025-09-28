import { Gallery } from "..";
import { DemoImageProvider } from "./DemoImageProvider";

const PAGE_SIZE = 15;
const TOTAL_DEMO_IMAGES = 100;
const DELAY = 1500;

export function GalleryDemo() {
  return <DemoImageProvider pageSize={PAGE_SIZE} totalImages={TOTAL_DEMO_IMAGES} delay={DELAY}>
    <Gallery />
  </DemoImageProvider>;
} 