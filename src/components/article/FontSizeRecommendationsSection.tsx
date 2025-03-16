
import React from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

const FontSizeRecommendationsSection = () => {
  return (
    <section id="tailles-recommandees" className="mb-10">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">
        Tailles de police recommandées selon le type de livre
      </h2>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type de livre</TableHead>
              <TableHead>Taille recommandée (papier)</TableHead>
              <TableHead>Taille recommandée (numérique)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Roman</TableCell>
              <TableCell>10 - 12 pts</TableCell>
              <TableCell>12 - 14 pts</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Essai</TableCell>
              <TableCell>11 - 12 pts</TableCell>
              <TableCell>12 - 14 pts</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Livre pour enfants</TableCell>
              <TableCell>14 - 16 pts</TableCell>
              <TableCell>16 - 18 pts</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Livre universitaire</TableCell>
              <TableCell>10 - 11 pts</TableCell>
              <TableCell>12 - 14 pts</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Bande dessinée</TableCell>
              <TableCell>Variable (selon police et bulles)</TableCell>
              <TableCell>14 - 18 pts</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default FontSizeRecommendationsSection;
