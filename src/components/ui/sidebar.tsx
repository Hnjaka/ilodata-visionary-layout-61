
import { cn } from "@/lib/utils";
import * as React from "react";
import { Menu } from "lucide-react";
import { SheetContent } from "./sheet";

interface SidebarContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isMobile: boolean;
}

const SidebarContext = React.createContext<SidebarContextProps>({
  open: false,
  setOpen: () => {},
  isMobile: false,
});

interface SidebarProviderProps {
  children: React.ReactNode;
}

export function SidebarProvider({
  children,
}: SidebarProviderProps) {
  const [open, setOpen] = React.useState<boolean>(true);
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    setOpen(!isMobile);

    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <SidebarContext.Provider value={{ open, setOpen, isMobile }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return React.useContext(SidebarContext);
}

interface SidebarProps {
  className?: string;
  children?: React.ReactNode;
  showMobile?: boolean;
}

export function Sidebar({
  className,
  children,
  showMobile = true,
}: SidebarProps) {
  const { open, isMobile } = useSidebar();

  if (isMobile && showMobile) {
    return (
      <SheetContent
        side="left"
        className={cn("p-0", className)}
        data-sidebar="true"
        data-mobile="true"
      >
        {children}
      </SheetContent>
    );
  }

  return (
    <div
      className={cn(
        "h-full border-r",
        open ? "w-64" : "w-16 border-r-blue-400",
        className,
      )}
      data-sidebar={open ? "open" : "closed"}
    >
      {children}
    </div>
  );
}

interface SidebarTriggerProps {
  className?: string;
}

export function SidebarTrigger({ className }: SidebarTriggerProps) {
  const { open, setOpen } = useSidebar();

  return (
    <button
      className={cn("p-2", className)}
      onClick={() => setOpen(!open)}
    >
      <Menu />
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  );
}

interface SidebarHeaderProps {
  className?: string;
  children?: React.ReactNode;
}

export function SidebarHeader({
  className,
  children,
}: SidebarHeaderProps) {
  return (
    <div
      className={cn("p-4 border-b", className)}
    >
      {children || <div className="h-8" />}
    </div>
  );
}

interface SidebarContentProps {
  className?: string;
  children?: React.ReactNode;
}

export function SidebarContent({
  className,
  children,
}: SidebarContentProps) {
  return (
    <div
      className={cn("p-2", className)}
    >
      {children}
    </div>
  );
}

interface SidebarFooterProps {
  className?: string;
  children?: React.ReactNode;
}

export function SidebarFooter({
  className,
  children,
}: SidebarFooterProps) {
  return (
    <div
      className={cn("p-4 mt-auto border-t", className)}
    >
      {children}
    </div>
  );
}

interface SidebarGroupProps {
  className?: string;
  children?: React.ReactNode;
}

export function SidebarGroup({
  className,
  children,
}: SidebarGroupProps) {
  return (
    <div
      className={cn("pb-4", className)}
    >
      {children}
    </div>
  );
}

interface SidebarGroupLabelProps {
  className?: string;
  children?: React.ReactNode;
}

export function SidebarGroupLabel({
  className,
  children,
}: SidebarGroupLabelProps) {
  const { open } = useSidebar();

  if (!open) return null;

  return (
    <div
      className={cn(
        "px-2 mb-2 text-xs font-semibold tracking-tight text-muted-foreground",
        className
      )}
    >
      {children}
    </div>
  );
}

interface SidebarGroupContentProps {
  className?: string;
  children?: React.ReactNode;
}

export function SidebarGroupContent({
  className,
  children,
}: SidebarGroupContentProps) {
  return (
    <div
      className={cn("space-y-1", className)}
    >
      {children}
    </div>
  );
}

interface SidebarMenuProps {
  className?: string;
  children?: React.ReactNode;
}

export function SidebarMenu({
  className,
  children,
}: SidebarMenuProps) {
  return (
    <nav
      className={cn("space-y-1", className)}
    >
      {children}
    </nav>
  );
}

interface SidebarMenuItemProps {
  className?: string;
  children?: React.ReactNode;
}

export function SidebarMenuItem({
  className,
  children,
}: SidebarMenuItemProps) {
  return (
    <div
      className={cn("px-2", className)}
    >
      {children}
    </div>
  );
}

interface SidebarMenuButtonProps {
  className?: string;
  children?: React.ReactNode;
  asChild?: boolean;
  active?: boolean;
}

export function SidebarMenuButton({
  className,
  children,
  asChild,
  active,
}: SidebarMenuButtonProps) {
  const { open } = useSidebar();
  const Comp = asChild ? React.Fragment : "button";
  const compProps = asChild 
    ? {} 
    : { type: "button" };

  return (
    <Comp
      {...compProps}
      className={asChild ? undefined : cn(
        "flex items-center w-full gap-2 px-3 py-2 text-sm rounded-lg",
        "hover:bg-primary/5 hover:text-foreground",
        active && "bg-primary/10 text-foreground",
        !open && "justify-center",
        className
      )}
    >
      {children}
    </Comp>
  );
}
