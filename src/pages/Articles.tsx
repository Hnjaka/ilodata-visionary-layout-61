
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogPostCard from '@/components/blog/BlogPostCard';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogSeo from '@/components/blog/BlogSeo';
import { BlogPost } from '@/hooks/useBlogPosts';
import { useToast } from '@/hooks/use-toast';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Articles = () => {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [articles, setArticles] = React.useState<BlogPost[]>([]);

  // Articles spécialisés pour cette page - contenu différent du blog
  const specializedArticles: BlogPost[] = [
    {
      id: '1',
      title: "L'importance d'une mise en page professionnelle pour votre livre",
      excerpt: "Découvrez pourquoi une mise en page de qualité est essentielle pour le succès de votre livre et comment elle influence la perception des lecteurs.",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      published_at: "2023-05-20T00:00:00.000Z",
      category_title: "Mise en page",
      slug: "importance-mise-en-page-professionnelle",
      content: "",
      category_id: "",
      position: 0,
      published: true
    },
    {
      id: '2',
      title: "10 outils essentiels pour la mise en page de votre manuscrit",
      excerpt: "Une sélection des meilleurs logiciels et outils pour vous aider à créer une mise en page élégante et professionnelle pour votre livre.",
      image: "https://images.unsplash.com/photo-1516131206008-dd041a9764fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      published_at: "2023-06-10T00:00:00.000Z",
      category_title: "Outils et logiciels",
      slug: "outils-essentiels-mise-en-page",
      content: "",
      category_id: "",
      position: 0,
      published: true
    },
    {
      id: '3',
      title: "Comment choisir les polices idéales pour votre livre",
      excerpt: "Guide complet pour sélectionner les bonnes typographies qui correspondent au style et au message de votre livre.",
      image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
      published_at: "2023-07-05T00:00:00.000Z",
      category_title: "Typographie",
      slug: "choisir-polices-ideales-livre",
      content: "",
      category_id: "",
      position: 0,
      published: true
    },
    {
      id: '4',
      title: "Les tendances de mise en page pour l'année 2023",
      excerpt: "Découvrez les dernières tendances en matière de design éditorial et de mise en page pour créer un livre au goût du jour.",
      image: "https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      published_at: "2023-08-15T00:00:00.000Z",
      category_title: "Tendances",
      slug: "tendances-mise-en-page-2023",
      content: "",
      category_id: "",
      position: 0,
      published: true
    }
  ];

  useEffect(() => {
    // Configuration SEO pour cette page
    document.title = "Articles spécialisés sur la mise en page de livres | ilodata.com";
    
    // Mise à jour ou création de la balise meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Articles spécialisés sur la mise en page de livres, les outils de PAO, la typographie et les bonnes pratiques éditoriales pour auteurs et professionnels.');
    
    // Add canonical URL for SEO
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', 'https://ilodata.com/articles');
    
    console.log("Articles page mounted - Setup meta tags completed");
    
    // Simulation du chargement des articles
    setLoading(true);
    setTimeout(() => {
      setArticles(specializedArticles);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-slate-600 hover:text-ilodata-600 mb-4">
              <ArrowLeft size={16} className="mr-1" />
              Retour à l'accueil
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Articles spécialisés</h1>
            <p className="text-slate-600">Ressources détaillées sur la mise en page professionnelle de livres</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <Button
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setArticles(specializedArticles);
                    setLoading(false);
                    setError(null);
                  }, 1000);
                }}
              >
                Réessayer
              </Button>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <BlogPostCard key={article.id} post={article} />
                ))}
              </div>
              
              {articles.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg text-slate-600">Aucun article n'est disponible pour le moment.</p>
                  <p className="mt-2">Revenez bientôt pour découvrir notre contenu!</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Articles;
