import { useCallback } from 'react';
import { useDebugContext } from './DebugContext';

export function useCount(component: string, counter: string) {
  const { dispatchMetric } = useDebugContext();
  const count = useCallback(() => {
    dispatchMetric({ type: 'count', component, counter });
  }, [dispatchMetric, component, counter]);

  return count;
}
