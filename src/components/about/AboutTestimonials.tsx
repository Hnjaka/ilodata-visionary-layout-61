
import React from 'react';
import { MessageSquare } from 'lucide-react';

const AboutTestimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-blue-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-blue-100">
              <MessageSquare className="h-6 w-6 text-ilodata-600" />
            </div>
          </div>
          <h2 className="section-title text-center">Ce que disent nos clients</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md relative">
            <div className="text-5xl text-ilodata-200 absolute top-4 left-4">"</div>
            <div className="relative z-10">
              <p className="text-slate-700 mb-6 pt-8 italic">
                "Grâce à ILODATA, j'ai pu finaliser la mise en page de mon livre en un temps record. 
                Leur réactivité et leur professionnalisme sont impressionnants."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=288&q=80" 
                    alt="Marie" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Marie</p>
                  <p className="text-sm text-slate-600">Auteure indépendante</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md relative">
            <div className="text-5xl text-ilodata-200 absolute top-4 left-4">"</div>
            <div className="relative z-10">
              <p className="text-slate-700 mb-6 pt-8 italic">
                "Le service de mise en page sur mesure est top. Mon livre a une présentation professionnelle 
                sans que j'aie à m'en préoccuper."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                    alt="Pierre" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Pierre</p>
                  <p className="text-sm text-slate-600">Éditeur</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="flex justify-center space-x-6">
            <img 
              src="https://images.unsplash.com/photo-1579869847557-1f67382cc158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80" 
              alt="Logo partenaire" 
              className="h-12 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
            />
            <img 
              src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80" 
              alt="Logo partenaire" 
              className="h-12 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
            />
            <img 
              src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80" 
              alt="Logo partenaire" 
              className="h-12 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTestimonials;
