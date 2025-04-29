
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/guides/HeroSection';
import ArticleCategories from '@/components/guides/ArticleCategories';
import FaqSection from '@/components/guides/FaqSection';
import CtaSection from '@/components/guides/CtaSection';
import useIntersectionVisibility from '@/hooks/useIntersectionVisibility';
import { getFaqItems } from '@/components/guides/FaqData';

const GuidesConseils = () => {
  const sectionRef = useIntersectionVisibility<HTMLDivElement>();
  const faqItems = getFaqItems();

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
