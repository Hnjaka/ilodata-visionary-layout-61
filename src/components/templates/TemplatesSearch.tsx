
import React from 'react';
import { Search, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface TemplatesSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
}

const TemplatesSearch: React.FC<TemplatesSearchProps> = ({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
}) => {
  const { user, isAdmin } = useAuth();

  return (
    <section className="py-8 bg-white border-b">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-2/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <Input
              placeholder="Rechercher un modèle..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/3">
            <Select
              value={categoryFilter}
              onValueChange={onCategoryChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes catégories</SelectItem>
                <SelectItem value="Livres">Livres</SelectItem>
                <SelectItem value="Magazines">Magazines</SelectItem>
                <SelectItem value="CV">CV</SelectItem>
                <SelectItem value="Flyers">Flyers</SelectItem>
                <SelectItem value="Rapports">Rapports</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Admin button - only shown to logged-in admins */}
        {user && isAdmin && (
          <div className="mt-6 flex justify-end">
            <Button variant="outline" asChild>
              <Link to="/admin/templates" className="inline-flex items-center gap-1">
                <Settings size={16} />
                <span>Gérer les modèles</span>
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TemplatesSearch;
