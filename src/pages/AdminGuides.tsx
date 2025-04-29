
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { getCategoryData } from '@/data/guidesData';
import { toast } from '@/components/ui/use-toast';
import CategoryList from '@/components/admin/CategoryList';
import CategoryForm from '@/components/admin/CategoryForm';
import ArticleList from '@/components/admin/ArticleList';
import ArticleForm from '@/components/admin/ArticleForm';
import SearchBar from '@/components/admin/SearchBar';
import { CategoryType } from '@/types/guides';

const AdminGuides = () => {
  // Load initial data from guidesData.ts
  const [categories, setCategories] = useState<CategoryType[]>(getCategoryData());
  
  // Add state for search functionality
  const [searchTerm, setSearchTerm] = useState('');
  
  // Export the data structure (would normally save to database)
  const handleExportData = () => {
    const dataStr = JSON.stringify(categories, null, 2);
    console.log(dataStr);
    navigator.clipboard.writeText(dataStr).then(() => {
      toast({
        title: "Exporté",
        description: "Structure JSON copiée dans le presse-papier",
      });
    });
  };

  // Handle search term changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Gestion des rubriques et articles</h1>
          <Button onClick={handleExportData} variant="outline">
            Exporter en JSON
          </Button>
        </div>
        
        {/* Search Bar */}
        <div className="mb-8 max-w-md">
          <SearchBar 
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Rechercher une rubrique ou un article..."
          />
        </div>
        
        {/* Categories Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-slate-800">Rubriques</h2>
          <CategoryList 
            categories={categories} 
            setCategories={setCategories} 
            searchTerm={searchTerm}
          />
          <CategoryForm categories={categories} setCategories={setCategories} />
        </section>
        
        {/* Articles Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-slate-800">Articles</h2>
          <ArticleList 
            categories={categories} 
            setCategories={setCategories}
            searchTerm={searchTerm} 
          />
          <ArticleForm categories={categories} setCategories={setCategories} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AdminGuides;
