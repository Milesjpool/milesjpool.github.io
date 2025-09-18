import { useReducer, useEffect } from "react";

type RetainedItem<T> = (T & { removed?: true });

type ItemRetentionUpdate<T> = {
  type: 'retain'
  items: T[];
} | {
  type: 'remove';
  items: RetainedItem<T>[];
}

export function useItemRetention<T>(items: T[], retentionTime: number) {
  const [retainedItems, updateRetainedItems] = useReducer((prev: RetainedItem<T>[], update: ItemRetentionUpdate<T>) => {
    switch (update.type) {
      case 'retain':
        const removedItems = prev.filter(e => !update.items.includes(e)).map(e => ({ ...e, removed: true as const }));

        setTimeout(() => {
          updateRetainedItems({ type: 'remove', items: removedItems });
        }, retentionTime);

        return [...removedItems, ...update.items] as RetainedItem<T>[];
      case 'remove':
        return prev.filter(e => !update.items.includes(e));
    }
  }, []);

  useEffect(() => {
    updateRetainedItems({ type: 'retain', items });
  }, [items, updateRetainedItems]);

  return retainedItems;
}
