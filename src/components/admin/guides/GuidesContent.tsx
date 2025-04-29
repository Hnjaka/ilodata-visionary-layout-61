
import React, { useState } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import CategoryList from '@/components/admin/CategoryList';
import CategoryForm from '@/components/admin/CategoryForm';
import ArticleList from '@/components/admin/ArticleList';
import ArticleForm from '@/components/admin/ArticleForm';
import SearchBar from '@/components/admin/SearchBar';
import { CategoryType, ArticleType } from '@/types/guides';

interface GuidesContentProps {
  categories: CategoryType[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
  loading: boolean;
}

const GuidesContent: React.FC<GuidesContentProps> = ({ categories, setCategories, loading }) => {
  // Add state for search functionality
  const [searchTerm, setSearchTerm] = useState('');

  // States for editing categories
  const [editCategory, setEditCategory] = useState<CategoryType | null>(null);
  const [editCategoryIndex, setEditCategoryIndex] = useState<number | null>(null);

  // States for editing articles
  const [editArticle, setEditArticle] = useState<ArticleType | null>(null);
  const [editArticleCategoryIndex, setEditArticleCategoryIndex] = useState<number | null>(null);
  const [editArticleIndex, setEditArticleIndex] = useState<number | null>(null);

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
  const handleEditArticle = (article: ArticleType, categoryIndex: number, articleIndex: number) => {
    setEditArticle(article);
    setEditArticleCategoryIndex(categoryIndex);
    setEditArticleIndex(articleIndex);
    
    // Reset category edit state if active
    setEditCategory(null);
    setEditCategoryIndex(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
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
  );
};

export default GuidesContent;
