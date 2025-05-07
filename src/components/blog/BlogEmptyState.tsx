
import React from 'react';
import { Button } from '@/components/ui/button';

interface BlogEmptyStateProps {
  onRetry?: () => void;
}

const BlogEmptyState: React.FC<BlogEmptyStateProps> = ({ onRetry }) => {
  return (
    <div className="text-center py-12">
      <p className="text-lg text-slate-600">Aucun article n'a été publié pour le moment.</p>
      <p className="mt-2">Revenez bientôt pour découvrir notre contenu !</p>
      {onRetry && (
        <Button 
          onClick={onRetry} 
          variant="default" 
          className="mt-4"
        >
          Réessayer
        </Button>
      )}
    </div>
  );
};

export default BlogEmptyState;
