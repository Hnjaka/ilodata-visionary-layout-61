
import React from 'react';
import { Link } from 'react-router-dom';

const AboutHero = () => {
  return (
    <section className="relative pt-32 pb-16 bg-gradient-to-b from-blue-900 to-blue-800">
      <div className="absolute inset-0 bg-pattern-overlay opacity-10"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white animate-fade-right">
            À propos d'Ilodata
          </h1>
          <p className="text-xl text-blue-100 mb-8 animate-fade-right delay-200">
            Des documents soignés, pensés pour être lus et appréciés
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
