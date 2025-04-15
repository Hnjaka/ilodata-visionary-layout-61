
import React, { useState, useEffect } from 'react';
import { ArrowDownToLine, Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
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
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const { toast } = useToast();

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
      
      const matchesCategory = !categoryFilter || template.categorie === categoryFilter;
      
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
                    <SelectItem value="">Toutes catégories</SelectItem>
                    <SelectItem value="Livres">Livres</SelectItem>
                    <SelectItem value="Magazines">Magazines</SelectItem>
                    <SelectItem value="CV">CV</SelectItem>
                    <SelectItem value="Flyers">Flyers</SelectItem>
                    <SelectItem value="Rapports">Rapports</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
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
                  <div key={template.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                    {/* Template Image */}
                    <div className="h-48 overflow-hidden">
                      {template.image_apercu ? (
                        <img 
                          src={`https://valzxjecoceltiyzkogw.supabase.co/storage/v1/object/public/template_images/${template.image_apercu}`}
                          alt={template.titre}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                          <span className="text-slate-400">Pas d'aperçu</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Template Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-semibold mb-2 text-slate-800">
                        {template.titre}
                      </h3>
                      <p className="text-slate-600 mb-4 line-clamp-3 flex-grow">
                        {template.description}
                      </p>
                      
                      {/* Category Badge */}
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          {template.categorie}
                        </span>
                      </div>
                      
                      {/* Download Button */}
                      <a 
                        href={`https://valzxjecoceltiyzkogw.supabase.co/storage/v1/object/public/template_files/${template.fichier_template}`}
                        download
                        className="button-primary w-full text-center inline-flex items-center justify-center"
                      >
                        <span>Télécharger</span>
                        <ArrowDownToLine size={16} className="ml-2" />
                      </a>
                    </div>
                  </div>
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
