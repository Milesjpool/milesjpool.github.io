import clsx from "clsx";
import { useMemo, useState } from "react";
import { useDebugContext } from "../DebugContext";
import { EventDisplay } from "./EventDisplay";
import { MetricDisplay } from "./MetricDisplay";

import "./DebugOverlay.css";

export function DebugOverlay() {
  const { metrics, events } = useDebugContext();
  const [minimized, setMinimized] = useState(false);

  const hasData = useMemo(() => Object.keys(metrics).length > 0 || events.length > 0, [metrics, events]);

  if (!hasData) {
    return null;
  }

  return <div className={clsx("debug-overlay", minimized && "minimized")}>
    <button className="minimize-maximize" onClick={() => setMinimized(!minimized)}>
      {minimized ? '+' : '-'}
    </button>
    {!minimized && (
      <>
        <MetricDisplay metrics={metrics} />
        <EventDisplay events={events} />
      </>
    )}
  </div >
}