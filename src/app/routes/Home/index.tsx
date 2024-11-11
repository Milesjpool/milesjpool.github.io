import { CarouselItemSet } from "./CarouselItems";
import { Carousel } from "app/Components/Carousel";

export function Home() {
  return <div className="grow overflow-hidden">
    <Carousel items={CarouselItemSet} />
  </div>;
}
