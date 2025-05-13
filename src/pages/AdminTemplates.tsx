
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Pencil, Trash2, Plus, Eye, EyeOff, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Tables } from '@/integrations/supabase/types';
import ProtectedRoute from '@/components/admin/ProtectedRoute';

type Template = Tables<"templates">;

const AdminTemplates = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin } = useAuth();

  useEffect(() => {
    document.title = "Administration des Templates | ilodata.com";
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('date_ajout', { ascending: false });

      if (error) {
        throw error;
      }

      setTemplates(data || []);
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

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('templates').delete().eq('id', id);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Succès",
        description: "Le template a été supprimé",
      });
      
      setTemplates(templates.filter(template => template.id !== id));
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le template",
        variant: "destructive",
      });
      console.error('Error deleting template:', error);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/templates/edit/${id}`);
  };

  const AdminContent = () => (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800">Administration des Templates</h1>
            <div className="flex gap-2">
              {isAdmin && (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/admin/templates/settings')}
                    className="flex items-center"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Paramètres
                  </Button>
                  <Button 
                    onClick={() => navigate('/admin/templates/new')} 
                    className="flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Nouveau template
                  </Button>
                </>
              )}
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-8">Chargement des templates...</div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Titre</TableHead>
                    <TableHead className="w-[150px]">Catégorie</TableHead>
                    <TableHead className="w-[150px]">Aperçu</TableHead>
                    <TableHead className="w-[100px]">Visibilité</TableHead>
                    <TableHead className="w-[150px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templates.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        Aucun template disponible. Créez-en un nouveau !
                      </TableCell>
                    </TableRow>
                  ) : (
                    templates.map((template) => (
                      <TableRow key={template.id}>
                        <TableCell className="font-medium">{template.titre}</TableCell>
                        <TableCell>{template.categorie}</TableCell>
                        <TableCell>
                          {template.image_apercu ? (
                            <img 
                              src={`https://valzxjecoceltiyzkogw.supabase.co/storage/v1/object/public/template_images/${template.image_apercu}`}
                              alt={template.titre}
                              className="h-12 w-20 object-cover rounded"
                            />
                          ) : (
                            "Aucune image"
                          )}
                        </TableCell>
                        <TableCell>
                          {template.visible ? (
                            <Eye className="text-green-500" />
                          ) : (
                            <EyeOff className="text-red-500" />
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleEdit(template.id)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleDelete(template.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );

  return (
    <ProtectedRoute requireAdmin>
      <AdminContent />
    </ProtectedRoute>
  );
};

export default AdminTemplates;
