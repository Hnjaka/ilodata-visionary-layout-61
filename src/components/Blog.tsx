
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/LoadingSpinner';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  slug: string; // Ajout du slug pour les liens corrects
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "5 astuces pour réussir la mise en page de votre livre",
    excerpt: "Découvrez les techniques essentielles pour créer une mise en page professionnelle et attractive pour votre livre.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    date: "15 avril 2023",
    category: "Design éditorial",
    slug: "astuces-mise-en-page-livre"
  },
  {
    id: 2,
    title: "Comment choisir le bon modèle de mise en page pour votre projet ?",
    excerpt: "Guide complet pour sélectionner le modèle qui correspond parfaitement à votre type de livre et à vos objectifs.",
    image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80",
    date: "3 mai 2023",
    category: "Conseils pratiques",
    slug: "choisir-modele-mise-en-page"
  },
  {
    id: 3,
    title: "Les erreurs à éviter lors de la création d'un livre numérique",
    excerpt: "Évitez les pièges courants qui peuvent compromettre la qualité de votre ebook et nuire à l'expérience de lecture.",
    image: "https://images.unsplash.com/photo-1595373650160-963a12639e38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    date: "21 juin 2023",
    category: "Livres numériques",
    slug: "erreurs-creation-livre-numerique"
  }
];

const BlogCard = ({ post, delay }: { post: BlogPost; delay: string }) => {
  return (
    <article className={cn(
      "glass-card h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-up border-l-4 border-ilodata-600",
      delay
    )}>
      <div className="relative overflow-hidden aspect-[16/9]">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-0 left-0 p-2">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-white/90 text-ilodata-700 rounded-full">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="text-sm text-slate-500 mb-2">{post.date}</div>
        <h3 className="text-xl font-semibold mb-3 text-slate-800">{post.title}</h3>
        <p className="text-slate-600 mb-4">{post.excerpt}</p>
        <Link 
          to={`/blog/${post.slug}`} 
          className="group inline-flex items-center text-ilodata-600 font-medium hover:text-ilodata-700 transition-colors"
        >
          Lire la suite
          <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
};

const Blog = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { user, isAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Add these logs to better track the user state
  useEffect(() => {
    console.log("Blog component - User auth state:", { 
      isLoggedIn: !!user,
      isAdmin: isAdmin
    });
  }, [user, isAdmin]);

  return (
    <section id="blog" className="section-padding bg-gradient-to-b from-white to-blue-50">
      <div 
        ref={sectionRef} 
        className="container mx-auto px-4 md:px-6 fade-in-section"
      >
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-blue-100">
              <BookOpen className="h-6 w-6 text-ilodata-600" />
            </div>
          </div>
          <h2 className="section-title text-center">Conseils et actualités</h2>
          <p className="section-subtitle">
            Articles, conseils et inspiration pour vos projets éditoriaux.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 mb-8">
            {error}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {blogPosts.map((post, index) => (
              <BlogCard 
                key={post.id} 
                post={post} 
                delay={`delay-${(index + 1) * 100}`}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          {/* Show all articles button for everyone */}
          <Link to="/blog" className="button-secondary inline-flex items-center mr-2">
            Voir tous les articles
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
          
          {/* Show admin button only for logged in admins */}
          {user && isAdmin && (
            <Link to="/admin/blog" className="button-primary inline-flex items-center ml-2">
              Gérer les articles
              <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;
