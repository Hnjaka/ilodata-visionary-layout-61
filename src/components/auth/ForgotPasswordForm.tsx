
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';

interface ForgotPasswordFormProps {
  onSubmit: (email: string) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmit,
  onCancel,
  loading
}) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Récupération de mot de passe</h1>
        <p className="text-sm text-gray-600">
          Saisissez votre adresse email pour recevoir un lien de réinitialisation.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email-reset" className="block text-sm font-medium text-gray-700 flex items-center gap-1">
            <Mail className="h-4 w-4" /> Email
          </label>
          <Input
            id="email-reset"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="votre@email.com"
          />
        </div>
        
        <div className="flex flex-col space-y-2">
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Envoi en cours..." : "Envoyer le lien"}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={onCancel}
            disabled={loading}
          >
            Retour à la connexion
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
