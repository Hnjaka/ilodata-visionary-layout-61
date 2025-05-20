
import React, { useState, useEffect } from 'react';
import ArticleCategory from './ArticleCategory';
import { supabase } from '@/integrations/supabase/client';
import { getIconByName } from '@/data/guidesData';
import LoadingSpinner from '@/components/LoadingSpinner';
import { CategoryType, ArticleType } from '@/types/guides';
import { Book, FileText } from 'lucide-react';

const ArticleCategories = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCategoriesAndArticles = async () => {
      try {
        console.log("Fetching guides categories and articles");
        setLoading(true);
        
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('guide_categories')
          .select('*')
          .order('position');
          
        if (categoriesError) {
          console.error("Error fetching categories:", categoriesError);
          throw categoriesError;
        }
        
        console.log("Categories fetched:", categoriesData?.length || 0);
        
        // If no categories, add some demo data for development
        if (!categoriesData || categoriesData.length === 0) {
          console.log("No categories found, using demo data");
          const demoCategories = getDemoCategoryData();
          setCategories(demoCategories);
          setLoading(false);
          return;
        }
        
        // Fetch articles for each category
        const categoriesWithArticles = await Promise.all(
          (categoriesData || []).map(async (category) => {
            const { data: articlesData, error: articlesError } = await supabase
              .from('guide_articles')
              .select('*')
              .eq('category_id', category.id)
              .order('position');
              
            if (articlesError) {
              console.error(`Error fetching articles for category ${category.id}:`, articlesError);
              throw articlesError;
            }
            
            console.log(`Articles fetched for category ${category.id}:`, articlesData?.length || 0);
            
            // Map the icon string to the actual icon component
            const iconComponent = getIconByName(category.icon);
            
            // Format articles to match ArticleType
            const formattedArticles: ArticleType[] = (articlesData || []).map(article => ({
              id: article.id,
              title: article.title || '',
              slug: article.slug || '',
              content: article.content || '',
              layout: (article.layout || 'standard') as 'standard' | 'wide' | 'sidebar',
              position: article.position || 0,
              category_id: article.category_id
            }));
            
            return {
              id: category.id,
              title: category.title || '',
              icon: iconComponent,
              articles: formattedArticles,
              position: category.position || 0
            };
          })
        );
        
        setCategories(categoriesWithArticles);
      } catch (error) {
        console.error('Error fetching categories and articles:', error);
        setError("Impossible de charger les articles. Veuillez réessayer ultérieurement.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategoriesAndArticles();
  }, []);
  
  // Helper function to get demo data if no categories exist in database
  const getDemoCategoryData = (): CategoryType[] => {
    // Import icons directly instead of using require()
    return [
      {
        id: '1',
        title: "Mise en page pour livres",
        icon: Book,
        articles: [
          { id: '1-1', title: "Les fondamentaux de la mise en page", slug: "fondamentaux-mise-en-page", content: "", layout: "standard", position: 1, category_id: '1' },
          { id: '1-2', title: "Comment choisir la taille de police", slug: "choisir-taille-police", content: "", layout: "standard", position: 2, category_id: '1' }
        ],
        position: 1
      },
      {
        id: '2',
        title: "Modèles et templates",
        icon: FileText,
        articles: [
          { id: '2-1', title: "Comment personnaliser un modèle Word", slug: "personnaliser-modele-word", content: "", layout: "standard", position: 1, category_id: '2' },
          { id: '2-2', title: "Utiliser nos modèles", slug: "utiliser-modeles", content: "", layout: "standard", position: 2, category_id: '2' }
        ],
        position: 2
      }
    ];
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-ilodata-600 text-white rounded"
        >
          Actualiser
        </button>
      </div>
    );
  }
  
  if (categories.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-600">Aucune catégorie d'articles disponible pour le moment.</p>
      </div>
    );
  }
  
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {categories.map((category, index) => (
        <ArticleCategory 
          key={category.id || index} 
          title={category.title} 
          icon={typeof category.icon === 'string' ? getIconByName(category.icon) : category.icon} 
          articles={category.articles} 
        />
      ))}
    </div>
  );
};

export default ArticleCategories;
