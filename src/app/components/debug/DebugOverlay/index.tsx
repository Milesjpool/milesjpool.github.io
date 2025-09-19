import clsx from "clsx";
import { useMemo, useReducer, useState } from "react";
import { useDebugContext } from "../DebugContext";
import { EventDisplay } from "./EventDisplay";
import { MetricDisplay } from "./MetricDisplay";

import "./DebugOverlay.css";

export function DebugOverlay() {
  const { metrics, events } = useDebugContext();
  const [minimized, toggleMinimized] = useReducer((prev: boolean) => !prev, false);

  const metricCount = useMemo(() => Object.keys(metrics).length, [metrics]);
  const eventCount = useMemo(() => events.length, [events]);

  if (!metricCount && !eventCount) {
    return null;
  }

  return <div className={clsx("debug-overlay", minimized && "minimized")}>
    <button className="minimize-maximize" onClick={() => toggleMinimized()}>
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