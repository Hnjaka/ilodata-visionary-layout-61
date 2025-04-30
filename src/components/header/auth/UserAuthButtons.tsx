
import React from 'react';
import { LogIn, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UserAuthButtonsProps {
  user: any;
  onSignOut: () => Promise<void>;
  onLogin: () => void;
}

const UserAuthButtons: React.FC<UserAuthButtonsProps> = ({ user, onSignOut, onLogin }) => {
  const handleLogin = () => {
    console.log("Login button clicked in UserAuthButtons");
    onLogin();
  };

  return (
    <div className="hidden md:flex items-center space-x-4">
      {user ? (
        <button 
          onClick={onSignOut}
          className="flex items-center text-slate-700 hover:text-ilodata-600 transition-colors"
        >
          <LogOut className="h-4 w-4 mr-1" /> Déconnexion
        </button>
      ) : (
        <button 
          type="button"
          onClick={handleLogin}
          className="flex items-center text-slate-700 hover:text-ilodata-600 transition-colors"
        >
          <LogIn className="h-4 w-4 mr-1" /> Connexion
        </button>
      )}
      <Link to="/contact" className="button-quote">
        Demandez un devis
      </Link>
    </div>
  );
};

export default UserAuthButtons;
