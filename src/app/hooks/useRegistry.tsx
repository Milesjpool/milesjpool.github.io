import { useState, useCallback } from "react";

export type Registry<T> = {
  registry: Record<string, T>;
  register: (id: string, context: T) => void;
  unregister: (id: string) => void;
};

export function useRegistry<T>(): Registry<T> {
  const [registry, setRegistry] = useState<Record<string, T>>({});

  const register = useCallback((id: string, item: T) => {
    setRegistry(prev => ({ ...prev, [id]: item }));
  }, []);

  const unregister = useCallback((id: string) => {
    setRegistry(prev => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  return { registry, register, unregister };
}
