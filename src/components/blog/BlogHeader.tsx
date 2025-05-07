
import React from 'react';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const BlogHeader: React.FC = () => {
  const { user, isAdmin } = useAuth();

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Blog</h1>
        <p className="text-slate-600">Articles, conseils et inspiration pour vos projets éditoriaux</p>
      </div>
      
      {/* Admin button only shown to logged-in admins */}
      {user && isAdmin && (
        <Link to="/admin/blog">
          <Button variant="outline" className="flex items-center gap-2">
            <Settings size={18} />
            Administration
          </Button>
        </Link>
      )}
    </div>
  );
};

export default BlogHeader;
