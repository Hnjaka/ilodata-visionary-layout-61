
import React from 'react';
import { Button } from '@/components/ui/button';

interface BlogErrorStateProps {
  error: string;
  onRetry: () => void;
}

const BlogErrorState: React.FC<BlogErrorStateProps> = ({ error, onRetry }) => {
  return (
    <div className="text-center py-16">
      <p className="text-red-500">{error}</p>
      <Button 
        onClick={onRetry} 
        variant="default" 
        className="mt-4"
      >
        Réessayer
      </Button>
    </div>
  );
};

export default BlogErrorState;
