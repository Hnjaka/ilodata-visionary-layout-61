import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Edit, Trash } from 'lucide-react';
import { Badge } from "@/components/ui/badge"
import { BlogCategory, BlogArticle } from '@/hooks/useBlogData';
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Copy } from 'lucide-react';
import { toast } from "@/components/ui/use-toast"
import { useClipboard } from '@mantine/hooks';
import { cn } from "@/lib/utils";

interface BlogArticleListProps {
  categories: BlogCategory[];
  articles: BlogArticle[];
  loading: boolean;
  setEditArticle: React.Dispatch<React.SetStateAction<BlogArticle | null>>;
  setEditArticleCategoryIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setEditArticleIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleDeleteArticle: (articleId: string) => void;
}

const BlogArticleList: React.FC<BlogArticleListProps> = ({
  categories,
  articles,
  loading,
  setEditArticle,
  setEditArticleCategoryIndex,
  setEditArticleIndex,
  handleDeleteArticle
}) => {
  const [search, setSearch] = useState("");
  const clipboard = useClipboard({ timeout: 750 });

  const copyArticleLink = (article: BlogArticle) => {
    const articleLink = `${window.location.origin}/articles/${article.slug}`;
    clipboard.copy(articleLink);
    toast({
      title: "Lien copié!",
      description: "Le lien de l'article a été copié dans le presse-papiers."
    });
  };

  const filteredArticles = articles?.filter(article =>
    article.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Rechercher un article..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-6 py-3">
                Titre
              </TableHead>
              <TableHead className="px-6 py-3">
                Catégorie
              </TableHead>
              <TableHead className="px-6 py-3">
                Date de publication
              </TableHead>
              <TableHead className="px-6 py-3">
                Statut
              </TableHead>
              <TableHead className="px-6 py-3">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <>
                {Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index} className="animate-pulse">
                    <TableCell className="px-6 py-4">
                      <Skeleton className="h-4 w-[250px]" />
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <Skeleton className="h-4 w-[150px]" />
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <Skeleton className="h-4 w-[100px]" />
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <Skeleton className="h-4 w-[80px]" />
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <Skeleton className="h-4 w-[120px]" />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : filteredArticles && filteredArticles.length > 0 ? (
              filteredArticles.map((article) => {
                const category = categories.find(cat => cat.id === article.categoryId);
                return (
                  <TableRow key={article.id}>
                    <TableCell className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {article.title}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <Badge variant="outline" className="text-xs">
                        {article.category_title}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      {new Date(article.published_at).toLocaleDateString('fr-FR')}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <Badge variant="outline" className="text-xs">
                        {article.published ? "Publié" : "Brouillon"}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Ouvrir le menu</span>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => copyArticleLink(article)}>
                            Copier le lien
                            <Copy className="ml-2 h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              const categoryIndex = categories.findIndex(cat => cat.id === article.categoryId);
                              setEditArticle(article);
                              setEditArticleCategoryIndex(categoryIndex);
                              setEditArticleIndex(articles.findIndex(a => a.id === article.id));
                            }}
                          >
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteArticle(article.id)}
                            className="text-red-500 focus:bg-red-500 hover:bg-red-500 focus:text-white hover:text-white"
                          >
                            Supprimer
                            <Trash className="ml-2 h-4 w-4" />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="px-6 py-4 text-center">
                  Aucun article trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BlogArticleList;
