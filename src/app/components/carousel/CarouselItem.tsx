import { forwardRef, HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

import "./Carousel.css";

type CarouselItemProps = {
  state: 'previous' | 'current' | 'next';
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export const CarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>(({ state, children, ...rest }, ref) => {
  return (
    <div ref={ref}
      className={clsx('carousel-item bg-white shadow-3 overflow-hidden rounded-3', state)}
      {...rest}>
      {children}
    </div>
  );
});
