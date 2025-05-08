
// This file contains global TypeScript declarations

import * as ReactTypes from 'react';

// Fix for React imports
declare module 'react' {
  // Export all React hooks individually
  export const useState: typeof import('react-dom/client')['useState'];
  export const useEffect: typeof import('react-dom/client')['useEffect'];
  export const useRef: typeof import('react-dom/client')['useRef'];
  export const useCallback: typeof import('react-dom/client')['useCallback'];
  export const useMemo: typeof import('react-dom/client')['useMemo'];
  export const useContext: typeof import('react-dom/client')['useContext'];
  export const useReducer: typeof import('react-dom/client')['useReducer'];
  export const useLayoutEffect: typeof import('react-dom/client')['useLayoutEffect'];
  export const useImperativeHandle: typeof import('react-dom/client')['useImperativeHandle'];
  export const useDebugValue: typeof import('react-dom/client')['useDebugValue'];
  
  // Add explicit types needed by shadcn components
  export const forwardRef: typeof ReactTypes.forwardRef;
  export const createContext: typeof ReactTypes.createContext;
  export type ElementRef<T extends React.ComponentType<any>> = ReactTypes.ElementRef<T>;
  export type ComponentPropsWithoutRef<T extends React.ElementType> = ReactTypes.ComponentPropsWithoutRef<T>;
  export type HTMLAttributes<T = any> = ReactTypes.HTMLAttributes<T>;
  export type ButtonHTMLAttributes<T = any> = ReactTypes.ButtonHTMLAttributes<T>;
  export type ComponentProps<T extends React.ElementType> = ReactTypes.ComponentProps<T>;
  export type ReactNode = ReactTypes.ReactNode;
  export type KeyboardEvent<T = any> = ReactTypes.KeyboardEvent<T>;
  
  // Re-export all the original exports
  export * from 'react/index';
  
  // Add explicit default export support
  const React: any;
  export default React;
}
