
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/guides/HeroSection';
import ArticleCategories from '@/components/guides/ArticleCategories';
import FaqSection from '@/components/guides/FaqSection';
import CtaSection from '@/components/guides/CtaSection';
import useIntersectionVisibility from '@/hooks/useIntersectionVisibility';
import { getFaqItems } from '@/components/guides/FaqData';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const GuidesConseils = () => {
  const sectionRef = useIntersectionVisibility<HTMLDivElement>();
  const faqItems = getFaqItems();
  const { user, isAdmin, isApproved } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />

        {/* Main Content */}
        <section className="py-16">
          <div 
            ref={sectionRef} 
            className="container mx-auto px-4 md:px-6 fade-in-section"
          >
            {/* Admin Link - Show only for authorized users */}
            {user && isAdmin && isApproved && (
              <div className="flex justify-end mb-8">
                <Button variant="ghost" asChild>
                  <Link to="/admin/guides" className="flex items-center text-slate-500 hover:text-ilodata-600">
                    <Settings className="h-4 w-4 mr-2" />
                    Gérer les catégories et articles
                  </Link>
                </Button>
              </div>
            )}
            
            <ArticleCategories />
            <FaqSection faqItems={faqItems} />
            <CtaSection />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GuidesConseils;
