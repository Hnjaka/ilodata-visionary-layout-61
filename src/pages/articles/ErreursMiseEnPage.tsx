
import React, { useEffect } from 'react';
import { FileText } from 'lucide-react';
import ArticleLayout from '@/components/article/ArticleLayout';
import { Separator } from "@/components/ui/separator";

const ErreursMiseEnPage = () => {
  useEffect(() => {
    document.title = "Les erreurs courantes à éviter lors de la mise en page d'un livre | ilodata.com";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", "Découvrez les erreurs courantes à éviter lors de la mise en page d'un livre afin d'améliorer l'esthétique, la lisibilité et l'impact de votre œuvre.");
  }, []);

  const breadcrumbs = [
    { label: 'Accueil', url: '/' },
    { label: 'Guides et Conseils', url: '/guides' },
    { label: 'Erreurs à éviter en mise en page', url: '/guides/erreurs-mise-en-page' }
  ];

  const tocItems = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'marges', title: 'Négliger les marges et l\'espacement' },
    { id: 'polices', title: 'Utiliser des polices inappropriées' },
    { id: 'interlignage', title: 'Mauvaise gestion de l\'interlignage' },
    { id: 'hierarchie', title: 'Ignorer la hiérarchie des titres' },
    { id: 'correction', title: 'Sauter la correction d\'épreuves' },
    { id: 'formats', title: 'Ne pas harmoniser les formats' },
    { id: 'images', title: 'Surutiliser les images' },
    { id: 'pagination', title: 'Oublier la pagination' },
    { id: 'cesures', title: 'Mal gérer les césures' },
    { id: 'styles', title: 'Négliger les styles' },
    { id: 'faq', title: 'FAQ' },
    { id: 'conclusion', title: 'Conclusion' }
  ];

  return (
    <ArticleLayout
      title="Les erreurs courantes à éviter lors de la mise en page d'un livre"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
    >
      <Separator className="my-8" />

      <section id="introduction" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Introduction : L'importance cruciale de la mise en page d'un livre</h2>
        <p className="text-slate-700">La mise en page d'un livre n'est pas seulement une question d'esthétique ; elle conditionne la facilité de lecture, l'expérience du lecteur et, en fin de compte, le succès de votre œuvre...</p>
      </section>

      <section id="marges" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Erreur 1 : Négliger les marges et l'espacement</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Définir des marges appropriées</h3>
            <p className="text-slate-700">Les marges jouent un rôle vital dans la lisibilité d'un livre...</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">L'impact de l'espacement sur la lisibilité</h3>
            <p className="text-slate-700">Un espacement correct entre les lignes permet aux yeux de naviguer facilement sur la page...</p>
          </div>
        </div>
      </section>

      <section id="polices" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Erreur 2 : Utiliser des polices inappropriées</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Comment choisir une police lisible</h3>
            <p className="text-slate-700">Optez pour des polices classiques comme Times New Roman, Garamond ou Georgia pour les textes longs...</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Pourquoi éviter les polices fantaisistes</h3>
            <p className="text-slate-700">Des polices excentriques peuvent sembler amusantes, mais elles distraient et rendent la lecture pénible...</p>
          </div>
        </div>
      </section>

      <section id="interlignage" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Erreur 3 : Mauvaise gestion de l'interlignage et de l'alignement</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Trouver le bon interlignage</h3>
            <p className="text-slate-700">Un interlignage trop serré ou trop espacé nuit à la lisibilité...</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Alignement du texte : Justifié ou aligné à gauche ?</h3>
            <p className="text-slate-700">Le texte justifié offre une apparence propre, mais nécessite une attention particulière aux césures...</p>
          </div>
        </div>
      </section>

      <section id="hierarchie" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Erreur 4 : Ignorer la hiérarchie des titres</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Importance de structurer correctement les chapitres</h3>
            <p className="text-slate-700">Chaque chapitre doit débuter de manière cohérente avec un style distinct...</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Utilisation cohérente des styles de titre</h3>
            <p className="text-slate-700">Les styles doivent être uniformes tout au long du livre...</p>
          </div>
        </div>
      </section>

      <section id="correction" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Erreur 5 : Sauter l'étape de la correction d'épreuves</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Pourquoi les relectures sont essentielles</h3>
            <p className="text-slate-700">Une correction minutieuse est impérative pour éliminer les fautes typographiques...</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Les outils pour corriger efficacement</h3>
            <p className="text-slate-700">Utilisez des logiciels professionnels comme Antidote ou Grammarly...</p>
          </div>
        </div>
      </section>

      <section id="formats" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Erreur 6 : Ne pas harmoniser la mise en page pour les différents formats</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Adapter la mise en page selon le support</h3>
            <p className="text-slate-700">Chaque support a ses exigences spécifiques. Le format papier nécessite une attention particulière...</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Les erreurs spécifiques aux ebooks</h3>
            <p className="text-slate-700">Évitez les mises en page rigides qui ne s'adaptent pas aux différentes tailles d'écran...</p>
          </div>
        </div>
      </section>

      <section id="images" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Erreur 7 : Surutiliser les images et les graphiques</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Bien intégrer les éléments visuels</h3>
            <p className="text-slate-700">Les images doivent soutenir le texte et non l'envahir...</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Considérations techniques pour les images</h3>
            <p className="text-slate-700">Veillez à la résolution des images pour éviter un rendu pixelisé...</p>
          </div>
        </div>
      </section>

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

      <section id="cesures" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Erreur 9 : Mal gérer les césures et les coupures de mots</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Pourquoi éviter les coupures maladroites</h3>
            <p className="text-slate-700">Un mot coupé en deux au mauvais endroit casse le rythme de la lecture...</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Paramétrer correctement les césures</h3>
            <p className="text-slate-700">Utilisez les options de césure automatique de votre logiciel de mise en page...</p>
          </div>
        </div>
      </section>

      <section id="styles" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Erreur 10 : Négliger les styles de paragraphes</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Créer et utiliser des styles cohérents</h3>
            <p className="text-slate-700">Définissez des styles pour garantir l'uniformité...</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Éviter les formats manuels excessifs</h3>
            <p className="text-slate-700">Trop de retouches manuelles augmentent le risque d'erreurs...</p>
          </div>
        </div>
      </section>

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

      <section id="conclusion" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Conclusion : Réussir sa mise en page pour sublimer son œuvre</h2>
        <p className="text-slate-700">La mise en page d'un livre est un pilier fondamental pour valoriser votre contenu, séduire votre lecteur et asseoir votre crédibilité d'auteur. En évitant ces erreurs courantes, vous vous assurez une présentation professionnelle et attrayante de votre ouvrage.</p>
      </section>
    </ArticleLayout>
  );
};

export default ErreursMiseEnPage;
