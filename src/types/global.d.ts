
// This file contains global TypeScript declarations

// Fix for React imports
declare module 'react' {
  // Re-export all the original exports
  export * from 'react/index';
  
  // Add explicit default export support
  const React: any;
  export default React;
}
