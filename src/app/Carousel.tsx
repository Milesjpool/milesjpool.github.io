import { useState } from "react";
import "./Carousel.css";
import { MjpLogo } from "./CarouselItems/MjpLogo";

export function Carousel() {
  const [ index, setIndex ] = useState(0);

  return (
    <div className='carousel'>
      <CarouselContent index={index} items={[<MjpLogo/>]}/>
      <button 
        className='carousel-button left'
        onClick={() => setIndex(index - 1)}
      >◀</button>
      <button 
        className='carousel-button right'
        onClick={() => setIndex(index + 1)}>▶</button>
    </div>
  );
}

function CarouselContent({index, items}: {index: number, items: React.ReactNode[]}) {  
  
  return (
  <div className="carousel-content">
    {/* <div className='carousel-item previous'>
      {items[index-1 % items.length]}
    </div>       */}
    <CarouselItem >
      {items[index % items.length]}
    </CarouselItem>
    {/* <div className='carousel-item next'>
      {items[index+1 % items.length]}
    </div> */}
  </div>
  );
}

function CarouselItem({ children }: { children: React.ReactNode }) {
  return (
    <div className='carousel-item'>
      {children}
    </div>
  );
}
