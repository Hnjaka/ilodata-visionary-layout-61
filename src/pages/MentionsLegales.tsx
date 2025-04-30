
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';

const MentionsLegales = () => {
  useEffect(() => {
    document.title = "Mentions légales | ilodata.com";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', "Mentions légales de ilodata.com - Informations concernant l'éditeur du site, l'hébergement et les droits de propriété intellectuelle.");
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">Mentions légales</h1>
            <p className="text-slate-600 mb-8">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            
            <Separator className="my-6" />
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">1. Éditeur du site</h2>
              <p className="text-slate-600 mb-4">
                Le site ilodata.com est édité par la société ILODATA, SAS au capital de 1000 euros,
                immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro 123 456 789,
                dont le siège social est situé au 123 Avenue des Champs-Élysées, 75008 Paris, France.
              </p>
              <p className="text-slate-600 mb-4">
                Numéro de TVA intracommunautaire : FR 12 123456789
              </p>
              <p className="text-slate-600 mb-4">
                Directeur de la publication : Jean Dupont
              </p>
              <p className="text-slate-600 mb-4">
                Contact : contact@ilodata.com - Tél : 01 23 45 67 89
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">2. Hébergement</h2>
              <p className="text-slate-600 mb-4">
                Le site ilodata.com est hébergé par la société OVH, SAS au capital de 10 069 020 euros,
                immatriculée au Registre du Commerce et des Sociétés de Lille Métropole sous le numéro 424 761 419,
                dont le siège social est situé au 2 rue Kellermann, 59100 Roubaix, France.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">3. Propriété intellectuelle</h2>
              <p className="text-slate-600 mb-4">
                L'ensemble des éléments constituant le site ilodata.com (textes, graphismes, logiciels, photographies, 
                images, vidéos, sons, plans, logos, marques, etc.) ainsi que le site lui-même, sont protégés par les lois 
                en vigueur sur la propriété intellectuelle.
              </p>
              <p className="text-slate-600 mb-4">
                Ces éléments sont la propriété exclusive de ILODATA ou de ses partenaires. Toute reproduction, représentation, 
                utilisation ou adaptation, sous quelque forme que ce soit, de tout ou partie de ces éléments, y compris 
                les applications informatiques, sans l'accord préalable et écrit de ILODATA, est strictement interdite et 
                constitue un délit de contrefaçon.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">4. Données personnelles</h2>
              <p className="text-slate-600 mb-4">
                Les informations relatives au traitement des données personnelles sont détaillées dans notre 
                <Link to="/legal/confidentialite" className="text-ilodata-600 hover:underline"> Politique de Confidentialité</Link>.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">5. Cookies</h2>
              <p className="text-slate-600 mb-4">
                Le site ilodata.com utilise des cookies pour améliorer l'expérience utilisateur. Pour en savoir plus sur l'utilisation 
                des cookies, veuillez consulter notre <Link to="/legal/confidentialite" className="text-ilodata-600 hover:underline">Politique de Confidentialité</Link>.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">6. Loi applicable et juridiction compétente</h2>
              <p className="text-slate-600 mb-4">
                Les présentes mentions légales sont régies par la loi française. En cas de litige, les tribunaux français 
                seront seuls compétents.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">7. Contact</h2>
              <p className="text-slate-600 mb-4">
                Pour toute question concernant ces mentions légales, veuillez nous contacter via notre 
                <Link to="/contact" className="text-ilodata-600 hover:underline"> formulaire de contact</Link>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MentionsLegales;
