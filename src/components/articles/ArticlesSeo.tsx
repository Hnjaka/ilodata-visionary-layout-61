
import React, { useEffect } from 'react';

const ArticlesSeo: React.FC = () => {
  useEffect(() => {
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
  }, []);

  return null; // This component doesn't render anything
};

export default ArticlesSeo;
