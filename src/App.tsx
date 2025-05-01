import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import Index from "./pages/Index";
import Models from "./pages/Models";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import GuidesConseils from "./pages/GuidesConseils";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Templates from "./pages/Templates";
import AdminTemplates from "./pages/AdminTemplates";
import AdminGuides from "./pages/AdminGuides";
import AdminBlog from "./pages/AdminBlog";
import AddTemplate from "./pages/AddTemplate";
import EditTemplate from "./pages/EditTemplate";
import ArticleDisplay from "./pages/articles/ArticleDisplay";
import Blog from "./pages/Blog";
import BlogArticleDisplay from "./pages/BlogArticleDisplay";
import CGU from "./pages/CGU";
import Confidentialite from "./pages/Confidentialite";
import MentionsLegales from "./pages/MentionsLegales";
import FAQ from "./pages/FAQ";
import Auth from "./pages/Auth";
import UserAccount from "./pages/UserAccount";

const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/modeles" element={<Models />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/guides" element={<GuidesConseils />} />
                <Route path="/guides/:slug" element={<ArticleDisplay />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogArticleDisplay />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/account" element={<UserAccount />} />
                <Route path="/admin/templates" element={
                  <ProtectedRoute>
                    <AdminTemplates />
                  </ProtectedRoute>
                } />
                <Route path="/admin/guides" element={
                  <ProtectedRoute>
                    <AdminGuides />
                  </ProtectedRoute>
                } />
                <Route path="/admin/blog" element={
                  <ProtectedRoute>
                    <AdminBlog />
                  </ProtectedRoute>
                } />
                <Route path="/admin/templates/new" element={
                  <ProtectedRoute>
                    <AddTemplate />
                  </ProtectedRoute>
                } />
                <Route path="/admin/templates/edit/:id" element={
                  <ProtectedRoute>
                    <EditTemplate />
                  </ProtectedRoute>
                } />
                <Route path="/legal/cgu" element={<CGU />} />
                <Route path="/legal/confidentialite" element={<Confidentialite />} />
                <Route path="/legal/mentions-legales" element={<MentionsLegales />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
            <Toaster />
            <Sonner />
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
