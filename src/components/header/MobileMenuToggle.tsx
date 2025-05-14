
import React from 'react';
import { Menu, X } from 'lucide-react';

interface MobileMenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

const MobileMenuToggle: React.FC<MobileMenuToggleProps> = ({ isOpen, onToggle }) => {
  return (
    <button 
      className="md:hidden text-slate-800 p-2 rounded hover:bg-slate-100 transition-colors"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );
};

export default MobileMenuToggle;
