
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Ne charger le plugin lovable-tagger qu'en mode développement
  // et seulement si la version est compatible
  const plugins = [react()];
  
  if (mode === 'development') {
    try {
      // Tentative d'utilisation du plugin uniquement en développement
      plugins.push(componentTagger());
    } catch (error) {
      console.warn('Lovable-tagger not loaded due to compatibility issues', error);
    }
  }

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Configuration pour Netlify
    build: {
      rollupOptions: {
        external: [],
      },
    },
  };
});
