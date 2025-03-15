
import React, { useEffect } from 'react';
import ArticleLayout from '@/components/article/ArticleLayout';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

const FondamentauxMiseEnPage = () => {
  // Mise à jour des balises meta pour le SEO
  useEffect(() => {
    document.title = "Guide de mise en page professionnelle | ilodata.com";
    
    // Création ou mise à jour de la balise meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", "Découvrez les éléments fondamentaux d'une mise en page professionnelle : marges, interlignes et polices. Conseils pour améliorer la lisibilité et l'esthétique de votre livre.");
  }, []);

  const breadcrumbs = [
    { label: 'Accueil', url: '/' },
    { label: 'Guides et Conseils', url: '/guides' },
    { label: 'Guide de mise en page professionnelle', url: '/guides/fondamentaux-mise-en-page' }
  ];

  return (
    <ArticleLayout
      title="Guide de mise en page professionnelle"
      breadcrumbs={breadcrumbs}
    >
      <section>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">Table des matières</h2>
          <ul className="space-y-2 list-disc pl-5 text-slate-600">
            <li><a href="#introduction" className="text-ilodata-600 hover:underline">Introduction à la mise en page professionnelle</a></li>
            <li><a href="#importance" className="text-ilodata-600 hover:underline">Pourquoi une bonne mise en page est essentielle pour un livre ?</a></li>
            <li><a href="#marges" className="text-ilodata-600 hover:underline">Les marges : un élément clé de l'équilibre visuel</a></li>
            <li><a href="#interligne" className="text-ilodata-600 hover:underline">L'interligne : un facteur de lisibilité primordial</a></li>
            <li><a href="#polices" className="text-ilodata-600 hover:underline">Les polices : choisir le bon style typographique</a></li>
            <li><a href="#alignement" className="text-ilodata-600 hover:underline">Alignement et justification du texte</a></li>
            <li><a href="#faq" className="text-ilodata-600 hover:underline">FAQ sur la mise en page professionnelle</a></li>
            <li><a href="#conclusion" className="text-ilodata-600 hover:underline">Conclusion</a></li>
          </ul>
        </div>
      </section>

      <Separator className="my-8" />

      <section id="introduction" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-slate-800">Introduction à la mise en page professionnelle</h2>
        <p className="mb-4 text-slate-700">
          Une mise en page professionnelle est essentielle pour garantir une lecture agréable et fluide d'un livre. 
          Que ce soit pour un roman, un essai ou un livre académique, la manière dont le texte est disposé sur la page 
          influence directement la perception du lecteur.
        </p>
        <p className="mb-4 text-slate-700">
          Dans cet article, nous allons explorer les éléments fondamentaux d'une mise en page réussie : les marges, 
          l'interligne et les polices de caractères. Vous découvrirez comment ces aspects contribuent à améliorer 
          la lisibilité et l'esthétique d'un ouvrage.
        </p>
      </section>

      <section id="importance" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-slate-800">Pourquoi une bonne mise en page est essentielle pour un livre ?</h2>
        <p className="mb-4 text-slate-700">
          Une mise en page soignée ne se résume pas à un simple aspect visuel. Elle joue un rôle déterminant dans :
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-700 mb-4">
          <li><strong className="font-medium">La lisibilité</strong> : un texte bien espacé et structuré est plus facile à lire.</li>
          <li><strong className="font-medium">Le confort du lecteur</strong> : une bonne mise en page réduit la fatigue oculaire.</li>
          <li><strong className="font-medium">La crédibilité de l'ouvrage</strong> : un livre bien présenté renforce la confiance du lecteur.</li>
          <li><strong className="font-medium">L'accessibilité</strong> : une mise en page adaptée permet une meilleure accessibilité aux personnes ayant des difficultés de lecture.</li>
        </ul>
      </section>

      <section id="marges" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-slate-800">Les marges : un élément clé de l'équilibre visuel</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-slate-800">Définition et rôle des marges</h3>
          <p className="mb-3 text-slate-700">
            Les marges sont les espaces vides autour du texte. Elles jouent plusieurs rôles :
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li>Éviter que le texte ne soit trop proche des bords.</li>
            <li>Apporter un confort visuel en créant une respiration entre les blocs de texte.</li>
            <li>Laisser de la place pour la reliure dans un livre imprimé.</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-slate-800">Les différents types de marges</h3>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li><strong className="font-medium">Marge supérieure</strong> : située en haut de la page.</li>
            <li><strong className="font-medium">Marge inférieure</strong> : située en bas de la page.</li>
            <li><strong className="font-medium">Marge intérieure</strong> (ou reliure) : importante pour éviter que le texte ne soit trop près de la pliure du livre.</li>
            <li><strong className="font-medium">Marge extérieure</strong> : située à l'extérieur de la page, souvent utilisée pour la numérotation.</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-slate-800">Bonnes pratiques pour définir les marges d'un livre</h3>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li>Une marge intérieure plus large que les autres pour la reliure.</li>
            <li>Une marge extérieure d'au moins 1,5 cm pour faciliter la lecture.</li>
            <li>Une marge inférieure légèrement plus grande pour éviter que le texte ne semble "écrasé" en bas de la page.</li>
          </ul>
        </div>
      </section>

      <section id="interligne" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-slate-800">L'interligne : un facteur de lisibilité primordial</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-slate-800">Qu'est-ce que l'interligne ?</h3>
          <p className="mb-3 text-slate-700">
            L'interligne correspond à l'espace entre deux lignes de texte. Un interligne trop serré rend la lecture difficile, 
            tandis qu'un interligne trop large crée une sensation de vide.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-slate-800">Comment choisir le bon interligne pour un livre ?</h3>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li>Pour un livre imprimé, l'interligne recommandé est généralement 1,2 à 1,5 fois la taille de la police.</li>
            <li>Pour un livre numérique, un interligne légèrement plus grand améliore le confort de lecture.</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-slate-800">Erreurs courantes à éviter</h3>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li>Un interligne trop réduit rendant la lecture étouffante.</li>
            <li>Un interligne trop large augmentant le nombre de pages inutilement.</li>
          </ul>
        </div>
      </section>

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

      <section id="alignement" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-slate-800">Alignement et justification du texte</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-slate-800">Alignement gauche, centré, droit et justifié</h3>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li><strong className="font-medium">Alignement gauche</strong> : utilisé pour les textes courts et les dialogues.</li>
            <li><strong className="font-medium">Alignement centré</strong> : pour les titres et sous-titres.</li>
            <li><strong className="font-medium">Alignement droit</strong> : rarement utilisé.</li>
            <li><strong className="font-medium">Justification</strong> : idéal pour les livres imprimés car il donne un rendu propre et structuré.</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-slate-800">Quel alignement choisir pour un livre ?</h3>
          <p className="text-slate-700">
            Le texte justifié est le plus couramment utilisé dans les livres imprimés, car il crée des blocs de texte homogènes. 
            Cependant, il faut veiller à éviter les "rivières" d'espace blanc.
          </p>
        </div>
      </section>

      <section id="faq" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-slate-800">FAQ sur la mise en page professionnelle</h2>
        
        <div className="space-y-6 bg-slate-50 p-6 rounded-lg">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-slate-800">1. Quelle est la meilleure police pour un livre imprimé ?</h3>
            <p className="text-slate-700">
              Les polices comme Garamond, Times New Roman et Minion Pro sont idéales pour leur lisibilité.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2 text-slate-800">2. Quel est l'interligne idéal pour un livre ?</h3>
            <p className="text-slate-700">
              Un interligne de 1,2 à 1,5 est recommandé pour assurer une lecture fluide.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2 text-slate-800">3. Comment éviter une mise en page trop chargée ?</h3>
            <p className="text-slate-700">
              Utilisez des marges larges, un interligne suffisant et des espaces blancs équilibrés.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2 text-slate-800">4. Dois-je justifier mon texte dans un livre ?</h3>
            <p className="text-slate-700">
              Oui, la justification améliore l'esthétique, mais il faut bien gérer l'espacement des mots.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2 text-slate-800">5. Quels logiciels utiliser pour une mise en page professionnelle ?</h3>
            <p className="text-slate-700">
              Adobe InDesign, Scribus et Microsoft Word sont des outils couramment utilisés.
            </p>
          </div>
        </div>
      </section>

      <section id="conclusion" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-slate-800">Conclusion</h2>
        <p className="text-slate-700">
          La mise en page d'un livre est un élément fondamental pour offrir une lecture fluide et agréable. 
          En maîtrisant les marges, l'interligne et le choix des polices, vous garantissez un rendu professionnel 
          et esthétique. Une bonne mise en page n'est pas seulement une question de design, mais une nécessité 
          pour captiver et fidéliser vos lecteurs.
        </p>
      </section>
    </ArticleLayout>
  );
};

export default FondamentauxMiseEnPage;
