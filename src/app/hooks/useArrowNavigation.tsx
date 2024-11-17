import { Direction } from "app/components/NavArrow";
import { useCallback, useEffect } from "react";

export function useArrowNavigation(onInput: (direction: Direction) => void) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      onInput(Direction.Left);
    } else if (event.key === "ArrowRight") {
      onInput(Direction.Right);
    }
  }, [onInput]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onInput, handleKeyDown]);
}
