
import React, { useState, useEffect } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FileText, ChevronRight, Menu } from "lucide-react";

// Types for sidebar and children
type SidebarContext = {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarContext = React.createContext<SidebarContext>({
  expanded: true,
  setExpanded: () => {},
  mobileOpen: false,
  setMobileOpen: () => {},
});

// Hook to use the sidebar context
export const useSidebar = () => {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

interface SidebarProps {
  children: React.ReactNode;
  defaultExpanded?: boolean;
  className?: string;
  side?: "left" | "right";
}

export function Sidebar({
  children,
  defaultExpanded = true,
  className,
  side = "left",
}: SidebarProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile sidebar on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileOpen) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileOpen]);

  return (
    <SidebarContext.Provider
      value={{ expanded, setExpanded, mobileOpen, setMobileOpen }}
    >
      {/* Mobile sidebar (sheet) */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent 
          side={side} 
          className="p-0" 
          data-sidebar="true" 
          data-mobile="true"
        >
          <div className="h-full overflow-y-auto py-4">
            {children}
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div
        data-expanded={expanded}
        className={cn(
          "hidden md:flex h-full flex-col border-r bg-background transition-all duration-300",
          expanded ? "w-64" : "w-16",
          className
        )}
      >
        {children}
      </div>

      {/* Mobile trigger button (fixed to bottom of screen) */}
      <Button
        variant="outline"
        size="icon"
        className="fixed md:hidden z-40 bottom-4 left-4 h-10 w-10 rounded-full shadow-lg bg-primary text-primary-foreground"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>
    </SidebarContext.Provider>
  );
}

interface SidebarHeaderProps {
  children?: React.ReactNode;
  className?: string;
}

export function SidebarHeader({ children, className }: SidebarHeaderProps) {
  const { expanded } = useSidebar();

  return (
    <div
      className={cn(
        "flex h-14 items-center border-b px-4",
        expanded ? "justify-between" : "justify-center",
        className
      )}
    >
      {children}
    </div>
  );
}

export function SidebarHeaderTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  const { expanded } = useSidebar();
  
  if (!expanded) return null;
  
  return (
    <div className={cn("text-lg font-semibold", className)}>
      {children}
    </div>
  );
}

export function SidebarCollapseToggle() {
  const { expanded, setExpanded } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setExpanded(!expanded)}
      className="h-8 w-8"
    >
      <ChevronRight
        className={cn(
          "h-5 w-5 transition-transform",
          expanded ? "rotate-180" : "rotate-0"
        )}
      />
    </Button>
  );
}

interface SidebarNavProps {
  children: React.ReactNode;
  className?: string;
}

export function SidebarNav({ children, className }: SidebarNavProps) {
  return (
    <div
      className={cn(
        "flex-1 overflow-auto py-2 px-4",
        className
      )}
    >
      <nav className="flex flex-col gap-1">{children}</nav>
    </div>
  );
}

interface SidebarFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function SidebarFooter({ children, className }: SidebarFooterProps) {
  return (
    <div
      className={cn("p-4 border-t", className)}
    >
      {children}
    </div>
  );
}

interface SidebarItemProps {
  title: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
  badge?: React.ReactNode;
  external?: boolean;
}

export function SidebarItem({
  title,
  icon,
  isActive,
  href,
  onClick,
  className,
  badge,
  external
}: SidebarItemProps) {
  const { expanded } = useSidebar();
  
  const ItemIcon = icon || <FileText className="h-4 w-4" />;
  
  const content = (
    <>
      <span className="w-5 h-5 flex items-center justify-center">
        {ItemIcon}
      </span>
      {expanded && <span className="ml-2">{title}</span>}
      {badge && expanded && <span className="ml-auto">{badge}</span>}
    </>
  );
  
  const itemClass = cn(
    "flex items-center h-9 rounded-md px-3 text-sm font-medium transition-colors",
    isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground",
    !expanded && "justify-center px-0",
    className
  );
  
  if (href) {
    return external ? (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className={itemClass}
      >
        {content}
      </a>
    ) : (
      <a 
        href={href} 
        className={itemClass}
      >
        {content}
      </a>
    );
  }
  
  return (
    <button 
      type="button"
      onClick={onClick} 
      className={itemClass}
    >
      {content}
    </button>
  );
}

export function SidebarSection({
  children,
  title,
  className,
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
}) {
  const { expanded } = useSidebar();

  return (
    <div className={cn("py-2", className)}>
      {title && expanded && (
        <div className="px-2 mb-2 text-xs font-semibold tracking-wider text-muted-foreground">
          {title}
        </div>
      )}
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}
