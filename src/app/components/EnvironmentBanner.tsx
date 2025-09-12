import { env, getEnvironment } from "../../utils/environment";

/**
 * A simple component to demonstrate environment detection
 * Shows a banner only in development mode
 */
export function EnvironmentBanner() {
  // Don't show anything in production
  if (env.isProd) {
    return null;
  }

  const environment = getEnvironment();
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: '#ff6b35',
      color: 'white',
      padding: '8px',
      textAlign: 'center',
      zIndex: 9999,
      fontSize: '12px',
      fontFamily: 'monospace'
    }}>
      🚧 Development Mode 🚧
      {' | '}
      NODE_ENV: {environment.nodeEnv}
      {' | '}
      Hostname: {environment.hostname}
    </div>
  );
}