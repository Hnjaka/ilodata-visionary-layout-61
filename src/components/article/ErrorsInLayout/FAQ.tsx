
import React from 'react';

const FAQ = () => {
  return (
    <section id="faq" className="mb-12">
      <h2 className="text-2xl font-bold mb-4">FAQ sur la mise en page d'un livre</h2>
      <div className="space-y-4">
        <div className="bg-slate-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Quelle est la meilleure police pour un livre imprimé ?</h3>
          <p className="text-slate-700">Times New Roman, Garamond ou Georgia sont recommandées.</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Dois-je toujours justifier mon texte ?</h3>
          <p className="text-slate-700">Oui, mais en veillant à utiliser la césure automatique.</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Quelle est l'importance des marges dans un livre ?</h3>
          <p className="text-slate-700">Elles offrent un confort visuel au lecteur.</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Comment éviter les erreurs de pagination ?</h3>
          <p className="text-slate-700">Utilisez des gabarits professionnels.</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Quelle résolution minimale pour les images dans un livre imprimé ?</h3>
          <p className="text-slate-700">300 dpi est recommandé.</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Dois-je utiliser des styles prédéfinis pour mes titres et paragraphes ?</h3>
          <p className="text-slate-700">Oui, pour une cohérence optimale.</p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
