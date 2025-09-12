import { JSX, useEffect, useMemo, useState, useRef } from "react";
import { useColumnRegistry } from "./ColumnRegistry";

export function useImageDistributor(images: JSX.Element[]) {
  const { registry } = useColumnRegistry();
  const [distributedImages, setDistributedImages] = useState<JSX.Element[]>([]);
  const undistributedImages = useMemo(() => images.filter(i => !distributedImages.includes(i)), [distributedImages, images]);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const columns = useMemo(() => Object.values(registry), [registry])

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    columns.forEach(c => c.setImages([]));
    setDistributedImages([]);
  }, [columns]);

  useEffect(() => {
    if (distributedImages.length < images.length && columns.length > 0) {
      const currentImage = undistributedImages[0];

      const shortestCol = columns.reduce((acc, curr) => {
        if (!acc.ref.current) return curr;
        if (!curr.ref.current) return acc;
        return curr.ref.current.offsetHeight < acc.ref.current.offsetHeight ? curr : acc
      }, columns[0]);

      timeoutRef.current = setTimeout(() => {
        shortestCol.setImages(prev => [...prev, currentImage]);
        setDistributedImages(prev => [...prev, currentImage]);
      }, 50);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [distributedImages, undistributedImages, images, columns]);
}
