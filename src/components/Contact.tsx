
import React, { useEffect, useRef, useState } from 'react';
import { Mail, Phone, Send, MessageSquare, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message envoyé",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      setName('');
      setEmail('');
      setMessage('');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="section-padding bg-gradient-to-b from-blue-50 to-white">
      <div 
        ref={sectionRef} 
        className="container mx-auto px-4 md:px-6 fade-in-section"
      >
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-blue-100">
              <MessageSquare className="h-6 w-6 text-ilodata-600" />
            </div>
          </div>
          <h2 className="section-title text-center">Contactez-nous</h2>
          <p className="section-subtitle">
            Des questions ou un projet en tête ? Écrivez-nous, nous serons ravis de vous aider.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start max-w-5xl mx-auto">
          <div className="animate-fade-in">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-slate-700">
                  Nom
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilodata-500 focus:border-transparent transition-all"
                  placeholder="Votre nom"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilodata-500 focus:border-transparent transition-all"
                  placeholder="votre@email.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-slate-700">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilodata-500 focus:border-transparent transition-all"
                  placeholder="Détaillez votre projet ou question..."
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "button-primary w-full flex items-center justify-center gap-2",
                  isSubmitting && "opacity-70 cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Envoyer
                  </>
                )}
              </button>
            </form>
          </div>
          
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
        </div>
      </div>
    </section>
  );
};

export default Contact;
