
import React from 'react';

const VerificationFinale = () => {
  return (
    <section id="verification" className="mb-12">
      <h2 className="text-2xl font-bold mb-4">5. Vérifiez ces points avant impression ou export</h2>
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <ul className="list-disc pl-6 text-slate-700 space-y-1">
          <li>Numérotation des pages</li>
          <li>Alignement des en-têtes et pieds de page</li>
          <li>Marges d'impression (minimum 1,5 cm pour les livres brochés)</li>
        </ul>
      </div>
    </section>
  );
};

export default VerificationFinale;
