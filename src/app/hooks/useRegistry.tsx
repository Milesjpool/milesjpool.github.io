import { useState, useCallback } from "react";

export function useRegistry<T>() {
  const [items, setItems] = useState<Record<string, T>>({});

  const register = useCallback((id: string, item: T) => {
    setItems(prev => ({ ...prev, [id]: item }));
  }, []);

  const unregister = useCallback((id: string) => {
    setItems(prev => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  return { items, register, unregister };
}
