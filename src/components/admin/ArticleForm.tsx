
import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { CategoryType } from '@/types/guides';

interface ArticleFormProps {
  categories: CategoryType[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ categories, setCategories }) => {
  // State for adding new articles
  const [newArticle, setNewArticle] = useState({ title: '', slug: '', categoryIndex: 0 });

  // Handle adding a new article
  const handleAddArticle = () => {
    if (!newArticle.title.trim() || !newArticle.slug.trim()) {
      toast({
        title: "Erreur",
        description: "Le titre et le slug de l'article ne peuvent pas être vides",
        variant: "destructive"
      });
      return;
    }
    
    // Parse the categoryIndex as a number since it might be coming as a string
    const categoryIndex = parseInt(String(newArticle.categoryIndex));
    
    if (isNaN(categoryIndex) || categoryIndex < 0 || categoryIndex >= categories.length) {
      toast({
        title: "Erreur",
        description: "Catégorie invalide",
        variant: "destructive"
      });
      return;
    }
    
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].articles.push({
      title: newArticle.title,
      slug: newArticle.slug
    });
    
    setCategories(updatedCategories);
    setNewArticle({ title: '', slug: '', categoryIndex: categoryIndex });
    
    toast({
      title: "Succès",
      description: "Nouvel article ajouté",
    });
  };

  return (
    <div className="mt-6 bg-slate-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-4">Ajouter un article</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <Label htmlFor="articleTitle">Titre de l'article</Label>
          <Input
            id="articleTitle"
            value={newArticle.title}
            onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
            placeholder="Titre de l'article"
          />
        </div>
        <div>
          <Label htmlFor="articleSlug">Slug (URL)</Label>
          <Input
            id="articleSlug"
            value={newArticle.slug}
            onChange={(e) => setNewArticle({...newArticle, slug: e.target.value})}
            placeholder="nom-article-url"
          />
        </div>
        <div>
          <Label htmlFor="articleCategory">Rubrique</Label>
          <select
            id="articleCategory"
            value={newArticle.categoryIndex}
            onChange={(e) => setNewArticle({...newArticle, categoryIndex: parseInt(e.target.value)})}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {categories.map((category, index) => (
              <option key={index} value={index}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Button onClick={handleAddArticle}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Ajouter l'article
      </Button>
    </div>
  );
};

export default ArticleForm;
