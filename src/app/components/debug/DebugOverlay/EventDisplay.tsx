import { type ComponentEvents } from "../DebugContext";

import "./EventDisplay.css";
import clsx from "clsx";
import { useItemRetention } from "../../../hooks/useItemRetention";

type EventDisplayProps = {
  events: ComponentEvents;
}

const PROMPT = '👾';

export function EventDisplay({ events }: EventDisplayProps) {

  const retainedEvents = useItemRetention(events, 500);

  if (retainedEvents.length === 0) {
    return null;
  }

  return <div className="event-display">
    {retainedEvents.map(({ id, component, event, data, removed }) => (
      <span key={id} className={clsx("item", removed && "removed")}>
        <span className="label">
          <span className="prompt">{PROMPT}</span>
          <span className="component">{component}</span>
          <span className="event">{event}</span>
        </span>
        <span className="data">{JSON.stringify(data, null, 1)}</span>
      </span>
    ))}
  </div>
};

