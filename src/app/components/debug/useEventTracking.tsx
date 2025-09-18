import { useCallback } from 'react';
import { useDebugContext } from './DebugContext';

export function useEventTracking(component: string) {
  const { setEvents } = useDebugContext();

  const trackEvent = useCallback((event: string) => {
    const newEvent = { component, event };
    setEvents(prev => [...prev, newEvent]);
    setTimeout(() => {
      setEvents(prev => prev.filter(e => e !== newEvent));
    }, 5000);
  }, [setEvents, component]);

  return trackEvent;
}
