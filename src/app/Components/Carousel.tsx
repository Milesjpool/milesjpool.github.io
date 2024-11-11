import { useState } from "react";
import "./Carousel.css";
import clsx from "clsx";
import { Direction, NavArrow } from "./NavArrow";
import { mod } from "ts/mod";

type CarouselProps = {
  items: React.ReactNode[]
};

export function Carousel({ items }: CarouselProps) {
  const [index, setIndex] = useState(0);

  //todo: add touch support
  //todo: sync index with URL

  return (
    <div className='carousel flex'>
      <NavArrow onClick={() => setIndex(index - 1)} direction={Direction.Left} />
      <CarouselContent index={index} items={items} />
      <NavArrow onClick={() => setIndex(index + 1)} direction={Direction.Right} />
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
    <div className={clsx('carousel-item bg-white overflow-hidden', state)}>
      {children}
    </div>
  );
}