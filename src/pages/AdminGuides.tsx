
import React, { useState } from 'react';
import { PlusCircle, Save, Trash } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { getCategoryData, getIconByName } from '@/data/guidesData';
import { toast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AdminGuides = () => {
  // Load initial data from guidesData.ts
  const [categories, setCategories] = useState(getCategoryData());
  
  // State for adding new categories
  const [newCategory, setNewCategory] = useState({ title: '', icon: 'Book' });
  
  // State for adding new articles
  const [newArticle, setNewArticle] = useState({ title: '', slug: '', categoryIndex: 0 });
  
  // Handle adding a new category
  const handleAddCategory = () => {
    if (!newCategory.title.trim()) {
      toast({
        title: "Erreur",
        description: "Le titre de la rubrique ne peut pas être vide",
        variant: "destructive"
      });
      return;
    }
    
    // Use getIconByName to get the actual component
    const IconComponent = getIconByName(newCategory.icon);
    
    const updatedCategories = [...categories, {
      title: newCategory.title,
      icon: IconComponent, // Using the actual component
      articles: []
    }];
    
    setCategories(updatedCategories);
    setNewCategory({ title: '', icon: 'Book' });
    
    toast({
      title: "Succès",
      description: "Nouvelle rubrique ajoutée",
    });
  };
  
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
  
  // Handle deleting a category
  const handleDeleteCategory = (index: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette rubrique et tous ses articles ?')) {
      const updatedCategories = [...categories];
      updatedCategories.splice(index, 1);
      setCategories(updatedCategories);
      
      toast({
        title: "Supprimé",
        description: "La rubrique a été supprimée",
      });
    }
  };
  
  // Handle deleting an article
  const handleDeleteArticle = (categoryIndex: number, articleIndex: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      const updatedCategories = [...categories];
      updatedCategories[categoryIndex].articles.splice(articleIndex, 1);
      setCategories(updatedCategories);
      
      toast({
        title: "Supprimé",
        description: "L'article a été supprimé",
      });
    }
  };
  
  // Available icons for selection
  const availableIcons = [
    'Book', 'FileText', 'Shapes', 'Printer', 'ImageIcon', 'PanelLeft', 'LayoutTemplate', 'FileCode'
  ];
  
  // Export the data structure (would normally save to database)
  const handleExportData = () => {
    const dataStr = JSON.stringify(categories, null, 2);
    console.log(dataStr);
    navigator.clipboard.writeText(dataStr).then(() => {
      toast({
        title: "Exporté",
        description: "Structure JSON copiée dans le presse-papier",
      });
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Gestion des rubriques et articles</h1>
          <Button onClick={handleExportData} variant="outline">
            Exporter en JSON
          </Button>
        </div>
        
        {/* Categories Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-slate-800">Rubriques</h2>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Nombre d'articles</TableHead>
                <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{category.title}</TableCell>
                  <TableCell>{category.articles.length}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteCategory(index)}
                    >
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="mt-6 bg-slate-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Ajouter une rubrique</h3>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Label htmlFor="categoryTitle">Titre de la rubrique</Label>
                <Input
                  id="categoryTitle"
                  value={newCategory.title}
                  onChange={(e) => setNewCategory({...newCategory, title: e.target.value})}
                  placeholder="Nouvelle rubrique"
                />
              </div>
              <div className="w-1/3">
                <Label htmlFor="categoryIcon">Icône</Label>
                <Select 
                  value={newCategory.icon}
                  onValueChange={(value) => setNewCategory({...newCategory, icon: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une icône" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableIcons.map((icon) => (
                      <SelectItem key={icon} value={icon}>
                        {icon}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddCategory}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            </div>
          </div>
        </section>
        
        {/* Articles Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-slate-800">Articles</h2>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Rubrique</TableHead>
                <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.flatMap((category, categoryIndex) =>
                category.articles.map((article, articleIndex) => (
                  <TableRow key={`${categoryIndex}-${articleIndex}`}>
                    <TableCell className="font-medium">{article.title}</TableCell>
                    <TableCell>{article.slug}</TableCell>
                    <TableCell>{category.title}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteArticle(categoryIndex, articleIndex)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          
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
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AdminGuides;
