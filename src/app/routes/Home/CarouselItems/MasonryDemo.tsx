import { PropsWithChildren, useMemo, useState } from "react";
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

  return (
    <Link ref={divRef} to="/gallery/demo" className="masonry-demo" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
      <BasicRow key={`row-1`} />
      <BasicRow key={`row-2`} />
      <ContentRow key={`row-3`} childPosition={{ offset: 0.3, width: 6 }} >
        <h1>{"Masonry"}</h1>
      </ContentRow>
      <ContentRow key={`row-4`} childPosition={{ offset: 0.4, width: 5 }} >
        <h1>{"Gallery"}</h1>
      </ContentRow>
      <ContentRow key={`row-5`} childPosition={{ offset: 0.25, width: 12 }} >
        <div className="flex-row">
          <h1>{isHovered ? "📸" : "📷"}</h1>
          <p>{"A toybox 'masonry' style gallery component, built for my personal photography page."}</p>
        </div>
      </ContentRow>
      {[...Array(rowCount - 5)].map((_, i) => (
        <BasicRow key={`row-${i + 5}`} />
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

  const items = useMemo(() => distributeSlices(sliceCount), [sliceCount]);

  return <div ref={rowRef} className="masonry-demo-row" key={key}>
    {items.map((length, index) => (
      <div className="masonry-demo-item placeholder" key={`item-${index}`}
        style={{
          width: `calc(${length * sliceWidth}px - 0.5em)`,
        }}
      />
    ))}
  </div>;
}

type ContentRowProps = PropsWithChildren<BasicRowProps & {
  childPosition: { offset: number, width: number }
}>
function ContentRow({ key, children, childPosition }: ContentRowProps) {
  const { elementRef: rowRef, elementSize: rowSize } = useElementSize<HTMLDivElement>();

  const sliceCount = Math.floor(rowSize.width / 45);
  const sliceWidth = rowSize.width / sliceCount;

  const childOffset = Math.floor(childPosition.offset * sliceCount)
  const childWidth = Math.min(childPosition.width, sliceCount - (childOffset + 2));

  const preItems = useMemo(() => distributeSlices(childOffset), [childOffset]);
  const postItems = useMemo(() => distributeSlices(sliceCount - (childOffset + childWidth)), [childOffset, childWidth, sliceCount]);

  return <div ref={rowRef} className="masonry-demo-row" key={key}>
    {preItems.map((length, index) => (
      <div className="masonry-demo-item placeholder" key={`pre-item-${index}`}
        style={{
          width: `calc(${length * sliceWidth}px - 0.5em)`,
        }}
      />
    ))}
    <div className="masonry-demo-item content" key={`content-item`}
      style={{
        width: `calc(${childWidth * sliceWidth}px - 0.5em)`,
      }}
    >
      {children}
    </div>
    {
      postItems.map((length, index) => (
        <div className="masonry-demo-item placeholder" key={`post-item-${index}`}
          style={{
            width: `calc(${length * sliceWidth}px - 0.5em)`,
          }}
        />
      ))
    }
  </div >;
}

function distributeSlices(sliceCount: number, { minLength, maxLength } = { minLength: 2, maxLength: 6 }): number[] {
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
  return items;
}