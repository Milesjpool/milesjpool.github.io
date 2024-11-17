import { useEffect, useState } from "react";
import { Direction, NavArrow } from "../NavArrow";
import { mod } from "ts/mod";
import { useArrowNavigation } from "app/hooks/useArrowNavigation";
import { useSearchParams } from "react-router-dom";
import { CarouselContent } from "./CarouselContent";

import "./Carousel.css";

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


  const handleNavigation = (direction: Direction) => {
    if (direction === Direction.Left) {
      setIndex(index - 1);
    }
    if (direction === Direction.Right) {
      setIndex(index + 1);
    }
  };

  useArrowNavigation(handleNavigation);

  return (
    <div className='carousel flex'>
      <NavArrow onClick={() => setIndex(index - 1)} direction={Direction.Left} />
      <CarouselContent index={index} items={items} onSwipe={handleNavigation} />
      <NavArrow onClick={() => setIndex(index + 1)} direction={Direction.Right} />
    </div>
  );
}