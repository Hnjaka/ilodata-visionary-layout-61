
import React, { useRef, useState } from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

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
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message envoyé",
        description: `Votre message a été envoyé à ${recipientEmail}. Nous vous répondrons dans les plus brefs délais.`,
      });
      setName('');
      setEmail('');
      setMessage('');
      setIsSubmitting(false);
    }, 1500);
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
