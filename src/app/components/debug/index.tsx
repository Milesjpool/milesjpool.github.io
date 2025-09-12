import { DebugContextProvider } from "./DebugContext";
import { DebugOverlay } from "./DebugOverlay";

export function Debug({ children }: { children: React.ReactNode }) {
  const { REACT_APP_DEBUG } = process.env;

  if (REACT_APP_DEBUG !== 'true') {
    return children;
  }

  return (
    <div className="debug-wrapper">
      <DebugContextProvider>
        <DebugOverlay />
        {children}
      </DebugContextProvider>
    </div>);
}