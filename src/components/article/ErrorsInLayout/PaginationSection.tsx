
import React from 'react';

const PaginationSection = () => {
  return (
    <section id="pagination" className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Erreur 8 : Oublier l'importance de la pagination</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">Les règles de base de la pagination</h3>
          <p className="text-slate-700">La pagination doit être discrète et bien placée...</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">Comment bien placer les numéros de page</h3>
          <p className="text-slate-700">Placez les numéros à l'extérieur des marges intérieures...</p>
        </div>
      </div>
    </section>
  );
};

export default PaginationSection;
