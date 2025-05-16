
import React, { useEffect } from 'react';
import ArticleLayout from '@/components/article/ArticleLayout';
import { Separator } from "@/components/ui/separator";
import Introduction from '@/components/article/ErrorsInLayout/Introduction';
import MarginsSection from '@/components/article/ErrorsInLayout/MarginsSection';
import FontSection from '@/components/article/ErrorsInLayout/FontSection';
import LineSpacingSection from '@/components/article/ErrorsInLayout/LineSpacingSection';
import HierarchySection from '@/components/article/ErrorsInLayout/HierarchySection';
import ProofreadingSection from '@/components/article/ErrorsInLayout/ProofreadingSection';
import FormatSection from '@/components/article/ErrorsInLayout/FormatSection';
import ImagesSection from '@/components/article/ErrorsInLayout/ImagesSection';
import PaginationSection from '@/components/article/ErrorsInLayout/PaginationSection';
import HyphenationSection from '@/components/article/ErrorsInLayout/HyphenationSection';
import StylesSection from '@/components/article/ErrorsInLayout/StylesSection';
import FAQ from '@/components/article/ErrorsInLayout/FAQ';
import Conclusion from '@/components/article/ErrorsInLayout/Conclusion';

const ErreursMiseEnPage = () => {
  useEffect(() => {
    document.title = "Les erreurs courantes à éviter lors de la mise en page d'un livre – Conseils et mise en page pro | Ilodata";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", "Découvrez les erreurs courantes à éviter lors de la mise en page d'un livre afin d'améliorer l'esthétique, la lisibilité et l'impact de votre œuvre.");
  }, []);

  const breadcrumbs = [
    { label: 'Accueil', url: '/' },
    { label: 'Guides et Conseils', url: '/guides' },
    { label: 'Erreurs à éviter en mise en page', url: '/guides/erreurs-mise-en-page' }
  ];

  const tocItems = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'marges', title: 'Négliger les marges et l\'espacement' },
    { id: 'polices', title: 'Utiliser des polices inappropriées' },
    { id: 'interlignage', title: 'Mauvaise gestion de l\'interlignage' },
    { id: 'hierarchie', title: 'Ignorer la hiérarchie des titres' },
    { id: 'correction', title: 'Sauter la correction d\'épreuves' },
    { id: 'formats', title: 'Ne pas harmoniser les formats' },
    { id: 'images', title: 'Surutiliser les images' },
    { id: 'pagination', title: 'Oublier la pagination' },
    { id: 'cesures', title: 'Mal gérer les césures' },
    { id: 'styles', title: 'Négliger les styles' },
    { id: 'faq', title: 'FAQ' },
    { id: 'conclusion', title: 'Conclusion' }
  ];

  return (
    <ArticleLayout
      title="Les erreurs courantes à éviter lors de la mise en page d'un livre"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
    >
      <Separator className="my-8" />
      <Introduction />
      <MarginsSection />
      <FontSection />
      <LineSpacingSection />
      <HierarchySection />
      <ProofreadingSection />
      <FormatSection />
      <ImagesSection />
      <PaginationSection />
      <HyphenationSection />
      <StylesSection />
      <FAQ />
      <Conclusion />
    </ArticleLayout>
  );
};

export default ErreursMiseEnPage;
