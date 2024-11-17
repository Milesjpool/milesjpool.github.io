import { useState, createRef, useRef, useEffect, useCallback } from "react";

export type DragOffset = [number, number];

export function useDragEffect<T>(
  onDrag: (draggable: T, offset: DragOffset) => void,
  onDragEnd: (draggable: T, offset: DragOffset) => void
) {
  const [touchStart, setTouchStart] = useState<DragOffset | null>(null);
  const [touchOffset, setTouchOffset] = useState<DragOffset | null>(null);
  const dragAreaRef = createRef<HTMLDivElement>();
  const draggableRef = useRef<T>(null);

  useEffect(() => {
    if (draggableRef.current && touchOffset) {
      onDrag(draggableRef.current, touchOffset);
    }
  }, [draggableRef, touchOffset, onDrag]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    setTouchStart([e.touches[0].screenX, e.touches[0].screenY]);
  }, [setTouchStart]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (touchStart) {
      const dX = e.touches[0].screenX - touchStart[0];
      const dY = e.touches[0].screenY - touchStart[1];
      setTouchOffset([dX, dY]);
    }
  }, [touchStart, setTouchOffset]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (draggableRef.current && touchOffset) {
      onDragEnd(draggableRef.current, touchOffset);
    }
    setTouchOffset(null);
    setTouchStart(null);
  }, [draggableRef, touchOffset, setTouchOffset, setTouchStart, onDragEnd]);

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

  return { dragAreaRef, draggableRef };
}
