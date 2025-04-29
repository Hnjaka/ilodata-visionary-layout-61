
interface FaqItem {
  question: string;
  answer: string;
}

export const getFaqItems = (): FaqItem[] => {
  return [
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
};
