
import React from 'react';
import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UserAuthButtonsProps {
  user: any;
  onSignOut: () => Promise<void>;
  onLogin: () => void;
}

const UserAuthButtons: React.FC<UserAuthButtonsProps> = ({ user, onLogin }) => {
  // Si l'utilisateur est connecté, le dropdown menu sera utilisé à la place
  if (user) return null;
  
  const handleLogin = () => {
    console.log("Login button clicked in UserAuthButtons");
    onLogin();
  };

  return (
    <Button 
      type="button"
      onClick={handleLogin}
      variant="ghost"
      className="flex items-center text-slate-700 hover:text-ilodata-600 transition-colors"
    >
      <LogIn className="h-4 w-4 mr-1" /> Connexion
    </Button>
  );
};

export default UserAuthButtons;
