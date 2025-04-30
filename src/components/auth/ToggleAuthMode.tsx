
import React from 'react';

interface ToggleAuthModeProps {
  isSignUp: boolean;
  onToggle: () => void;
}

const ToggleAuthMode: React.FC<ToggleAuthModeProps> = ({ isSignUp, onToggle }) => {
  return (
    <div className="mt-4 text-center">
      <button
        type="button"
        onClick={onToggle}
        className="text-sm text-blue-600 hover:underline"
      >
        {isSignUp ? "Déjà un compte ? Se connecter" : "Pas de compte ? S'inscrire"}
      </button>
    </div>
  );
};

export default ToggleAuthMode;
