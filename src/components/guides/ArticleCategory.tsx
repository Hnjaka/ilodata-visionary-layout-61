
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Article {
  title: string;
  slug: string;
}

const ArticleLink = ({ title, slug }: { title: string; slug: string }) => {
  return (
    <li className="mb-3">
      <Link 
        to={`/guides/${slug}`} 
        className="flex items-start text-slate-700 hover:text-ilodata-600 transition-colors group"
      >
        <ChevronRight className="h-5 w-5 text-ilodata-600 mt-0.5 mr-2 flex-shrink-0 transition-transform group-hover:translate-x-1" />
        <span>{title}</span>
      </Link>
    </li>
  );
};

interface ArticleCategoryProps {
  title: string;
  icon: React.ElementType;
  articles: Article[];
}

const ArticleCategory = ({ title, icon: Icon, articles }: ArticleCategoryProps) => {
  return (
    <div className="glass-card p-6 md:p-8 mb-10 animate-fade-up">
      <div className="flex items-center mb-6">
        <div className="p-3 rounded-lg bg-blue-50 mr-4">
          <Icon className="h-6 w-6 text-ilodata-600" />
        </div>
        <h2 className="text-2xl font-semibold text-slate-800">{title}</h2>
      </div>
      
      <ul className="space-y-1">
        {articles.map((article, index) => (
          <ArticleLink 
            key={index} 
            title={article.title} 
            slug={article.slug} 
          />
        ))}
      </ul>
    </div>
  );
};

export default ArticleCategory;
