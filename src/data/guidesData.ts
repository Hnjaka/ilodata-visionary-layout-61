
import { 
  Book, 
  FileText, 
  BookOpen, 
  Printer as PrinterIcon, 
  Image, 
  Menu, 
  LayoutGrid,
  FileCode as FileCodeIcon
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const getCategoryData = () => {
  return [
    {
      title: "Mise en page pour livres et documents",
      icon: Book,
      articles: [
        {
          title: "Les fondamentaux de la mise en page professionnelle",
          slug: "fondamentaux-mise-en-page"
        },
        {
          title: "Comment choisir la taille de police idéale",
          slug: "choisir-taille-police"
        },
        {
          title: "Les erreurs courantes en mise en page de livre",
          slug: "erreurs-mise-en-page"
        },
        {
          title: "Comment préparer votre fichier pour l'impression",
          slug: "preparer-fichier-impression"
        }
      ]
    },
    {
      title: "Modèles et templates",
      icon: LayoutGrid,
      articles: [
        {
          title: "Comment personnaliser un modèle Word en 5 étapes",
          slug: "personnaliser-modele-word"
        },
        {
          title: "Astuces pour adapter un modèle à votre texte",
          slug: "adapter-modele-word"
        },
        {
          title: "Les meilleures pratiques pour utiliser nos modèles",
          slug: "meilleures-pratiques-modeles"
        }
      ]
    },
    {
      title: "Design et formatage",
      icon: BookOpen,
      articles: [
        {
          title: "Techniques de design pour les non-designers",
          slug: "techniques-design-non-designers"
        },
        {
          title: "Guide complet du formatage de texte",
          slug: "guide-formatage-texte"
        }
      ]
    },
    {
      title: "Ressources techniques",
      icon: FileCodeIcon,
      articles: [
        {
          title: "Convertir correctement des fichiers pour l'édition",
          slug: "convertir-fichiers-edition"
        },
        {
          title: "Utilisation avancée des styles dans Word",
          slug: "utilisation-avancee-styles-word"
        }
      ]
    }
  ];
};

// Type définition pour la map des icônes
type IconMap = {
  [key: string]: LucideIcon;
};

// Map icon names to actual components for the admin interface
export const getIconByName = (name: string): LucideIcon => {
  const iconMap: IconMap = {
    'Book': Book,
    'FileText': FileText,
    'BookOpen': BookOpen,
    'PrinterIcon': PrinterIcon,
    'Image': Image,
    'Menu': Menu,
    'LayoutGrid': LayoutGrid,
    'FileCodeIcon': FileCodeIcon
  };
  
  return iconMap[name] || Book;
};

// Function to get the name of an icon component
export const getIconName = (iconComponent: LucideIcon): string => {
  const iconEntries = Object.entries({
    Book, FileText, BookOpen, PrinterIcon, Image, Menu, LayoutGrid, FileCodeIcon
  });
  
  for (const [name, component] of iconEntries) {
    if (component === iconComponent) {
      return name;
    }
  }
  
  return 'Book'; // Default
};
