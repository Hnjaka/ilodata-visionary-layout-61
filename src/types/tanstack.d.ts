
declare module '@tanstack/react-query' {
  export * from '@tanstack/react-query';
  
  // Add specific exports that might be missing
  import { ReactNode } from 'react';
  
  export interface QueryClientProviderProps {
    client: QueryClient;
    children: ReactNode;
  }
  
  export class QueryClient {
    constructor(config?: any);
    
    // Add necessary methods
    invalidateQueries: (options: any) => Promise<void>;
    setQueryData: (queryKey: any, updater: any) => any;
    getQueryData: (queryKey: any) => any;
  }
  
  export const QueryClientProvider: React.FC<QueryClientProviderProps>;
  
  export function useQuery<TData = unknown, TError = unknown>(options: {
    queryKey: unknown[];
    queryFn: () => Promise<TData>;
    enabled?: boolean;
    staleTime?: number;
    cacheTime?: number;
    refetchOnMount?: boolean;
    refetchOnWindowFocus?: boolean;
    refetchOnReconnect?: boolean;
    retry?: boolean | number | ((failureCount: number, error: TError) => boolean);
    retryDelay?: number | ((retryAttempt: number, error: TError) => number);
    onSuccess?: (data: TData) => void;
    onError?: (error: TError) => void;
    onSettled?: (data: TData | undefined, error: TError | null) => void;
    select?: (data: TData) => any;
  }): {
    data: TData | undefined;
    error: TError | null;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    isFetching: boolean;
    refetch: () => Promise<any>;
    remove: () => void;
  };
}
