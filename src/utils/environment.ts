/**
 * Environment detection utilities for React app
 */

/**
 * Method 1: Using NODE_ENV (most common and reliable)
 * Create React App automatically sets this:
 * - 'development' when running `npm start`
 * - 'production' when running `npm run build`
 */
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

/**
 * Method 2: Using hostname/URL detection
 * Useful when you need to detect based on where the app is hosted
 */
export const getEnvironmentFromHostname = (): 'local' | 'production' | 'unknown' => {
  if (typeof window === 'undefined') {
    // Server-side rendering case
    return 'unknown';
  }
  
  const hostname = window.location.hostname;
  
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.includes('192.168.')) {
    return 'local';
  } else if (hostname === 'www.milesjpool.com' || hostname === 'milesjpool.com') {
    return 'production';
  }
  
  return 'unknown';
};

/**
 * Method 3: Using custom environment variables
 * You can create a .env file in your root directory with:
 * REACT_APP_ENVIRONMENT=development
 * 
 * Note: All custom env vars must start with REACT_APP_
 */
export const getCustomEnvironment = (): string => {
  return process.env.REACT_APP_ENVIRONMENT || 'unknown';
};

/**
 * Method 4: Comprehensive environment detection
 * Combines multiple methods for robust detection
 */
export const getEnvironment = () => {
  const nodeEnv = process.env.NODE_ENV;
  const hostname = getEnvironmentFromHostname();
  const custom = getCustomEnvironment();
  
  return {
    nodeEnv,
    hostname,
    custom,
    isDev: nodeEnv === 'development' || hostname === 'local',
    isProd: nodeEnv === 'production' && hostname === 'production'
  };
};

/**
 * Method 5: Simple boolean checks (recommended for most use cases)
 */
export const env = {
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
  isLocal: typeof window !== 'undefined' && 
           (window.location.hostname === 'localhost' || 
            window.location.hostname === '127.0.0.1'),
  isGitHubPages: typeof window !== 'undefined' && 
                 window.location.hostname.includes('github.io')
} as const;

// Export a default environment object for easy importing
export default env;