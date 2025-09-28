import { useState, useEffect, useCallback } from "react";
import { noop } from "ts/noop";

export type DragOffset = [number, number];

type useDragEffectProps = {
  dragAreaRef: React.RefObject<HTMLDivElement>;
  onDragStart?: () => void;
  onDrag?: (offset: DragOffset, e: Event) => void;
  onDragEnd?: (offset: DragOffset) => void;
};

export function useDragEffect(
  { dragAreaRef,
    onDragStart = noop,
    onDrag = noop,
    onDragEnd = noop
  }: useDragEffectProps
) {
  const [touchStart, setTouchStart] = useState<DragOffset | null>(null);
  const [touchOffset, setTouchOffset] = useState<DragOffset | null>(null);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    setTouchStart([e.touches[0].pageX, e.touches[0].pageY]);
    setTouchOffset([0, 0]);
    onDragStart();
  }, [setTouchStart, onDragStart]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (touchStart) {
      const offset: DragOffset = [
        (e.touches[0].pageX - touchStart[0]),
        (e.touches[0].pageY - touchStart[1])
      ];
      setTouchOffset(offset);
      onDrag(offset, e);
    }

  }, [touchStart, setTouchOffset, onDrag]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    touchOffset && onDragEnd(touchOffset);
    setTouchOffset(null);
    setTouchStart(null);
  }, [touchOffset, setTouchOffset, setTouchStart, onDragEnd]);

  useEffect(() => {
    const dragArea = dragAreaRef.current;
    dragArea?.addEventListener('touchstart', handleTouchStart);
    dragArea?.addEventListener('touchmove', handleTouchMove);
    dragArea?.addEventListener('touchend', handleTouchEnd);
    return () => {
      dragArea?.removeEventListener('touchstart', handleTouchStart);
      dragArea?.removeEventListener('touchmove', handleTouchMove);
      dragArea?.removeEventListener('touchend', handleTouchEnd);
    };
  }, [dragAreaRef, handleTouchStart, handleTouchMove, handleTouchEnd]);
}
