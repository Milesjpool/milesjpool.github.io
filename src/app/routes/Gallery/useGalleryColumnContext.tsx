import { useRef, useEffect, useId, RefObject, useState } from "react";
import { useColumnRegistry } from "./ColumnRegistry";

export function useGalleryColumnContext(): { ref: RefObject<HTMLDivElement>, images: JSX.Element[] } {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<JSX.Element[]>([])
  const { register, unregister } = useColumnRegistry();

  useEffect(() => {
    register(id, { ref, setImages });
    return () => unregister(id);
  }, [register, ref, unregister, id]);

  return { ref, images };
}