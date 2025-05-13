
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Set meta tags for SEO
const updateMetaTags = () => {
  document.title = "Tarif mise en page Word et livre | Mise en page Amazon Kindle";
  
  // Update or create description meta tag
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', 'Découvrez nos tarifs de mise en page de livre Word et nos conseils pour publier sur Amazon KDP. Modèles pros et simples à utiliser.');
};

// Call the function to update meta tags
updateMetaTags();

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
