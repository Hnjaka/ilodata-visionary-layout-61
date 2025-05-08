
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import Index from '@/pages/Index';
import About from '@/pages/About';
import Services from '@/pages/Services';
import Models from '@/pages/Models';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
import Articles from '@/pages/Articles';
import BlogArticleDisplay from '@/pages/BlogArticleDisplay';
import GuidesConseils from '@/pages/GuidesConseils';
import ArticleDisplay from '@/pages/articles/ArticleDisplay';
import MeilleuresPratiquesModeles from '@/pages/articles/MeilleuresPratiquesModeles';
import ChoisirTaillePolice from '@/pages/articles/ChoisirTaillePolice';
import AdapterModeleWord from '@/pages/articles/AdapterModeleWord';
import FondamentauxMiseEnPage from '@/pages/articles/FondamentauxMiseEnPage';
import ErreursMiseEnPage from '@/pages/articles/ErreursMiseEnPage';
import PersonnaliserModeleWord from '@/pages/articles/PersonnaliserModeleWord';
import PreparerFichierImpression from '@/pages/articles/PreparerFichierImpression';
import Auth from '@/pages/Auth';
import UserAccount from '@/pages/UserAccount';
import Templates from '@/pages/Templates';
import AddTemplate from '@/pages/AddTemplate';
import EditTemplate from '@/pages/EditTemplate';
import MentionsLegales from '@/pages/MentionsLegales';
import CGU from '@/pages/CGU';
import Confidentialite from '@/pages/Confidentialite';
import FAQ from '@/pages/FAQ';
import Sitemap from '@/pages/Sitemap';

// Admin pages
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminBlog from '@/pages/AdminBlog';
import AdminGuides from '@/pages/AdminGuides';
import AdminTemplates from '@/pages/AdminTemplates';
import AdminUsers from '@/pages/AdminUsers';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/modeles" element={<Models />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:slug" element={<BlogArticleDisplay />} />
        <Route path="/guides" element={<GuidesConseils />} />
        <Route path="/guides/:slug" element={<ArticleDisplay />} />
        
        {/* Article routes */}
        <Route path="/articles/meilleures-pratiques-modeles" element={<MeilleuresPratiquesModeles />} />
        <Route path="/articles/choisir-taille-police" element={<ChoisirTaillePolice />} />
        <Route path="/articles/adapter-modele-word" element={<AdapterModeleWord />} />
        <Route path="/articles/fondamentaux-mise-en-page" element={<FondamentauxMiseEnPage />} />
        <Route path="/articles/erreurs-mise-en-page" element={<ErreursMiseEnPage />} />
        <Route path="/articles/personnaliser-modele-word" element={<PersonnaliserModeleWord />} />
        <Route path="/articles/preparer-fichier-impression" element={<PreparerFichierImpression />} />
        
        {/* Auth routes */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/compte" element={<UserAccount />} />
        
        {/* Legal routes */}
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/cgu" element={<CGU />} />
        <Route path="/confidentialite" element={<Confidentialite />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/sitemap.html" element={<Sitemap />} />
        
        {/* Template routes */}
        <Route path="/templates/ajouter" element={
          <ProtectedRoute>
            <AddTemplate />
          </ProtectedRoute>
        } />
        <Route path="/templates/modifier/:id" element={
          <ProtectedRoute>
            <EditTemplate />
          </ProtectedRoute>
        } />
        
        {/* Admin routes */}
        <Route path="/admin/blog" element={
          <ProtectedRoute adminOnly={true}>
            <AdminBlog />
          </ProtectedRoute>
        } />
        <Route path="/admin/guides" element={
          <ProtectedRoute adminOnly={true}>
            <AdminGuides />
          </ProtectedRoute>
        } />
        <Route path="/admin/templates" element={
          <ProtectedRoute adminOnly={true}>
            <AdminTemplates />
          </ProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedRoute adminOnly={true}>
            <AdminUsers />
          </ProtectedRoute>
        } />
        
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
