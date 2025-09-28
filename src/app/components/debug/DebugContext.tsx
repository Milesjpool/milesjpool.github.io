import { createContext, Dispatch, SetStateAction, useContext, useReducer, useState } from 'react';
import { noop } from 'ts/noop';

export type GaugeValue = number | boolean;
type CounterValue = number;

type Value = GaugeValue | CounterValue;

export type ComponentMetrics = Record<string, Record<string, Value>>;
export type ComponentEvents = { id: string, component: string, event: string, data: Record<string, any> }[];

const DebugContext = createContext<{
  metrics: ComponentMetrics;
  dispatchMetric: Dispatch<DebugEvent>;
  events: ComponentEvents;
  setEvents: Dispatch<SetStateAction<ComponentEvents>>;
}>({ metrics: {}, dispatchMetric: noop, events: [], setEvents: noop });

export function useDebugContext() {
  return useContext(DebugContext);
}
type DebugEvent = {
  type: 'gauge';
  component: string;
  gauge: string;
  value: GaugeValue;
} | {
  type: 'count';
  component: string;
  counter: string;
};

export function DebugContextProvider({ children }: { children: React.ReactNode }) {
  const [metrics, dispatchMetric] = useReducer((prev: ComponentMetrics, action: DebugEvent) => {
    const component = action.component;
    const metrics = prev[component] ?? {};

    switch (action.type) {
      case 'gauge':
        return { ...prev, [component]: { ...metrics, [action.gauge]: action.value } };
      case 'count':
        return { ...prev, [component]: { ...metrics, [action.counter]: (metrics[action.counter] as number | undefined ?? 0) + 1 } };
    }
  }, {});

  const [events, setEvents] = useState<ComponentEvents>([]);

  return <DebugContext.Provider value={{ metrics, dispatchMetric, events, setEvents }}>
    {children}
  </DebugContext.Provider>;
}

