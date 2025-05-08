
declare module 'react-router-dom' {
  export * from 'react-router-dom';
  
  // Explicitly add exports that might be missing
  export const BrowserRouter: import('react').FC<{children: import('react').ReactNode}>;
  export const Routes: import('react').FC<{children: import('react').ReactNode}>;
  export const Route: import('react').FC<{
    path?: string;
    element?: import('react').ReactNode;
    children?: import('react').ReactNode;
  }>;
  export const Navigate: import('react').FC<{
    to: string;
    replace?: boolean;
    state?: any;
  }>;
  export const Link: import('react').FC<{
    to: string;
    className?: string;
    children: import('react').ReactNode;
    replace?: boolean;
    state?: any;
  }>;
  export function useNavigate(): (to: string, options?: { replace?: boolean, state?: any }) => void;
}
