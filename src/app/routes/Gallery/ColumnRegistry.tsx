import { Registry, useRegistry } from "app/hooks/useRegistry";
import { createContext, Dispatch, RefObject, useContext } from "react";
import { GalleryColumnProviderProps } from "./GalleryColumnProvider";

export type ColumnContext = {
  ref: RefObject<HTMLDivElement>;
  images: JSX.Element[];
  setImages: Dispatch<React.SetStateAction<JSX.Element[]>>;
}

const ColumnRegistryContext = createContext<Registry<ColumnContext>>({
  registry: {},
  register: () => { },
  unregister: () => { }
});

export function useColumnRegistry(): Registry<ColumnContext> {
  return useContext(ColumnRegistryContext);
}

export function ColumnRegistryProvider({ children }: GalleryColumnProviderProps) {
  const { registry, register, unregister } = useRegistry<ColumnContext>();

  return <ColumnRegistryContext.Provider value={{ registry, register, unregister }}>
    {children}
  </ColumnRegistryContext.Provider>;
}
