
import React, { useEffect } from 'react';
import ArticleLayout from '@/components/article/ArticleLayout';
import { Separator } from "@/components/ui/separator";
import IntroductionSection from '@/components/article/IntroductionSection';
import ImportanceSection from '@/components/article/ImportanceSection';
import MarginsSection from '@/components/article/MarginsSection';
import LineSpacingSection from '@/components/article/LineSpacingSection';
import FontsSection from '@/components/article/FontsSection';
import AlignmentSection from '@/components/article/AlignmentSection';
import FaqSection from '@/components/article/FaqSection';
import ConclusionSection from '@/components/article/ConclusionSection';

const FondamentauxMiseEnPage = () => {
  // Mise à jour des balises meta pour le SEO
  useEffect(() => {
    document.title = "Guide de mise en page professionnelle | ilodata.com";
    
    // Création ou mise à jour de la balise meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", "Découvrez les éléments fondamentaux d'une mise en page professionnelle : marges, interlignes et polices. Conseils pour améliorer la lisibilité et l'esthétique de votre livre.");
  }, []);

  const breadcrumbs = [
    { label: 'Accueil', url: '/' },
    { label: 'Guides et Conseils', url: '/guides' },
    { label: 'Guide de mise en page professionnelle', url: '/guides/fondamentaux-mise-en-page' }
  ];

  const tocItems = [
    { id: 'introduction', title: 'Introduction à la mise en page professionnelle' },
    { id: 'importance', title: 'Pourquoi une bonne mise en page est essentielle pour un livre ?' },
    { id: 'marges', title: "Les marges : un élément clé de l'équilibre visuel" },
    { id: 'interligne', title: "L'interligne : un facteur de lisibilité primordial" },
    { id: 'polices', title: 'Les polices : choisir le bon style typographique' },
    { id: 'alignement', title: 'Alignement et justification du texte' },
    { id: 'faq', title: 'FAQ sur la mise en page professionnelle' },
    { id: 'conclusion', title: 'Conclusion' }
  ];

  const faqs = [
    {
      question: 'Quelle est la meilleure police pour un livre imprimé ?',
      answer: 'Les polices comme Garamond, Times New Roman et Minion Pro sont idéales pour leur lisibilité.'
    },
    {
      question: 'Quel est l\'interligne idéal pour un livre ?',
      answer: 'Un interligne de 1,2 à 1,5 est recommandé pour assurer une lecture fluide.'
    },
    {
      question: 'Comment éviter une mise en page trop chargée ?',
      answer: 'Utilisez des marges larges, un interligne suffisant et des espaces blancs équilibrés.'
    },
    {
      question: 'Dois-je justifier mon texte dans un livre ?',
      answer: 'Oui, la justification améliore l\'esthétique, mais il faut bien gérer l\'espacement des mots.'
    },
    {
      question: 'Quels logiciels utiliser pour une mise en page professionnelle ?',
      answer: 'Adobe InDesign, Scribus et Microsoft Word sont des outils couramment utilisés.'
    }
  ];

  return (
    <ArticleLayout
      title="Guide de mise en page professionnelle"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
    >
      <Separator className="my-8" />

      <IntroductionSection />
      <ImportanceSection />
      <MarginsSection />
      <LineSpacingSection />
      <FontsSection />
      <AlignmentSection />
      <FaqSection faqs={faqs} />
      <ConclusionSection />
    </ArticleLayout>
  );
};

export default FondamentauxMiseEnPage;
