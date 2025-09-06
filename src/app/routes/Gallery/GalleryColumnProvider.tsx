import { useRef, createContext, useContext, useEffect, useMemo, useId } from "react";
import { useRegistry } from "../../hooks/useRegistry";

type GalleryColumnContextType = {
  columnImages: Record<string, React.JSX.Element[]>;
  registerColumn: (id: string, ref: React.RefObject<HTMLDivElement>) => void;
  unregisterColumn: (id: string) => void;
};
const GalleryColumnContext = createContext<GalleryColumnContextType>({ columnImages: {}, registerColumn: () => { }, unregisterColumn: () => { } });

export function useGalleryColumnContext(): { ref: React.RefObject<HTMLDivElement>, images: React.JSX.Element[] } {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const { columnImages, registerColumn, unregisterColumn } = useContext(GalleryColumnContext);

  useEffect(() => {
    registerColumn(id, ref);
    return () => {
      unregisterColumn(id);
    };
  }, [registerColumn, ref, unregisterColumn]);

  return { ref, images: columnImages[id] || [] };
}

type GalleryColumnProviderProps = {
  images: JSX.Element[];
  children: React.ReactNode;
};

export function GalleryColumnProvider({ images, children }: GalleryColumnProviderProps) {
  const { items: columns, register: registerColumn, unregister: unregisterColumn } = useRegistry<React.RefObject<HTMLDivElement>>();

  const columnImages = useMemo(() => {
    return images.reduce((acc, image, index) => {
      const columnIds = Object.keys(columns);
      const columnIndex = index % columnIds.length;
      acc[columnIds[columnIndex]] = [...(acc[columnIds[columnIndex]] || []), image];
      return acc;
    }, {} as Record<string, JSX.Element[]>);
  }, [images, columns]);

  return <GalleryColumnContext.Provider value={{ columnImages, registerColumn, unregisterColumn }}>
    {children}
  </GalleryColumnContext.Provider>;
}
