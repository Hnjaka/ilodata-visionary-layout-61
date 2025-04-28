
import React from 'react';

const FAQ = () => {
  return (
    <section id="faq" className="mb-12">
      <h2 className="text-2xl font-bold mb-6">FAQ sur la personnalisation d'un modèle de mise en page Word</h2>
      <div className="space-y-4">
        {[
          {
            question: "Puis-je personnaliser un modèle Word téléchargé depuis internet ?",
            answer: "Oui, les modèles téléchargés peuvent être entièrement modifiés et enregistrés sous forme de modèle personnalisé."
          },
          {
            question: "Comment appliquer un style modifié à tout le document ?",
            answer: "En modifiant directement un style existant, toutes les occurrences de ce style dans le document seront mises à jour automatiquement."
          },
          {
            question: "Peut-on insérer plusieurs en-têtes différents dans un même document Word ?",
            answer: "Oui, en utilisant les sauts de section, vous pouvez personnaliser l'en-tête pour différentes parties du document."
          },
          {
            question: "Quelle est la meilleure police pour un document professionnel ?",
            answer: "Des polices classiques comme Calibri, Times New Roman ou Arial sont recommandées pour un aspect formel et lisible."
          },
          {
            question: "Comment protéger mon modèle pour éviter toute modification accidentelle ?",
            answer: "Vous pouvez activer la protection du document en passant par Révision > Restreindre la modification."
          },
          {
            question: "Est-il possible de partager un modèle personnalisé avec d'autres utilisateurs ?",
            answer: "Oui, il suffit d'envoyer le fichier .dotx à vos collaborateurs qui pourront l'ouvrir et l'utiliser."
          }
        ].map((item, index) => (
          <div key={index} className="bg-slate-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">{item.question}</h3>
            <p className="text-slate-700">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
