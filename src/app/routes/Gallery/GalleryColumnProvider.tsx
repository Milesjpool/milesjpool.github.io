import { useRef, createContext, useContext, useEffect, useMemo } from "react";
import { useRegistry } from "../../hooks/useRegistry";

type GalleryColumnContextType = {
  columnImages: Map<React.RefObject<HTMLDivElement>, React.JSX.Element[]>;
  registerColumn: (ref: React.RefObject<HTMLDivElement>) => void;
  unregisterColumn: (ref: React.RefObject<HTMLDivElement>) => void;
};
const GalleryColumnContext = createContext<GalleryColumnContextType>({ columnImages: new Map(), registerColumn: () => { }, unregisterColumn: () => { } });

export function useGalleryColumnContext(columnRef: React.RefObject<HTMLDivElement>): { images: React.JSX.Element[] } {
  const { columnImages, registerColumn, unregisterColumn } = useContext(GalleryColumnContext);

  useEffect(() => {
    registerColumn(columnRef);
    return () => {
      unregisterColumn(columnRef);
    };
  }, [registerColumn, columnRef, unregisterColumn]);

  return { images: columnImages.get(columnRef) || [] };
}

type GalleryColumnProviderProps = {
  images: JSX.Element[];
  children: React.ReactNode;
};

export function GalleryColumnProvider({ images, children }: GalleryColumnProviderProps) {
  const { items: columns, register: registerColumn, unregister: unregisterColumn } = useRegistry<React.RefObject<HTMLDivElement>>();

  const columnImages = useMemo(() => {
    return images.reduce((acc, image, index) => {
      const columnIndex = index % columns.length;
      acc.set(columns[columnIndex], [...(acc.get(columns[columnIndex]) || []), image]);
      return acc;
    }, new Map<React.RefObject<HTMLDivElement>, React.JSX.Element[]>());
  }, [images, columns]);

  return <GalleryColumnContext.Provider value={{ columnImages, registerColumn, unregisterColumn }}>
    {children}
  </GalleryColumnContext.Provider>;
}
