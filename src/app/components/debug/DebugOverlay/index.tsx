import { useMemo } from "react";
import { useDebugContext } from "../DebugContext";
import { MetricDisplay } from "./MetricDisplay";

import "./DebugOverlay.css";
import { EventDisplay } from "./EventDisplay";

export function DebugOverlay() {
  const { metrics, events } = useDebugContext();

  const metricCount = useMemo(() => Object.keys(metrics).length, [metrics]);
  const eventCount = useMemo(() => events.length, [events]);

  if (!metricCount && !eventCount) {
    return null;
  }

  return <div className="debug-overlay">
    <MetricDisplay metrics={metrics} />
    <EventDisplay events={events} />
  </div >
}