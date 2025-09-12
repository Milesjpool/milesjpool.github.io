import { useDebugContext } from "./DebugContext";

import "./DebugOverlay.css";

export function DebugOverlay() {
  const { info } = useDebugContext();

  return <div className="debug-overlay">
    {Object.entries(info).map(([key, value]) => (
      `${key}: ${value}`
    )).join(', ')}
  </div >
}
