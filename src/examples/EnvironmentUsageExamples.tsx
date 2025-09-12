/**
 * This file demonstrates different ways to use environment detection
 * You can copy these patterns into your actual components
 */

import { env, getEnvironment, isDevelopment, isProduction } from "../utils/environment";
import { DevOnly, ProdOnly } from "../app/components/ConditionalComponent";
import { EnvironmentBanner } from "../app/components/EnvironmentBanner";

// Example 1: Simple boolean checks
export function ExampleWithSimpleChecks() {
  return (
    <div>
      <h2>Environment Detection Examples</h2>
      
      {/* Show content only in development */}
      {env.isDev && (
        <div style={{ backgroundColor: 'yellow', padding: '10px' }}>
          🔧 Development tools would go here
        </div>
      )}
      
      {/* Show content only in production */}
      {env.isProd && (
        <div style={{ backgroundColor: 'green', padding: '10px', color: 'white' }}>
          📊 Analytics tracking enabled
        </div>
      )}
      
      {/* Check if running on localhost */}
      {env.isLocal && (
        <p>Running on localhost!</p>
      )}
    </div>
  );
}

// Example 2: Using the wrapper components
export function ExampleWithWrappers() {
  return (
    <div>
      <DevOnly>
        <div style={{ border: '2px dashed red', padding: '10px', margin: '10px' }}>
          This debug panel only shows in development
        </div>
      </DevOnly>
      
      <ProdOnly>
        <div style={{ border: '2px solid green', padding: '10px', margin: '10px' }}>
          This production feature only shows in production
        </div>
      </ProdOnly>
    </div>
  );
}

// Example 3: Advanced environment logic
export function ExampleWithAdvancedLogic() {
  const environment = getEnvironment();
  
  // Determine API endpoint based on environment
  const getApiUrl = () => {
    if (environment.isDev) {
      return process.env.REACT_APP_API_URL || 'http://localhost:3001';
    } else {
      return 'https://api.milesjpool.com'; // Your production API
    }
  };
  
  // Configure logging level
  const getLogLevel = () => {
    if (isDevelopment) {
      return 'debug';
    } else if (isProduction) {
      return 'error';
    }
    return 'info';
  };
  
  return (
    <div>
      <h3>Environment Configuration</h3>
      <ul>
        <li><strong>Environment:</strong> {environment.nodeEnv}</li>
        <li><strong>Hostname Type:</strong> {environment.hostname}</li>
        <li><strong>API URL:</strong> {getApiUrl()}</li>
        <li><strong>Log Level:</strong> {getLogLevel()}</li>
        <li><strong>Is Development:</strong> {environment.isDev.toString()}</li>
        <li><strong>Is Production:</strong> {environment.isProd.toString()}</li>
      </ul>
    </div>
  );
}

// Example 4: How to integrate with your App component
export function ExampleAppIntegration() {
  return (
    <div className="app">
      {/* Environment banner only shows in development */}
      <EnvironmentBanner />
      
      {/* Your normal app content */}
      <main>
        <h1>My App</h1>
        <ExampleWithSimpleChecks />
        <ExampleWithWrappers />
        <ExampleWithAdvancedLogic />
      </main>
      
      {/* Development-only tools */}
      <DevOnly>
        <div style={{ 
          position: 'fixed', 
          bottom: '20px', 
          right: '20px',
          backgroundColor: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '10px',
          borderRadius: '4px',
          fontSize: '12px'
        }}>
          🛠️ Dev Tools Panel
        </div>
      </DevOnly>
    </div>
  );
}