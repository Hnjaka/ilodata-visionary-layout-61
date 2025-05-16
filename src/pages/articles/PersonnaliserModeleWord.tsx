
import React, { useEffect } from 'react';
import ArticleLayout from '@/components/article/ArticleLayout';
import Introduction from '@/components/article/CustomizeWordTemplate/Introduction';
import Step1 from '@/components/article/CustomizeWordTemplate/Step1';
import Step2 from '@/components/article/CustomizeWordTemplate/Step2';
import Step3 from '@/components/article/CustomizeWordTemplate/Step3';
import Step4 from '@/components/article/CustomizeWordTemplate/Step4';
import Step5 from '@/components/article/CustomizeWordTemplate/Step5';
import FAQ from '@/components/article/CustomizeWordTemplate/FAQ';
import Conclusion from '@/components/article/CustomizeWordTemplate/Conclusion';

const PersonnaliserModeleWord = () => {
  // Ajout du useEffect pour mettre à jour le titre
  useEffect(() => {
    document.title = "Comment personnaliser un modèle de mise en page sous Word – Conseils et mise en page pro | Ilodata";

    // Ajout de la meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", "Apprenez à personnaliser un modèle Word en 5 étapes simples pour obtenir une mise en page professionnelle adaptée à votre projet de livre.");
  }, []);

  const breadcrumbs = [
    { label: "Accueil", url: "/" },
    { label: "Guides et Conseils", url: "/guides" },
    { label: "Personnaliser un modèle Word", url: "/guides/personnaliser-modele-word" }
  ];

  const tocItems = [
    { id: "introduction", title: "Introduction" },
    { id: "etape1", title: "Étape 1 : Choisir un modèle adapté" },
    { id: "etape2", title: "Étape 2 : Modifier les styles de texte" },
    { id: "etape3", title: "Étape 3 : Ajuster les marges et l'interligne" },
    { id: "etape4", title: "Étape 4 : Insérer des éléments personnalisés" },
    { id: "etape5", title: "Étape 5 : Sauvegarder le modèle" },
    { id: "faq", title: "FAQ" },
    { id: "conclusion", title: "Conclusion" }
  ];

  return (
    <ArticleLayout 
      title="Comment personnaliser un modèle de mise en page sous Word en 5 étapes simples"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
    >
      <Introduction />
      <Step1 />
      <Step2 />
      <Step3 />
      <Step4 />
      <Step5 />
      <FAQ />
      <Conclusion />
    </ArticleLayout>
  );
};

export default PersonnaliserModeleWord;
