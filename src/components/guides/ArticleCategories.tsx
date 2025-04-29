
import React from 'react';
import ArticleCategory from './ArticleCategory';
import { getCategoryData } from '@/data/guidesData';

const ArticleCategories = () => {
  const categories = getCategoryData();
  
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {categories.map((category, index) => (
        <ArticleCategory 
          key={index} 
          title={category.title} 
          icon={category.icon} 
          articles={category.articles} 
        />
      ))}
    </div>
  );
};

export default ArticleCategories;
