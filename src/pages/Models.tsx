
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/models/HeroSection';
import FeaturesSection from '@/components/models/FeaturesSection';
import HowToUseSection from '@/components/models/HowToUseSection';
import TestimonialsSection from '@/components/models/TestimonialsSection';
import CtaSection from '@/components/models/CtaSection';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import ModelCard from '@/components/models/ModelCard';

type Template = Tables<"templates">;

const Models = () => {
  const [featuredTemplates, setFeaturedTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Modèles de mise en page pour livres | ilodata.com";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Téléchargez des modèles Word gratuits et payants pour créer une mise en page de livre professionnelle. Parfait pour les auteurs indépendants et les éditeurs.');
    
    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach(section => {
      section.classList.add('is-visible');
    });
    
    fetchFeaturedTemplates();
  }, []);
  
  const fetchFeaturedTemplates = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .eq('visible', true)
        .eq('categorie', 'Livres')
        .limit(4);
        
      if (error) {
        throw error;
      }
      
      setFeaturedTemplates(data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HeroSection />
      <FeaturesSection />
      
      {/* Featured Templates Section */}
      <section id="models" className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4 md:px-6 fade-in-section is-visible">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-slate-800">Modèles populaires</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Découvrez nos modèles les plus populaires pour la mise en page de vos livres.
              <a href="/templates" className="text-ilodata-600 hover:underline ml-2">
                Voir tous les modèles →
              </a>
            </p>
          </div>

          {loading ? (
            <div className="text-center py-8">Chargement des modèles...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {featuredTemplates.map((template, index) => (
                <ModelCard 
                  key={template.id}
                  title={template.titre}
                  description={template.description || ''}
                  imageSrc={template.image_apercu ? 
                    `https://valzxjecoceltiyzkogw.supabase.co/storage/v1/object/public/template_images/${template.image_apercu}` :
                    "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=2730&auto=format&fit=crop"}
                  downloadLink={`https://valzxjecoceltiyzkogw.supabase.co/storage/v1/object/public/template_files/${template.fichier_template}`}
                  price={null}
                  isFree={true}
                  delay={`delay-${index * 100}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      
      <HowToUseSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Models;
