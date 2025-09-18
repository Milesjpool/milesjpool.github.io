import { type ComponentEvents } from "../DebugContext";

import "./EventDisplay.css";

type EventDisplayProps = {
  events: ComponentEvents;
}

const PROMPT = '👾';

export function EventDisplay({ events }: EventDisplayProps) {
  if (events.length === 0) {
    return null;
  }

  return <div className="event-display">
    {events.map(({ component, event }) => (
      <span key={event} className="item">
        <span className="prompt">{PROMPT}</span>
        <span className="component">{component}</span>
        <span className="event">{event}</span>
      </span>
    ))}
  </div>
}
