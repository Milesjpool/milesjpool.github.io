import { useEffect } from 'react';
import { GaugeValue, useDebugContext } from './DebugContext';


export function useGuage(component: string, gauge: string, value: GaugeValue) {
  const { dispatchMetric } = useDebugContext();

  useEffect(() => {
    dispatchMetric({ type: 'gauge', component, gauge, value });
  }, [dispatchMetric, component, gauge, value]);
}
