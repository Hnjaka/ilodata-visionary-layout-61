
// This file contains global type declarations for the project

// Declare modules for packages that don't have TypeScript definitions
declare module 'react' {
  export * from 'react';
  export type FC<P = {}> = import('react').FunctionComponent<P>;
  export type ReactNode = import('react').ReactNode;
  export type MouseEvent<T = Element> = import('react').MouseEvent<T>;
  export type TouchEvent<T = Element> = import('react').TouchEvent<T>;
  export type ChangeEvent<T = Element> = import('react').ChangeEvent<T>;
  export type FormEvent<T = Element> = import('react').FormEvent<T>;
  export type ElementType = import('react').ElementType;
  export type Dispatch<A> = import('react').Dispatch<A>;
  export type SetStateAction<S> = import('react').SetStateAction<S>;
  
  // Add hooks
  export const useState: typeof import('react').useState;
  export const useEffect: typeof import('react').useEffect;
  export const useRef: typeof import('react').useRef;
  
  // StrictMode component
  export const StrictMode: import('react').FC<{children: import('react').ReactNode}>;
}

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

declare module 'lucide-react' {
  export * from 'lucide-react';
}

declare module '@tanstack/react-query' {
  export * from '@tanstack/react-query';
}

// Add any other missing module declarations here
