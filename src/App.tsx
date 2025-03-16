
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
