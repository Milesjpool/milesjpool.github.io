import { useState, useCallback } from "react";

export function useRegistry<T>() {
  const [items, setItems] = useState<T[]>([]);

  const register = useCallback((item: T) => {
    setItems(prev => [...prev, item]);
  }, []);

  const unregister = useCallback((item: T) => {
    setItems(prev => prev.filter(i => i !== item));
  }, []);

  return { items, register, unregister };
}
