
/// <reference types="react" />

declare module 'react' {
  export * from 'react';
  
  // Add specific exports that might be missing
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
