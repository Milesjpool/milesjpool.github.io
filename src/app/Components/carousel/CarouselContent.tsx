import { ReactNode, useCallback } from "react";
import { Direction } from "app/components/NavArrow";
import { mod } from "ts/mod";
import { DragOffset, useDragEffect } from "app/hooks/useDragEffect";
import { CarouselCard } from "./CarouselCard";

import "./Carousel.css";

type CarouselContentProps = {
  index: number;
  items: ReactNode[];
  onSwipe: (direction: Direction) => void;
};

export function CarouselContent({ index, items, onSwipe }: CarouselContentProps) {
  const itemIndex = (index: number) => mod(index, items.length);

  const onDrag = (draggable: HTMLDivElement, offset: DragOffset) => {
    const rotation = Math.max(-30, Math.min(30, offset[0] / 30));
    draggable.style.transition = "none";
    draggable.style.transform = `translate(${offset[0]}px, ${offset[1]}px) rotate(${rotation}deg)`;
  };

  const onDragEnd = useCallback((draggable: HTMLDivElement, offset: DragOffset) => {
    draggable.style.transition = '';
    draggable.style.transform = '';
    const minSwipeDistance = draggable.offsetWidth * 0.4;
    if (offset[0] > minSwipeDistance) {
      onSwipe(Direction.Left);
    } else if (offset[0] < -minSwipeDistance) {
      onSwipe(Direction.Right);
    }
  }, [onSwipe]);

  const { dragAreaRef, draggableRef } = useDragEffect<HTMLDivElement>(onDrag, onDragEnd);

  return (
    <div
      ref={dragAreaRef}
      className="carousel-content">
      <CarouselCard key={index - 1} state="previous">
        {items[itemIndex(index - 1)]}
      </CarouselCard>
      <CarouselCard
        ref={draggableRef}
        key={index}
        state="current">
        {items[itemIndex(index)]}
      </CarouselCard>
      <CarouselCard key={index + 1} state="next">
        {items[itemIndex(index + 1)]}
      </CarouselCard>
    </div>
  );
}