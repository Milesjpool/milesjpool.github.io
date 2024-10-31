import { useState } from "react";
import "./Content.css";

export function Content() {
  return (
    <div className='content'>
        <Carousel />
    </div>
  );
}

function Carousel() {
  const [ index, setIndex ] = useState(0);
  return (
    <div className='carousel'>
      <button 
        className='carousel-button'
        onClick={() => setIndex(index - 1)}
      >&lt;</button>
      <CarouselItems />
      <button 
        className='carousel-button'
        onClick={() => setIndex(index + 1)}>&gt;</button>
    </div>
  );
}

function CarouselItems() {
  return (
    <CarouselItem >      
      <img src="/mjp-comic.png" alt="MJP logo" />
    </CarouselItem>
  );
}

function CarouselItem({ children }: { children: React.ReactNode }) {
  return (
    <div className='carousel-item'>
      {children}
    </div>
  );
}
