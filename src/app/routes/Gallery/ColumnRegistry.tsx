import { Registry, useRegistry } from "app/hooks/useRegistry";
import { createContext, Dispatch, ReactNode, RefObject, useContext } from "react";
import { noop } from "ts/noop";

type ColumnContext = {
  ref: RefObject<HTMLDivElement>;
  setImages: Dispatch<React.SetStateAction<JSX.Element[]>>;
}

const ColumnRegistryContext = createContext<Registry<ColumnContext>>({
  registry: {},
  register: noop,
  unregister: noop,
});

export function useColumnRegistry(): Registry<ColumnContext> {
  return useContext(ColumnRegistryContext);
}

type ColumnRegistryProviderProps = {
  children: ReactNode;
};
export function ColumnRegistryProvider({ children }: ColumnRegistryProviderProps) {
  const { registry, register, unregister } = useRegistry<ColumnContext>();

  return <ColumnRegistryContext.Provider value={{ registry, register, unregister }}>
    {children}
  </ColumnRegistryContext.Provider>;
}
