import { Carousel } from "./Carousel";
import { CarouselItemSet } from "./CarouselItems";
import "./Content.css";

export function Content() {
  return (
    <div className='content'>
        <Carousel items={CarouselItemSet}/>
    </div>
  );
}