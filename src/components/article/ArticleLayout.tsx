
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TableOfContents from '@/components/article/TableOfContents';

interface Breadcrumb {
  label: string;
  url: string;
}

interface ArticleLayoutProps {
  title: string;
  breadcrumbs: Breadcrumb[];
  children: React.ReactNode;
  tocItems?: { id: string; title: string }[];
}

const ArticleLayout = ({ title, breadcrumbs, children, tocItems }: ArticleLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section with Title */}
        <section className="bg-gradient-to-b from-white to-blue-50 pt-32 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-4 text-slate-600 text-sm">
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={index}>
                    <Link to={crumb.url} className="hover:text-ilodata-600 transition-colors">
                      {crumb.label}
                    </Link>
                    {index < breadcrumbs.length - 1 && (
                      <ChevronRight className="h-4 w-4 mx-2" />
                    )}
                  </React.Fragment>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                {title}
              </h1>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="lg:w-2/3">
                <article className="prose prose-slate prose-headings:font-display prose-headings:text-slate-800 prose-p:text-slate-600 prose-a:text-ilodata-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl max-w-none">
                  {children}
                </article>
                
                {/* Back to All Guides Button */}
                <div className="mt-12">
                  <Link 
                    to="/guides" 
                    className="flex items-center text-ilodata-600 hover:text-ilodata-700 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Retour aux guides et conseils
                  </Link>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:w-1/3">
                <div className="space-y-6">
                  {/* Table des matières */}
                  {tocItems && <TableOfContents items={tocItems} />}
                  
                  <div className="sticky top-24">
                    {/* Demande de devis */}
                    <div className="glass-card p-6 mb-6">
                      <h3 className="text-lg font-semibold mb-3 text-slate-800">Besoin d'aide pour votre livre ?</h3>
                      <p className="text-slate-600 mb-4">Nos experts peuvent vous aider avec la mise en page professionnelle de votre livre.</p>
                      <Link 
                        to="/contact" 
                        className="button-primary w-full text-center block"
                      >
                        Demandez un devis
                      </Link>
                    </div>
                    
                    {/* Articles similaires */}
                    <div className="glass-card p-6">
                      <h3 className="text-lg font-semibold mb-3 text-slate-800">Articles similaires</h3>
                      <ul className="space-y-3">
                        <li>
                          <Link 
                            to="/guides/fondamentaux-mise-en-page" 
                            className="block py-1 px-2 text-slate-600 hover:text-ilodata-600 hover:bg-blue-50 rounded transition-colors"
                          >
                            Guide de mise en page professionnelle
                          </Link>
                        </li>
                        <li>
                          <Link 
                            to="/guides/choisir-taille-police" 
                            className="block py-1 px-2 text-slate-600 hover:text-ilodata-600 hover:bg-blue-50 rounded transition-colors"
                          >
                            Comment choisir la bonne taille de police pour votre livre ?
                          </Link>
                        </li>
                        <li>
                          <Link 
                            to="/guides/erreurs-mise-en-page" 
                            className="block py-1 px-2 text-slate-600 hover:text-ilodata-600 hover:bg-blue-50 rounded transition-colors"
                          >
                            Les erreurs courantes à éviter lors de la mise en page
                          </Link>
                        </li>
                        <li>
                          <Link 
                            to="/guides/preparer-fichier-impression" 
                            className="block py-1 px-2 text-slate-600 hover:text-ilodata-600 hover:bg-blue-50 rounded transition-colors"
                          >
                            Comment préparer votre fichier pour l'impression
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ArticleLayout;
