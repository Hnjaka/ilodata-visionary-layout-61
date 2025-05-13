
import { 
  Book, 
  FileText,
  BookOpen,
  Library,
  File,
  type LucideIcon 
} from "lucide-react";

// Using only icons available in lucide-react
export const iconOptions = {
  Book,
  FileText,
  BookOpen,
  Library,
  File
};

export type IconName = keyof typeof iconOptions;

// Helper function to get icon component by name
export const getIconByName = (name: string): LucideIcon => {
  const iconName = name as IconName;
  return iconOptions[iconName] || Book;
};

// Helper function to get icon name from component
export const getIconName = (icon: LucideIcon): string => {
  for (const [key, value] of Object.entries(iconOptions)) {
    if (value === icon) {
      return key;
    }
  }
  return "Book";
};

// Convert icon name to component if string is provided
export const processIconName = (iconName: string | LucideIcon): LucideIcon => {
  if (typeof iconName === 'string') {
    return getIconByName(iconName);
  }
  return iconName;
};
