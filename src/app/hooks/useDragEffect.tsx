import { useState, createRef, useRef, useEffect, useCallback } from "react";

export type DragOffset = [number, number];

export function useDragEffect<T>(
  onDragStart: (draggable: T) => void,
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
    if (draggableRef.current) {
      onDragStart(draggableRef.current);
    }
    setTouchStart([e.touches[0].screenX, e.touches[0].screenY]);
  }, [setTouchStart, onDragStart]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (touchStart) {
      const offset: DragOffset = [
        (e.touches[0].screenX - touchStart[0]),
        (e.touches[0].screenY - touchStart[1])
      ];
      setTouchOffset(offset);
      if (draggableRef.current) {
        onDrag(draggableRef.current, offset);
      }
    }

  }, [touchStart, setTouchOffset, onDrag]);

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
