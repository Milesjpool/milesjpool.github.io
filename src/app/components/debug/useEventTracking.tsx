import { useCallback } from 'react';
import { useDebugContext } from './DebugContext';

export function useEventTracking(component: string) {
  const { setEvents } = useDebugContext();

  const trackEvent = useCallback((event: string, data: Record<string, any> = {}) => {
    const newEvent = { id: crypto.randomUUID(), component, event, data };
    setEvents(prev => [...prev, newEvent]);
    setTimeout(() => {
      setEvents(prev => prev.filter(e => e !== newEvent));
    }, 5000);
  }, [setEvents, component]);

  return trackEvent;
}
