import { ReactNode, useCallback, useRef, useState } from "react";
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

type Transform = {
  x: number;
  y: number;
  rotation: number;
}

const ROTATION_LIMIT = 30; //degrees
export function CarouselContent({ index, items, onSwipe }: CarouselContentProps) {
  const itemIndex = (index: number) => mod(index, items.length);
  const dragArea = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<Transform | undefined>();

  const onDragStart = useCallback(() => {
    setTransform({ x: 0, y: 0, rotation: 0 });
  }, [setTransform]);

  const onDrag = useCallback((offset: DragOffset, event: Event) => {
    if (!dragArea.current) return;

    const xOffSet = offset[0];
    // Stops the card being dragged straight down.
    const maxYOffset = getMaxYOffsetCurve(dragArea.current)(xOffSet);
    const yOffset = Math.min(offset[1], maxYOffset);

    if (yOffset < maxYOffset) {
      event.preventDefault()
    }
    setTransform({
      x: xOffSet,
      y: yOffset,
      rotation: Math.max(-ROTATION_LIMIT, Math.min(ROTATION_LIMIT, xOffSet / 30))
    });
  }, [dragArea, setTransform]);

  const onDragEnd = useCallback((offset: DragOffset) => {
    setTransform(undefined);
    if (!dragArea.current) return;
    const swipeThreshold = dragArea.current.offsetWidth / 4;
    offset[0] > swipeThreshold && onSwipe(Direction.Left);
    offset[0] < -swipeThreshold && onSwipe(Direction.Right);
  }, [onSwipe, dragArea, setTransform]);

  useDragEffect({
    dragAreaRef: dragArea,
    onDragStart,
    onDrag,
    onDragEnd
  });

  return (
    <div
      ref={dragArea}
      className="carousel-content">
      <CarouselItem key={index - 1} state="previous">
        {items[itemIndex(index - 1)]}
      </CarouselItem>
      <CarouselItem
        key={index}
        state="current"
        style={{
          transform: transform && `translate(${transform.x}px, ${transform.y}px) rotate(${transform.rotation}deg)`,
          transition: transform && "none"
        }}>
        {items[itemIndex(index)]}
      </CarouselItem>
      <CarouselItem key={index + 1} state="next">
        {items[itemIndex(index + 1)]}
      </CarouselItem>
    </div>
  );
}


// This limits the y-offset of the card when it is being dragged,
// to a 'n' shaped curve. This is so that it can't be dragged too
// far down, without feeling like it's being restricted.
function getMaxYOffsetCurve(div: HTMLDivElement) {
  const curveXScale = div.offsetWidth * 2; // The width of the curve
  const curveYScale = div.offsetHeight * 0.3; // The height of the curve
  const constYOffset = 20; // The y-offset of the curve, below zero.

  const calculateYLimit = (x: number) => curveYScale * (1 - Math.cos(x / curveXScale));

  return (xOffSet: number) => calculateYLimit(xOffSet) + constYOffset;
}
