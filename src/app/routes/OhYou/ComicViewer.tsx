import { Direction, NavArrow } from "app/components/NavArrow";
import { useArrowNavigation } from "app/hooks/useArrowNavigation";
import { DragOffset, useDragEffect } from "app/hooks/useDragEffect";
import { useRef, useState, useCallback } from "react";
import { OneIndexedArray } from "./types";

import "./OhYou.css";

export type ComicViewerProps = {
  comics: OneIndexedArray<string>;
  index: number;
  setIndex: (index: number) => void;
};

export type Swipe = {
  direction: Direction;
  distance: number;
}

export function ComicViewer({ comics, index, setIndex }: ComicViewerProps) {
  const dragAreaRef = useRef<HTMLDivElement>(null);
  const [swipe, setSwipe] = useState<Swipe>({ direction: Direction.Left, distance: 0 });
  const navLeft = Boolean(index > 1);
  const navRight = Boolean(index < comics.length - 1);

  const navigateComics = useCallback((direction: Direction) => {
    if (direction === Direction.Left && navLeft) {
      setIndex(index - 1);
    }
    if (direction === Direction.Right && navRight) {
      setIndex(index + 1);
    }
  }, [index, setIndex, navLeft, navRight]);


  const onDrag = useCallback((offset: DragOffset) => {
    if (!dragAreaRef.current) return;

    const direction = offset[0] > 0 ? Direction.Right : Direction.Left;
    if (!navLeft && direction === Direction.Left) return;
    if (!navRight && direction === Direction.Right) return;

    const distanceThreshold = dragAreaRef.current.clientWidth / 4;
    const previousDistance = swipe.distance;
    const newDistance = Math.min(Math.abs(offset[0]) / distanceThreshold, 1);

    if (newDistance === 1 && previousDistance !== 1) {
      navigator.vibrate && navigator.vibrate(30);
    } else if (newDistance !== 1 && previousDistance === 1) {
      navigator.vibrate && navigator.vibrate(10);
    }

    setSwipe({
      direction: direction,
      distance: newDistance
    });
  }, [swipe, dragAreaRef, navLeft, navRight]);

  const onDragEnd = useCallback(() => {
    if (swipe.distance === 1) {
      navigateComics(swipe.direction);
    }
    setSwipe({ direction: Direction.Left, distance: 0 });
  }, [swipe, navigateComics]);

  useDragEffect({ dragAreaRef, onDrag, onDragEnd });
  useArrowNavigation(navigateComics);

  const iconScale = swipe.distance === 1 ? 2.5 : 1 + swipe.distance;

  return <div className="page grow">
    {navLeft && <NavArrow onClick={() => setIndex(index - 1)} direction={Direction.Left} />}
    <div ref={dragAreaRef} className="scroll-container flex-col overflow-scroll">
      <img key={index} className="comic shadow" src={comics[index]} alt="Comic panel" />
      <span className="swipe-indicator"
        style={{
          opacity: swipe.distance,
          transform: `scale(${iconScale})`,
        }}>{swipe.direction === Direction.Left ? '👈' : '👉'}</span>

      <span className="comic-index">
        {index}
      </span>

    </div>
    {navRight &&
      <NavArrow onClick={() => setIndex(index + 1)} direction={Direction.Right} />}
  </div>;
}
