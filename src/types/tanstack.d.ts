
declare module '@tanstack/react-query' {
  export * from '@tanstack/react-query';
  
  // Add specific exports that might be missing
  import { ReactNode } from 'react';
  
  export interface QueryClientProviderProps {
    client: any;
    children: ReactNode;
  }
  
  export class QueryClient {
    constructor(config?: any);
  }
  
  export const QueryClientProvider: React.FC<QueryClientProviderProps>;
}
