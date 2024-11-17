import clsx from "clsx";
import "./NavArrow.css";

export enum Direction {
  Left,
  Right
}

type NavArrowProps = {
  onClick: () => void;
  direction: Direction;
};

export function NavArrow({ onClick, direction }: NavArrowProps) {
  return <button
    className={clsx('nav-arrow', 'round', 'shadow', direction === Direction.Left ? 'left' : 'right')}
    onClick={onClick}
  >
    {direction === Direction.Left ? '◀' : '▶'}
  </button>;
}