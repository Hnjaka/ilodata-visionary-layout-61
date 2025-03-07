
import React, { useEffect, useRef } from 'react';
import { MessageSquare } from 'lucide-react';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Set the recipient email
  const recipientEmail = "contact@ilodata.com";

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
            <ContactForm recipientEmail={recipientEmail} />
          </div>
          
          <ContactInfo />
        </div>
      </div>
    </section>
  );
};

export default Contact;
