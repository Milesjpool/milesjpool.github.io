import { Direction } from "app/Components/NavArrow";
import { useEffect } from "react";

export function useArrowNavigation(onInput: (direction: Direction) => void) {
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowLeft") {
      onInput(Direction.Left);
    } else if (event.key === "ArrowRight") {
      onInput(Direction.Right);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onInput, handleKeyDown]);
}
