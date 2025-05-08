
// This file contains global type declarations for the project

// Declare proper React module with all needed exports
declare module 'react' {
  import * as React from 'react';
  
  export = React;
  export as namespace React;
  
  // Add explicit exports that were causing errors
  export const useState: typeof React.useState;
  export const useEffect: typeof React.useEffect;
  export const useRef: typeof React.useRef;
  export const StrictMode: typeof React.StrictMode;
}

// Declare React Router DOM with all necessary exports
declare module 'react-router-dom' {
  export interface LinkProps {
    to: string;
    className?: string;
    children?: React.ReactNode;
    'aria-label'?: string;
    target?: string;
    rel?: string;
  }
  
  export const Link: React.ComponentType<LinkProps>;
  export const BrowserRouter: React.ComponentType<{ children?: React.ReactNode }>;
  export const Routes: React.ComponentType<{ children?: React.ReactNode }>;
  export const Route: React.ComponentType<{
    path: string;
    element: React.ReactNode;
  }>;
  export const Navigate: React.ComponentType<{
    to: string;
    replace?: boolean;
  }>;
  export const useNavigate: () => (path: string, options?: { replace?: boolean }) => void;
}

// Declare Lucide React with all the icons we're using
declare module 'lucide-react' {
  interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
    strokeWidth?: number;
  }
  
  // The icons used in the project
  export const Users: React.FC<IconProps>;
  export const ArrowRight: React.FC<IconProps>;
  export const BookOpen: React.FC<IconProps>;
  export const Download: React.FC<IconProps>;
  export const Facebook: React.FC<IconProps>;
  export const Twitter: React.FC<IconProps>;
  export const Linkedin: React.FC<IconProps>;
  export const Instagram: React.FC<IconProps>;
  export const Book: React.FC<IconProps>;
  export const Video: React.FC<IconProps>;
  export const FileText: React.FC<IconProps>;
  export const CheckCircle: React.FC<IconProps>;
  export const AlertCircle: React.FC<IconProps>;
  export const FileQuestion: React.FC<IconProps>;
  export const PenTool: React.FC<IconProps>;
  export const Settings: React.FC<IconProps>;
  export const Layout: React.FC<IconProps>;
  export const ChevronLeft: React.FC<IconProps>;
  export const ChevronRight: React.FC<IconProps>;
  export const Image: React.FC<IconProps>;
  export const Star: React.FC<IconProps>;
  export const Quote: React.FC<IconProps>;
  export const Trash: React.FC<IconProps>;
  export const Edit: React.FC<IconProps>;
  export const Upload: React.FC<IconProps>;
  
  // Additional icons for admin components
  export const MessageCircle: React.FC<IconProps>;
  export const MessageSquare: React.FC<IconProps>;
  export const Award: React.FC<IconProps>;
  export const Search: React.FC<IconProps>;
  export const PlusCircle: React.FC<IconProps>;
  export const Save: React.FC<IconProps>;
  export const Code: React.FC<IconProps>;
  export const Bold: React.FC<IconProps>;
  export const Italic: React.FC<IconProps>;
  export const Underline: React.FC<IconProps>;
  export const Heading1: React.FC<IconProps>;
  export const Heading2: React.FC<IconProps>;
  export const Heading3: React.FC<IconProps>;
  export const ListOrdered: React.FC<IconProps>;
  export const List: React.FC<IconProps>;
  export const Link: React.FC<IconProps>;
  export const ExternalLink: React.FC<IconProps>;
  export const Plus: React.FC<IconProps>;
  export const RefreshCw: React.FC<IconProps>;
}

// Declare TanStack Query with necessary exports
declare module '@tanstack/react-query' {
  export interface QueryClientConfig {
    defaultOptions?: {
      queries?: {
        retry?: boolean | number;
        staleTime?: number;
        refetchOnWindowFocus?: boolean;
      };
    };
  }
  
  export interface QueryObserverResult<TData = unknown, TError = unknown> {
    data: TData | undefined;
    error: TError | null;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    status: 'error' | 'loading' | 'success' | 'idle';
    isFetching: boolean;
    refetch: () => Promise<QueryObserverResult<TData, TError>>;
  }
  
  export interface UseQueryOptions<TData = unknown, TError = unknown> {
    queryKey: unknown[];
    queryFn: () => Promise<TData>;
    onSuccess?: (data: TData) => void;
    onError?: (error: TError) => void;
    enabled?: boolean;
    retry?: boolean | number;
    staleTime?: number;
    cacheTime?: number;
    refetchOnWindowFocus?: boolean;
  }
  
  export class QueryClient {
    constructor(config?: QueryClientConfig);
  }
  
  export const QueryClientProvider: React.FC<{
    client: QueryClient;
    children?: React.ReactNode;
  }>;
  
  export function useQuery<TData = unknown, TError = unknown>(
    options: UseQueryOptions<TData, TError>
  ): QueryObserverResult<TData, TError>;
}

// Fix ElementType issue
declare namespace React {
  type ElementType<P = any> = {
    [K in keyof JSX.IntrinsicElements]: P extends JSX.IntrinsicElements[K] ? K : never
  }[keyof JSX.IntrinsicElements] | React.ComponentType<P>;
  
  // MouseEvent and TouchEvent
  interface MouseEvent<T = Element> extends SyntheticEvent<T> {
    altKey: boolean;
    button: number;
    buttons: number;
    clientX: number;
    clientY: number;
    ctrlKey: boolean;
    metaKey: boolean;
    movementX: number;
    movementY: number;
    pageX: number;
    pageY: number;
    screenX: number;
    screenY: number;
    shiftKey: boolean;
  }
  
  interface TouchEvent<T = Element> extends SyntheticEvent<T> {
    touches: TouchList;
    targetTouches: TouchList;
    changedTouches: TouchList;
    altKey: boolean;
    ctrlKey: boolean;
    metaKey: boolean;
    shiftKey: boolean;
  }
  
  interface SyntheticEvent<T = Element> {
    currentTarget: EventTarget & T;
    target: EventTarget;
    bubbles: boolean;
    cancelable: boolean;
    defaultPrevented: boolean;
    eventPhase: number;
    isTrusted: boolean;
    nativeEvent: Event;
    preventDefault(): void;
    stopPropagation(): void;
    timeStamp: number;
    type: string;
  }
}

// Fix the GuideItem props type error in Guides.tsx
interface GuideItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
  buttonText: string;
  link: string;
  delay: string;
}

// Also declare the cn utility from @/lib/utils
declare module '@/lib/utils' {
  export function cn(...inputs: (string | undefined | null | false)[]): string;
}

// Add any other missing module declarations here
