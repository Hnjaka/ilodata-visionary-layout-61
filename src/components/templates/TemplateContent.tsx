
import React from 'react';
import { ArrowDownToLine } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';
import { getFileUrl } from '@/utils/templateUrlUtils';

type Template = Tables<"templates">;

interface TemplateContentProps {
  template: Template;
}

const TemplateContent: React.FC<TemplateContentProps> = ({ template }) => {
  return (
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
      {template.fichier_template && (
        <a 
          href={getFileUrl(template.fichier_template)}
          download
          className="button-primary w-full text-center inline-flex items-center justify-center"
        >
          <span>Télécharger</span>
          <ArrowDownToLine size={16} className="ml-2" />
        </a>
      )}
    </div>
  );
};

export default TemplateContent;
