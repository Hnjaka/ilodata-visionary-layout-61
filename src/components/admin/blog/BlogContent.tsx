
import React, { useState } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { BlogCategory, BlogArticle } from '@/hooks/useBlogData';
import SearchBar from '@/components/admin/SearchBar';
import BlogCategoryList from './BlogCategoryList';
import BlogCategoryForm from './BlogCategoryForm';
import BlogArticleList from './BlogArticleList';
import BlogArticleForm from './BlogArticleForm';

interface BlogContentProps {
  categories: BlogCategory[];
  setCategories: React.Dispatch<React.SetStateAction<BlogCategory[]>>;
  loading: boolean;
}

const BlogContent: React.FC<BlogContentProps> = ({ categories, setCategories, loading }) => {
  // Add state for search functionality
  const [searchTerm, setSearchTerm] = useState('');

  // States for editing categories
  const [editCategory, setEditCategory] = useState<BlogCategory | null>(null);
  const [editCategoryIndex, setEditCategoryIndex] = useState<number | null>(null);

  // States for editing articles
  const [editArticle, setEditArticle] = useState<BlogArticle | null>(null);
  const [editArticleCategoryIndex, setEditArticleCategoryIndex] = useState<number | null>(null);
  const [editArticleIndex, setEditArticleIndex] = useState<number | null>(null);

  // Handle search term changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  // Handle edit category action
  const handleEditCategory = (category: BlogCategory, index: number) => {
    setEditCategory(category);
    setEditCategoryIndex(index);
    
    // Reset article edit state if active
    setEditArticle(null);
    setEditArticleCategoryIndex(null);
    setEditArticleIndex(null);
  };

  // Handle edit article action
  const handleEditArticle = (article: BlogArticle, categoryIndex: number, articleIndex: number) => {
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
          placeholder="Rechercher une catégorie ou un article..."
        />
      </div>
      
      {/* Categories Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-slate-800">Catégories</h2>
        <BlogCategoryList 
          categories={categories} 
          setCategories={setCategories} 
          searchTerm={searchTerm}
          onEditCategory={handleEditCategory}
        />
        <BlogCategoryForm 
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
        <BlogArticleList 
          categories={categories} 
          setCategories={setCategories}
          searchTerm={searchTerm}
          onEditArticle={handleEditArticle}
        />
        <BlogArticleForm 
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

export default BlogContent;
