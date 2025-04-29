
import React from 'react';
import ArticleLayout from '@/components/article/ArticleLayout';
import Introduction from '@/components/article/AdapterModeleWord/Introduction';
import StylesTips from '@/components/article/AdapterModeleWord/StylesTips';
import MarginsTips from '@/components/article/AdapterModeleWord/MarginsTips';
import ColorsFontsTips from '@/components/article/AdapterModeleWord/ColorsFontsTips';
import ImagesTips from '@/components/article/AdapterModeleWord/ImagesTips';
import BackupTips from '@/components/article/AdapterModeleWord/BackupTips';
import SectionsTips from '@/components/article/AdapterModeleWord/SectionsTips';
import Conclusion from '@/components/article/AdapterModeleWord/Conclusion';

const AdapterModeleWord = () => {
  // Breadcrumbs definition
  const breadcrumbs = [
    { label: "Accueil", url: "/" },
    { label: "Guides et Conseils", url: "/guides" },
    { label: "Adapter un modèle Word", url: "/guides/adapter-modele-word" }
  ];

  // Table of contents items
  const tocItems = [
    { id: "introduction", title: "Introduction" },
    { id: "styles", title: "1. Utiliser les styles prédéfinis" },
    { id: "marges", title: "2. Ajuster les marges et la mise en page" },
    { id: "couleurs", title: "3. Modifier les couleurs et polices" },
    { id: "images", title: "4. Insérer des images correctement" },
    { id: "sauvegarde", title: "5. Sauvegarder avant modification" },
    { id: "sections", title: "6. Utiliser les sections" },
    { id: "conclusion", title: "Conclusion" }
  ];

  return (
    <ArticleLayout 
      title="Astuces pour adapter un modèle Word à votre texte sans perdre en qualité"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
    >
      <Introduction />
      <StylesTips />
      <MarginsTips />
      <ColorsFontsTips />
      <ImagesTips />
      <BackupTips />
      <SectionsTips />
      <Conclusion />
    </ArticleLayout>
  );
};

export default AdapterModeleWord;
