
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';

const CGU = () => {
  useEffect(() => {
    document.title = "Conditions Générales d'Utilisation | ilodata.com";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', "Conditions générales d'utilisation du site ilodata.com - Consultez nos CGU pour comprendre les règles d'utilisation de nos services.");
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">Conditions Générales d'Utilisation</h1>
            <p className="text-slate-600 mb-8">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            
            <Separator className="my-6" />
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">1. Acceptation des conditions</h2>
              <p className="text-slate-600 mb-4">
                En utilisant le site ilodata.com, vous acceptez pleinement et sans réserve les présentes conditions générales d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce site.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">2. Description des services</h2>
              <p className="text-slate-600 mb-4">
                ilodata.com propose des services de mise en page professionnelle, des modèles Word personnalisables, et des formations relatives à la mise en page de documents.
              </p>
              <p className="text-slate-600 mb-4">
                Nous nous réservons le droit de modifier, suspendre ou interrompre tout aspect du service à tout moment, y compris la disponibilité de toute fonctionnalité, base de données ou contenu.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">3. Utilisation des modèles</h2>
              <p className="text-slate-600 mb-4">
                Les modèles téléchargeables sur ilodata.com sont destinés à un usage personnel ou professionnel. Toute redistribution, revente ou partage des modèles est strictement interdite sans autorisation écrite préalable.
              </p>
              <p className="text-slate-600 mb-4">
                L'utilisateur est seul responsable du contenu qu'il intègre dans les modèles et s'engage à respecter les droits de propriété intellectuelle des tiers.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">4. Propriété intellectuelle</h2>
              <p className="text-slate-600 mb-4">
                Tous les contenus présents sur ilodata.com (textes, images, logos, design, architecture, etc.) sont protégés par le droit d'auteur et restent la propriété exclusive d'ilodata.com ou de ses partenaires.
              </p>
              <p className="text-slate-600 mb-4">
                Toute reproduction, représentation, modification ou exploitation de tout ou partie de ces éléments est strictement interdite sans autorisation préalable.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">5. Limitation de responsabilité</h2>
              <p className="text-slate-600 mb-4">
                ilodata.com s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur son site. Toutefois, nous ne pouvons garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition.
              </p>
              <p className="text-slate-600 mb-4">
                En conséquence, l'utilisateur reconnaît utiliser ces informations sous sa responsabilité exclusive.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">6. Modifications des CGU</h2>
              <p className="text-slate-600 mb-4">
                Nous nous réservons le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés des modifications par une notification sur le site. La continuation de l'utilisation du site après modification constitue l'acceptation des nouvelles conditions.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">7. Droit applicable et juridiction compétente</h2>
              <p className="text-slate-600 mb-4">
                Les présentes CGU sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">8. Contact</h2>
              <p className="text-slate-600 mb-4">
                Pour toute question concernant ces conditions générales d'utilisation, veuillez nous contacter via notre <a href="/contact" className="text-ilodata-600 hover:underline">formulaire de contact</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CGU;
