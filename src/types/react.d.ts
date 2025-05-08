
/// <reference types="react" />

declare module 'react' {
  export import ElementType = React.ElementType;
  export import MouseEvent = React.MouseEvent;
  export import TouchEvent = React.TouchEvent;
  export import ReactNode = React.ReactNode;
  export import useState = React.useState;
  export import useEffect = React.useEffect;
  export import useRef = React.useRef;
  export import Dispatch = React.Dispatch;
  export import SetStateAction = React.SetStateAction;
  export const StrictMode: React.FC<{children: React.ReactNode}>;
}
