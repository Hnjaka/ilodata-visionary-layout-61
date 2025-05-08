
// This file contains global type declarations for the project

// Declare modules for packages that don't have TypeScript definitions
declare module 'react' {
  export * from 'react';
  export type FC<P = {}> = React.FunctionComponent<P>;
  export type ElementType<P = any> = React.ElementType<P>;
  export type ReactNode = React.ReactNode;
  export type ElementRef<T> = React.ElementRef<T>;
  export type ComponentPropsWithoutRef<T> = React.ComponentPropsWithoutRef<T>;
  export type HTMLAttributes<T> = React.HTMLAttributes<T>;
  export type FormEvent<T = Element> = React.FormEvent<T>;
  export type ChangeEvent<T = Element> = React.ChangeEvent<T>;
  export type MouseEvent<T = Element> = React.MouseEvent<T>;
  export type TouchEvent<T = Element> = React.TouchEvent<T>;
  export type KeyboardEvent<T = Element> = React.KeyboardEvent<T>;
  export type ButtonHTMLAttributes<T> = React.ButtonHTMLAttributes<T>;
  
  export type Dispatch<A> = React.Dispatch<A>;
  export type SetStateAction<S> = React.SetStateAction<S>;
  
  export const forwardRef: typeof React.forwardRef;
  export const StrictMode: typeof React.StrictMode;
  export const Fragment: typeof React.Fragment;
  export const createContext: typeof React.createContext;
  export const useContext: typeof React.useContext;
  export const useCallback: typeof React.useCallback;
  export const useMemo: typeof React.useMemo;
  export const useId: typeof React.useId;
  
  export const useState: typeof React.useState;
  export const useEffect: typeof React.useEffect;
  export const useRef: typeof React.useRef;
  
  export type ComponentProps<T> = React.ComponentProps<T>;
  export type ComponentType<T> = React.ComponentType<T>;
  export type CSSProperties = React.CSSProperties;
}

declare module 'react-router-dom' {
  export * from 'react-router-dom';
  export const BrowserRouter: any;
  export const Routes: any;
  export const Route: any;
  export const Navigate: any;
  export const Link: any;
  export const useNavigate: any;
  export const useParams: any;
}

declare module 'lucide-react' {
  export * from 'lucide-react';
  
  // Déclarer tous les icônes utilisés
  export const ArrowRight: any;
  export const ArrowLeft: any;
  export const BookOpen: any;
  export const Download: any;
  export const Facebook: any;
  export const Twitter: any;
  export const Linkedin: any;
  export const Instagram: any;
  export const Book: any;
  export const Video: any;
  export const FileText: any;
  export const CheckCircle: any;
  export const AlertCircle: any;
  export const FileQuestion: any;
  export const PenTool: any;
  export const Settings: any;
  export const Layout: any;
  export const ChevronLeft: any;
  export const ChevronRight: any;
  export const Image: any;
  export const Star: any;
  export const Quote: any;
  export const Users: any;
  export const User: any;
  export const UserCircle: any;
  export const UserCheck: any;
  export const MessageCircle: any;
  export const MessageSquare: any;
  export const Award: any;
  export const Trash: any;
  export const Trash2: any;
  export const Edit: any;
  export const Pencil: any;
  export const Search: any;
  export const PlusCircle: any;
  export const Save: any;
  export const Code: any;
  export const Bold: any;
  export const Italic: any;
  export const Underline: any;
  export const Heading1: any;
  export const Heading2: any;
  export const Heading3: any;
  export const ListOrdered: any;
  export const List: any;
  export const Link: any;
  export const ExternalLink: any;
  export const Plus: any;
  export const RefreshCw: any;
  export const ChevronDown: any;
  export const Upload: any;
  export const Mail: any;
  export const Lock: any;
  export const Send: any;
  export const Phone: any;
  export const MapPin: any;
  export const HelpCircle: any;
  export const Menu: any;
  export const LogIn: any;
  export const LogOut: any;
  export const Check: any;
  export const ArrowDownToLine: any;
  export const PackageCheck: any;
  export const X: any;
  export const Shield: any;
  export const MoreHorizontal: any;
  export const Circle: any;
  export const Dot: any;
}

declare module '@tanstack/react-query' {
  export * from '@tanstack/react-query';
  export const QueryClient: any;
  export const QueryClientProvider: any;
}

// Fix Badge component issues
declare module '@/components/ui/badge' {
  export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "secondary" | "destructive" | "outline";
    children?: React.ReactNode;
  }
  
  export function Badge(props: BadgeProps): JSX.Element;
  export const badgeVariants: any;
}

// Fix Button component issues
declare module '@/components/ui/button' {
  export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
    children?: React.ReactNode;
    className?: string;
  }
  
  export const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
  export const buttonVariants: any;
}

// Fix Textarea component issues
declare module '@/components/ui/textarea' {
  export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    value?: string;
    className?: string;
  }
  
  export const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
}

// Add any other missing module declarations here
