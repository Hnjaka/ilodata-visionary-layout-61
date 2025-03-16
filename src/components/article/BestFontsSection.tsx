
import React from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

const BestFontsSection = () => {
  return (
    <section id="meilleures-polices" className="mb-10">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">
        Les meilleures polices pour une mise en page professionnelle
      </h2>
      
      <p className="text-slate-700 mb-4">
        Le choix de la police joue autant que sa taille. Voici quelques polices fréquemment utilisées en édition :
      </p>
      
      <div className="overflow-x-auto mb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type de livre</TableHead>
              <TableHead>Polices recommandées</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Romans</TableCell>
              <TableCell>Garamond, Times New Roman, Baskerville</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Essais et documents</TableCell>
              <TableCell>Georgia, Minion Pro, Caslon</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Livres numériques</TableCell>
              <TableCell>Open Sans, Lato, Roboto</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Livres pour enfants</TableCell>
              <TableCell>Comic Sans, Century Gothic, Arial Rounded</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      
      <p className="text-slate-700">
        Les polices avec empattement (comme Garamond et Times New Roman) sont privilégiées pour les textes longs, 
        car elles guident naturellement l'œil sur la ligne.
      </p>
    </section>
  );
};

export default BestFontsSection;
