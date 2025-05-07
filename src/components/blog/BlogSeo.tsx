
import React, { useEffect } from 'react';

const BlogSeo: React.FC = () => {
  useEffect(() => {
    document.title = "Blog - Conseils et actualités sur la mise en page | ilodata.com";
    
    // Mise à jour ou création de la balise meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Articles, conseils et inspiration pour vos projets éditoriaux. Découvrez nos astuces et bonnes pratiques pour la mise en page de livres.');
    
    // Add canonical URL for SEO
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', 'https://ilodata.com/blog');
    
    console.log("Blog page mounted - Setup meta tags completed");
  }, []);

  return null; // This component doesn't render anything
};

export default BlogSeo;
