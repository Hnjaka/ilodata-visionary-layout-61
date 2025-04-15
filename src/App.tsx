
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Models from "./pages/Models";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import GuidesConseils from "./pages/GuidesConseils";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import FondamentauxMiseEnPage from "./pages/articles/FondamentauxMiseEnPage";
import ChoisirTaillePolice from "./pages/articles/ChoisirTaillePolice";
import Templates from "./pages/Templates";
import AdminTemplates from "./pages/AdminTemplates";
import AddTemplate from "./pages/AddTemplate";
import EditTemplate from "./pages/EditTemplate";

const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/modeles" element={<Models />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/guides" element={<GuidesConseils />} />
              <Route path="/guides/fondamentaux-mise-en-page" element={<FondamentauxMiseEnPage />} />
              <Route path="/guides/choisir-taille-police" element={<ChoisirTaillePolice />} />
              <Route path="/about" element={<About />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/admin/templates" element={<AdminTemplates />} />
              <Route path="/admin/templates/new" element={<AddTemplate />} />
              <Route path="/admin/templates/edit/:id" element={<EditTemplate />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
