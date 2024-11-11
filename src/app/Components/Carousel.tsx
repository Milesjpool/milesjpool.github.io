import { useEffect, useState } from "react";
import "./Carousel.css";
import clsx from "clsx";
import { Direction, NavArrow } from "./NavArrow";
import { mod } from "ts/mod";
import { useArrowNavigation } from "app/hooks/useArrowNavigation";
import { useSearchParams } from "react-router-dom";

type CarouselProps = {
  items: React.ReactNode[]
};

const CAROUSEL_INDEX_PARAM = "cIdx";

export function Carousel({ items }: CarouselProps) {
  const [params, setParams] = useSearchParams({ [CAROUSEL_INDEX_PARAM]: "0" });

  const [index, setIndex] = useState(() => parseInt(params.get(CAROUSEL_INDEX_PARAM) || "0"));
  useEffect(() => {
    setParams({ [CAROUSEL_INDEX_PARAM]: mod(index, items.length).toString() });
  }, [index, items.length, setParams]);


  //todo: add touch support

  useArrowNavigation((direction: Direction) => {
    if (direction === Direction.Left) {
      setIndex(index - 1);
    }
    if (direction === Direction.Right) {
      setIndex(index + 1);
    }
  });

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