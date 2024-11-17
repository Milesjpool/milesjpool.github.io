import { ReactNode, useCallback } from "react";
import { Direction } from "app/components/NavArrow";
import { mod } from "ts/mod";
import { DragOffset, useDragEffect } from "app/hooks/useDragEffect";
import { CarouselItem } from "./CarouselItem";

import "./Carousel.css";

type CarouselContentProps = {
  index: number;
  items: ReactNode[];
  onSwipe: (direction: Direction) => void;
};

const onDragStart = (draggable: HTMLDivElement) => {
  draggable.style.transition = "none";
};

const onDrag = (draggable: HTMLDivElement, offset: DragOffset) => {
  const rotation = Math.max(-30, Math.min(30, offset[0] / 30));

  // Stops the card being dragged straight down.
  const yOffset = Math.min(offset[1], (1 - Math.cos(offset[0] / draggable.offsetWidth)) * (draggable.offsetHeight / 4) + 10);
  draggable.style.transform = `translate(${offset[0]}px, ${yOffset}px) rotate(${rotation}deg)`;
};

export function CarouselContent({ index, items, onSwipe }: CarouselContentProps) {
  const itemIndex = (index: number) => mod(index, items.length);

  const onDragEnd = useCallback((draggable: HTMLDivElement, offset: DragOffset) => {
    draggable.style.transition = '';
    draggable.style.transform = '';
    const swipeThreshold = draggable.offsetWidth / 4;
    if (offset[0] > swipeThreshold) {
      onSwipe(Direction.Left);
    } else if (offset[0] < -swipeThreshold) {
      onSwipe(Direction.Right);
    }
  }, [onSwipe]);

  const { dragAreaRef, draggableRef } = useDragEffect<HTMLDivElement>(
    onDragStart,
    onDrag,
    onDragEnd
  );

  return (
    <div
      ref={dragAreaRef}
      className="carousel-content">
      <CarouselItem key={index - 1} state="previous">
        {items[itemIndex(index - 1)]}
      </CarouselItem>
      <CarouselItem
        ref={draggableRef}
        key={index}
        state="current">
        {items[itemIndex(index)]}
      </CarouselItem>
      <CarouselItem key={index + 1} state="next">
        {items[itemIndex(index + 1)]}
      </CarouselItem>
    </div>
  );
}