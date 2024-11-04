import { useState } from "react";
import "./Carousel.css";
import clsx from "clsx";

type CarouselProps = {
  items: React.ReactNode[]
};

export function Carousel({ items }: CarouselProps) {
  const [index, setIndex] = useState(0);

  return (
    <div className='carousel'>
      <button
        className='carousel-button left'
        onClick={() => setIndex(index - 1)}
      >◀</button>
      <CarouselContent index={index} items={items} />
      <button
        className='carousel-button right'
        onClick={() => setIndex(index + 1)}>▶</button>
    </div>
  );
}

function CarouselContent({ index, items }: { index: number, items: React.ReactNode[] }) {

  const itemIndex = (index: number) => mod(index, items.length);

  return (
    <div className="carousel-content">
      <CarouselItem key={index - 1} state="previous">
        {items[itemIndex(index - 1)]}
      </CarouselItem>
      <CarouselItem key={index} state="current">
        {items[itemIndex(index)]}
      </CarouselItem>
      <CarouselItem key={index + 1} state="next">
        {items[itemIndex(index + 1)]}
      </CarouselItem>
    </div>
  );
}

type CarouselItemProps = {
  key: number,
  state: 'previous' | 'current' | 'next'
  children: React.ReactNode,
}

function CarouselItem({ state, children }: CarouselItemProps) {
  return (
    <div className={clsx('carousel-item bg-white', state)}>
      {children}
    </div>
  );
}


// Helper function to get the real, mathematical modulus of a number
function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}