
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import CategoryList from '@/components/admin/CategoryList';
import CategoryForm from '@/components/admin/CategoryForm';
import ArticleList from '@/components/admin/ArticleList';
import ArticleForm from '@/components/admin/ArticleForm';
import SearchBar from '@/components/admin/SearchBar';
import { CategoryType, ArticleType } from '@/types/guides';
import { supabase } from '@/integrations/supabase/client';
import { getIconByName } from '@/data/guidesData';
import LoadingSpinner from '@/components/LoadingSpinner';

const AdminGuides = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Add state for search functionality
  const [searchTerm, setSearchTerm] = useState('');

  // States for editing categories
  const [editCategory, setEditCategory] = useState<CategoryType | null>(null);
  const [editCategoryIndex, setEditCategoryIndex] = useState<number | null>(null);

  // States for editing articles
  const [editArticle, setEditArticle] = useState<ArticleType | null>(null);
  const [editArticleCategoryIndex, setEditArticleCategoryIndex] = useState<number | null>(null);
  const [editArticleIndex, setEditArticleIndex] = useState<number | null>(null);
  
  // Fetch categories and articles from Supabase
  useEffect(() => {
    const fetchCategoriesAndArticles = async () => {
      setLoading(true);
      try {
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('guide_categories')
          .select('*')
          .order('position');
          
        if (categoriesError) throw categoriesError;
        
        // Fetch articles for each category
        const categoriesWithArticles = await Promise.all(
          (categoriesData || []).map(async (category) => {
            const { data: articlesData, error: articlesError } = await supabase
              .from('guide_articles')
              .select('*')
              .eq('category_id', category.id)
              .order('position');
              
            if (articlesError) throw articlesError;
            
            // Map the icon string to the actual icon component
            const iconComponent = getIconByName(category.icon);
            
            // Format articles to match ArticleType
            const formattedArticles: ArticleType[] = (articlesData || []).map(article => ({
              id: article.id,
              title: article.title,
              slug: article.slug,
              content: article.content || '',
              layout: (article.layout || 'standard') as 'standard' | 'wide' | 'sidebar',
              position: article.position,
              category_id: article.category_id
            }));
            
            return {
              id: category.id,
              title: category.title,
              icon: iconComponent,
              articles: formattedArticles,
              position: category.position
            };
          })
        );
        
        setCategories(categoriesWithArticles);
      } catch (error) {
        console.error('Error fetching categories and articles:', error);
        toast({
          title: "Erreur",
          description: "Erreur lors du chargement des données",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategoriesAndArticles();

    // Set up a subscription for real-time updates
    const categoriesChannel = supabase
      .channel('admin-categories-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'guide_categories' }, 
        () => {
          fetchCategoriesAndArticles();
        }
      )
      .subscribe();

    const articlesChannel = supabase
      .channel('admin-articles-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'guide_articles' }, 
        () => {
          fetchCategoriesAndArticles();
        }
      )
      .subscribe();

    // Cleanup subscriptions
    return () => {
      supabase.removeChannel(categoriesChannel);
      supabase.removeChannel(articlesChannel);
    };
  }, []);
  
  // Export the data structure
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

  // Handle edit category action
  const handleEditCategory = (category: CategoryType, index: number) => {
    setEditCategory(category);
    setEditCategoryIndex(index);
    
    // Reset article edit state if active
    setEditArticle(null);
    setEditArticleCategoryIndex(null);
    setEditArticleIndex(null);
  };

  // Handle edit article action
  const handleEditArticle = (article: any, categoryIndex: number, articleIndex: number) => {
    setEditArticle(article);
    setEditArticleCategoryIndex(categoryIndex);
    setEditArticleIndex(articleIndex);
    
    // Reset category edit state if active
    setEditCategory(null);
    setEditCategoryIndex(null);
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
        
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {/* Categories Section */}
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4 text-slate-800">Rubriques</h2>
              <CategoryList 
                categories={categories} 
                setCategories={setCategories} 
                searchTerm={searchTerm}
                onEditCategory={handleEditCategory}
              />
              <CategoryForm 
                categories={categories} 
                setCategories={setCategories} 
                editCategory={editCategory}
                editCategoryIndex={editCategoryIndex}
                setEditCategory={setEditCategory}
                setEditCategoryIndex={setEditCategoryIndex}
              />
            </section>
            
            {/* Articles Section */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-slate-800">Articles</h2>
              <ArticleList 
                categories={categories} 
                setCategories={setCategories}
                searchTerm={searchTerm}
                onEditArticle={handleEditArticle}
              />
              <ArticleForm 
                categories={categories} 
                setCategories={setCategories}
                editArticle={editArticle}
                editArticleCategoryIndex={editArticleCategoryIndex}
                editArticleIndex={editArticleIndex}
                setEditArticle={setEditArticle}
                setEditArticleCategoryIndex={setEditArticleCategoryIndex}
                setEditArticleIndex={setEditArticleIndex}
              />
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AdminGuides;
