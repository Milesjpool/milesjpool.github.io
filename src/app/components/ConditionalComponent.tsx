import { env } from "../../utils/environment";

interface ConditionalComponentProps {
  showInDev?: boolean;
  showInProd?: boolean;
  children: React.ReactNode;
}

/**
 * A wrapper component that conditionally renders children based on environment
 * Useful for debug panels, development tools, or production-only features
 */
export function ConditionalComponent({ 
  showInDev = false, 
  showInProd = true, 
  children 
}: ConditionalComponentProps) {
  const shouldShow = (env.isDev && showInDev) || (env.isProd && showInProd);
  
  return shouldShow ? <>{children}</> : null;
}

// Specific convenience components
export function DevOnly({ children }: { children: React.ReactNode }) {
  return <ConditionalComponent showInDev={true} showInProd={false}>{children}</ConditionalComponent>;
}

export function ProdOnly({ children }: { children: React.ReactNode }) {
  return <ConditionalComponent showInDev={false} showInProd={true}>{children}</ConditionalComponent>;
}