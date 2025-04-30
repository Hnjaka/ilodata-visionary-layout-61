
import React from 'react';
import { Link } from 'react-router-dom';

const CtaSection = () => {
  return (
    <div className="mt-16 text-center">
      <div className="glass-card p-8 animate-fade-up bg-blue-50">
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">Vous avez besoin d'aide pour votre mise en page ?</h2>
        <p className="text-sm text-slate-500 mb-4">Notre équipe de professionnels est à votre service</p>
        <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
          Si vous préférez confier votre projet à des professionnels, découvrez notre service de mise en page sur mesure. Nous sommes là pour vous accompagner à chaque étape.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/services" className="button-primary">
            Découvrir nos services
          </Link>
          <Link to="/contact" className="button-quote">
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
