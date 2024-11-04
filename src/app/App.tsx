import { Footer } from "./Footer";
import { Carousel } from "./Carousel";
import { CarouselItemSet } from "./CarouselItems";

import "./App.css"

export function App() {
  return (
    <div className="app flex-col bg-primary">
      <div className="grow overflow-hidden">
        <Carousel items={CarouselItemSet} />
      </div>
      <Footer />
    </div>
  );
}