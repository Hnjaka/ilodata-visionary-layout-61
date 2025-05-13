
import React from 'react';
import { Check } from 'lucide-react';

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800">
            ✅ Pourquoi choisir ILODATA ?
          </h2>
          
          <ul className="space-y-6">
            {[
              "Expertise dans l'autoédition et l'édition numérique",
              "Résultats professionnels avec un outil accessible (Word)",
              "Tarifs accessibles aux auteurs débutants comme confirmés",
              "Accompagnement humain et rapide"
            ].map((item, index) => (
              <li key={index} className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                <span className="flex-shrink-0 w-6 h-6 mr-4 text-green-500">
                  <Check size={24} />
                </span>
                <span className="text-lg text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-12 text-center">
            <a href="/contact" className="button-primary inline-block px-8 py-3 text-lg font-medium">
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
