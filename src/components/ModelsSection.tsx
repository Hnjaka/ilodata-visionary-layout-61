
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, FileText, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModelCardProps {
  icon: React.ElementType;
  title: string;
  delay: string;
}

const ModelCard = ({ icon: Icon, title, delay }: ModelCardProps) => {
  return (
    <div className={cn(
      "glass-card p-6 flex flex-col items-center text-center animate-fade-up transition-all hover:-translate-y-1 hover:shadow-lg duration-300",
      delay
    )}>
      <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-ilodata-600" />
      </div>
      <h3 className="font-semibold text-slate-800 mb-1">{title}</h3>
    </div>
  );
};

const ModelsSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title text-center">Faites-le vous-même – Nos modèles Word sont prêts à l'emploi</h2>
          <p className="section-subtitle mb-6">
            Vous voulez garder le contrôle de votre projet ? Téléchargez gratuitement l'un de nos modèles Word conçus pour une mise en page rapide, propre et conforme aux standards d'édition.
          </p>
          <p className="font-medium text-lg text-slate-800 mb-8">
            Des modèles pensés pour :
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
          <ModelCard 
            icon={BookOpen} 
            title="📚 Romans et récits" 
            delay="delay-100"
          />
          <ModelCard 
            icon={FileText} 
            title="📄 Mémoires et rapports" 
            delay="delay-200"
          />
          <ModelCard 
            icon={FileText} 
            title="🖨️ Documents à imprimer ou publier" 
            delay="delay-300"
          />
        </div>
        
        <div className="text-center">
          <Link 
            to="/templates" 
            className="button-primary inline-flex items-center"
          >
            Voir les modèles disponibles
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ModelsSection;
