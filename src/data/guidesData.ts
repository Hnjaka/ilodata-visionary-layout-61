
import { 
  Book, 
  FileText, 
  Shapes, 
  Printer, 
  ImageIcon, 
  PanelLeft, 
  LayoutTemplate,
  FileCode
} from "lucide-react";

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
      icon: LayoutTemplate,
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
      icon: Shapes,
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
      icon: FileCode,
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

// Map icon names to actual components for the admin interface
export const getIconByName = (name: string) => {
  const iconMap: {[key: string]: any} = {
    'Book': Book,
    'FileText': FileText,
    'Shapes': Shapes,
    'Printer': Printer,
    'ImageIcon': ImageIcon,
    'PanelLeft': PanelLeft,
    'LayoutTemplate': LayoutTemplate,
    'FileCode': FileCode
  };
  
  return iconMap[name] || Book;
};

// Function to get the name of an icon component
export const getIconName = (iconComponent: any) => {
  const iconEntries = Object.entries({
    Book, FileText, Shapes, Printer, ImageIcon, PanelLeft, LayoutTemplate, FileCode
  });
  
  for (const [name, component] of iconEntries) {
    if (component === iconComponent) {
      return name;
    }
  }
  
  return 'Book'; // Default
};
