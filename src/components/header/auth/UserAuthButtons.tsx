
import React from 'react';
import { LogIn, LogOut, User } from 'lucide-react';
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

  const handleSignOut = async () => {
    console.log("Logout button clicked in UserAuthButtons");
    await onSignOut();
  };

  return (
    <div className="hidden md:flex items-center space-x-4">
      {user ? (
        <div className="flex items-center space-x-4">
          <Link 
            to="/account"
            className="flex items-center text-slate-700 hover:text-ilodata-600 transition-colors"
          >
            <User className="h-4 w-4 mr-1" /> Mon compte
          </Link>
          <button 
            onClick={handleSignOut}
            className="flex items-center text-slate-700 hover:text-ilodata-600 transition-colors"
            type="button"
          >
            <LogOut className="h-4 w-4 mr-1" /> Déconnexion
          </button>
        </div>
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
