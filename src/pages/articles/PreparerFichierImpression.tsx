
import React, { useEffect } from 'react';
import ArticleLayout from '@/components/article/ArticleLayout';
import Introduction from '@/components/article/PreparerFichierImpression/Introduction';
import MargesSection from '@/components/article/PreparerFichierImpression/MargesSection';
import FondsPerduSection from '@/components/article/PreparerFichierImpression/FondsPerduSection';
import ResolutionSection from '@/components/article/PreparerFichierImpression/ResolutionSection';
import FormatFichierSection from '@/components/article/PreparerFichierImpression/FormatFichierSection';
import ModelesBonusSection from '@/components/article/PreparerFichierImpression/ModelesBonusSection';
import ServiceSection from '@/components/article/PreparerFichierImpression/ServiceSection';
import Conclusion from '@/components/article/PreparerFichierImpression/Conclusion';

const PreparerFichierImpression = () => {
  // Ajout du useEffect pour mettre à jour le titre
  useEffect(() => {
    document.title = "Comment préparer votre fichier pour l'impression – Conseils et mise en page pro | Ilodata";

    // Mise à jour de la meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", "Guide complet pour préparer correctement votre fichier à l'impression : marges, fonds perdus et résolution. Conseils d'experts pour un résultat professionnel.");
  }, []);

  const tocItems = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'marges', title: 'Les marges' },
    { id: 'fonds-perdus', title: 'Les fonds perdus' },
    { id: 'resolution', title: 'La résolution' },
    { id: 'format-fichier', title: 'Format de fichier et vérifications' },
    { id: 'modeles-bonus', title: 'Modèles professionnels gratuits' },
    { id: 'services', title: "Besoin d'une expertise professionnelle" },
    { id: 'conclusion', title: 'Conclusion' }
  ];

  const breadcrumbs = [
    { label: 'Accueil', url: '/' },
    { label: 'Guides et Conseils', url: '/guides' },
    { label: 'Préparer votre fichier pour l\'impression', url: '/guides/preparer-fichier-impression' }
  ];

  return (
    <ArticleLayout
      title="Comment préparer votre fichier pour l'impression : marges, fonds perdus et résolution"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
    >
      <Introduction />
      <MargesSection />
      <FondsPerduSection />
      <ResolutionSection />
      <FormatFichierSection />
      <ModelesBonusSection />
      <ServiceSection />
      <Conclusion />
    </ArticleLayout>
  );
};

export default PreparerFichierImpression;
