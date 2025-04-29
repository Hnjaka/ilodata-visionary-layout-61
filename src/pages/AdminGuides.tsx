
import React, { useState } from 'react';
import { Save } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { getCategoryData } from '@/data/guidesData';
import { toast } from '@/components/ui/use-toast';
import CategoryList from '@/components/admin/CategoryList';
import CategoryForm from '@/components/admin/CategoryForm';
import ArticleList from '@/components/admin/ArticleList';
import ArticleForm from '@/components/admin/ArticleForm';
import { CategoryType } from '@/types/guides';

const AdminGuides = () => {
  // Load initial data from guidesData.ts
  const [categories, setCategories] = useState<CategoryType[]>(getCategoryData());
  
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
        
        {/* Categories Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-slate-800">Rubriques</h2>
          <CategoryList categories={categories} setCategories={setCategories} />
          <CategoryForm categories={categories} setCategories={setCategories} />
        </section>
        
        {/* Articles Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-slate-800">Articles</h2>
          <ArticleList categories={categories} setCategories={setCategories} />
          <ArticleForm categories={categories} setCategories={setCategories} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AdminGuides;
