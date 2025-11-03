import { memo, PropsWithChildren, useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { useElementSize } from "app/hooks/useElementSize";
import { gaussianRandom } from "ts/gaussianRandom";

import "./MasonryDemo.css";

export function MasonryDemo() {
  const { elementRef: divRef, elementSize: divSize } = useElementSize<HTMLAnchorElement>();
  const rowCount = Math.max(7, Math.floor(divSize.height / 150));
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseOver = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const topRows = Math.floor(rowCount / 3);
  const bottomRows = rowCount - (topRows + 3);
  return (
    <Link ref={divRef} to="/gallery/demo" className="masonry-demo" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
      {[...Array(topRows)].map((_, i) => (
        <BasicRow key={`top-row-${i}`} />
      ))}
      <ContentRow key={`content-row-1`} childPosition={{ offset: 0.3, width: 6 }} >
        <h1>{"Masonry"}</h1>
      </ContentRow>
      <ContentRow key={`content-row-2`} childPosition={{ offset: 0.4, width: 5 }} >
        <h1>{"Gallery"}</h1>
      </ContentRow>
      <ContentRow key={`content-row-3`} childPosition={{ offset: 0.25, width: 12 }} >
        <div className="flex-row">
          <h1>{isHovered ? "📸" : "📷"}</h1>
          <p>{"A playful, dynamic 'masonry' style gallery, built for my personal photography page"}</p>
        </div>
      </ContentRow>
      {[...Array(bottomRows)].map((_, i) => (
        <BasicRow key={`bottom-row-${i}`} />
      ))}
    </Link>
  );
}

type BasicRowProps = {
  key: string
}
function BasicRow({ key }: BasicRowProps) {
  const { elementRef: rowRef, elementSize: rowSize } = useElementSize<HTMLDivElement>();

  const sliceCount = Math.floor(rowSize.width / 45);
  const sliceWidth = rowSize.width / sliceCount;

  const delay = useMemo(() => Math.random() * 3000 + 3000, []);
  const { animationKey, items } = useItemsRedistributionInterval({ sliceCount, pad: 'around' }, delay);

  return <div ref={rowRef} className="masonry-demo-row" key={`${key}`}>
    {items.map((length, index) => (
      <PlaceholderItem key={`${animationKey}-item-${index}`} width={length * sliceWidth} />
    ))}
  </div>;
}

type ContentRowProps = PropsWithChildren<BasicRowProps & {
  childPosition: { offset: number, width: number }
  log?: boolean
}>

function ContentRow({ log, children, childPosition }: ContentRowProps) {
  const { elementRef: rowRef, elementSize: rowSize } = useElementSize<HTMLDivElement>();

  const sliceCount = Math.floor(rowSize.width / 45);
  const sliceWidth = rowSize.width / sliceCount;

  const childOffset = Math.floor(childPosition.offset * sliceCount)
  const childWidth = Math.min(childPosition.width, sliceCount - (childOffset + 2));

  const delay = useMemo(() => Math.random() * 3000 + 3000, []);
  const { animationKey: preAnimationKey, items: preItems }
    = useItemsRedistributionInterval({ sliceCount: childOffset, pad: 'left' }, delay);
  const { animationKey: postAnimationKey, items: postItems }
    = useItemsRedistributionInterval({ sliceCount: sliceCount - (childOffset + childWidth), pad: 'right' }, delay);

  return <div ref={rowRef} className="masonry-demo-row">
    {preItems.map((length, index) => (
      <PlaceholderItem key={`pre-${preAnimationKey}-item-${index}`} width={length * sliceWidth} />
    ))}
    <div className="masonry-demo-item content" key={`content-item-${preAnimationKey}-${postAnimationKey}`}
      style={{
        width: `calc(${childWidth * sliceWidth}px - 0.5em)`,
        margin: '0 0.25em',
        transition: `width 5s ease-in-out`,
      }}
    >
      {children}
    </div>
    {
      postItems.map((length, index) => (
        <PlaceholderItem key={`post-${postAnimationKey}-item-${index}`} width={length * sliceWidth} />
      ))
    }
  </div >;
}

const PlaceholderItem = memo(({ width }: { width: number }) => {
  return <div className="masonry-demo-item placeholder"
    style={{
      width: width > 0 ? `calc(${width}px - 0.5em)` : '0px',
      margin: '0 0.25em',
      transition: `width 5s ease-in-out`,
    }} />;
});

type PadType = 'around' | 'left' | 'right';

type UseItemsRedistributionIntervalProps = {
  sliceCount: number
  pad?: PadType
}

function useItemsRedistributionInterval({ sliceCount, pad }: UseItemsRedistributionIntervalProps, delay: number): { animationKey: number, items: number[] } {
  const [animationKey, restartAnimation] = useReducer((prev: number) => prev + 1, 0);
  useEffect(() => {
    restartAnimation();
  }, [sliceCount]);

  const [items, setItems] = useState<number[]>(distributeSlices(sliceCount, { pad }));

  const redistributeItems = useCallback(() => {
    setItems(distributeSlices(sliceCount, { pad }));
  }, [sliceCount, pad]);

  useEffect(() => {
    redistributeItems()
    const timeoutId = setTimeout(() => redistributeItems(), 0);
    return () => clearTimeout(timeoutId);
  }, [redistributeItems]);

  useEffect(() => {
    const intervalId = setInterval(() => redistributeItems(), delay);
    return () => clearInterval(intervalId);
  }, [redistributeItems, delay]);

  return { animationKey, items };
}

type DistributeSlicesProps = {
  pad?: PadType
  minLength?: number
  maxLength?: number
}

function distributeSlices(sliceCount: number, { pad = 'around', minLength = 3, maxLength = 5 }: DistributeSlicesProps = {}): number[] {
  const items: number[] = [];
  let remainingSlices = sliceCount;

  while (remainingSlices > 0) {
    const maxPossibleLength = Math.min(maxLength, remainingSlices);
    const minPossibleLength = Math.min(minLength, remainingSlices);

    const random = Math.max(0, Math.min(1, gaussianRandom(0.4, 0.3)));
    const itemLength = Math.round(random * (maxPossibleLength - minPossibleLength)) + minPossibleLength;
    items.push(itemLength);
    remainingSlices -= itemLength;
  }
  const emptyItems = Math.max(0, Math.ceil((sliceCount) / minLength) - items.length);
  const leftPad = pad === 'left' ? emptyItems : pad === 'around' ? Math.ceil(emptyItems / 2) : 0;
  const rightPad = pad === 'right' ? emptyItems : pad === 'around' ? Math.floor(emptyItems / 2) : 0;

  return [...Array(leftPad).fill(0), ...(pad === 'left' ? items.reverse() : items), ...Array(rightPad).fill(0)];
}