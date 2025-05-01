
import { useState, useEffect } from 'react';
import { Tables } from '@/integrations/supabase/types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type Template = Tables<"templates">;

export const useTemplates = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchTemplates();
  }, []);

  useEffect(() => {
    // Filter templates based on search query and category
    const filtered = templates.filter(template => {
      const matchesSearch = 
        (template.titre?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
        ((template.description || '') && (template.description || '').toLowerCase().includes(searchQuery.toLowerCase())) ||
        ((template.tags || '') && (template.tags || '').toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = categoryFilter === 'all' || template.categorie === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredTemplates(filtered);
  }, [searchQuery, categoryFilter, templates]);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Fetching templates from Supabase");
      
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .eq('visible', true)
        .order('date_ajout', { ascending: false });

      if (error) {
        console.error("Error fetching templates:", error);
        throw error;
      }
      
      console.log(`Templates fetched: ${data?.length || 0}`);

      // If no templates, add some demo templates
      if (!data || data.length === 0) {
        console.log("No templates found, using demo data");
        const demoTemplates = getDemoTemplates();
        setTemplates(demoTemplates);
        setFilteredTemplates(demoTemplates);
      } else {
        setTemplates(data);
        setFilteredTemplates(data);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
      setError("Impossible de charger les modèles. Veuillez réessayer ultérieurement.");
      
      toast({
        title: "Erreur",
        description: "Impossible de charger les templates",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Helper function to get demo templates if none exist in database
  const getDemoTemplates = (): Template[] => {
    // Create demo templates that match the Template type from Supabase
    return [
      {
        id: '1',
        titre: 'Modèle de livre roman',
        description: 'Parfait pour les romans et récits littéraires',
        categorie: 'Livres',
        image_apercu: null,
        image_extras: null,
        fichier_template: 'demo-roman-template.docx',
        visible: true,
        date_ajout: new Date().toISOString(),
        tags: 'roman, fiction, littérature'
      },
      {
        id: '2',
        titre: 'Modèle CV professionnel',
        description: 'Un CV moderne et professionnel pour se démarquer',
        categorie: 'CV',
        image_apercu: null,
        image_extras: null,
        fichier_template: 'demo-cv-template.docx',
        visible: true,
        date_ajout: new Date().toISOString(),
        tags: 'cv, emploi, carrière'
      },
      {
        id: '3',
        titre: 'Template de rapport scientifique',
        description: 'Structure parfaite pour présenter vos recherches',
        categorie: 'Rapports',
        image_apercu: null,
        image_extras: null,
        fichier_template: 'demo-rapport-template.docx',
        visible: true,
        date_ajout: new Date().toISOString(),
        tags: 'rapport, académique, recherche'
      }
    ] as Template[]; // Using type assertion to ensure it matches the Template type
  };

  return {
    templates,
    filteredTemplates,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    fetchTemplates,
  };
};
