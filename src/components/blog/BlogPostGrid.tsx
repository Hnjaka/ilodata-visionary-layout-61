
import React from 'react';
import BlogPostCard from './BlogPostCard';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { BlogPost } from '@/hooks/useBlogPosts';

interface BlogPostGridProps {
  posts: BlogPost[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const BlogPostGrid: React.FC<BlogPostGridProps> = ({ 
  posts, 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <Pagination className="mt-12">
          <PaginationContent>
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink 
                  isActive={currentPage === i + 1} 
                  onClick={() => onPageChange(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default BlogPostGrid;
