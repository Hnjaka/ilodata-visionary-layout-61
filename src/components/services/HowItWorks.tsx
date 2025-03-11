
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, FileText, PenTool, PackageCheck } from 'lucide-react';

interface StepProps {
  icon: React.ElementType;
  number: number;
  title: string;
  description: string;
}

const Step = ({ icon: Icon, number, title, description }: StepProps) => {
  return (
    <div className="flex items-start p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="mr-4 p-3 rounded-full bg-blue-100 shrink-0">
        <Icon className="h-6 w-6 text-ilodata-600" />
      </div>
      <div>
        <div className="flex items-center mb-2">
          <span className="text-lg font-semibold text-ilodata-600 mr-2">{number}.</span>
          <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
        </div>
        <p className="text-slate-600">{description}</p>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 fade-in-section">
        <div className="text-center mb-16">
          <h2 className="section-title text-center">Comment fonctionnent nos services ?</h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Nous simplifions le processus pour vous permettre de vous concentrer sur l'essentiel : votre livre. 
            Voici comment ça marche :
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Step 
            icon={MessageSquare}
            number={1}
            title="Contact"
            description="Prenez contact avec nous pour discuter de votre projet."
          />
          <Step 
            icon={FileText}
            number={2}
            title="Devis"
            description="Nous établissons un devis personnalisé en fonction de vos besoins."
          />
          <Step 
            icon={PenTool}
            number={3}
            title="Réalisation"
            description="Notre équipe travaille sur votre projet pour vous offrir une mise en page professionnelle."
          />
          <Step 
            icon={PackageCheck}
            number={4}
            title="Livraison"
            description="Vous recevez votre fichier final prêt à l'impression ou à la publication en ligne."
          />
        </div>

        <div className="text-center">
          <Link to="/devis" className="button-primary">
            Demandez un devis
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
