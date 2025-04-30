
import React from 'react';
import { Link } from 'react-router-dom';
import { Download, ArrowRight, BookOpen } from 'lucide-react';

const Contact = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="section-title text-center">Prêt à donner vie à votre livre ?</h2>
          <p className="section-subtitle mb-10">
            Avancez à votre rythme : téléchargez un modèle, suivez nos guides, ou confiez-nous la mise en page.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Link 
              to="/templates" 
              className="glass-card p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Download size={24} className="text-ilodata-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Télécharger un modèle</h3>
              <p className="text-slate-600 text-sm">Accédez à nos modèles gratuits pour une mise en page rapide</p>
            </Link>
            
            <Link 
              to="/guides" 
              className="glass-card p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen size={24} className="text-ilodata-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Explorer les guides</h3>
              <p className="text-slate-600 text-sm">Apprenez les techniques de mise en page professionnelle</p>
            </Link>
            
            <Link 
              to="/contact" 
              className="glass-card p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <ArrowRight size={24} className="text-ilodata-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Obtenir un devis</h3>
              <p className="text-slate-600 text-sm">Confiez-nous votre projet et recevez un devis personnalisé</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
