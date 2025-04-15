
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TemplateForm from '@/components/templates/TemplateForm';

const AddTemplate = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-slate-800 mb-8">Ajouter un nouveau template</h1>
          <TemplateForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AddTemplate;
