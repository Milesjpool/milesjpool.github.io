import { CarouselItemSet } from "./CarouselItems";
import { Carousel } from "app/components/carousel";

export function Home() {
  return <div className="grow overflow-hidden">
    <Carousel items={CarouselItemSet} />
  </div>;
}
