import { useState } from "react";
import "./Carousel.css";
import clsx from "clsx";
import { CarouselItemSet } from "./CarouselItems";

export function Carousel() {
  const [ index, setIndex ] = useState(0);

  return (
    <div className='carousel'>
      <button 
        className='carousel-button left'
        onClick={() => setIndex(index - 1)}
      >◀</button>
      <CarouselContent index={index} items={CarouselItemSet}/>
      <button 
        className='carousel-button right'
        onClick={() => setIndex(index + 1)}>▶</button>
    </div>
  );
}

function CarouselContent({index, items}: {index: number, items: React.ReactNode[]}) {  

  return (
  <div className="carousel-content">
    <CarouselItem key={index-1} state="previous">
      {items[(index-1) % items.length]}
    </CarouselItem>
    <CarouselItem key={index} state="current">
      {items[index % items.length]}
    </CarouselItem>
    <CarouselItem key={index+1} state="next">
      {items[(index+1) % items.length]}
    </CarouselItem>
  </div>
  );
}

type CarouselItemProps = {
  key: number,
  state: 'previous' | 'current' | 'next'
  children: React.ReactNode,
}

function CarouselItem({ key, state, children }: CarouselItemProps) {
  return (
    <div key={key} className={clsx('carousel-item', state)}>
      {children}
    </div>
  );
}
