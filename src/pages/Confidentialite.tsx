
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';

const Confidentialite = () => {
  useEffect(() => {
    document.title = "Politique de Confidentialité | ilodata.com";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', "Découvrez comment ilodata.com protège vos données personnelles. Notre politique de confidentialité explique la collecte et l'utilisation de vos informations.");
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">Politique de Confidentialité</h1>
            <p className="text-slate-600 mb-8">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            
            <Separator className="my-6" />
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">1. Introduction</h2>
              <p className="text-slate-600 mb-4">
                Chez ilodata.com, nous accordons une grande importance à la protection de votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos données personnelles lorsque vous utilisez notre site web et nos services.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">2. Données collectées</h2>
              <p className="text-slate-600 mb-4">
                Nous pouvons collecter les types d'informations suivants :
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
                <li>Informations d'identification (nom, prénom, adresse email)</li>
                <li>Informations de contact (numéro de téléphone, adresse postale)</li>
                <li>Informations de paiement (pour les services payants)</li>
                <li>Données de navigation (adresse IP, cookies, pages visitées)</li>
                <li>Informations que vous nous fournissez via nos formulaires</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">3. Utilisation des données</h2>
              <p className="text-slate-600 mb-4">
                Vos données personnelles sont utilisées pour :
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
                <li>Fournir et améliorer nos services</li>
                <li>Traiter vos demandes et commandes</li>
                <li>Vous contacter concernant votre compte ou vos commandes</li>
                <li>Vous envoyer des communications marketing si vous avez donné votre consentement</li>
                <li>Analyser l'utilisation de notre site et améliorer notre offre</li>
                <li>Se conformer aux obligations légales</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">4. Cookies et technologies similaires</h2>
              <p className="text-slate-600 mb-4">
                Notre site utilise des cookies et technologies similaires pour améliorer votre expérience, analyser le trafic et personnaliser le contenu. Vous pouvez configurer votre navigateur pour refuser tous les cookies ou vous alerter lorsqu'un cookie est envoyé.
              </p>
              <p className="text-slate-600 mb-4">
                Cependant, certaines fonctionnalités du site peuvent ne pas fonctionner correctement si vous désactivez les cookies.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">5. Partage des données</h2>
              <p className="text-slate-600 mb-4">
                Nous ne vendons pas vos données personnelles à des tiers. Cependant, nous pouvons partager certaines informations avec :
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
                <li>Nos prestataires de services (hébergement, paiement, etc.)</li>
                <li>Des partenaires commerciaux (avec votre consentement)</li>
                <li>Les autorités légales si requis par la loi</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">6. Sécurité des données</h2>
              <p className="text-slate-600 mb-4">
                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction.
              </p>
              <p className="text-slate-600 mb-4">
                Cependant, aucune méthode de transmission ou de stockage électronique n'est totalement sécurisée, et nous ne pouvons garantir une sécurité absolue.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">7. Vos droits</h2>
              <p className="text-slate-600 mb-4">
                Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
                <li>Droit d'accès à vos données personnelles</li>
                <li>Droit de rectification des données inexactes</li>
                <li>Droit à l'effacement (droit à l'oubli)</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité des données</li>
                <li>Droit d'opposition au traitement</li>
                <li>Droit de retirer votre consentement à tout moment</li>
              </ul>
              <p className="text-slate-600 mb-4">
                Pour exercer ces droits, veuillez nous contacter via notre <a href="/contact" className="text-ilodata-600 hover:underline">formulaire de contact</a>.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">8. Conservation des données</h2>
              <p className="text-slate-600 mb-4">
                Nous conservons vos données personnelles aussi longtemps que nécessaire pour atteindre les finalités décrites dans cette politique de confidentialité, sauf si une période de conservation plus longue est requise ou permise par la loi.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">9. Modifications de la politique de confidentialité</h2>
              <p className="text-slate-600 mb-4">
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page avec une date de mise à jour. Nous vous encourageons à consulter régulièrement cette politique pour rester informé.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">10. Contact</h2>
              <p className="text-slate-600 mb-4">
                Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, veuillez nous contacter via notre <a href="/contact" className="text-ilodata-600 hover:underline">formulaire de contact</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Confidentialite;
