
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

const ArticleFooter = () => {
  return (
    <section className="mt-16 pt-8 border-t border-slate-200">
      <div className="space-y-8">
        {/* Modèles professionnels */}
        <div className="bg-slate-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Modèles professionnels gratuits</h3>
          <p className="text-slate-700 mb-4">
            Vous souhaitez partir sur une base optimisée ? ILODATA met à votre disposition une collection de modèles Word professionnels gratuits à télécharger.
          </p>
          <Link to="/templates" className="inline-flex items-center text-ilodata-600 font-medium hover:text-ilodata-800">
            Découvrir nos modèles gratuits →
          </Link>
        </div>
        
        {/* Accompagnement sur mesure */}
        <div className="bg-slate-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Un accompagnement sur mesure</h3>
          <p className="text-slate-700 mb-4">
            Notre équipe ILODATA spécialisée en mise en page éditoriale peut prendre en charge l'intégralité de votre mise en page.
          </p>
          <Link to="/services" className="inline-flex items-center text-ilodata-600 font-medium hover:text-ilodata-800">
            Découvrir nos services →
          </Link>
        </div>
        
        {/* Contact */}
        <div className="bg-ilodata-50 p-6 rounded-lg border border-ilodata-100">
          <div className="flex items-start gap-4">
            <div className="mt-1 bg-ilodata-100 p-2 rounded-full">
              <Mail className="h-5 w-5 text-ilodata-700" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Besoin d'un résultat impeccable ?</h3>
              <p className="text-slate-700 mb-4">
                Contactez-nous pour une solution professionnelle clé en main.
              </p>
              <Link to="/contact" className="button-primary-sm">
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
        
        {/* Autres guides */}
        <div className="text-center pt-6">
          <p className="text-slate-700 mb-4">Ces astuces vous ont-elles été utiles ? Découvrez nos autres guides pour auteurs.</p>
          <Link to="/guides" className="button-secondary-sm">
            Voir tous nos guides
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArticleFooter;
