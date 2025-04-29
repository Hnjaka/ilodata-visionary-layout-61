
import React from 'react';
import ArticleLayout from '@/components/article/ArticleLayout';
import Introduction from '@/components/article/MeilleuresPratiquesModeles/Introduction';
import ChoixModele from '@/components/article/MeilleuresPratiquesModeles/ChoixModele';
import StylesPredefinis from '@/components/article/MeilleuresPratiquesModeles/StylesPredefinis';
import PersonnaliserModele from '@/components/article/MeilleuresPratiquesModeles/PersonnaliserModele';
import InsererImages from '@/components/article/MeilleuresPratiquesModeles/InsererImages';
import VerificationFinale from '@/components/article/MeilleuresPratiquesModeles/VerificationFinale';
import ModelesGratuits from '@/components/article/MeilleuresPratiquesModeles/ModelesGratuits';
import ServicesMiseEnPage from '@/components/article/MeilleuresPratiquesModeles/ServicesMiseEnPage';
import Conclusion from '@/components/article/MeilleuresPratiquesModeles/Conclusion';

const MeilleuresPratiquesModeles = () => {
  // Breadcrumbs definition
  const breadcrumbs = [
    { label: "Accueil", url: "/" },
    { label: "Guides et Conseils", url: "/guides" },
    { label: "Meilleures Pratiques Modèles", url: "/guides/meilleures-pratiques-modeles" }
  ];

  // Table of contents items
  const tocItems = [
    { id: "introduction", title: "Introduction" },
    { id: "choix-modele", title: "1. Choisir le bon modèle" },
    { id: "styles-predefinis", title: "2. Utiliser les styles prédéfinis" },
    { id: "personnaliser", title: "3. Personnaliser sans casser la mise en page" },
    { id: "inserer-images", title: "4. Insérer des images correctement" },
    { id: "verification", title: "5. Vérifier avant impression ou export" },
    { id: "modeles-gratuits", title: "Bonus : Modèles gratuits" },
    { id: "services", title: "Services de mise en page sur mesure" },
    { id: "conclusion", title: "Conclusion" }
  ];

  return (
    <ArticleLayout 
      title="Les meilleures pratiques pour utiliser nos modèles de mise en page"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
    >
      <Introduction />
      <ChoixModele />
      <StylesPredefinis />
      <PersonnaliserModele />
      <InsererImages />
      <VerificationFinale />
      <ModelesGratuits />
      <ServicesMiseEnPage />
      <Conclusion />
    </ArticleLayout>
  );
};

export default MeilleuresPratiquesModeles;
