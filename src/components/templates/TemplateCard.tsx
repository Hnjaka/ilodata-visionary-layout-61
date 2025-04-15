
import React from 'react';
import { ArrowDownToLine } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

type Template = Tables<"templates">;

interface TemplateCardProps {
  template: Template;
}

const TemplateCard = ({ template }: TemplateCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      {/* Template Image */}
      <div className="h-48 overflow-hidden">
        {template.image_apercu ? (
          <img 
            src={`https://valzxjecoceltiyzkogw.supabase.co/storage/v1/object/public/template_images/${template.image_apercu}`}
            alt={template.titre}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        ) : (
          <div className="w-full h-full bg-slate-200 flex items-center justify-center">
            <span className="text-slate-400">Pas d'aperçu</span>
          </div>
        )}
      </div>
      
      {/* Template Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2 text-slate-800">
          {template.titre}
        </h3>
        <p className="text-slate-600 mb-4 line-clamp-3 flex-grow">
          {template.description}
        </p>
        
        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
            {template.categorie}
          </span>
        </div>
        
        {/* Download Button */}
        <a 
          href={`https://valzxjecoceltiyzkogw.supabase.co/storage/v1/object/public/template_files/${template.fichier_template}`}
          download
          className="button-primary w-full text-center inline-flex items-center justify-center"
        >
          <span>Télécharger</span>
          <ArrowDownToLine size={16} className="ml-2" />
        </a>
      </div>
    </div>
  );
};

export default TemplateCard;
