
import { Book, FileText, BookOpen } from 'lucide-react';
import { ReactElement } from 'react';

export interface Article {
  title: string;
  slug: string;
}

export interface ArticleCategory {
  title: string;
  icon: React.ElementType;
  articles: Article[];
}

export const getCategoryData = (): ArticleCategory[] => {
  return [
    {
      title: "Les Bases de la Mise en Page",
      icon: Book,
      articles: [
        {
          title: "Comprendre les marges, les interlignes et les polices : les fondamentaux d'une mise en page professionnelle",
          slug: "fondamentaux-mise-en-page"
        },
        {
          title: "Comment choisir la bonne taille de police pour votre livre ?",
          slug: "choisir-taille-police"
        },
        {
          title: "Les erreurs courantes à éviter lors de la mise en page d'un livre",
          slug: "erreurs-mise-en-page"
        }
      ]
    },
    {
      title: "Utilisation des Modèles Word",
      icon: FileText,
      articles: [
        {
          title: "Comment personnaliser un modèle de mise en page sous Word en 5 étapes simples",
          slug: "personnaliser-modele-word"
        },
        {
          title: "Astuces pour adapter un modèle Word à votre texte sans perdre en qualité",
          slug: "adapter-modele-word"
        },
        {
          title: "Les meilleures pratiques pour utiliser nos modèles de mise en page",
          slug: "meilleures-pratiques-modeles"
        }
      ]
    },
    {
      title: "Mise en Page pour l'Impression",
      icon: BookOpen,
      articles: [
        {
          title: "Comment préparer votre fichier pour l'impression : marges, fonds perdus et résolution",
          slug: "preparer-fichier-impression"
        },
        {
          title: "Les différences entre la mise en page pour un livre papier et un ebook",
          slug: "differences-papier-ebook"
        },
        {
          title: "Choisir le bon format de livre (A5, A4, poche) pour votre projet",
          slug: "choisir-format-livre"
        }
      ]
    },
    {
      title: "Mise en Page pour les Ebooks",
      icon: BookOpen,
      articles: [
        {
          title: "Comment créer une mise en page adaptée aux liseuses (Kindle, Kobo, etc.)",
          slug: "mise-en-page-liseuses"
        },
        {
          title: "Les spécificités de la mise en page pour un ebook : polices, images et interactivité",
          slug: "specificites-ebook"
        },
        {
          title: "Convertir votre fichier Word en EPUB ou MOBI sans perdre en qualité",
          slug: "convertir-word-ebook"
        }
      ]
    },
    {
      title: "Gestion des Titres, Sous-titres et Paragraphes",
      icon: FileText,
      articles: [
        {
          title: "Comment structurer votre livre avec des titres et sous-titres efficaces",
          slug: "structurer-titres-sous-titres"
        },
        {
          title: "Les règles d'or pour l'alignement et l'espacement des paragraphes",
          slug: "alignement-paragraphes"
        },
        {
          title: "Utiliser les styles Word pour gagner du temps dans la mise en page",
          slug: "styles-word"
        }
      ]
    },
    {
      title: "Insertion d'Images et d'Illustrations",
      icon: FileText,
      articles: [
        {
          title: "Comment intégrer des images dans votre livre sans altérer la mise en page",
          slug: "integrer-images"
        },
        {
          title: "Choisir la bonne résolution pour les illustrations et les photos",
          slug: "resolution-illustrations"
        },
        {
          title: "Astuces pour aligner et légender les images dans un livre",
          slug: "legendes-images"
        }
      ]
    },
    {
      title: "Numérotation des Pages et En-têtes",
      icon: FileText,
      articles: [
        {
          title: "Comment ajouter une numérotation de pages professionnelle dans Word",
          slug: "numerotation-pages"
        },
        {
          title: "Utiliser les en-têtes et pieds de page pour une mise en page soignée",
          slug: "en-tetes-pieds-page"
        },
        {
          title: "Gérer les sections pour éviter les erreurs de numérotation",
          slug: "gerer-sections"
        }
      ]
    },
    {
      title: "Création d'une Table des Matières",
      icon: FileText,
      articles: [
        {
          title: "Comment créer une table des matières automatique dans Word",
          slug: "table-matieres-automatique"
        },
        {
          title: "Les astuces pour une table des matières claire et fonctionnelle",
          slug: "astuces-table-matieres"
        },
        {
          title: "Adapter la table des matières pour les ebooks et les livres imprimés",
          slug: "adapter-table-matieres"
        }
      ]
    },
    {
      title: "Polices et Typographie",
      icon: BookOpen,
      articles: [
        {
          title: "Comment choisir la police parfaite pour votre livre",
          slug: "choisir-police"
        },
        {
          title: "Les polices à éviter pour une mise en page professionnelle",
          slug: "polices-eviter"
        },
        {
          title: "Utiliser les polices avec et sans empattement : avantages et inconvénients",
          slug: "polices-empattement"
        }
      ]
    },
    {
      title: "Correction et Relecture",
      icon: FileText,
      articles: [
        {
          title: "Relire et corriger votre texte avant la mise en page : les étapes indispensables",
          slug: "relire-corriger"
        },
        {
          title: "Comment éviter les erreurs de mise en page lors de la relecture",
          slug: "eviter-erreurs-relecture"
        },
        {
          title: "Les outils pour corriger votre texte efficacement",
          slug: "outils-correction"
        }
      ]
    },
    {
      title: "Préparation du Fichier Final",
      icon: FileText,
      articles: [
        {
          title: "Comment exporter votre fichier Word en PDF sans perdre en qualité",
          slug: "exporter-pdf"
        },
        {
          title: "Vérifier votre fichier avant envoi à l'imprimeur ou à la plateforme d'édition",
          slug: "verifier-fichier"
        },
        {
          title: "Les formats de fichiers à privilégier pour l'impression et les ebooks",
          slug: "formats-fichiers"
        }
      ]
    },
    {
      title: "Astuces pour les Auteurs Indépendants",
      icon: Book,
      articles: [
        {
          title: "Comment économiser du temps et de l'argent en réalisant vous-même votre mise en page",
          slug: "economiser-mise-en-page"
        },
        {
          title: "Les outils gratuits pour vous aider dans la mise en page de votre livre",
          slug: "outils-gratuits"
        },
        {
          title: "Auto-édition : les étapes clés pour réussir votre projet de A à Z",
          slug: "auto-edition"
        }
      ]
    }
  ];
};
