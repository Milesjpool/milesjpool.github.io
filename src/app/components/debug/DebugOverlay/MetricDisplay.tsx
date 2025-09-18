import clsx from "clsx";
import { useEffect, useState } from "react";
import { type ComponentMetrics } from "../DebugContext";

import "./MetricDisplay.css";

type MetricDisplayProps = {
  metrics: ComponentMetrics;
}

export function MetricDisplay({ metrics }: MetricDisplayProps) {
  return <div className="metric-display">
    {Object.entries(metrics).map(([component, gauges]) => (
      <div key={component} className="component-item">
        {component}
        <div className="guage-list">
          {Object.entries(gauges).map(([key, value]) => (
            <div key={key} className="guage">
              <span className="key">{key}:</span>
              <MetricValue value={value} />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
}

type MetricValueProps = {
  value: number | boolean;
}

function MetricValue({ value }: MetricValueProps) {
  const [recentlyUpdated, setRecentlyUpdated] = useState(false);

  useEffect(() => {
    setRecentlyUpdated(true);
    setTimeout(() => {
      setRecentlyUpdated(false);
    }, 500);
  }, [value]);

  return <span className={
    clsx("value", recentlyUpdated && "recently-updated")
  }>{JSON.stringify(value)}</span>;
}

