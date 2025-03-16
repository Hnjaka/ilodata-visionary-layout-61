
import React, { useEffect } from 'react';
import ArticleLayout from '@/components/article/ArticleLayout';
import { Separator } from "@/components/ui/separator";
import TableOfContents from '@/components/article/TableOfContents';
import FontSizeIntroSection from '@/components/article/FontSizeIntroSection';
import FontSizeImportanceSection from '@/components/article/FontSizeImportanceSection';
import FontSizeFactorsSection from '@/components/article/FontSizeFactorsSection';
import FontSizeRecommendationsSection from '@/components/article/FontSizeRecommendationsSection';
import BestFontsSection from '@/components/article/BestFontsSection';
import TestingReadabilitySection from '@/components/article/TestingReadabilitySection';
import LineSpacingBalanceSection from '@/components/article/LineSpacingBalanceSection';
import CommonMistakesSection from '@/components/article/CommonMistakesSection';
import FontSizeFaqSection from '@/components/article/FontSizeFaqSection';
import FontSizeConclusionSection from '@/components/article/FontSizeConclusionSection';

const ChoisirTaillePolice = () => {
  // Mise à jour des balises meta pour le SEO
  useEffect(() => {
    document.title = "Comment choisir la bonne taille de police pour votre livre ? | ilodata.com";
    
    // Création ou mise à jour de la balise meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", "Découvrez comment choisir la bonne taille de police pour une mise en page professionnelle de votre livre et garantir une lecture fluide et agréable.");
  }, []);

  const breadcrumbs = [
    { label: 'Accueil', url: '/' },
    { label: 'Guides et Conseils', url: '/guides' },
    { label: 'Comment choisir la bonne taille de police pour votre livre ?', url: '/guides/choisir-taille-police' }
  ];

  const tocItems = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'importance', title: 'Pourquoi la taille de police est essentielle pour un livre ?' },
    { id: 'facteurs', title: 'Les facteurs à considérer pour choisir la taille de police' },
    { id: 'tailles-recommandees', title: 'Tailles de police recommandées selon le type de livre' },
    { id: 'meilleures-polices', title: 'Les meilleures polices pour une mise en page professionnelle' },
    { id: 'tester-lisibilite', title: 'Comment tester la lisibilité d'une taille de police ?' },
    { id: 'interlignage', title: 'Taille de police et interlignage : trouver le bon équilibre' },
    { id: 'erreurs', title: 'Les erreurs courantes à éviter' },
    { id: 'faq', title: 'FAQ sur la taille de police d'un livre' },
    { id: 'conclusion', title: 'Conclusion' }
  ];

  const faqs = [
    {
      question: 'Quelle est la meilleure taille de police pour un roman ?',
      answer: 'Entre 10 et 12 points en fonction de la police et du public cible.'
    },
    {
      question: 'Quelle taille de police utiliser pour un livre numérique ?',
      answer: '12 à 14 pts, car les lecteurs peuvent ajuster la taille à leur convenance.'
    },
    {
      question: 'Comment choisir entre une police avec ou sans empattement ?',
      answer: 'Les polices avec empattement (ex. Garamond) sont idéales pour les romans et essais. Les sans empattement (ex. Arial) sont mieux adaptées aux livres numériques.'
    },
    {
      question: 'Un livre pour enfants doit-il avoir une police plus grande ?',
      answer: 'Oui, une taille entre 14 et 16 pts est recommandée pour faciliter la lecture.'
    },
    {
      question: 'Faut-il utiliser la même taille de police pour tous les éléments du livre ?',
      answer: 'Non. Les titres, sous-titres et notes de bas de page doivent avoir des tailles adaptées.'
    }
  ];

  return (
    <ArticleLayout
      title="Comment choisir la bonne taille de police pour votre livre ?"
      breadcrumbs={breadcrumbs}
    >
      <section>
        <TableOfContents items={tocItems} />
      </section>

      <Separator className="my-8" />

      <FontSizeIntroSection />
      <FontSizeImportanceSection />
      <FontSizeFactorsSection />
      <FontSizeRecommendationsSection />
      <BestFontsSection />
      <TestingReadabilitySection />
      <LineSpacingBalanceSection />
      <CommonMistakesSection />
      <FontSizeFaqSection faqs={faqs} />
      <FontSizeConclusionSection />
    </ArticleLayout>
  );
};

export default ChoisirTaillePolice;
