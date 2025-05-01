
import React, { useState } from 'react';
import { Tables } from '@/integrations/supabase/types';
import TemplateDetailModal from './TemplateDetailModal';
import TemplateImageGallery from './TemplateImageGallery';
import TemplateContent from './TemplateContent';
import { useTemplateImages } from '@/hooks/templates/useTemplateImages';

type Template = Tables<"templates">;

interface TemplateCardProps {
  template: Template;
}

const TemplateCard = ({ template }: TemplateCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const allImages = useTemplateImages(template);
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
        {/* Template Image Gallery - Clickable to open modal */}
        <TemplateImageGallery 
          images={allImages} 
          title={template.titre}
          onClick={openModal}
        />
        
        {/* Template Content */}
        <TemplateContent template={template} />
      </div>

      {/* Template Detail Modal */}
      <TemplateDetailModal 
        template={template}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default TemplateCard;
