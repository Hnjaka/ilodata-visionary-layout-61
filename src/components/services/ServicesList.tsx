
import React from 'react';
import { FileText, BookOpen, Layout, CheckCircle } from 'lucide-react';
import PricingTable from '@/components/PricingTable';
import { Link } from 'react-router-dom';

const ServicesList = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 fade-in-section">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-blue-100">
              <FileText className="h-6 w-6 text-ilodata-600" />
            </div>
          </div>
          <h2 className="section-title text-center">Nos formules et tarifs de mise en page Word</h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Découvrez nos services de mise en page pour auteurs indépendants et éditeurs. 
            Des tarifs transparents adaptés à tous les projets d'édition, que ce soit pour 
            l'impression traditionnelle ou pour Amazon KDP.
          </p>
        </div>
        
        {/* Avantages de nos services */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Pourquoi choisir nos services de mise en page Word professionnels ?</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-blue-50 rounded-lg">
              <CheckCircle className="h-8 w-8 text-ilodata-600 mb-4" />
              <h4 className="text-xl font-semibold mb-3">Expertise professionnelle</h4>
              <p>Notre équipe maîtrise parfaitement les techniques de mise en page Word adaptées aux exigences d'impression modernes.</p>
            </div>
            
            <div className="p-6 bg-blue-50 rounded-lg">
              <CheckCircle className="h-8 w-8 text-ilodata-600 mb-4" />
              <h4 className="text-xl font-semibold mb-3">Compatible Amazon KDP</h4>
              <p>Nous réalisons des mises en page parfaitement adaptées aux exigences d'Amazon pour l'auto-édition et la vente directe.</p>
            </div>
            
            <div className="p-6 bg-blue-50 rounded-lg">
              <CheckCircle className="h-8 w-8 text-ilodata-600 mb-4" />
              <h4 className="text-xl font-semibold mb-3">Tarifs transparents</h4>
              <p>Nos formules de mise en page de livre ont des prix clairs, sans frais cachés, pour tous les types d'ouvrages.</p>
            </div>
          </div>
        </div>
        
        {/* Tableau des tarifs */}
        <PricingTable />
        
        {/* Section Amazon KDP */}
        <div className="mt-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
            Comment faire la mise en page de livre pour Amazon KDP
          </h2>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1596265371388-43edbaadab94?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="Mise en page Word pour Amazon KDP" 
                className="rounded-lg shadow-md w-full"
              />
            </div>
            
            <div className="md:w-1/2">
              <ol className="space-y-4 list-decimal list-inside">
                <li className="text-lg">
                  <span className="font-semibold">Choisissez le bon format</span>
                  <p className="ml-6 mt-1">Amazon KDP accepte plusieurs formats de livres, dont 6"x9" qui est le plus populaire.</p>
                </li>
                <li className="text-lg">
                  <span className="font-semibold">Configurez vos marges correctement</span>
                  <p className="ml-6 mt-1">Pour un livre de 300 pages, prévoyez au moins 1,5 cm de marge intérieure.</p>
                </li>
                <li className="text-lg">
                  <span className="font-semibold">Utilisez des polices compatibles</span>
                  <p className="ml-6 mt-1">Choisissez des polices incluses dans Word ou intégrez-les dans votre PDF final.</p>
                </li>
                <li className="text-lg">
                  <span className="font-semibold">Configurez la pagination</span>
                  <p className="ml-6 mt-1">Démarrez la numérotation des pages après les pages préliminaires.</p>
                </li>
                <li className="text-lg">
                  <span className="font-semibold">Exportez en PDF</span>
                  <p className="ml-6 mt-1">Utilisez PDF/X-1a:2001 pour une compatibilité optimale avec Amazon KDP.</p>
                </li>
              </ol>
              
              <div className="mt-6">
                <Link to="/guides" className="text-ilodata-600 font-semibold hover:underline">
                  Consultez notre guide complet sur la mise en page pour Amazon KDP →
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 text-center">
            Questions fréquentes sur nos services de mise en page
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-white shadow-sm rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Combien coûte la mise en page d'un livre ?</h3>
              <p>Nos tarifs de mise en page Word commencent à 39€ pour un livre standard et varient selon la complexité de votre ouvrage. Consultez notre tableau des tarifs ci-dessus pour plus de détails.</p>
            </div>
            
            <div className="p-6 bg-white shadow-sm rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Quel délai pour la mise en page d'un livre ?</h3>
              <p>Le délai moyen pour la mise en page professionnelle d'un livre est de 5 à 10 jours ouvrables, selon la complexité et la longueur de votre ouvrage.</p>
            </div>
            
            <div className="p-6 bg-white shadow-sm rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Proposez-vous des mises en page pour les livres illustrés ?</h3>
              <p>Oui, nous réalisons des mises en page pour tous types d'ouvrages, y compris les livres illustrés, avec un soin particulier apporté au placement des images.</p>
            </div>
            
            <div className="p-6 bg-white shadow-sm rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Le fichier Word fourni sera-t-il modifiable ?</h3>
              <p>Absolument, vous recevrez un fichier Word entièrement modifiable, avec tous les styles configurés pour faciliter vos futures modifications.</p>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-4">Prêt à donner vie à votre livre ?</h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour obtenir un devis personnalisé pour la mise en page professionnelle de votre livre.
          </p>
          <Link 
            to="/contact" 
            className="button-primary inline-block px-8 py-3 text-lg font-medium"
          >
            Demander un devis gratuit
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
