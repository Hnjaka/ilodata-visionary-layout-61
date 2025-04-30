import React, { useState, useEffect } from 'react';
import { ArrowDownToLine, Search, Settings } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import TemplateCard from '@/components/templates/TemplateCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Template = Tables<"templates">;

const Templates = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const { toast } = useToast();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    document.title = "Modèles à télécharger | ilodata.com";
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .eq('visible', true)
        .order('date_ajout', { ascending: false });

      if (error) {
        throw error;
      }

      setTemplates(data || []);
      setFilteredTemplates(data || []);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les templates",
        variant: "destructive",
      });
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Filter templates based on search query and category
    const filtered = templates.filter(template => {
      const matchesSearch = 
        template.titre.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (template.description && template.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (template.tags && template.tags.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = categoryFilter === 'all' || template.categorie === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredTemplates(filtered);
  }, [searchQuery, categoryFilter, templates]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-blue-50 pt-32 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Modèles à télécharger pour vos livres et publications
              </h1>
              <p className="text-slate-600 text-lg mb-8">
                Découvrez notre collection de modèles prêts à l'emploi pour créer facilement la mise en page professionnelle de vos documents.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative w-full md:w-2/3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <Input
                  placeholder="Rechercher un modèle..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/3">
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
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

        {/* Templates Grid */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            {loading ? (
              <div className="text-center py-16">Chargement des modèles...</div>
            ) : filteredTemplates.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium text-slate-600">Aucun modèle trouvé</h3>
                <p className="mt-2 text-slate-500">Essayez de modifier vos critères de recherche.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Templates;
