
import React from 'react';
import { Menu, X } from 'lucide-react';

interface MobileMenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

const MobileMenuToggle: React.FC<MobileMenuToggleProps> = ({ isOpen, onToggle }) => {
  return (
    <button 
      className="md:hidden text-slate-800"
      onClick={onToggle}
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );
};

export default MobileMenuToggle;
