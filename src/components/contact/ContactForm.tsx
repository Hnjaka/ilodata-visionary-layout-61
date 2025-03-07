
import React, { useRef, useState } from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import emailjs from 'emailjs-com';

interface ContactFormProps {
  recipientEmail: string;
}

const ContactForm = ({ recipientEmail }: ContactFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Log the recipient email
    console.log(`Sending message to: ${recipientEmail}`);
    console.log(`From: ${name} (${email})`);
    console.log(`Message: ${message}`);
    
    // Prepare template parameters
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
      to_email: recipientEmail,
    };
    
    // Send email using EmailJS
    emailjs.send(
      'service_contactform', // Your EmailJS service ID
      'template_contactform', // Your EmailJS template ID
      templateParams,
      'YOUR_USER_ID' // Your EmailJS public key
    )
      .then(() => {
        toast({
          title: "Message envoyé",
          description: `Votre message a été envoyé à ${recipientEmail}. Nous vous répondrons dans les plus brefs délais.`,
        });
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((error) => {
        console.error('Email sending failed:', error);
        toast({
          title: "Erreur d'envoi",
          description: "Nous n'avons pas pu envoyer votre message. Veuillez réessayer plus tard.",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
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
  );
};

export default ContactForm;
