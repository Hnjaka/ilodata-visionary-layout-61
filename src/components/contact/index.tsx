
import React from 'react';
import { MessageSquare } from 'lucide-react';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const Contact = () => {
  // Set the recipient email
  const recipientEmail = "contact@ilodata.com";
  
  // Use our custom intersection observer hook
  const sectionRef = useIntersectionObserver();

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
