
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BlogPost } from '@/hooks/useBlogPosts';
import DateFormatter from './DateFormatter';
import { getImageWithFallback } from '@/utils/imageUtils';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  // Use our new utility function to get an image URL with fallback
  const getImageUrl = () => {
    // Determine the appropriate category based on the post's category_title
    let category: 'general' | 'books' | 'tech' | 'design' | 'writing' = 'general';
    
    if (post.category_title) {
      const categoryLower = post.category_title.toLowerCase();
      if (categoryLower.includes('livre') || categoryLower.includes('roman')) {
        category = 'books';
      } else if (categoryLower.includes('tech') || categoryLower.includes('numérique')) {
        category = 'tech';
      } else if (categoryLower.includes('design') || categoryLower.includes('éditorial')) {
        category = 'design';
      } else if (categoryLower.includes('écriture') || categoryLower.includes('rédaction')) {
        category = 'writing';
      }
    }
    
    return getImageWithFallback(post.image, category);
  };

  return (
    <article className="glass-card h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative overflow-hidden aspect-[16/9]">
        <img 
          src={getImageUrl()} 
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-0 left-0 p-2">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-white/90 text-ilodata-700 rounded-full">
            {post.category_title}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="text-sm text-slate-500 mb-2">
          <DateFormatter dateString={post.published_at} />
        </div>
        <h3 className="text-xl font-semibold mb-3 text-slate-800">{post.title}</h3>
        <p className="text-slate-600 mb-4">{post.excerpt || 'Cliquez pour en savoir plus sur cet article.'}</p>
        <Link 
          to={`/articles/${post.slug}`} 
          className="group inline-flex items-center text-ilodata-600 font-medium hover:text-ilodata-700 transition-colors"
        >
          Lire la suite
          <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
};

export default BlogPostCard;
