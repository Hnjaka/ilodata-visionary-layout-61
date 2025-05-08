
import React, { useEffect, useState } from 'react';
import { getSitemapContent } from '@/utils/sitemapUtils';

const Sitemap = () => {
  const [sitemapContent, setSitemapContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchSitemap = async () => {
      try {
        setLoading(true);
        const content = await getSitemapContent();
        setSitemapContent(content);
      } catch (error) {
        console.error('Error fetching sitemap:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSitemap();
  }, []);
  
  if (loading) {
    return <div className="container mx-auto p-8">Chargement du sitemap...</div>;
  }
  
  if (!sitemapContent) {
    return <div className="container mx-auto p-8">Le sitemap n'est pas disponible.</div>;
  }
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Sitemap</h1>
      <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-[600px]">
        {sitemapContent}
      </pre>
    </div>
  );
};

export default Sitemap;
