
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Book, BookOpen, FileText, HelpCircle, ArrowRight, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

interface ArticleCategory {
  title: string;
  icon: React.ElementType;
  articles: Article[];
}

interface Article {
  title: string;
  slug: string;
}

const ArticleLink = ({ title, slug }: { title: string; slug: string }) => {
  return (
    <li className="mb-3">
      <Link 
        to={`/guides/${slug}`} 
        className="flex items-start text-slate-700 hover:text-ilodata-600 transition-colors group"
      >
        <ChevronRight className="h-5 w-5 text-ilodata-600 mt-0.5 mr-2 flex-shrink-0 transition-transform group-hover:translate-x-1" />
        <span>{title}</span>
      </Link>
    </li>
  );
};

const CategorySection = ({ category }: { category: ArticleCategory }) => {
  const Icon = category.icon;
  
  return (
    <div className="glass-card p-6 md:p-8 mb-10 animate-fade-up">
      <div className="flex items-center mb-6">
        <div className="p-3 rounded-lg bg-blue-50 mr-4">
          <Icon className="h-6 w-6 text-ilodata-600" />
        </div>
        <h2 className="text-2xl font-semibold text-slate-800">{category.title}</h2>
      </div>
      
      <ul className="space-y-1">
        {category.articles.map((article, index) => (
          <ArticleLink 
            key={index} 
            title={article.title} 
            slug={article.slug} 
          />
        ))}
      </ul>
    </div>
  );
};

const GuidesConseils = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const categories: ArticleCategory[] = [
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

  // FAQ Questions
  const faqItems = [
    {
      question: "Quelle est la différence entre la mise en page pour un livre papier et un ebook ?",
      answer: "Les livres papier ont des marges fixes et utilisent souvent des polices avec empattement, tandis que les ebooks sont adaptatifs et préfèrent des polices sans empattement pour une meilleure lisibilité sur écran. Les images dans les ebooks doivent être optimisées différemment, et certaines fonctionnalités comme les sauts de page spécifiques fonctionnent différemment."
    },
    {
      question: "Puis-je utiliser un modèle Word pour un livre en couleur ?",
      answer: "Oui, nos modèles Word peuvent être adaptés pour des livres en couleur. Vous devrez simplement vous assurer que les images sont en haute résolution (300 dpi minimum) et en mode CMJN pour l'impression professionnelle."
    },
    {
      question: "Comment gérer les sauts de page et les sauts de section dans Word ?",
      answer: "Pour insérer un saut de page, utilisez Ctrl+Entrée ou l'option Insertion > Saut de page. Pour les sauts de section, allez dans Mise en page > Sauts > Sauts de section. Les sauts de section sont particulièrement utiles pour modifier l'orientation, les marges ou les en-têtes/pieds de page pour certaines parties du document."
    },
    {
      question: "Quelle est la résolution recommandée pour les images dans un livre imprimé ?",
      answer: "Pour l'impression, la résolution des images doit être d'au moins 300 dpi (points par pouce) à la taille finale d'impression. Une résolution inférieure peut entraîner des images pixelisées ou floues."
    },
    {
      question: "Comment éviter les problèmes de mise en page lors de la conversion en EPUB ?",
      answer: "Utilisez des styles Word pour structurer votre document, évitez les tableaux complexes, les zones de texte et les sauts de page manuels excessifs. Simplifiez votre mise en page et testez votre EPUB sur différents appareils avant de le publier."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-blue-50 pt-32 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Guides et Conseils pour la Mise en Page de Livre
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                Tout ce dont vous avez besoin pour créer une mise en page professionnelle pour votre livre. Consultez nos guides détaillés et améliorez vos compétences.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div 
            ref={sectionRef} 
            className="container mx-auto px-4 md:px-6 fade-in-section"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {categories.map((category, index) => (
                <CategorySection key={index} category={category} />
              ))}
            </div>

            {/* FAQ Section */}
            <div className="mt-16">
              <div className="glass-card p-8 animate-fade-up">
                <div className="flex items-center mb-8">
                  <div className="p-3 rounded-lg bg-blue-50 mr-4">
                    <HelpCircle className="h-6 w-6 text-ilodata-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-slate-800">Questions Fréquentes</h2>
                </div>
                
                <div className="space-y-6">
                  {faqItems.map((item, index) => (
                    <div key={index} className="border-b border-gray-200 pb-5 last:border-0">
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">{item.question}</h3>
                      <p className="text-slate-600">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16 text-center">
              <div className="glass-card p-8 animate-fade-up">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">Vous avez besoin d'aide pour votre mise en page ?</h2>
                <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                  Si vous préférez confier votre projet à des professionnels, découvrez notre service de mise en page sur mesure. Nous sommes là pour vous accompagner à chaque étape.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/services" className="button-primary">
                    Découvrir nos services
                  </Link>
                  <Link to="/contact" className="button-secondary">
                    Contactez-nous
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GuidesConseils;
