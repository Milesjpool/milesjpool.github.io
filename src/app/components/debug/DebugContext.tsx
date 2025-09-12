import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

const DebugContext = createContext<{
  info: Record<string, unknown>;
  setInfo: Dispatch<SetStateAction<Record<string, unknown>>>;
}>({ info: {}, setInfo: () => { } });

export function useDebugContext() {
  return useContext(DebugContext);
}

export function DebugContextProvider({ children }: { children: React.ReactNode }) {
  const [info, setInfo] = useState<Record<string, unknown>>({});

  return <DebugContext.Provider value={{ info, setInfo }}>
    {children}
  </DebugContext.Provider>;
}

