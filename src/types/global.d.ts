
// This file contains global type declarations for the project

// Declare modules for packages that don't have TypeScript definitions
declare module 'react' {
  export * from 'react';
  export import ElementType = React.ElementType;
  export import MouseEvent = React.MouseEvent;
  export import TouchEvent = React.TouchEvent;
  export import ReactNode = React.ReactNode;
  export import Dispatch = React.Dispatch;
  export import SetStateAction = React.SetStateAction;
}

declare module 'react-router-dom' {
  export * from 'react-router-dom';
}

declare module 'lucide-react' {
  export * from 'lucide-react';
}

declare module '@tanstack/react-query' {
  export * from '@tanstack/react-query';
}

// Add any other missing module declarations here
