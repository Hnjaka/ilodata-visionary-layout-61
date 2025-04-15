
import React from 'react';
import { useParams } from 'react-router-dom';
import TemplateFormContainer from './TemplateFormContainer';

const TemplateForm = ({ isEditing = false }: { isEditing?: boolean }) => {
  const { id } = useParams();
  
  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {isEditing ? 'Modifier le template' : 'Créer un nouveau template'}
      </h2>
      <TemplateFormContainer isEditing={isEditing} id={id} />
    </div>
  );
};

export default TemplateForm;
