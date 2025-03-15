
import React from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";

const FontsSection = () => {
  return (
    <section id="polices" className="mb-10">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Les polices : choisir le bon style typographique</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-slate-800">Importance du choix de la police</h3>
        <p className="mb-3 text-slate-700">
          Une police mal choisie peut nuire à la lisibilité d'un livre. Une police idéale doit être :
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-700">
          <li><strong className="font-medium">Lisible</strong> : facile à lire, même sur une longue durée.</li>
          <li><strong className="font-medium">Adaptée au format</strong> : certaines polices conviennent mieux au papier, d'autres à l'écran.</li>
          <li><strong className="font-medium">Esthétique</strong> : cohérente avec le ton du livre.</li>
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-slate-800">Polices recommandées pour une mise en page professionnelle</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type de livre</TableHead>
              <TableHead>Polices recommandées</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Roman</TableCell>
              <TableCell>Garamond, Times New Roman, Baskerville</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Essai</TableCell>
              <TableCell>Georgia, Minion Pro, Caslon</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Livre numérique</TableCell>
              <TableCell>Open Sans, Lato, Roboto</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-slate-800">Taille et espacement des caractères</h3>
        <ul className="list-disc pl-5 space-y-2 text-slate-700">
          <li>La taille de police idéale pour un livre imprimé est entre 10 et 12 points.</li>
          <li>L'espacement des caractères (crénage) doit être réglé pour éviter une densité excessive du texte.</li>
        </ul>
      </div>
    </section>
  );
};

export default FontsSection;
