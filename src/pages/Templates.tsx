
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { useTemplates } from '@/hooks/templates/useTemplates';
import TemplatesHero from '@/components/templates/TemplatesHero';
import TemplatesSearch from '@/components/templates/TemplatesSearch';
import TemplatesGrid from '@/components/templates/TemplatesGrid';

const Templates = () => {
  const { 
    filteredTemplates, 
    loading, 
    error, 
    searchQuery, 
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    fetchTemplates 
  } = useTemplates();

  useEffect(() => {
    document.title = "Modèles à télécharger | ilodata.com";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <TemplatesHero />
        
        <TemplatesSearch 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
        />

        <TemplatesGrid 
          loading={loading}
          error={error}
          filteredTemplates={filteredTemplates}
          onRetry={fetchTemplates}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Templates;
