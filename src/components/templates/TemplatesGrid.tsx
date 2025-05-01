
import React from 'react';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Tables } from '@/integrations/supabase/types';
import TemplateCard from '@/components/templates/TemplateCard';

type Template = Tables<"templates">;

interface TemplatesGridProps {
  loading: boolean;
  error: string | null;
  filteredTemplates: Template[];
  onRetry: () => void;
}

const TemplatesGrid: React.FC<TemplatesGridProps> = ({
  loading,
  error,
  filteredTemplates,
  onRetry,
}) => {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-red-500">{error}</p>
            <Button 
              onClick={onRetry} 
              variant="default" 
              className="mt-4"
            >
              Réessayer
            </Button>
          </div>
        ) : filteredTemplates.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-slate-600">Aucun modèle trouvé</h3>
            <p className="mt-2 text-slate-500">Essayez de modifier vos critères de recherche.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TemplatesGrid;
