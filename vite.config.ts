
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Configuration des plugins avec gestion conditionnelle de lovable-tagger
  const plugins = [react()];
  
  // Ne charger le plugin lovable-tagger qu'en mode développement
  if (mode === 'development') {
    try {
      const taggerPlugin = componentTagger();
      if (taggerPlugin) {
        plugins.push(taggerPlugin);
      }
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
