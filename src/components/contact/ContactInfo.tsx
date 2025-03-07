
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className="glass-card p-8 animate-fade-in delay-200">
      <h3 className="text-xl font-semibold mb-6 text-slate-800">Informations de contact</h3>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <div className="p-3 rounded-lg bg-blue-50 mr-4">
            <Mail className="h-5 w-5 text-ilodata-600" />
          </div>
          <div>
            <h4 className="font-medium text-slate-800 mb-1">Email</h4>
            <a href="mailto:contact@ilodata.com" className="text-slate-600 hover:text-ilodata-600 transition-colors">
              contact@ilodata.com
            </a>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="p-3 rounded-lg bg-blue-50 mr-4">
            <Phone className="h-5 w-5 text-ilodata-600" />
          </div>
          <div>
            <h4 className="font-medium text-slate-800 mb-1">Téléphone</h4>
            <a href="tel:+33123456789" className="text-slate-600 hover:text-ilodata-600 transition-colors">
              +33 1 23 45 67 89
            </a>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="p-3 rounded-lg bg-blue-50 mr-4">
            <MapPin className="h-5 w-5 text-ilodata-600" />
          </div>
          <div>
            <h4 className="font-medium text-slate-800 mb-1">Adresse</h4>
            <p className="text-slate-600">
              12 rue de la Mise en Page<br />
              75001 Paris, France
            </p>
          </div>
        </div>
        
        <div className="pt-6 mt-6 border-t border-slate-200">
          <h4 className="font-medium text-slate-800 mb-3">Horaires d'ouverture</h4>
          <div className="space-y-2 text-slate-600">
            <p>Lundi - Vendredi: 9h00 - 18h00</p>
            <p>Samedi: 10h00 - 14h00</p>
            <p>Dimanche: Fermé</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-slate-100 rounded-lg h-40 overflow-hidden">
        {/* Map placeholder - would be replaced with an actual Google Maps integration */}
        <div className="w-full h-full flex items-center justify-center text-slate-400 bg-blue-50">
          <MapPin className="mr-2" /> Carte Google Maps
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
